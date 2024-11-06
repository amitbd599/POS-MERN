const mongoose = require("mongoose");
const DataSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product", // Reference to the Product collection
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      validate: {
        validator: function (value) {
          // Quantity must be a positive or negative integer
          return Number.isInteger(value);
        },
        message: "Quantity must be an integer.",
      },
    },
    transactionType: {
      type: String,
      enum: ["Restock", "Return"], // Restrict to specified types
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to the User collection
      required: true,
    },
    transactionDate: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const TransactionsModel = mongoose.model("transactions", DataSchema);

module.exports = TransactionsModel;
