import React, { useState } from "react";
import redLogo from "../assets/redLogo.svg";
import Login from "../components/Login";
import SellerRegistration from "../components/Register";
import "./auth.css"; // Import the CSS file

const SellerAuth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    businessType: "",
    businessName: "",
    registerEmail: "",
    phoneNumber: "",
    businessAddress: "",
  });
  return (
    <div className="container">
      {/* Header Section */}
      <div className="header">
        <img src={redLogo} alt="Company Logo" className="logo" />
        <h3 className="title">Seller Portal</h3>
      </div>

      {/* Tab Buttons */}
      <div className="tabContainer">
        <button
          type="button"
          onClick={() => setIsLogin(true)}
          className={isLogin ? "activeTab" : "inactiveTab"}
        >
          Login
        </button>
        <button
          type="button"
          onClick={() => setIsLogin(false)}
          className={!isLogin ? "activeTab" : "inactiveTab"}
        >
          Register
        </button>
      </div>

      {/* Content Area */}
      <div className="content">
        {isLogin ? (
          <Login data={formData} setData={setFormData} className="fullWidth" />
        ) : (
          <SellerRegistration
            data={formData}
            setData={setFormData}
            className="fullWidth"
          />
        )}
      </div>
    </div>
  );
};

export default SellerAuth;
