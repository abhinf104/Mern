const { StatusCodes } = require("http-status-codes");

// Middleware function to handle requests to non-existent routes
const notFound = (req, res) => {
  // Send a 404 Not Found status code and a message indicating the route does not exist
  res.send(StatusCodes.NOT_FOUND, "Route does not exist");
};

// Export the notFound middleware function for use in other parts of the application
module.exports = notFound;
