const ProductsModel = require("../models/ProductsModel");

// Create Product
exports.createProduct = async (req, res) => {
  try {
    const { name, description, price, sku, categoryId, stockQuantity } =
      req.body;
    const result = await ProductsModel.create({
      name,
      description,
      price,
      sku,
      categoryId,
      stockQuantity,
    });
    res.status(201).json({ success: true, data: result });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
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

    const facet = {
      $facet: {
        product: [{ $skip: skip }, { $limit: limit }, { $project: { _id: 0 } }],
        totalCount: [{ $count: "count" }],
      },
    };

    const project = {
      $project: {
        product: 1,
        totalCount: { $arrayElemAt: ["$totalCount.count", 0] },
      },
    };

    const result = await ProductsModel.aggregate([facet, project]);
    res.status(200).json({ success: true, data: result[0] });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};
