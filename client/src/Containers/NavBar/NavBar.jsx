import React from "react";
import axios from "axios";
import {useNavigate} from 'react-router-dom'
import "./NavBar.css";

function NavBar({ user, setUser }) {
  const navigate = useNavigate();

  function updateProfile(params) {
    navigate("/profile");
}


  async function handleLogOut(params) {
    const API_URL = process.env.API_URL || "http://localhost:3001";
    const result = await axios.post(
      `${API_URL}/users/logout`,
      {},
      {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    );
    console.log(result);
    if (result.status === 200) {
      setUser(null);
      localStorage.removeItem("user");
    }
    navigate("/");
  }

  return (
    <div>
      <div className="nav-container">
        <h1>Shazamify</h1>
        <div className="nav-links">
          {user ? ( 
            <>
            <div onClick={handleLogOut}>Logout</div>
            <div onClick={updateProfile}>Profile</div>
            </>
          ) : (
            <>
              <div>Register</div>
              <div>Login</div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default NavBar;
