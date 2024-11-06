const mongoose = require("mongoose");
const ProductsModel = require("../models/ProductsModel");
const PaymentsModel = require("../models/PaymentsModel");
const OrdersModel = require("../models/OrdersModel");
const CustomersModel = require("../models/CustomersModel");
const OrderProductsModel = require("../models/OrderProductsModel");
const ObjectId = mongoose.Types.ObjectId;

// Place a new order
exports.orderCreate = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const { customerId, userId, products } = req.body;

    const customer = await CustomersModel.findById(customerId);
    if (!customer)
      return res
        .status(404)
        .json({ success: false, message: "Customer not found" });

    // Calculate total amount
    let totalAmount = 0;
    let newProducts = [];
    for (let item of products) {
      const product = await ProductsModel.findById({
        _id: new ObjectId(item.productId),
      });

      if (!product || product.stockQuantity < item.quantity) {
        return res.status(400).json({
          success: false,
          message: "Product out of stock or does not exist",
        });
      }

      let newProduct = {
        productId: item.productId,
        quantity: item.quantity,
        price: product.price,
      };
      newProducts.push(newProduct);
      totalAmount += product.price * item.quantity;
    }

    console.log(newProducts);

    // Create order
    const order = await OrdersModel.create(
      [
        {
          customerId,
          userId,
          totalAmount,
          status: "Pending",
        },
      ],
      { session }
    );

    // add product to order
    for (let item of newProducts) {
      await OrderProductsModel.create(
        [
          {
            orderId: order[0]._id,
            productId: item.productId,
            quantity: item.quantity,
            price: item.price,
          },
        ],
        { session }
      );
    }

    // Deduct stock
    for (let item of products) {
      await ProductsModel.findByIdAndUpdate(
        item.productId,
        {
          $inc: { stockQuantity: -item.quantity },
        },
        { session } // Pass the session here
      );
    }

    await session.commitTransaction();
    res.status(201).json({ success: true, data: order });
  } catch (error) {
    await session.abortTransaction();
    res.status(400).json({ success: false, error: error.toString() });
  } finally {
    // End the session
    session.endSession();
  }
};

// cancel an Order
exports.cancelOrder = async (req, res) => {
  try {
    const { orderId, status } = req.body;

    //! Find the order products
    const OrderProducts = await OrdersModel.aggregate([
      {
        $match: {
          _id: new ObjectId(orderId),
        },
      },
      {
        $lookup: {
          from: "orderproducts",
          localField: "_id",
          foreignField: "orderId",
          as: "orderProduct",
        },
      },
    ]);

    //  Check if the order has been updated/cancelled
    if (OrderProducts[0].status === "Cancelled") {
      return res
        .status(400)
        .json({ success: false, message: "Order is already cancelled" });
    }

    //! If order status is cancelled, add back the stock
    if (OrderProducts[0].status !== "Cancelled" && status === "Cancelled") {
      for (let item of OrderProducts[0].orderProduct) {
        await ProductsModel.findByIdAndUpdate(item.productId, {
          $inc: { stockQuantity: item.quantity },
        });
      }
      //! order status is updated
      await OrdersModel.updateOne({ _id: new ObjectId(orderId) }, { status });
      return res
        .status(200)
        .json({ success: true, message: "Order is cancelled!" });
    }
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// Return an order
exports.returnOrder = async (req, res) => {
  try {
    const { orderId } = req.body;
    const order = await OrdersModel.findById(orderId);

    if (!order)
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });

    // Ensure the order isn't already returned
    if (order.status === "Returned") {
      return res
        .status(400)
        .json({ success: false, message: "Order already returned" });
    }

    // Restock each product
    for (let item of order.products) {
      const product = await ProductsModel.findById(item.productId._id);
      if (product) {
        product.stockQuantity += item.quantity; // Re-add returned quantity
        await product.save();
      }
    }

    // Update order status and return date
    order.status = "Returned";
    order.returnDate = new Date();
    await order.save();

    // Refund the payment
    const payment = await PaymentsModel.findOne({ orderId: order._id });
    if (!payment) {
      return res.status(404).json({
        success: false,
        message:
          "Order Return successfully But Payment not found for this order",
      });
    }

    if (payment.status === "Refunded") {
      return res.status(400).json({
        success: false,
        message: "Order Return successfully & Payment already refunded",
      });
    }

    payment.refundAmount = payment.amount;
    payment.refundDate = new Date();
    payment.status = "Refunded";
    await payment.save();

    res.status(200).json({
      success: true,
      message: "Order returned and payment refunded successfully",
    });
  } catch (error) {
    res.status(400).json({ success: false, error: error.toString() });
  }
};

// all order
exports.getOrder = async (req, res) => {
  try {
    const limit = parseInt(req.params.item); // Number of items per page
    const pageNo = parseInt(req.params.pageNo); // Current page number

    if (isNaN(limit) || isNaN(pageNo)) {
      return res.status(400).json({ message: "Invalid parameters" });
    }

    const skipStage = { $skip: (pageNo - 1) * limit };
    const limitStage = { $limit: limit };

    const joinStage = {
      $lookup: {
        from: "products", // The name of the Product collection in MongoDB
        localField: "products.productId",
        foreignField: "_id",
        as: "productDetails",
      },
    };

    const projectStage = {
      $project: {
        _id: 0,
        customerId: 1,
        userId: 1,
        totalAmount: 1,
        status: 1,
        productDetails: 1,
      },
    };

    const addField = {
      $addFields: {
        productDetails: {
          $map: {
            input: "$products", // Each entry in the "products" array in Orders
            as: "product",
            in: {
              $mergeObjects: [
                {
                  $arrayElemAt: [
                    {
                      $filter: {
                        input: "$productDetails",
                        as: "detail",
                        cond: { $eq: ["$$detail._id", "$$product.productId"] },
                      },
                    },
                    0,
                  ],
                },
                {
                  quantity: "$$product.quantity", // Pulling "quantity" from the original products array in Orders
                },
              ],
            },
          },
        },
      },
    };

    const facet = {
      $facet: {
        order: [skipStage, limitStage, joinStage, addField, projectStage],
        totalCount: [{ $count: "count" }],
      },
    };

    const project = {
      $project: {
        order: 1,
        totalCount: { $arrayElemAt: ["$totalCount.count", 0] },
      },
    };

    const result = await OrdersModel.aggregate([facet, project]);
    res.status(200).json({ success: true, data: result[0] });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};
