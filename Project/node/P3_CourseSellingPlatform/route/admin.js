const express = require("express");
const adminRouter = express.Router();

adminRouter.route("/signin").get((req, res) => {
  console.log("signin is working");
});

adminRouter
  .route("/create")
  .post((req, res) => {
    console.log("create course is working");
  })
  .get((req, res) => {
    console.log("All course of admin");
  });

module.exports = adminRouter;
