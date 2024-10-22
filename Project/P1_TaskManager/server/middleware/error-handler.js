//creating error handling middleware--> catch and process error

// Import the CustomAPIError class and createCustomMessage function from the customError module
const {
  CustomAPIError,
  createCustomMessage,
} = require("../errors/customError");

// Error handling middleware function to catch and process errors
const errorHandler = (err, req, res, next) => {
  // Check if the error is an instance of CustomAPIError
  if (err instanceof CustomAPIError) {
    // If it is, send a response with the custom status code and message
    res.status(err.statusCode).json({ msg: err.message });
  } else {
    // If it is not, send a generic 500 status code and message
    res.status(500).json({ msg: "Something went wrong" });
  }
};

// Export the errorHandler function for use in other files
module.exports = {
  errorHandler,
};
