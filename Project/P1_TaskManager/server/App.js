const express = require("express");
const app = express();
const tasks = require("./routes/tasks");
const connectDB = require("./db/connect");
require("dotenv").config();
const { errorHandler } = require("./middleware/error-handler");

const PORT = process.env.PORT || 3000;

// Middlewares
app.use(express.static("./public")); // Serve static files from the "public" directory
app.use(express.urlencoded({ extended: false })); // Parse URL-encoded data
app.use(express.json()); // Parse JSON data

// Routes
app.use("/tasks", tasks); // Use the tasks routes for the /api/v1/tasks endpoint

// Root route
app.get("/", (req, res) => {
  res.send("Go to /tasks"); // Send a simple message for the root route
});

// Error handling middleware
app.use(errorHandler); // Use the custom error handler middleware

// Start the server
const start = async () => {
  try {
    // Connect to the database
    await connectDB(process.env.MONGO_URI);
    // Start listening on the specified port
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (error) {
    // Log any errors that occur during startup
    console.error(error);
  }
};

// Invoke the start function to run the server
start();
