//  Seller mongoose model
const Seller = require("../models/sellerModel");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

const findSellerById = async (seller, password) => {
  try {
    const sellerInfo = await Seller.findOne({ seller, password });
    return sellerInfo;
  } catch (err) {
    console.log("Error finding seller:", err);
    return null;
  }
};

const Login = async (req, res) => {
  // Validate request body
  const { seller, password } = req.body;
  console.log("seller:", seller, "& password:", password);

  //fetching seller details
  const sellerInfo = await findSellerById(seller, password);
  console.log(sellerInfo);
  if (!sellerInfo) {
    return res.status(401).json({ message: "Invalid credentials" });
  } else {
    const { _id } = sellerInfo;
    const token = jwt.sign({ seller }, JWT_SECRET_KEY);
    console.log("Token:", token);
    console.log("Seller LoggedIn");

    // Return the response with token and sellerId
    return res.status(200).json({
      _id,
      seller,
      token,
      message: "Login successful",
    });
  }
};

// Export the Login controller function
module.exports = Login;
