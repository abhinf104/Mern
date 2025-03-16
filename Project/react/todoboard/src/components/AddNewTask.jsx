import React, { useState, useContext } from "react";
import { TaskContext } from "./TasksContext";
import "./AddNewTask.css";

const AddNewTask = () => {
  const { tasks, dayTheme, addTask, deleteAll } = useContext(TaskContext);
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState("");
  const [date, setDate] = useState("");

  const bgColor = dayTheme ? "#fff" : "#000";
  const txtColor = dayTheme ? "#000" : "#fff";

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTask = {
      id: Math.random(),
      title,
      status,
      category,
      tags: tags.split(",").map((tag) => tag.trim()),
      date,
    };
    addTask(newTask);
    setTitle("");
    setStatus("");
    setCategory("");
    setTags("");
    setDate("");
  };

  return (
    <div
      className="addNew"
      style={{
        backgroundColor: bgColor,
        color: txtColor,
        borderBlockColor: txtColor,
      }}
    >
      <h2>Add Task</h2>
      <form id="taskForm" onSubmit={handleSubmit}>
        <label htmlFor="title">Title:</label>
        <input
          type="textbox"
          id="title"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <hr />

        <label htmlFor="status">Status:</label>
        <select
          id="status"
          name="status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
        <hr />

        <label htmlFor="category">Category:</label>
        <select
          id="category"
          name="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="work">Work</option>
          <option value="study">Study</option>
          <option value="health">Health</option>
          <option value="diet">Diet</option>
        </select>
        <hr />

        <label htmlFor="tags">Tags (comma separated):</label>
        <input
          type="text"
          id="tags"
          name="tags"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />
        <hr />

        <label htmlFor="date">Date:</label>
        <input
          type="date"
          id="date"
          name="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <hr />

        <button type="submit">Add Task</button>
      </form>
      {tasks.length >= 1 ? (
        <button
          className="delete"
          onClick={() => {
            deleteAll();
          }}
        >
          Delete All Task
        </button>
      ) : (
        <button className="delete" disabled="disabled">
          Delete All Task
        </button>
      )}
    </div>
  );
};

export { AddNewTask };
