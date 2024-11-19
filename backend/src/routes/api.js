const express = require("express");
const router = express.Router();
const UserController = require("../controllers/UserController.js");
const ProductController = require("../controllers/ProductController.js");
const OrderController = require("../controllers/OrderController.js");
const PaymentController = require("../controllers/PaymentController.js");
const CustomerController = require("../controllers/CustomerController.js");
const CategoriesController = require("../controllers/CategoriesController.js");
const InventoryTransactionController = require("../controllers/InventoryTransactionController.js");
const BackupController = require("../controllers/BackupController.js");
const middlewares = require("../middlewares/AuthVerification.js");
const RoleBasedAccess = require("../middlewares/RoleBasedAccess.js");
const { upload } = require("../middlewares/UploadMiddleware.js");

// Register a new user
router.post(
  "/register-profile",
  RoleBasedAccess("admin"),
  UserController.register
);
router.post("/login-profile", UserController.login);
router.post("/update-profile", middlewares, UserController.userUpdate);
router.get("/read-profile", middlewares, UserController.userRead);
router.get("/read-profile-by-id/:id", middlewares, UserController.userReadByID);
router.post(
  "/update-profile-by-id/:id",
  middlewares,
  UserController.userUpdateById
);
router.get(
  "/read-all-profile/:item/:pageNo",
  middlewares,
  UserController.getAllUser
);
router.delete(
  "/delete-profile/:id",
  middlewares,
  RoleBasedAccess("admin"),
  UserController.deleteUser
);
router.get("/logout-profile", UserController.logout);

// Create a customer
router.post(
  "/customer-create",
  middlewares,
  RoleBasedAccess("admin", "editor"),
  CustomerController.addCustomer
);
router.get(
  "/all-customers/:item/:pageNo",
  middlewares,
  CustomerController.getAllCustomer
);
router.post(
  "/update-customer/:id",
  middlewares,
  CustomerController.updateCustomer
);
router.delete(
  "/delete-customer/:id",
  middlewares,
  CustomerController.deleteCustomer
);

// Product
router.post(
  "/create-product",
  middlewares,
  RoleBasedAccess("admin", "editor"),
  ProductController.createProduct
);
router.get(
  "/read-product/:item/:pageNo",
  middlewares,
  ProductController.getProduct
);
router.post(
  "/update-product/:id",
  middlewares,
  RoleBasedAccess("admin", "editor"),
  ProductController.updateProduct
);
router.delete(
  "/delete-product/:id",
  middlewares,
  RoleBasedAccess("admin", "editor"),
  ProductController.deleteProduct
);

// categories
router.post(
  "/create-categories",
  middlewares,
  RoleBasedAccess("admin", "editor"),
  CategoriesController.createCategories
);
router.get("/all-categories", middlewares, CategoriesController.getProduct);
router.post(
  "/update-categories/:id",
  middlewares,
  CategoriesController.updateCategories
);
router.delete(
  "/delete-categories/:id",
  middlewares,
  RoleBasedAccess("admin", "editor"),
  CategoriesController.deleteCategories
);

// Order routes
router.post(
  "/orders-create",
  middlewares,
  RoleBasedAccess("admin", "editor"),
  OrderController.orderCreate
);
router.post(
  "/orders-cancel",
  middlewares,
  RoleBasedAccess("admin", "editor"),
  OrderController.cancelOrder
);
router.post(
  "/orders-return",
  middlewares,
  RoleBasedAccess("admin", "editor"),
  OrderController.returnOrder
);
router.get("/all-orders/:item/:pageNo", middlewares, OrderController.getOrder);

// Payment routes
router.post(
  "/payments-create",
  middlewares,
  RoleBasedAccess("admin", "editor"),
  PaymentController.paymentCreate
);

// Inventory transaction routes
router.post(
  "/inventory-create",
  middlewares,
  RoleBasedAccess("admin", "editor"),
  InventoryTransactionController.addInventoryTransaction
);

//! Backup routes
router.get(
  "/export-data",
  middlewares,
  RoleBasedAccess("admin"),
  BackupController.exportData
);
router.post(
  "/import-data",
  middlewares,
  RoleBasedAccess("admin"),
  upload.single("file"),
  BackupController.importData
);

module.exports = router;
