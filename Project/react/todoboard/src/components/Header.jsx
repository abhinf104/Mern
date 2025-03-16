import { useContext } from "react";
import { TaskContext } from "./TasksContext";
import { BsToggleOff, BsToggleOn } from "react-icons/bs";
import "./Header.css";

const Header = () => {
  const { dayTheme, toggleBackground } = useContext(TaskContext);

  const headerStyle = {
    backgroundColor: dayTheme ? "#ffffff" : "#000000",
    color: dayTheme ? "#000000" : "#ffffff",
    padding: "1rem",
  };

  return (
    <header style={headerStyle}>
      <h1>Todo Board</h1>
      <div className="toggle" onClick={toggleBackground}>
        {dayTheme === true ? <BsToggleOff /> : <BsToggleOn />}
      </div>
    </header>
  );
};

export default Header;
