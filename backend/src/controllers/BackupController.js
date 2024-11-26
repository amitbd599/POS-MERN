const fs = require("fs");
const mongoose = require("mongoose");
const path = require("path");
const CategoriesModel = require("../models/CategoriesModel");
const UserModel = require("../models/UserModel");
const CustomersModel = require("../models/CustomersModel");
const OrdersModel = require("../models/OrdersModel");
const OrderProductsModel = require("../models/OrderProductsModel");
const PaymentsModel = require("../models/PaymentsModel");
const ProductsModel = require("../models/ProductsModel");

exports.exportData = async (req, res) => {
  try {
    // Fetch all data from the collection
    const categories = await CategoriesModel.find({});
    const customers = await CustomersModel.find({});
    const orders = await OrdersModel.find({});
    const orderproducts = await OrderProductsModel.find({});
    const payments = await PaymentsModel.find({});
    const products = await ProductsModel.find({});
    const user = await UserModel.find({});

    const currentDate = new Date();
    const formattedDate = currentDate
      .toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
      .replace(/ /g, " ");

    const data = {
      categories,
      customers,
      orders,
      orderproducts,
      payments,
      products,
      user,
    };

    const filePath = path.join(
      __dirname,
      "../../backup",
      `backup__${formattedDate}.json`
    );

    // close the file when developing mode
    // fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");

    res.download(filePath, `backup__${formattedDate}.json`, (err) => {
      if (err) {
        console.log(err);
        res.status(200).send({ message: "Error downloading the file" });
      }
    });
  } catch (error) {
    console.error("Error exporting data:", error);
    res.status(200).json({ message: "Failed to export data" });
  }
};

exports.importData = async (req, res) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    const filePath = req.file?.path;
    const jsonData = fs.readFileSync(filePath, "utf-8"); // Asynchronously read file
    const data = JSON.parse(jsonData);

    // Import data to each collection
    if (data.categories) {
      await CategoriesModel.deleteMany({}, { session }); // Optional: Clear existing data
      await CategoriesModel.insertMany(data.categories, { session });
    }

    if (data.user) {
      await UserModel.deleteMany({}, { session }); // Optional: Clear existing data
      await UserModel.insertMany(data.user, { session });
    }

    if (data.customers) {
      await CustomersModel.deleteMany({}, { session }); // Optional: Clear existing data
      await CustomersModel.insertMany(data.customers, { session });
    }

    if (data.orders) {
      await OrdersModel.deleteMany({}, { session }); // Optional: Clear existing data
      await OrdersModel.insertMany(data.orders, { session });
    }

    if (data.orderproducts) {
      await OrderProductsModel.deleteMany({}, { session }); // Optional: Clear existing data
      await OrderProductsModel.insertMany(data.orderproducts, { session });
    }

    if (data.payments) {
      await PaymentsModel.deleteMany({}, { session }); // Optional: Clear existing data
      await PaymentsModel.insertMany(data.payments, { session });
    }

    if (data.products) {
      await ProductsModel.deleteMany({}, { session }); // Optional: Clear existing data
      await ProductsModel.insertMany(data.products, { session });
    }

    await session.commitTransaction(); // Commit transaction
    session.endSession();

    // Clean up uploaded file
    fs.unlinkSync(filePath);

    res
      .status(200)
      .json({ success: true, message: "Data imported successfully" });
  } catch (error) {
    // Rollback transaction
    await session.abortTransaction();
    session.endSession();
    res
      .status(200)
      .json({
        success: false,
        message: "Failed to import data",
        error: error.toString(),
      });
  }
};
