const jwt = require("jsonwebtoken");
require("dotenv").config();

const authUser = async (req, res, next) => {
  const { headerData } = req.headers;
  console.log(`from auth middleware ${headerData}`);
  // if (!headerData) {
  //   throw Error("Authorization token required");
  // }

  // const token = await headerData.split(" ")[1];
  // try {
  //   const { _id } = await jwt.verify(token, process.env.JWT_SECRET);
  //   req.user = await User.findOne({ _id }).select("_id");
  //   next();
  // } catch (err) {
  //   res.status(401).json({ Error: err.message });
  // }
};

module.exports = authUser;
