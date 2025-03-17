const express = require("express");
const router = express.Router();
const registerStore = require("../controllers/registerStoreController.js");
const editStore = require("../controllers/editStoreController.js");
router.route("/register").post(registerStore);
router.route("/edit").put(editStore);

module.exports = router;
