const mongoose = require("mongoose");
const DataSchema = new mongoose.Schema(
  {
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer", // References the Customers collection
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // References the Users collection
      required: true,
    },
    totalAmount: {
      type: Number,
      required: true,
      min: 0,
    },
    status: {
      type: String,
      enum: ["Pending", "Completed", "Cancelled", "Returned"],
      required: true,
      default: "Pending",
    },
    returnDate: {
      type: Date,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const OrdersModel = mongoose.model("orders", DataSchema);

module.exports = OrdersModel;
