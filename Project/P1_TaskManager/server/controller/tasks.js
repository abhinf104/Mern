const Task = require("../models/Task");
const asyncWrapper = require("../middleware/async");

// Function to get all tasks
const getTasks = asyncWrapper(async (req, res) => {
  const tasks = await Task.find({});
  res.status(200).json(tasks);
});

// Function to create a new task
const postTasks = asyncWrapper(async (req, res) => {
  const newTask = await Task.create(req.body);
  res.status(201).json(newTask);
});

// Function to get a single task
const getId = asyncWrapper(async (req, res) => {
  const task = await Task.findById({ _id: req.params.id });
  res.status(200).json(task);
});

// Function to update a single task
const patchId = asyncWrapper(async (req, res) => {
  const { id } = req.params;
  // efficiently finding and updating atomically a single task
  const task = await Task.findByIdAndUpdate({ _id: id }, req.body, {
    new: true, // return updated document
    runValidators: true, // update operation is schema validation rules
  });
  if (!task) {
    return res.status(404).json({ message: "No task with id: ${id} found" });
  }
  res.status(200).json(task);
});

// Function to delete a single task
const deleteId = asyncWrapper(async (req, res) => {
  const id = req.params.id;
  //delete a single task
  const task = await Task.findOneAndDelete({ _id: id });
  if (!task) {
    return res.status(404).json({ message: "No task with id: ${id} found" });
  }
  console.log("Delete Successfully at /:id");
  res.status(200).json(task);
});

module.exports = {
  getTasks,
  postTasks,
  getId,
  patchId,
  deleteId,
};
