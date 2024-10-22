// Built-in error handling class-- change name("Error"-default), message, status code
class CustomAPIError extends Error {
  constructor(statusCode, message) {
    super(message); // Call the parent class constructor with the message
    this.statusCode = statusCode; // Set the status code property
  }
}

// Function to create a custom error message
const createCustomMessage = (statusCode, message) => {
  const customError = new CustomAPIError(statusCode, message); // Create a new instance of CustomAPIError
  return customError; // Return the custom error instance
};

// Export the CustomAPIError class and createCustomMessage function for use in other files
module.exports = { CustomAPIError, createCustomMessage };
