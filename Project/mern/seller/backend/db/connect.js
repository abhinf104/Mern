// Import the mongoose library for MongoDB interactions
const mongoose = require("mongoose");

// Function to connect to the MongoDB database
const ConnectDB = async (url) => {
  try {
    // Attempt to connect to the MongoDB database with the provided URL
    await mongoose.connect(url, {
      useNewUrlParser: true, // Use the new URL parser
      useUnifiedTopology: true, // Use the new Server Discover and Monitoring engine
    });
    console.log("MongoDB connected"); // Log success message
  } catch (error) {
    // Log any errors that occur during connection
    console.error("Error connecting to MongoDB:", error.message);
    // Rethrow the error to be handled by the calling function
    throw error;
  }
};

// Export the ConnectDB function to be used in other parts of the application
module.exports = ConnectDB;
