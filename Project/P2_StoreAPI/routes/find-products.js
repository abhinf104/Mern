const express = require("express");
const router = express.Router();
const FindProducts = require("../controller/get-products");

router.route("/").get(FindProducts);

module.exports = router;
