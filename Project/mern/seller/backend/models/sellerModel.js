const mongoose = require("mongoose");

const sellerSchema = new mongoose.Schema({
  seller: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Seller = mongoose.model("sellers", sellerSchema);

module.exports = Seller;
