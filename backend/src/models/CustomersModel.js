const mongoose = require("mongoose");
const DataSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    phone: { type: String },
    address: { type: String },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const UserModel = mongoose.model("Customers", DataSchema);

module.exports = UserModel;
