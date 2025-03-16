import React from "react";
import { CloudUploadOutlined } from "@ant-design/icons";
import "./uploadInput.css";

const UploadInput = () => {
  return (
    <div className="upload-input">
      <label htmlFor="file-upload" className="upload-label">
        <div className="upload-box">
          <CloudUploadOutlined style={{ fontSize: "48px", color: "#08c" }} />
          <p>Click to upload</p>
        </div>
      </label>
      <input id="file-upload" type="file" style={{ display: "none" }} />
    </div>
  );
};

export default UploadInput;
