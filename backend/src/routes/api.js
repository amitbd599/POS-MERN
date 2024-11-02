const express = require("express");
const router = express.Router();
const UserController = require("../controllers/UserController.js");
const ProductController = require("../controllers/ProductController.js");
const OrderController = require("../controllers/OrderController.js");
const middlewares = require("../middlewares/AuthVerification.js");

// Register a new user
router.post("/register-profile", UserController.register);
router.post("/login-profile", UserController.login);
router.post("/update-profile", middlewares, UserController.user_update);
router.get("/read-profile", middlewares, UserController.user_read);
router.get("/logout-profile", UserController.logout);

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
router.post('/orders-status', OrderController.updateOrderStatus);

module.exports = router;
