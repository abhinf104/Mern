// Import the express module
const express = require("express");

// Create a new router object
const router = express.Router();

// Destructure the task controller functions from the tasks module
const {
  getTasks,
  postTasks,
  getId,
  patchId,
  deleteId,
} = require("../controller/tasks");

// Define the route for getting and posting tasks
router.route("/").get(getTasks).post(postTasks);

// Define the route for getting, updating, and deleting a task by ID
router.route("/:id").get(getId).patch(patchId).delete(deleteId);

// Export the router object to be used in other parts of the application
module.exports = router;
