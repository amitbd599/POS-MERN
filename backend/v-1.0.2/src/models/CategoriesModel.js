const mongoose = require("mongoose");
const DataSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const CategoriesModel = mongoose.model("categories", DataSchema);

module.exports = CategoriesModel;
