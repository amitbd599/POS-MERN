const jwt = require("jsonwebtoken");

exports.EncodeToken = (email, id, role) => {
  let key = process.env.JWT_KEY;
  let expire = process.env.JWT_Expire_Time;
  let payload = { email, id, role };
  return jwt.sign(payload, key, { expiresIn: expire });
};
exports.DecodeToken = (token) => {
  try {
    let key = process.env.JWT_KEY;
    let decoded = jwt.verify(token, key);
    return decoded;
  } catch (err) {
    return null;
  }
};
