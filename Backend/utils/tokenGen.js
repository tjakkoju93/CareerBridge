const jwt = require("jsonwebtoken");
require("dotenv").config();

const generateToken = (_id,role) => {//change made
    return  (jwt.sign({ _id,role }, process.env.JWT_SECRET, {
    expiresIn: "3d"
  }));
  
  
};

module.exports = generateToken;