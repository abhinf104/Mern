// Import the express module
const express = require("express");
// Create a new router object
const router = express.Router();
// Import the CreateUser controller
const Login = require("../controllers/loginController");

// Define a POST route for creating a user
router.route("/api/login").get(Login);

// Export the router object to be used in other parts of the application
module.exports = router;
