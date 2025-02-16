const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const UserModel = require("../models/UserModel");
const { EncodeToken } = require("../utility/TokenHelper");
const ObjectId = mongoose.Types.ObjectId;
//! Create user
exports.register = async (req, res) => {
  try {
    const { name, email, password, role, number, img } = req.body;

    // Create and save the new user
    user = await UserModel.create({ name, email, password, role, number, img });
    res.status(200).json({
      success: true,
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        number: user.number,
      },
      message: "User created successfully",
    });
  } catch (error) {
    if (error.code === 11000) {
      if (error?.keyPattern?.email) {
        res.status(200).json({
          success: false,
          message: "Email already exists!",
        });
      } else if (error?.keyPattern?.number) {
        res.status(200).json({
          success: false,
          message: "Phone number already exists!",
        });
      }
    } else {
      res.status(200).json({ success: false, error: error.toString() });
    }
  }
};

//! User Login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email });
    if (!user)
      return res
        .status(200)
        .json({ success: false, message: "User not found" });

    // Compare password
    const isMatch = await user.comparePassword(password);
    if (!isMatch)
      return res
        .status(200)
        .json({ success: false, message: "Invalid credentials" });

    if (isMatch) {
      let token = EncodeToken(user.email, user._id, user.role);

      let options = {
        maxAge: process.env.Cookie_Expire_Time,
        httpOnly: true,
        sameSite: "none",
        secure: true,
      };

      // Set cookie
      res.cookie("Token", token, options);
      res.status(200).json({
        success: true,
        message: "Login successful",
        user: {
          id: user._id,
          email: user.email,
          name: user.name,
          role: user.role,
        },
        token: token,
      });
    }
  } catch (e) {
    res.status(200).json({ success: false, error: e.toString() });
  }
};

//! Update user
exports.userUpdate = async (req, res) => {
  try {
    let email = req.headers.email;
    const { name, password, img, number } = req.body;
    const user = await UserModel.findOne({ email });
    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "User not found" });

    // Generate a salt and hash the new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    if (!!user === true) {
      let data = await UserModel.updateOne(
        { email: email },
        {
          $set: {
            name,
            password: hashedPassword,
            img,
            number,
          },
        }
      );

      res.status(200).json({
        success: true,
        data: data,
        message: "Profile update successful.",
      });
    } else {
      res
        .status(200)
        .json({ success: false, message: "Email / password not match!" });
    }
  } catch (error) {
    if (error.code === 11000) {
      if (error?.keyPattern?.email) {
        res.status(200).json({
          success: false,
          message: "Email already exists!",
        });
      } else if (error?.keyPattern?.number) {
        res.status(200).json({
          success: false,
          message: "Phone number already exists!",
        });
      }
    } else {
      res.status(200).json({ success: false, error: error.toString() });
    }
  }
};

//! Update user by id
exports.userUpdateById = async (req, res) => {
  try {
    const id = new ObjectId(req.params.id);
    const { role } = req.body;
    const user = await UserModel.findOne({ _id: id });

    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "User not found" });

    if (!!user === true) {
      let data = await UserModel.updateOne(
        { _id: id },
        {
          $set: {
            role,
          },
        }
      );

      res.status(200).json({
        success: true,
        data: data,
        message: "User role update successful.",
      });
    } else {
      res
        .status(200)
        .json({ success: false, message: "User role update unsuccessful." });
    }
  } catch (e) {
    res.status(200).json({ success: false, data: e.toString() });
  }
};

//! get User
exports.userRead = async (req, res) => {
  try {
    let email = req.headers.email;
    let MatchStage = {
      $match: {
        email,
      },
    };

    let project = {
      $project: {
        password: 0,
      },
    };
    let data = await UserModel.aggregate([MatchStage, project]);
    res.status(200).json({ success: true, data: data[0] });
  } catch (e) {
    res.status(200).json({ success: false, error: e.toString() });
  }
};

//! get User id
exports.userReadByID = async (req, res) => {
  try {
    const id = new ObjectId(req.params.id);
    let MatchStage = {
      $match: {
        _id: id,
      },
    };

    let project = {
      $project: {
        email: 1,
        name: 1,
        role: 1,
        img: 1,
      },
    };
    let data = await UserModel.aggregate([MatchStage, project]);
    res.status(200).json({ success: true, data: data[0] });
  } catch (e) {
    res.status(200).json({ success: false, error: e.toString() });
  }
};

//! Get all User
exports.getAllUser = async (req, res) => {
  try {
    const limit = parseInt(req.params.item); // Number of items per page
    const pageNo = parseInt(req.params.pageNo); // Current page number

    if (isNaN(limit) || isNaN(pageNo)) {
      return res.status(200).json({ message: "Invalid parameters" });
    }

    const skip = (pageNo - 1) * limit;

    const facet = {
      $facet: {
        users: [
          { $skip: skip },
          { $limit: limit },
          {
            $project: {
              name: 1,
              email: 1,
              role: 1,
              img: 1,
              number: 1,
              createdAt: 1,
            },
          },
        ],
        totalCount: [{ $count: "count" }],
      },
    };

    const project = {
      $project: {
        users: 1,
        totalCount: { $arrayElemAt: ["$totalCount.count", 0] },
      },
    };

    const result = await UserModel.aggregate([facet, project]);
    res.status(200).json({ success: true, data: result[0] });
  } catch (error) {
    res.status(200).json({ success: false, error: error.message });
  }
};

//! user Logout
exports.logout = async (req, res) => {
  try {
    res.clearCookie("Token");
    res.status(200).json({ success: true, message: "Logout success!" });
  } catch (e) {
    res.status(200).json({ success: false, error: e.toString() });
  }
};

//! delete user
exports.deleteUser = async (req, res) => {
  try {
    const id = new ObjectId(req.params.id);
    const result = await UserModel.deleteOne({ _id: id });

    if (result?.deletedCount === 1) {
      res.status(200).json({
        success: true,
        data: result,
        message: "User delete successful!",
      });
    } else {
      res.status(200).json({ success: false, message: "User not found!" });
    }
  } catch (error) {
    res.status(200).json({ success: false, error: error.message });
  }
};
