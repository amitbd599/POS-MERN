const mongoose = require("mongoose");
const DataSchema = new mongoose.Schema(
  {
    orderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order", // references the Orders collection
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    paymentMethod: {
      type: String,
      enum: ["Cash", "Bank"],
      required: true,
    },
    paymentDate: {
      type: Date,
      default: Date.now,
    },
    status: {
      type: String,
      enum: ["Paid", "Unpaid", "Refunded"], // restricts to either "Paid" or "Unpaid"
      default: "Unpaid",
    },
    refundDate: {
      type: Date,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const PaymentsModel = mongoose.model("Payments", DataSchema);

module.exports = PaymentsModel;
