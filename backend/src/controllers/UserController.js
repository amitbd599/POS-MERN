let md5 = require("md5");
const UserModel = require("../models/UserModel");
const { EncodeToken } = require("../utility/TokenHelper");
const EmailSend = require("../utility/EmailSend");

//! Create user
exports.register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    let user = await UserModel.findOne({ email });

    if (user) {
      return res
        .status(400)
        .json({ status: "error", msg: "email already exist" });
    }

    // Create and save the new user
    user = await UserModel.create({ name, email, password, role });
    res.status(201).json({
      status: "success",
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (e) {
    res.status(500).json({ status: "error", error: e.toString() });
  }
};

//! User Login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email });
    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "User not found" });

    // Compare password
    const isMatch = await user.comparePassword(password);
    if (!isMatch)
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });

    console.log(isMatch);

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
    res.status(200).json({ status: "error", error: e.toString() });
  }
};

//! Update user
exports.profile_update = async (req, res) => {
  let email = req.headers.email;
  let password = md5(req.body.password);
  let confirm_password = md5(req.body.confirm_password);
  let phone = req.body.phone;
  let firstName = req.body.firstName;
  let lastName = req.body.lastName;
  let img = req.body.img;
  try {
    let UserCount = await UserModel.aggregate([
      { $match: { email, password } },
    ]);

    if (UserCount.length > 0) {
      //Create OTP
      let data = await UserModel.updateOne(
        { email: email },
        {
          $set: {
            password: confirm_password,
            confirm_password: confirm_password,
            firstName: firstName,
            lastName: lastName,
            phone: phone,
            img: img,
          },
        }
      );

      res.status(200).json({ status: "success", data: data });
    } else {
      res
        .status(200)
        .json({ status: "error", data: "Email / password not match!" });
    }
  } catch (e) {
    res.status(200).json({ status: "error", data: e.toString() });
  }
};

//! get User
exports.profile_read = async (req, res) => {
  let email = req.headers.email;
  try {
    let MatchStage = {
      $match: {
        email,
      },
    };

    let project = {
      $project: {
        email: 1,
        firstName: 1,
        lastName: 1,
        img: 1,
        phone: 1,
      },
    };
    let data = await UserModel.aggregate([MatchStage, project]);
    res.status(200).json({ status: "success", data: data[0] });
  } catch (e) {
    res.status(200).json({ status: "error", error: e.toString() });
  }
};

//! user Logout
exports.logout = async (req, res) => {
  try {
    res.clearCookie("Token");
    res.status(200).json({ status: "success" });
  } catch (e) {
    res.status(200).json({ status: "error", error: e.toString() });
  }
};

//! user verify
exports.EmailVerifyData = async (req, res) => {
  try {
    res.status(200).json({ status: "success" });
  } catch (e) {
    res.status(200).json({ status: "error", error: e.toString() });
  }
};

//! Recover Verify Email

exports.RecoverVerifyEmail = async (req, res) => {
  let email = req.params.email;
  let otp = Math.floor(100000 + Math.random() * 900000);

  try {
    // Email Account Query
    let UserCount = await UserModel.aggregate([
      { $match: { email: email } },
      { $count: "total" },
    ]);

    if (UserCount.length > 0) {
      //Create OTP
      let CreateOTP = await OTPModel.updateOne(
        { email: email },
        {
          otp,
          status: 0,
        },
        { upsert: true, new: true }
      );
      // Send Email
      let SendEmail = await EmailSend(
        email,
        "Your PIN Code is =" + otp,
        "Task Manager PIN Verification"
      );

      res.status(200).json({ status: "success", data: SendEmail });
    } else {
      res.status(200).json({ status: "error", data: "No User Found" });
    }
  } catch (e) {
    res.status(200).json({ status: "error", data: e.toString() });
  }
};

//! Recover Verify OTP
exports.RecoverVerifyOTP = async (req, res) => {
  let email = req.params.email;
  let otp = req.params.otp;
  otp = parseInt(otp);
  try {
    let OTPCount = await OTPModel.aggregate([
      { $match: { email, otp, status: 0 } },
      { $count: "total" },
    ]);

    if (OTPCount.length > 0) {
      let OTPUpdate = await OTPModel.updateOne(
        {
          email,
          otp,
          status: 0,
        },
        {
          otp,
          status: 1,
        }
      );
      res.status(200).json({ status: "success", data: OTPUpdate });
    } else {
      res.status(200).json({ status: "error", data: "Invalid OTP Code" });
    }
  } catch (e) {
    res.status(200).json({ status: "error", data: e });
  }
};

//! Reset Password

exports.ResetPassword = async (req, res) => {
  let email = req.params.email;
  let otp = req.params.otp;
  otp = parseInt(otp);
  let reqBody = req.body;
  reqBody.password = md5(req.body.password);
  try {
    let OTPUsedCount = await OTPModel.aggregate([
      { $match: { email, otp, status: 1 } },
      { $count: "total" },
    ]);
    if (OTPUsedCount.length > 0) {
      let PassUpdate = await UserModel.updateOne(reqBody);
      res.status(200).json({ status: "success", data: PassUpdate });
    } else {
      res.status(200).json({ status: "error", data: "Something is Wrong!" });
    }
  } catch (e) {
    res.status(200).json({ status: "error", data: e.toString() });
  }
};
