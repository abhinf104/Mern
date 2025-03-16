import { createContext, useState } from "react";

let initialTasks = [
  {
    id: 1,
    title: "Complete project report",
    status: "pending",
    category: "work",
    tags: ["urgent", "office"],
    date: "2025-03-11",
  },
  {
    id: 2,
    title: "Study for exams",
    status: "in-progress",
    category: "study",
    tags: ["important", "school"],
    date: "2025-03-12",
  },
  {
    id: 3,
    title: "Morning workout",
    status: "completed",
    category: "health",
    tags: ["fitness", "routine"],
    date: "2025-03-11",
  },
  {
    id: 4,
    title: "Grocery shopping",
    status: "pending",
    category: "diet",
    tags: ["food", "home"],
    date: "2025-03-13",
  },
  {
    id: 5,
    title: "Doctor appointment",
    status: "pending",
    category: "health",
    tags: ["checkup", "health"],
    date: "2025-03-14",
  },
];

const TaskContext = createContext();

const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState(initialTasks);
  const [dayTheme, setDayTheme] = useState(true);

  const addTask = (task) => {
    //console.log("Before Updating tasks:", tasks);
    //console.log("Adding task:", task);
    setTasks((prevTasks) => [task, ...prevTasks]);
    //console.log("Updated tasks:", tasks);
  };

  const removeTask = (id) => {
    //console.log("Removing task with id:", id);
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    //    console.log("Updated tasks:", tasks);
  };

  const updateTask = (updatedTask, id) => {
    //console.log("Updating task with id:", id, "to:", updatedTask);
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === id ? updatedTask : task))
    );
    // console.log("Updated tasks:", tasks);
  };

  const deleteAll = () => {
    //console.log("Deleting all tasks");
    setTasks([]);
    //console.log("Updated tasks:", tasks);
  };

  const toggleBackground = () => {
    setDayTheme(!dayTheme);
    console.log(dayTheme);
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        dayTheme,
        addTask,
        updateTask,
        deleteAll,
        removeTask,
        toggleBackground,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export { TaskContext, TaskProvider };
