import React, { useState } from "react";
import logo from "../../imgs/logo.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Register.css";

const API_URL = process.env.API_URL || "http://localhost:3001";

function Register({ setLoggingIn, setRegistering, setUser }) {
  const navigate = useNavigate();

  const [nameInput, setNameInput] = useState("");
  const [usernameInput, setusernameInput] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [imgInput, setImgInput] = useState(null);
  // const [imgUrl, setImgUrl] = useState("");
  const [displayMsg, setDisplayMsg] = useState(false);

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

  function handleAvatar(event, callback) {
    const avatar = event.target.files[0];
    console.log(avatar);
    let reader = new FileReader();
    console.log(reader);
    reader.readAsArrayBuffer(avatar);
    // reader.readAsDataURL(avatar);

    reader.onload = (event) => {
      let result = event.target.result;
      setImgInput(avatar);
      console.log(result);
      // callback(reader.result);
    };
    // let buffer = reader.readAsArrayBuffer(avatar);
    // console.log(buffer);
  }

  // function handleImg(event) {
  //   const img = event.target.files;
  //   setImgInput(img);
  //   if (event.target.files.length !== 0) {
  //    setImgUrl(event({image: URL.createObjectURL(event.target.files[0])}))
  //   }
  //   const newImageUrl = URL.createObjectURL(img);
  //   setImgUrl(newImageUrl);
  // }

  function navigateToLogin() {
    setRegistering(false);
    setLoggingIn(true);
  }

  async function handleRegister() {
    const formData = new FormData();
    formData.append("name", nameInput);
    formData.append("username", usernameInput);
    formData.append("email", emailInput);
    formData.append("password", passwordInput);
    if (imgInput) {
      formData.append("avatar", imgInput);
    }
    try {
      const results = await axios.post(`${API_URL}/users`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log(results);
      const user = {
        token: results.data.token,
        username: results.data.user.username,
        name: results.data.user.name,
        id: results.data.user._id,
        avatar: results.data.user.avatar,
      };
      window.localStorage.setItem("user", JSON.stringify(user));
      // const base64String = btoa(String.fromCharCode(...new Uint8Array(arrayBuffer)));
      setUser(user);
      navigate("./main");
    } catch (error) {
      console.log(error);
    }
    setDisplayMsg(true);
  }

  return (
    <div className="register-container">
      <div className="register-top">
        <img className="register-logo" src={logo} alt="" />
        {/* <button className="exit">X</button> */}
        <h2>Register</h2>
      </div>
      <div className="already-member-header">
        <h5>Already a member ? </h5>
        <div onClick={navigateToLogin}>Login</div>
      </div>
      <div className="input-container">
        <input onChange={handleName} type="text" placeholder="Name" />
        <input onChange={handleUsername} type="text" placeholder="username" />
        <input onChange={handleEmail} type="text" placeholder="Email" />
        <input onChange={handlePassword} type="text" placeholder="Password" />
        <div className="img-input-container">
          <label htmlFor="img">Upload Image</label>
          <input
            onChange={handleAvatar}
            type="file"
            accept=".jpg, .jpeg, .png"
          />
        </div>
      </div>
      <div className="checkbox-container">
        <input type="checkbox" />
        <label>Keep me signed in</label>
      </div>
      {displayMsg && (
        <h4 className="success-msg">
          You have successfully registered, please log in
        </h4>
      )}
      <div className="log-btn-container">
        <button onClick={handleRegister} className="log-btn">
          Register
        </button>
      </div>
    </div>
  );
}

export default Register;
