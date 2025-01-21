const mongoose = require("mongoose");
const DataSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    number: { type: String, unique: true },
    address: { type: String },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const CustomersModel = mongoose.model("customers", DataSchema);

module.exports = CustomersModel;
