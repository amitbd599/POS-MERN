const express = require("express");
const router = express.Router();
const userController = require('../controllers/UserController.js');

// Register a new user
router.post('/register', userController.register);

module.exports = router;
