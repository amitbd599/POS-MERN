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
    products: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "products", // References the Products collection
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          min: 1,
        },
        price: {
          type: Number,
          required: true,
          min: 0,
        },
      },
    ],
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

const OrdersModel = mongoose.model("Orders", DataSchema);

module.exports = OrdersModel;
