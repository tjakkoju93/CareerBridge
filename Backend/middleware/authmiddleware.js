const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../model/userModel");
const Jobs = require("../model/jobModel");

const authUser = (expectedRole) => {
  return async (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization) {
      return res.status(401).json({ Error: "Authorization token required" });
    }
    const token = await authorization.split(" ")[1];
    if (!token) {
      return res.status(401).json({ Error: "Bearer token is invalid" });
    }
    try {
      const { _id, role } = await jwt.verify(token, process.env.JWT_SECRET);
      
      const user = await User.findOne({ _id, role }).select("_id role");

      if (!user) {
        return res
          .status(401)
          .json({ error: "User not found or role mismatch" });
      }
      if (expectedRole && role !== expectedRole) {
        return res
          .status(403)
          .json({ error: "Access denied: Insufficient role" });
      }
      req.user = user;
      next();
    } catch (err) {
      return res.status(401).json({ Error: err.message });
    }
  };
};

module.exports = authUser;
