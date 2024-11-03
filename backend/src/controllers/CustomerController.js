const CustomersModel = require("../models/CustomersModel");

// Add new customer
exports.addCustomer = async (req, res) => {
  try {
    const { name, email, phone, address } = req.body;
    const newCustomer = await CustomersModel.create({
      name,
      email,
      phone,
      address,
    });
    res.status(201).json({ success: true, data: newCustomer });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};
