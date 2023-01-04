import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import logo from "../../imgs/logo.png";
import "./LogIn.css";
const API_URL = process.env.API_URL || "http://localhost:3001";
function LogIn({ setUser, setLoggingIn, setRegistering }) {
  const navigate = useNavigate();
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  // const [signInCheck, setSignInCheck] = useState(false);

  function handleEmail(event) {
    const email = event.target.value;
    setEmailInput(email);
  }

  function handlePassword(event) {
    const password = event.target.value;
    setPasswordInput(password);
  }

  async function handleSignIn() {
    if (!emailInput || !passwordInput) {
      console.log("im here");
      return;
    }
    try {
      const results = await axios.post(`${API_URL}/users/login`, {
        email: emailInput,
        password: passwordInput,
      });
      console.log(results);
      const user = {
        token: results.data.token,
        username: results.data.user.username,
        name: results.data.user.name,
        id: results.data.user._id,
        avatar: results.data.user.avatar
      };
      window.localStorage.setItem("user", JSON.stringify(user));
      setUser(user);
      console.log(user);
    } catch (error) {
      console.log(error);
    }
    navigate("/main");
  }
  function navigateToRegister(params) {
    setLoggingIn(false);
    setRegistering(true);
  }
  return (
    <div className="login-container">
      <div className="log-in-top">
        <img className="login-logo" src={logo} alt="" />
        {/* <button className="exit">X</button> */}
        <h2>Log In</h2>
      </div>
      <div className="not-member-header">
        <h5>Not a member yet ? </h5>
        <div onClick={navigateToRegister}>Register</div>
      </div>
      <div className="input-container">
        <input onChange={handleEmail} type="text" placeholder="Email" />
        <input onChange={handlePassword} type="text" placeholder="Password" />
      </div>
      <div className="checkbox-container">
        <input type="checkbox" />
        <label>Keep me signed in</label>
      </div>
      <div className="log-btn-container">
        <button onClick={handleSignIn} className="log-btn">
          Log In
        </button>
      </div>
    </div>
  );
}

export default LogIn;
