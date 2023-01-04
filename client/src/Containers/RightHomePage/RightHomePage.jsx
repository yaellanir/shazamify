import React, { useState } from "react";
import LogIn from "../LogIn/LogIn";
import Register from "../Register/Register";
import "./RightHomePage.css";

function RightHomePage({ setUser }) {
  const [loggingIn, setLoggingIn] = useState(true);
  const [registering, setRegistering] = useState(false);

  return (
    <div className="RightHomePage-container">
      {loggingIn ? (
        <LogIn
          setLoggingIn={setLoggingIn}
          setRegistering={setRegistering}
          setUser={setUser}
        />
      ) : (
        <Register
          setLoggingIn={setLoggingIn}
          setRegistering={setRegistering}
          setUser={setUser}
        />
      )}
    </div>
  );
}

export default RightHomePage;
