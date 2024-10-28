// Import mongoose library
const mongoose = require("mongoose");

// Define the User schema
const UserSchema = new mongoose.Schema(
  {
    name: String, // Name of the user
    age: {
      type: Number, // Age of the user
      min: 14, // Minimum age is 14
      // Validator to ensure age is an even number
      validate: {
        validator: (v) => v % 2 === 0,
        message: (props) => `Age = ${props.value} must be an even number`,
      },
    },
    email: {
      type: String, // Email of the user
      // unique: true, // Uncomment to enforce unique email
      required: [true, "Email is must "], // Uncomment to make email required
      lowercase: true, // Convert email to lowercase
    },
    password: mongoose.Schema({
      type: String, // Password of the user
    }),
    createdAt: {
      type: Date, // Date when the user was created
      immutable: true, // Prevent modification of this field
      default: Date.now(), // Default value is the current date
    },
    bestFriend: {
      type: mongoose.SchemaTypes.ObjectId, // Reference to another user
      ref: "User", // Reference to the User model
    },
    friends: [mongoose.SchemaTypes.ObjectId], // Array of ObjectIds referencing other users
    hobbies: [String], // Array of strings representing hobbies
    address: mongoose.Schema({
      city: String, // City in the address
      state: String, // State in the address
    }),
    continent: {
      type: String,
      enum: {
        values: [
          "Asia",
          "Europe",
          "North America",
          "South America",
          "Africa",
          "Antarctica",
          "Australia",
        ],
        message: "{VALUE} is not supported",
      },
    },
  },
  {
    validateBeforeSave: false, // Disable automatic validation before save
  }
);

// Middlewares -- pre and post
UserSchema.pre("save", function (next) {
  console.log("Middleware started before Saving ", this.name, this.age);
  this.name = this.name.toUpperCase(); // Convert name to uppercase
  console.log("Age before modification: ", this.age);
  this.age = this.age % 2 === 1 ? this.age + 1 : this.age; // Ensure age is even
  console.log("Age after modification: ", this.age);
  console.log("After Saving ", this.name, this.age);
  next();
});

UserSchema.post("save", function (doc, next) {
  // Middleware executed after saving the document
  console.log(doc);
  next();
});

// Method to greet the user
UserSchema.methods.greet = function () {
  console.log(`Hello ${this.name}`);
};

// Query helper to find users by name (case-insensitive)
UserSchema.query.byName = function (name) {
  return this.where({ name: new RegExp(name, "i") });
};

// Method to find users with similar names
UserSchema.methods.findSimilarName = function (name) {
  console.log("Finding similar names for ", this.name);
  return mongoose.model("User").where({ name: new RegExp(name, "i") }); // Case-insensitive search
};

// Create the User model from the schema
const User = mongoose.model("User", UserSchema);

// Export the User model
module.exports = User;
