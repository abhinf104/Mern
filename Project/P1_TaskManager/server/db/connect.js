// Import the mongoose library for MongoDB interaction
const mongoose = require("mongoose");

// Function to connect to MongoDB
const connectDB = (url) => {
  // Attempt to connect to the MongoDB database with the provided URL and options
  return mongoose
    .connect(url, {
      useNewUrlParser: true, // Use the new URL parser
      useUnifiedTopology: true, // Use the new Server Discover and Monitoring engine
      useCreateIndex: true, // Use the new index creation mechanism
      useFindAndModify: false, // Use the new findOneAndUpdate() instead of findAndModify()
    })
    .then(() => console.log("Connected to MongoDB")) // Log success message if connected
    .catch((err) => console.log(err)); // Log error message if connection fails
};

// Export the connectDB function for use in other files
module.exports = connectDB;
