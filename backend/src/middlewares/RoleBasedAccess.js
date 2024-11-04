const { DecodeToken } = require("../utility/TokenHelper");


let authorize = (...requiredRole) => {
  return (req, res, next) => {
    token = req.cookies["Token"];
    let decoded = DecodeToken(token);

    if (decoded === null) {
      return res.status(401).json({
        status: 401,
        message: "Invalid Token",
      });
    } else {
      let role = decoded["role"];
      // Check if the user's role is in the allowedRoles array

      if (!requiredRole.includes(role)) {
        return res
          .status(403)
          .json({ success: false, message: "Access denied" });
      } else {
        next();
      }
    }
  };
};

module.exports = authorize;
