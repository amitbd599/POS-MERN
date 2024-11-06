const mongoose = require("mongoose");
const DataSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "products", // References the Products collection
      required: true,
    },
    orderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "orders", // References the orders collection
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
  {
    timestamps: true,
    versionKey: false,
  }
);

const OrderProductsModel = mongoose.model("orderproducts", DataSchema);

module.exports = OrderProductsModel;
