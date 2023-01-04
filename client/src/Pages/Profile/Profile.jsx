import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaEllo } from "react-icons/fa";
import { FaOdnoklassniki } from "react-icons/fa";
import { RiLockPasswordLine } from "react-icons/ri";
import { AiOutlineFileImage } from "react-icons/ai";
import { AiOutlineMail } from "react-icons/ai";
import "./Profile.css";

const API_URL = process.env.API_URL || "http://localhost:3001";

function Profile({ user }) {
  const navigate = useNavigate();
  const [displayEditSection, setDisplayEditSection] = useState(false);
  const [displayMsgEditSection, setDisplayMsgEditSection] = useState(false);
  const [name, setNameInput] = useState("");
  const [username, setusernameInput] = useState("");
  const [email, setEmailInput] = useState("");
  const [password, setPasswordInput] = useState("");

  function handleName(event) {
    const name = event.target.value;
    setNameInput(name);
  }

  function handleUsername(event) {
    const username = event.target.value;
    setusernameInput(username);
  }

  function handleEmail(event) {
    const email = event.target.value;
    setEmailInput(email);
  }

  function handlePassword(event) {
    const password = event.target.value;
    setPasswordInput(password);
  }

  function editProfileBtn() {
    setDisplayEditSection(true);
  }

  async function updateProfileData() {
    const inputs = { name, email, password, username };
    const fieldsToUpdate = {};
    Object.keys(inputs).forEach((field) => {
      if (inputs[field].length > 0) {
        fieldsToUpdate[field] = inputs[field];
      }
    });
    try {
      const token = JSON.parse(localStorage.getItem("user")).token;
      const result = await axios.patch(`${API_URL}/users/me`, fieldsToUpdate, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(result);
      //todo: Set updated user in localstorage and app state
      setDisplayMsgEditSection(true);
      setTimeout(() => {
        navigate("/main");
      }, 2000);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="profile-container">
      {/* <h2 className="profile-title">Edit Profile</h2> */}
      <div className="container">
        <h2 className="edit-word-title">Edit </h2>
        <h2 className="profile-word-title">Profile </h2>
      </div>
      <div className="profile-img"></div>
      {/* <h2>Hi {`${user.name}`}</h2> */}
      <div className="profile-btn">
        <h4 className="x-sign">Edit your profile here</h4>
        <button className="edit-btn" onClick={editProfileBtn}>
          EDIT
        </button>
      </div>
      {displayEditSection && (
        <div className="edit-section">
          <div className="profile-input">
            {/* <AiOutlineUser/> */}
            <label htmlFor="">
              {" "}
              <FaEllo /> Name:{" "}
            </label>
            <input onClick={handleName} type="text" />
          </div>
          <div className="profile-input">
            <label htmlFor="">
              {" "}
              <FaOdnoklassniki />
              User Name:{" "}
            </label>
            <input onChange={handleUsername} type="text" />
          </div>
          <div className="profile-input">
            <label htmlFor="">
              {" "}
              <AiOutlineMail /> Email:{" "}
            </label>
            <input onChange={handleEmail} type="text" />
          </div>
          <div className="profile-input">
            <label htmlFor="">
              {" "}
              <RiLockPasswordLine />
              Password:{" "}
            </label>
            <input onChange={handlePassword} type="text" />
          </div>

          <div className="profile-input">
            <label htmlFor="">
              {" "}
              <AiOutlineFileImage />
              Image:{" "}
            </label>
            <input className="image-upload-input" type="file" />
          </div>
          <button className="update-input" onClick={updateProfileData}>
            UPDATE
          </button>
          {displayMsgEditSection && (
            <h4 className="update-msg"> Profile Updated </h4>
          )}
        </div>
      )}
    </div>
  );
}

export default Profile;
