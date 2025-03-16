import logo from "../assets/company.svg";
import React, { useState, useEffect } from "react";
// import { useHistory } from "react-router-dom";
import SellerAuth from "./SellerAuth";
const Company = () => {
  return (
    <>
      <div
        style={{
          backgroundColor: "red",
          width: "100vw",
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <img src={logo} alt="company logo" style={{ width: "100px" }} />
        <div></div>
      </div>
    </>
  );
};

const Welcome = () => {
  const [showLogin, setShowLogin] = useState(false);

  useEffect(() => {
    // console.log("Timer started");
    const timer = setTimeout(() => {
      setShowLogin(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return <div>{showLogin ? <SellerAuth /> : <Company />}</div>;
};

export default Welcome;
