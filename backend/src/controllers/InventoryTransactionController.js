// controllers/inventoryTransactionController.js
const InventoryTransactionsModel = require("../models/InventoryTransactionsModel");
const ProductsModel = require("../models/ProductsModel");

// Add inventory transaction
exports.addInventoryTransaction = async (req, res) => {
  try {
    const { productId, quantity, transactionType, userId } = req.body;
    const product = await ProductsModel.findById(productId);
    if (!product)
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });

    // Update product stock based on transaction type
    if (transactionType === "Restock") {
      const newTransaction = await InventoryTransactionsModel.create({
        productId,
        quantity,
        transactionType,
        userId,
        transactionDate: new Date(),
      });
      product.stockQuantity += quantity;
      await product.save();
      res.status(201).json({ success: true, data: newTransaction });
    }
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};
