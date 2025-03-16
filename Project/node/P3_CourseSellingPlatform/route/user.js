const express = require("express");
const userRouter = express.Router();

userRouter.route("/signup").post((req, res) => {
  console.log("user signup is working");
});

userRouter.route("/courses").get((req, res) => {
  console.log("list of all course");
});
userRouter.route("courses/:courseId").post((req, res) => {
  console.log("course purchased successfully");
});
userRouter.route("courses/purchased").post((req, res) => {
  console.log("list purchased course ");
});

module.exports = userRouter;
