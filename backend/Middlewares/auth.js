const jwt = require("jsonwebtoken");

const Authenticate = (req, res, next) => {
  try {
    const token = req.headers["authorization"];
    if (!token) {
      return res
        .status(403)
        .json({ message: "Unauthorized, JWT token is missing" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res
      .status(403)
      .json({ message: "Unauthorized, JWT token is missing" });
  }
};

module.exports = Authenticate;
