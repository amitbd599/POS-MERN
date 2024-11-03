const mongoose = require("mongoose");
const ProductsModel = require("../models/ProductsModel");
const PaymentsModel = require("../models/PaymentsModel");
const OrdersModel = require("../models/OrdersModel");
const CustomersModel = require("../models/CustomersModel");
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
          products: newProducts,
          totalAmount,
          status: "Pending",
        },
      ],
      { session }
    );

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

// updateOrderStatus
exports.updateOrderStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;
    const order = await OrdersModel.findById(orderId);
    const orderUpdate = await OrdersModel.updateOne(
      { _id: new ObjectId(orderId) },
      { status }
    );

    console.log(order.status);

    if (order.status !== "Cancelled" && status === "Cancelled") {
      // If order status is cancelled, add back the stock
      const order = await OrdersModel.findById(orderId);
      for (let item of order.products) {
        await ProductsModel.findByIdAndUpdate(item.productId, {
          $inc: { stockQuantity: item.quantity },
        });
      }
    }
    res.status(200).json({ success: true, data: orderUpdate });
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
      return res
        .status(404)
        .json({
          success: false,
          message:
            "Order Return successfully But Payment not found for this order",
        });
    }

    if (payment.status === "Refunded") {
      return res
        .status(400)
        .json({
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
