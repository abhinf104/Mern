const mongoose = require("mongoose");
const courseSchema = mongoose.Schema({
  title: { type: String, required: [true, "Title is must"], unique: true },
  description: { type: String, required: "Description is required" },
  price: Number,
  imageId: String,
  isPublished: Boolean,
});

const Course = mongoose.model("course", courseSchema);
module.exports = Course;
