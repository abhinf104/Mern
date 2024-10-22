// Import the mongoose library for MongoDB interaction
const mongoose = require("mongoose");

// Destructure Schema and model from mongoose
const { Schema, model } = mongoose;

// Define the schema for the Task model
const TaskSchema = new Schema({
  // Define the 'name' field with validation rules
  name: {
    type: String, // The type of the field is String
    required: [true, "Name is required"], // The field is required with a custom error message
    trim: true, // Trim whitespace from the value
    maxlength: [20, "Name can not be more than 20 characters"], // Maximum length validation with a custom error message
  },
  // Define the 'isCompleted' field with a default value
  isCompleted: {
    type: Boolean, // The type of the field is Boolean
    default: false, // Default value is false
  },
});

// Export the Task model for use in other files
// 'Task' is the name of the collection in the database
module.exports = model("Task", TaskSchema);
