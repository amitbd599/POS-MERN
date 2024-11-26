const CategoriesModel = require("../models/CategoriesModel");
const CustomersModel = require("../models/CustomersModel");
const OrdersModel = require("../models/OrdersModel");
const ProductsModel = require("../models/ProductsModel");
const UserModel = require("../models/UserModel");

// get all data
exports.getDashboardData = async (req, res) => {
  try {
    let categories = await CategoriesModel.aggregate([
      {
        $facet: {
          totalCategories: [{ $count: "count" }],
          allCategories: [{ $sort: { createdAt: 1 } }, { $limit: 5 }],
        },
      },
      {
        $project: {
          totalCategories: { $arrayElemAt: ["$totalCategories.count", 0] },
          "allCategories.name": 1,
          "allCategories.description": 1,
        },
      },
    ]);

    let customers = await CustomersModel.aggregate([
      {
        $facet: {
          totalCustomers: [{ $count: "count" }],
          allCustomers: [{ $sort: { createdAt: 1 } }, { $limit: 5 }],
        },
      },
      {
        $project: {
          totalCustomers: { $arrayElemAt: ["$totalCustomers.count", 0] },
          "allCustomers.name": 1,
          "allCustomers.email": 1,
          "allCustomers.number": 1,
          "allCustomers.address": 1,
        },
      },
    ]);
    let orders = await OrdersModel.aggregate([
      {
        $facet: {
          totalOrder: [{ $count: "count" }],
          pendingOrders: [
            { $match: { status: "Pending" } },
            { $sort: { createdAt: -1 } },
            { $limit: 5 },
          ],
          completedOrders: [
            { $match: { status: "Completed" } },
            { $sort: { createdAt: -1 } },
            { $limit: 5 },
          ],
          cancelledOrders: [
            { $match: { status: "Cancelled" } },
            { $sort: { createdAt: -1 } },
            { $limit: 5 },
          ],
          returnedOrders: [
            { $match: { status: "Returned" } },
            { $sort: { createdAt: -1 } },
            { $limit: 5 },
          ],
          totalCounts: [
            {
              $group: {
                _id: "$status",
                count: { $sum: 1 },
                totalAmount: { $sum: "$totalAmount" },
              },
            },
          ],
          totalAmount: [
            {
              $group: {
                _id: null,
                totalAmount: { $sum: "$totalAmount" },
              },
            },
          ],
        },
      },
      {
        $project: {
          totalCounts: 1,
          totalOrder: { $arrayElemAt: ["$totalOrder.count", 0] },
          totalAmount: { $arrayElemAt: ["$totalAmount.totalAmount", 0] },
          "pendingOrders._id": 1,
          "pendingOrders.totalAmount": 1,
          "pendingOrders.status": 1,
          "completedOrders._id": 1,
          "completedOrders.totalAmount": 1,
          "completedOrders.status": 1,
          "cancelledOrders._id": 1,
          "cancelledOrders.totalAmount": 1,
          "cancelledOrders.status": 1,
          "returnedOrders._id": 1,
          "returnedOrders.totalAmount": 1,
          "returnedOrders.status": 1,
        },
      },
    ]);

    const ordersByStatus = await OrdersModel.aggregate([
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 },
          totalAmount: { $sum: "$totalAmount" },
        },
      },
    ]);

    const ordersByStatusData = {};
    ordersByStatus.forEach((item) => {
      ordersByStatusData[item._id] = {
        count: item.count,
        totalAmount: item.totalAmount,
      };
    });

    let products = await ProductsModel.aggregate([
      {
        $facet: {
          recentProducts: [{ $sort: { createdAt: -1 } }, { $limit: 10 }],
          outOfStockProducts: [
            { $match: { stockQuantity: { $lt: 5 } } },
            { $limit: 10 },
          ],
          outOfStockCount: [
            { $match: { stockQuantity: 0 } },
            { $count: "count" },
          ],
          totalProducts: [{ $count: "count" }],
        },
      },
      {
        $project: {
          "recentProducts.name": 1,
          "recentProducts.description": 1,
          "recentProducts.price": 1,
          "recentProducts.sku": 1,
          "recentProducts.stockQuantity": 1,
          "outOfStockProducts.name": 1,
          "outOfStockProducts.description": 1,
          "outOfStockProducts.price": 1,
          "outOfStockProducts.sku": 1,
          "outOfStockProducts.stockQuantity": 1,
          outOfStockCount: { $arrayElemAt: ["$outOfStockCount.count", 0] },
          totalProducts: { $arrayElemAt: ["$totalProducts.count", 0] },
        },
      },
    ]);
    let users = await UserModel.aggregate([
      {
        $facet: {
          recentUsers: [{ $sort: { createdAt: -1 } }, { $limit: 10 }],
          userOrderCounts: [
            {
              $lookup: {
                from: "orders", // Reference the Orders collection
                localField: "_id",
                foreignField: "userId", // Match userId in Orders with _id in Users
                as: "userOrders",
              },
            },
            {
              $project: {
                name: 1,
                email: 1,
                role: 1,
                orderCount: { $size: "$userOrders" }, // Count orders for each user
              },
            },
          ],
          totalUsers: [{ $count: "count" }],
        },
      },
      {
        $project: {
          "recentUsers.name": 1,
          "recentUsers.email": 1,
          "recentUsers.number": 1,
          "recentUsers.role": 1,
          "recentUsers.createdAt": 1,
          userOrderCounts: 1,
          totalUsers: { $arrayElemAt: ["$totalUsers.count", 0] }, // Extract total user count
        },
      },
    ]);

    let monthlyOrderData = await OrdersModel.aggregate([
      {
        $group: {
          _id: { $month: "$createdAt" }, // Group by month
          totalAmount: { $sum: "$totalAmount" }, // Sum up order amounts
        },
      },
      {
        $sort: { _id: 1 }, // Sort by month (1 = Jan, 12 = Dec)
      },
    ]);

    // Map data to ensure all 12 months are represented
    const orderModelChart = Array(12).fill(0); // Default 0 for all months
    monthlyOrderData.forEach((data) => {
      orderModelChart[data._id - 1] = data.totalAmount; // Assign amount to respective month index
    });

    let result = {
      categories,
      customers,
      orders,
      ordersByStatusData,
      products,
      users,
      orderModelChart,
    };
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    res.status(200).json({ success: false, error: error.message });
  }
};
