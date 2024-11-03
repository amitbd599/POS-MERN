const express = require("express");
const router = express.Router();
const UserController = require("../controllers/UserController.js");
const ProductController = require("../controllers/ProductController.js");
const OrderController = require("../controllers/OrderController.js");
const PaymentController = require("../controllers/PaymentController.js");
const CustomerController = require("../controllers/CustomerController.js");
const InventoryTransactionController = require("../controllers/InventoryTransactionController.js");
const middlewares = require("../middlewares/AuthVerification.js");

// Register a new user
router.post("/register-profile", UserController.register);
router.post("/login-profile", UserController.login);
router.post("/update-profile", middlewares, UserController.user_update);
router.get("/read-profile", middlewares, UserController.user_read);
router.get("/logout-profile", UserController.logout);

// Create a customer
router.post("/customer-create", CustomerController.addCustomer);

// Product
router.post("/create-product", middlewares, ProductController.createProduct);
router.get(
  "/read-product/:item/:pageNo",
  middlewares,
  ProductController.getProduct
);
router.post(
  "/update-product/:id",
  middlewares,
  ProductController.updateProduct
);

// Order routes
router.post("/orders-create", OrderController.orderCreate);
router.post("/orders-status", OrderController.updateOrderStatus);

// Payment routes
router.post("/payments-create", PaymentController.paymentCreate);

// Inventory transaction routes
router.post(
  "/inventory-create",
  InventoryTransactionController.addInventoryTransaction
);

module.exports = router;
