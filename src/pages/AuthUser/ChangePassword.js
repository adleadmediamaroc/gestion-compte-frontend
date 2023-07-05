import React, { useState } from "react";
import axios from "axios";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Messages } from "primereact/messages";
import { Password } from "primereact/password";
//import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
//import { faCheckCircle, faExclamationCircle } from "@fortawesome/free-solid-svg-icons";

const ChangePasswordForm = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmedPassword) {
      setError("The new password and confirmed password do not match.");
      setSuccess("");
      return;
    }

    try {
      // Make a POST request to the change-password API
      const response = await axios.post("http://localhost:8080/api/auth/change-password", {
        oldPassword,
        newPassword,
        confirmedPassword,
      });

      // Handle successful response
      setError("");
      setSuccess(response.data.message); // Show success message
    } catch (error) {
      // Handle error response
      setError(error.response.data); // Show error message
      setSuccess("");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="p-fluid">
        <div className="p-field">
          <label htmlFor="oldPassword">Old Password</label>
          <Password
            id="oldPassword"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            feedback={false}
            toggleMask
            required
          />
        </div>
        <div className="p-field">
          <label htmlFor="newPassword">New Password</label>
          <Password
            id="newPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            feedback={false}
            toggleMask
            required
          />
        </div>
        <div className="p-field">
          <label htmlFor="confirmedPassword">Confirm Password</label>
          <Password
            id="confirmedPassword"
            value={confirmedPassword}
            onChange={(e) => setConfirmedPassword(e.target.value)}
            feedback={false}
            toggleMask
            required
          />
        </div>
        <div style={{ marginTop: "1rem"}}>
          <Button
            label="Change Password"
            icon="pi pi-check"
            type="submit"
            className="p-button-sm"
            style={{width:'30%'}}
          />
        </div>
      </div>
      {error && (
        <Messages
          severity="error"
          // icon={
          //   <FontAwesomeIcon icon={faExclamationCircle} className="p-mr-2" />
          // }
        >
          {error}
        </Messages>
      )}
      {success && (
        <Messages
          severity="success"
          // icon={<FontAwesomeIcon icon={faCheckCircle} className="p-mr-2" />}
        >
          {success}
        </Messages>
      )}
    </form>
  );
};

export default ChangePasswordForm;
