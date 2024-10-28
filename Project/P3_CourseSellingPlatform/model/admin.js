const mongoose = require("mongoose");

const AdminSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Username is must "],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  courseId: {
    type: [mongoose.SchemaTypes.ObjectId],
    ref: "course",
  },
});
const Admin = mongoose.model("admin", AdminSchema);

module.exports = Admin;
