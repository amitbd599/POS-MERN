const mongoose = require("mongoose");
const ProductsModel = require("../models/ProductsModel");
const CategoriesModel = require("../models/CategoriesModel");
const ObjectId = mongoose.Types.ObjectId;
// Create Product
exports.createProduct = async (req, res) => {
  try {
    const { name, description, price, sku, categoryId, stockQuantity } =
      req.body;

    // Check & ensure category exists
    const categoryCount = await CategoriesModel.countDocuments({
      _id: categoryId,
    });
    if (categoryCount === 0) {
      return res.status(200).json({
        success: false,
        message: "No category found.",
      });
    }

    const result = await ProductsModel.create({
      name,
      description,
      price,
      sku,
      categoryId,
      stockQuantity,
    });
    res.status(200).json({
      success: true,
      data: result,
      message: "Product create success!",
    });
  } catch (error) {
    if (error.code === 11000) {
      if (error?.keyPattern?.sku) {
        res.status(200).json({
          success: false,
          message: "SKU already exists!",
        });
      }
    } else {
      res.status(200).json({ success: false, error: error.toString() });
    }
  }
};

// Get Product
exports.getProduct = async (req, res) => {
  try {
    const limit = parseInt(req.params.item); // Number of items per page
    const pageNo = parseInt(req.params.pageNo); // Current page number

    if (isNaN(limit) || isNaN(pageNo)) {
      return res.status(400).json({ message: "Invalid parameters" });
    }

    const skip = (pageNo - 1) * limit;

    const joinWithCategory = {
      $lookup: {
        from: "categories",
        localField: "categoryId",
        foreignField: "_id",
        as: "category",
      },
    };

    const facet = {
      $facet: {
        product: [{ $skip: skip }, { $limit: limit }],
        totalCount: [{ $count: "count" }],
      },
    };

    const project = {
      $project: {
        product: 1,
        totalCount: { $arrayElemAt: ["$totalCount.count", 0] },
      },
    };

    const result = await ProductsModel.aggregate([
      joinWithCategory,
      facet,
      project,
    ]);
    res.status(200).json({ success: true, data: result[0] });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// Update Product
exports.updateProduct = async (req, res) => {
  try {
    const id = new ObjectId(req.params.id);
    const reqBody = req.body;
    const result = await ProductsModel.updateOne({ _id: id }, reqBody);
    res.status(200).json({
      success: true,
      data: result,
      message: "Product update success!",
    });
  } catch (error) {
    if (error.code === 11000) {
      if (error?.keyPattern?.sku) {
        res.status(200).json({
          success: false,
          message: "SKU already exists!",
        });
      }
    } else {
      res.status(200).json({ success: false, error: error.toString() });
    }
  }
};

// Delete Product
exports.deleteProduct = async (req, res) => {
  try {
    const id = new ObjectId(req.params.id);
    const result = await ProductsModel.deleteOne({ _id: id });
    res
      .status(200)
      .json({
        success: true,
        data: result,
        message: "Product delete success!",
      });
  } catch (error) {
    res.status(200).json({ success: false, error: error.message });
  }
};

//! get Product id
exports.productReadByID = async (req, res) => {
  try {
    const id = new ObjectId(req.params.id);
    let MatchStage = {
      $match: {
        _id: id,
      },
    };

    let project = {
      $project: {
        createdAt: 0,
        updatedAt: 0,
      },
    };
    let data = await ProductsModel.aggregate([MatchStage, project]);
    res.status(200).json({ success: true, data: data[0] });
  } catch (e) {
    res.status(200).json({ status: "error", error: e.toString() });
  }
};
