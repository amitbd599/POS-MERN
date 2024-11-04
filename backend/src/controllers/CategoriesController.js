const mongoose = require("mongoose");
const CategoriesModel = require("../models/CategoriesModel");
const ProductsModel = require("../models/ProductsModel");
const ObjectId = mongoose.Types.ObjectId;

// create categories
exports.createCategories = async (req, res) => {
  try {
    const { name, description } = req.body;
    const result = await CategoriesModel.create({
      name,
      description,
    });

    res.status(200).json({ success: true, data: result });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// get all categories
exports.getProduct = async (req, res) => {
  try {
    let categories = await CategoriesModel.find();
    res.status(200).json({ success: true, data: categories });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// Update categories
exports.updateCategories = async (req, res) => {
  const id = new ObjectId(req.params.id);
  try {
    const reqBody = req.body;
    const result = await CategoriesModel.updateOne({ _id: id }, reqBody);
    res.status(201).json({ success: true, data: result });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// Delete categories
exports.deleteCategories = async (req, res) => {
  const id = new ObjectId(req.params.id);
  try {
    // Check if any products reference this category
    const productCount = await ProductsModel.countDocuments({ categoryId: id });
    if (productCount > 0) {
      return res.status(400).json({
        success: false,
        message:
          "Cannot delete category because it is referenced by active products.",
      });
    }
    // Proceed with deletion if no products reference this category
    const result = await CategoriesModel.deleteOne({ _id: id });
    res.status(201).json({ success: true, data: result });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};
