const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
const ExpensesModel = require("../models/ExpensesModel");
const json2csv = require("json2csv").parse;
// create expenses
exports.createExpenses = async (req, res) => {
  try {
    const { name, description, amount } = req.body;
    const result = await ExpensesModel.create({
      name,
      description,
      amount,
    });

    res.status(200).json({ success: true, data: result });
  } catch (error) {
    res.status(200).json({ success: false, error: error.toString() });
  }
};

// get all expenses
exports.getExpenses = async (req, res) => {
  try {
    const limit = parseInt(req.params.item); // Number of items per page
    const pageNo = parseInt(req.params.pageNo); // Current page number
    const { startDate, endDate } = req.query;
    if (isNaN(limit) || isNaN(pageNo)) {
      return res.status(200).json({ message: "Invalid parameters" });
    }

    const skip = (pageNo - 1) * limit;

    let dataByDate = {
      $match: {
        createdAt: { $gte: new Date(startDate), $lte: new Date(endDate) },
      },
    };

    const facet = {
      $facet: {
        expenses: [{ $skip: skip }, { $limit: limit }],
        totalCount: [{ $count: "count" }],
      },
    };

    const project = {
      $project: {
        expenses: 1,
        totalCount: { $arrayElemAt: ["$totalCount.count", 0] },
      },
    };

    const result = await ExpensesModel.aggregate([dataByDate, facet, project]);
    res.status(200).json({ success: true, data: result[0] });
  } catch (error) {
    res.status(200).json({ success: false, error: error.message });
  }
};

//! get Expenses
exports.getExpensesReportCSV = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    // Date filtering logic
    const matchStage = {
      $match: {
        createdAt: {
          $gte: new Date(startDate),
          $lte: new Date(endDate),
        },
      },
    };

    const result = await ExpensesModel.aggregate([matchStage]);

    console.log(result);

    if (!result.length) {
      return res.status(200).json({ success: false, message: "No data found" });
    }

    // Prepare CSV from the expenses array
    const csv = json2csv(result, {
      fields: ["name", "description", "amount", "createdAt", "updatedAt"],
    });

    res.setHeader(
      "Content-Disposition",
      "attachment; filename=expenses_report.csv"
    );
    res.set("Content-Type", "text/csv");
    res.status(200).send(csv);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
