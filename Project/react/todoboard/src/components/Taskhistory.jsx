import React, { useContext } from "react";
import { TaskContext } from "./TasksContext";
import "./Taskhistory.css";

const ShowTask = ({ task }) => {
  const { updateTask, removeTask, dayTheme } = useContext(TaskContext);

  const taskStyle = {
    border: dayTheme ? "0.25rem solid #000" : "0.25rem solid #fff",
    padding: "1rem",
    margin: "10px 8px 10px auto",
  };

  const handleUpdate = () => {
    const newTitle = prompt("Enter new title:", task.title);
    if (newTitle && newTitle !== task.title) {
      const updatedTask = { ...task, title: newTitle };
      updateTask(updatedTask, task.id);
    }
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      removeTask(task.id);
    }
  };

  return (
    <div className="show-task" style={taskStyle}>
      <div>
        <p>
          <strong>Title:</strong> {task.title}
        </p>
        <p>
          <strong>Status:</strong> {task.status}
        </p>
        <p>
          <strong>Category:</strong> {task.category}
        </p>
        <p>
          <strong>Tags:</strong> {task.tags.join(", ")}
        </p>
        <p>
          <strong>Date:</strong> {task.date}
        </p>
      </div>
      <div className="buttons">
        <button onClick={handleUpdate}>Update</button>
        <button onClick={handleDelete}>Delete</button>
      </div>
    </div>
  );
};

const TaskHistory = () => {
  const { tasks, dayTheme } = useContext(TaskContext);

  const historyStyle = {
    backgroundColor: dayTheme ? "#ffffff" : "#000000",
    color: dayTheme ? "#000000" : "#ffffff",
    minHeight: "100vh",
    padding: "1rem",
  };

  return (
    <div className="task-history" style={historyStyle}>
      <h3 className="task-history-title">Task History</h3>
      {tasks.length > 0 ? (
        tasks.map((task) => <ShowTask key={task.id} task={task} />)
      ) : (
        <h3>No Task Added</h3>
      )}
    </div>
  );
};

export default TaskHistory;
