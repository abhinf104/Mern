// Avoid using repeating try-catch block for every async function
// We can wrap all async functions in this middleware

// Define a function that takes another function (fn) as an argument
const asyncWrapper = (fn) => {
  // Return a new asynchronous function
  return async (req, res, next) => {
    try {
      // Await the execution of the passed function with req, res, and next as arguments
      await fn(req, res, next);
    } catch (error) {
      // If an error occurs, pass it to the next middleware (error handler)
      next(error);
    }
  };
};

// Export the asyncWrapper function for use in other files
module.exports = asyncWrapper;
