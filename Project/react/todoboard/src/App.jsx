import "./App.css";
import Header from "./components/Header";
import { AddNewTask } from "./components/AddNewTask";
import { TaskProvider } from "./components/TasksContext";
import TaskHistory from "./components/Taskhistory";
import { useContext } from "react";
import { TaskContext } from "./components/TasksContext";

const AppContent = () => {
  const { dayTheme } = useContext(TaskContext);
  const appStyle = {
    backgroundColor: dayTheme ? "#ffffff" : "#000000",
    color: dayTheme ? "#000000" : "#ffffff",
    minHeight: "100vh",
  };

  return (
    <div style={appStyle}>
      <Header style={appStyle} />
      <AddNewTask style={appStyle} />
      <TaskHistory style={appStyle} />
    </div>
  );
};

const App = () => {
  return (
    <TaskProvider>
      <AppContent />
    </TaskProvider>
  );
};

export default App;
