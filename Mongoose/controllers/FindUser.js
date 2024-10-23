// Import the User model
const User = require("../models/User");

// Define the FindUser controller function
const FindUser = async (req, res) => {
  try {
    // Find a user with the name "Abhi5" and age greater than 10
    const user = await User.where("name")
      .equals("Abhi5")
      .where("age")
      .gt(10)
      .limit(1) // Limit the result to 1 user
      .select("_id"); // Select only the _id field

    // If a user is found, update their age to 18 and save the changes
    if (user.length > 0) {
      user[0].age = 18;
      await user[0].save();
    }

    // Send the user data in the response, or "User not found" if no user is found
    res.status(200).json({ user: user.length > 0 ? user : "User not found" });
    console.log("User found");
  } catch (error) {
    // Handle any errors that occur during the process
    throw new Error({ msg: error.message });
  }
};

// Export the FindUser controller function
module.exports = FindUser;
