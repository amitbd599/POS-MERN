const mongoose = require("mongoose");
const DataSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
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

const CategoriesModel = mongoose.model("Categories", DataSchema);

module.exports = CategoriesModel;
