const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const DataSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["admin", "editor", "employee"], // only allow these roles
      default: "employee",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// Middleware to hash the password before saving
DataSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next(); // only hash if password is new or changed

  try {
    const salt = await bcrypt.genSalt(10); // generate salt
    this.password = await bcrypt.hash(this.password, salt); // hash the password with the salt
    next();
  } catch (error) {
    next(error);
  }
});

// Method to compare entered password with stored password
DataSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const UserModel = mongoose.model("user", DataSchema);

module.exports = UserModel;
