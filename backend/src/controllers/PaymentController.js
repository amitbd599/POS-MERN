const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
const PaymentsModel = require("../models/PaymentsModel");
const OrdersModel = require("../models/OrdersModel");
exports.paymentCreate = async (req, res) => {
  try {
    const { orderId, paymentMethod } = req.body;
    const order = await OrdersModel.findById(orderId);
    if (!order)
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });

    if (order.status === "Completed") {
      return res
        .status(400)
        .json({ success: false, message: "Order already completed" });
    }

    await PaymentsModel.create({
      orderId,
      amount: order.totalAmount,
      paymentMethod,
      paymentDate: new Date(),
      status: "Paid",
    });

    // Update order status to completed
    let updatedOrderStatus = await OrdersModel.updateOne(
      { _id: new ObjectId(orderId) },
      { status: "Completed" }
    );

    res.status(201).json({ success: true, data: updatedOrderStatus });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};
