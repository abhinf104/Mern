// Import the User moongoose model
const User = require("../models/User");

// Define the CreateUser controller function
const CreateUser = async (req, res) => {
  try {
    // Create a new user with the data from the request body
    const user = await User.create(req.body);

    // Set the createdAt field to the current date and time
    user.createdAt = Date.now();

    // Send a response with status 201 (Created) and the created user data
    res.status(201).json({ user });
    console.log("User created");
  } catch (error) {
    // Handle any errors that occur during the process
    res.status(500).json({ msg: error.message });
  }
};

// Export the CreateUser controller function
module.exports = CreateUser;
