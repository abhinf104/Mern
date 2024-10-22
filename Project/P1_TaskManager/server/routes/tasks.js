const express = require("express");
const router = express.Router();
const {
  getTasks,
  postTasks,
  getId,
  patchId,
  deleteId,
} = require("../controller/tasks");

router.route("/").get(getTasks).post(postTasks);

router.route("/:id").get(getId).patch(patchId).delete(deleteId);

module.exports = router;
