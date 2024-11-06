const CustomersModel = require("../models/CustomersModel");

// Add new customer
exports.addCustomer = async (req, res) => {
  try {
    const { name, email, phone, address } = req.body;
    const newCustomer = await CustomersModel.create({
      name,
      email,
      phone,
      address,
    });
    res.status(201).json({ success: true, data: newCustomer });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// Get all customers
exports.getAllCustomer = async (req, res) => {
  try {
    const limit = parseInt(req.params.item); // Number of items per page
    const pageNo = parseInt(req.params.pageNo); // Current page number

    if (isNaN(limit) || isNaN(pageNo)) {
      return res.status(400).json({ message: "Invalid parameters" });
    }

    const skip = (pageNo - 1) * limit;

    const facet = {
      $facet: {
        customer: [
          { $skip: skip },
          { $limit: limit },
          { $project: { _id: 0 } },
        ],
        totalCount: [{ $count: "count" }],
      },
    };

    const project = {
      $project: {
        customer: 1,
        totalCount: { $arrayElemAt: ["$totalCount.count", 0] },
      },
    };

    const result = await CustomersModel.aggregate([facet, project]);
    res.status(200).json({ success: true, data: result[0] });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// Update Product
exports.updateProduct = async (req, res) => {
  const id = new ObjectId(req.params.id);
  try {
    const reqBody = req.body;
    const result = await ProductsModel.updateOne({ _id: id }, reqBody);
    res.status(201).json({ success: true, data: result });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// Delete Product
exports.deleteProduct = async (req, res) => {
  const id = new ObjectId(req.params.id);
  try {
    const result = await ProductsModel.deleteOne({ _id: id });
    res.status(201).json({ success: true, data: result });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};
