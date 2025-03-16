import React from "react";
import "./register.css";

const SellerRegistration = ({ data, setData }) => (
  <div className="formBox">
    <h2 style={{ textAlign: "center" }}>Registration</h2>
    <select
      className="input"
      value={data.businessType}
      onChange={(e) => setData({ ...data, businessType: e.target.value })}
    >
      <option>Select Business Type</option>
      <option>Retail</option>
      <option>Wholesale</option>
    </select>
    <input
      type="text"
      placeholder="Business Name"
      className="input"
      value={data.businessName}
      onChange={(e) => setData({ ...data, businessName: e.target.value })}
    />
    <input
      type="email"
      placeholder="Email Address"
      className="input"
      value={data.registerEmail}
      onChange={(e) => setData({ ...data, registerEmail: e.target.value })}
    />
    <input
      type="tel"
      placeholder="Phone Number"
      className="input"
      value={data.phoneNumber}
      onChange={(e) => setData({ ...data, phoneNumber: e.target.value })}
    />
    <input
      type="text"
      placeholder="Business Address"
      className="input"
      value={data.businessAddress}
      onChange={(e) => setData({ ...data, businessAddress: e.target.value })}
    />
    <div className="uploadBox">Upload verification documents</div>
    <button className="submitButton">Register</button>
  </div>
);

export default SellerRegistration;
