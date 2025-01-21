const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
const CategoriesModel = require("../models/CategoriesModel");
const ProductsModel = require("../models/ProductsModel");

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
    if (error.code === 11000) {
      if (error?.keyPattern?.name) {
        res.status(200).json({
          success: false,
          message: "Categories name already exists!",
        });
      }
    } else {
      res.status(200).json({ success: false, error: error.toString() });
    }
  }
};

// get all categories
exports.getCategories = async (req, res) => {
  try {
    let categories = await CategoriesModel.find();
    res.status(200).json({ success: true, data: categories });
  } catch (error) {
    res.status(200).json({ success: false, error: error.message });
  }
};

// Update categories
exports.updateCategories = async (req, res) => {
  try {
    const id = new ObjectId(req.params.id);
    const reqBody = req.body;
    const result = await CategoriesModel.updateOne({ _id: id }, reqBody);
    res.status(200).json({
      success: true,
      data: result,
      message: "Categories update success!",
    });
  } catch (error) {
    if (error.code === 11000) {
      if (error?.keyPattern?.name) {
        res.status(200).json({
          success: false,
          message: "Categories name already exists!",
        });
      }
    } else {
      res.status(200).json({ success: false, error: error.toString() });
    }
  }
};

// Delete categories
exports.deleteCategories = async (req, res) => {
  try {
    const id = new ObjectId(req.params.id);
    // Check if any products reference this category
    const productCount = await ProductsModel.countDocuments({ categoryId: id });
    if (productCount > 0) {
      return res.status(200).json({
        success: false,
        message: "Cannot delete this category it have active product.",
      });
    }
    // Proceed with deletion if no products reference this category
    const result = await CategoriesModel.deleteOne({ _id: id });
    res.status(200).json({
      success: true,
      data: result,
      message: "Categories delete success!",
    });
  } catch (error) {
    res.status(200).json({ success: false, error: error.message });
  }
};

//! get categories id
exports.categoriesReadByID = async (req, res) => {
  try {
    const id = new ObjectId(req.params.id);
    let MatchStage = {
      $match: {
        _id: id,
      },
    };

    let data = await CategoriesModel.aggregate([MatchStage]);
    res.status(200).json({ success: true, data: data[0] });
  } catch (e) {
    res.status(200).json({ success: false, error: e.toString() });
  }
};
