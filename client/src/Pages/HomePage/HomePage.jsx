import React from "react";
import LeftHomePage from "../../Containers/LeftHomePage/LeftHomePage";
import RightHomePage from "../../Containers/RightHomePage/RightHomePage";
import "./HomePage.css";

function HomePage({ setUser }) {
  return (
    <div className="homepage-container">
      <LeftHomePage />
      <RightHomePage setUser={setUser} />
    </div>
  );
}

export default HomePage;
