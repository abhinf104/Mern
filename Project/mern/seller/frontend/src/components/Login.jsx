import React from "react";
import { FaGoogle, FaFacebook } from "react-icons/fa";
import "./login.css";

const Login = ({ data, setData }) => (
  <div className="formBox">
    <h2>Login</h2>
    <input
      type="email"
      placeholder="Email Address"
      className="input"
      value={data.email}
      onChange={(e) => setData({ ...data, email: e.target.value })}
    />
    <input
      type="password"
      placeholder="Password"
      className="input"
      value={data.password}
      onChange={(e) => setData({ ...data, password: e.target.value })}
    />
    <div className="rememberMe">
      <label>
        <input type="checkbox" /> Remember me
      </label>
      <a href="#" className="forgotLink">
        Forgot Password?
      </a>
    </div>
    <button className="submitButton">Login</button>
    <p>Or continue with</p>
    <div className="socialButtons">
      <button className="socialButton">
        <FaGoogle /> Google
      </button>
      <button className="socialButton">
        <FaFacebook /> Facebook
      </button>
    </div>
  </div>
);

export default Login;
