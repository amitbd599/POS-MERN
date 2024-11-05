const fs = require("fs");
const path = require("path");
const CategoriesModel = require("../models/CategoriesModel");
const UserModel = require("../models/UserModel");
const CustomersModel = require("../models/CustomersModel");
const InventoryTransactionsModel = require("../models/InventoryTransactionsModel");
const OrdersModel = require("../models/OrdersModel");
const PaymentsModel = require("../models/PaymentsModel");
const ProductsModel = require("../models/ProductsModel");

exports.exportData = async (req, res) => {
  try {
    // Fetch all data from the collection
    const categories = await CategoriesModel.find({});
    const customers = await CustomersModel.find({});
    const transactions = await InventoryTransactionsModel.find({});
    const orders = await OrdersModel.find({});
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
      .replace(/ /g, "-");

    const data = {
      categories,
      customers,
      orders,
      transactions,
      payments,
      products,
      user,
    };

    const filePath = path.join(
      __dirname,
      "../../backup",
      `backup__${formattedDate}.json`
    );
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");

    res.download(filePath, "backup.json", (err) => {
      if (err) {
        console.log(err);
        res.status(500).send("Error downloading the file");
      }
    });
  } catch (error) {
    console.error("Error exporting data:", error);
    res.status(500).json({ message: "Failed to export data" });
  }
};
