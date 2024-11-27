const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
const CustomersModel = require("../models/CustomersModel");

// Add new customer
exports.addCustomer = async (req, res) => {
  try {
    const { name, email, number, address } = req.body;

    const newCustomer = await CustomersModel.create({
      name,
      email,
      number,
      address,
    });
    res.status(200).json({
      success: true,
      data: newCustomer,
      message: "Customer create successful!",
    });
  } catch (error) {
    if (error.code === 11000) {
      if (error?.keyPattern?.email) {
        res.status(200).json({
          success: false,
          message: "Email already exists!",
        });
      } else if (error?.keyPattern?.number) {
        res.status(200).json({
          success: false,
          message: "Phone number already exists!",
        });
      }
    } else {
      res.status(200).json({ success: false, error: error.toString() });
    }
  }
};

// Get all customers
exports.getAllCustomer = async (req, res) => {
  try {
    const limit = parseInt(req.params.item); // Number of items per page
    const pageNo = parseInt(req.params.pageNo); // Current page number

    if (isNaN(limit) || isNaN(pageNo)) {
      return res
        .status(200)
        .json({ success: true, message: "Invalid parameters" });
    }

    const skip = (pageNo - 1) * limit;

    const facet = {
      $facet: {
        customer: [{ $skip: skip }, { $limit: limit }],
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
    res.status(200).json({ success: false, error: error.message });
  }
};

// Update customers
exports.updateCustomer = async (req, res) => {
  try {
    const id = new ObjectId(req.params.id);
    const reqBody = req.body;
    const result = await CustomersModel.updateOne({ _id: id }, reqBody);
    res.status(200).json({
      success: true,
      data: result,
      message: "Customer update successful!",
    });
  } catch (error) {
    if (error.code === 11000) {
      if (error?.keyPattern?.email) {
        res.status(200).json({
          success: false,
          message: "Email already exists!",
        });
      } else if (error?.keyPattern?.number) {
        res.status(200).json({
          success: false,
          message: "Phone number already exists!",
        });
      }
    } else {
      res.status(200).json({ success: false, error: error });
    }
  }
};

// Delete Customer
exports.deleteCustomer = async (req, res) => {
  try {
    const id = new ObjectId(req.params.id);
    const result = await CustomersModel.deleteOne({ _id: id });
    console.log(result);

    if (result?.deletedCount === 1) {
      res.status(200).json({
        success: true,
        data: result,
        message: "Customer delete successful!",
      });
    } else {
      res.status(200).json({ success: false, message: "Customer not found!" });
    }
  } catch (error) {
    res.status(200).json({ success: false, error: error.message });
  }
};

//! get Customer id
exports.customerReadByID = async (req, res) => {
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
    let data = await CustomersModel.aggregate([MatchStage, project]);
    res.status(200).json({ success: true, data: data[0] });
  } catch (e) {
    res.status(200).json({ success: false, error: e.toString() });
  }
};
