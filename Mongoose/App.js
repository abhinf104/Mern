// Import required modules
const express = require("express");
const app = express();
const User = require("./models/User"); // Import User model
const routes = require("./routes/UserCreate"); // Import routes for user creation
require("dotenv").config(); // Load environment variables from .env file
const ConnectDB = require("./db/connect"); // Import database connection function
const PORT = process.env.PORT || 3000; // Set the port from environment variable or default to 3000

app.use(express.static("./public"));
// Middleware to parse URL-encoded data
app.use(express.urlencoded({ extended: true }));
// Middleware to parse JSON data
app.use(express.json());

// Use imported routes for handling requests
app.use("", routes);

// Middleware to handle 404 errors (Route Not Found)
app.use(async (req, res) => {
  res.status(404).send("Route Not Found");
});

// Function to start the server
const start = async () => {
  try {
    // Connect to the database
    await ConnectDB(process.env.MONGO_URI);
    // Start the server and listen on the specified port
    app.listen(PORT, () => {
      console.log("Server is running on port http://localhost:", PORT);
    });
  } catch (error) {
    // Handle any errors that occur during server startup
    throw new Error({ msg: error.message });
  }
};

// Start the server
start();
