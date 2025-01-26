const express = require("express");
const router = express.Router();
const UserController = require("../controllers/UserController.js");
const ProductController = require("../controllers/ProductController.js");
const OrderController = require("../controllers/OrderController.js");
const PaymentController = require("../controllers/PaymentController.js");
const CustomerController = require("../controllers/CustomerController.js");
const ExpensesController = require("../controllers/ExpensesController.js");
const CategoriesController = require("../controllers/CategoriesController.js");
const BackupController = require("../controllers/BackupController.js");
const DashboardController = require("../controllers/DashboardController.js");
const FileUploadController = require("../controllers/FileUploadController.js");
const middlewares = require("../middlewares/AuthVerification.js");
const RoleBasedAccess = require("../middlewares/RoleBasedAccess.js");
const { uploadJSON } = require("../middlewares/UploadMiddleware.js");
const uploadFile = require("../middlewares/FileUploads.js");

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
  RoleBasedAccess("admin"),
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
router.get("/verify-auth", middlewares, UserController.verifyAuth);
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

router.get(
  "/read-customer-by-id/:id",
  middlewares,
  CustomerController.customerReadByID
);

router.post(
  "/update-customer/:id",
  middlewares,
  RoleBasedAccess("admin", "editor"),
  CustomerController.updateCustomer
);
router.delete(
  "/delete-customer/:id",
  middlewares,
  RoleBasedAccess("admin", "editor"),
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
router.get(
  "/read-product-by-id/:id",
  middlewares,
  ProductController.productReadByID
);
router.delete(
  "/delete-product/:id",
  middlewares,
  RoleBasedAccess("admin", "editor"),
  ProductController.deleteProduct
);

//! categories
router.post(
  "/create-categories",
  middlewares,
  RoleBasedAccess("admin", "editor"),
  CategoriesController.createCategories
);
router.get("/all-categories", middlewares, CategoriesController.getCategories);
router.get(
  "/read-categories-by-id/:id",
  middlewares,
  CategoriesController.categoriesReadByID
);
router.post(
  "/update-categories/:id",
  middlewares,
  RoleBasedAccess("admin", "editor"),
  CategoriesController.updateCategories
);
router.delete(
  "/delete-categories/:id",
  middlewares,
  RoleBasedAccess("admin", "editor"),
  CategoriesController.deleteCategories
);

//! Expenses routes
router.post(
  "/create-expenses",
  middlewares,
  RoleBasedAccess("admin", "editor"),
  ExpensesController.createExpenses
);
router.get(
  "/all-expenses/:item/:pageNo",
  middlewares,
  ExpensesController.getExpenses
);
router.get(
  "/all-expenses-report",
  // middlewares,
  ExpensesController.getExpensesReportCSV
);

//! Order routes
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
router.get("/read-order-by-id/:id", middlewares, OrderController.orderReadByID);

//! Payment routes
router.post(
  "/payments-create",
  middlewares,
  RoleBasedAccess("admin", "editor"),
  PaymentController.paymentCreate
);

//! dashboard data
router.get(
  "/dashboard-data",
  middlewares,
  DashboardController.getDashboardData
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
  uploadJSON.single("file"),
  BackupController.importData
);

//! file routes
router.post(
  "/file-upload",
  middlewares,
  uploadFile.array("file", 20),
  FileUploadController.fileUpload
);

module.exports = router;
