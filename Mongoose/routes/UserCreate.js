// Import the express module
const express = require("express");
// Create a new router object
const router = express.Router();
// Import the CreateUser controller
const CreateUser = require("../controllers/CreateUser");
// Import the FindUser controller
const FindUser = require("../controllers/FindUser");

// Define a POST route for creating a user
router.route("/create").post(CreateUser);
// Define a GET route for finding a user
router.route("/find").get(FindUser);

// Export the router object to be used in other parts of the application
module.exports = router;
