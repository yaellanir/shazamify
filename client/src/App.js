import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import SocketTest from "./Pages/Socket-test/SocketTest";
import HomePage from "./Pages/HomePage/HomePage";
import FriendMode from "./Pages/FriendMode/FriendMode";
// import RandomUserMode from "./Pages/RandomUserMode/RandomUserMode";
import Main from "./Pages/Main/Main";
import Profile from "./Pages/Profile/Profile";
import NavBar from "./Containers/NavBar/NavBar.jsx";
import "./App.css";


function App() {
  const [user, setUser] = useState(null);
  // const [opponent, setOpponent] = useState(null);
  const navigate = useNavigate();

  // useEffect(() => {
  // if (!user) {
  // navigate("/");
  // }
  // }, []);

  useEffect(() => {
    const user = JSON.parse(window.localStorage.getItem("user"));
    if (user) {
      setUser(user);
      navigate("/main");
    }
  }, []);


  return (
    <div>
      <NavBar user={user} setUser={setUser} />
      <Routes>
        <Route exact path="/" element={<HomePage setUser={setUser} />} />
        <Route exact path="/profile" element={<Profile user={user} setUser={setUser} />} />
        <Route exact path="/main" element={<Main user={user} />} />
        <Route exact path="/matches/friend-mode/:match_id/:category" element={<FriendMode user={user} />} />
        <Route exact path="/matches/random-mode/:match_id/:category" element={<FriendMode user={user} />} />
        <Route exact path="/socket" element={<SocketTest />} />
      </Routes>
    </div>
  );
}

export default App;
