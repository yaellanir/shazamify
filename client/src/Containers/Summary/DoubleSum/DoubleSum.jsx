  import React, { useState, useEffect } from "react";
  import axios from "axios";
  import { useNavigate, useParams } from "react-router-dom";
  import "./DoubleSum.css"
  
  const API_URL = process.env.API_URL || "http://localhost:3001";

  function DoubleSum({ 
    roundSummary,
    user,
    opponentId,
    opponentData,
    match,
    turn,
    opponentRoundSummary
  }) {
      
      const navigate = useNavigate();
    function navigateHome() {
      navigate("/main");
    }
console.log(opponentRoundSummary);

    return (
      <>
        {roundSummary.map((round) => {
          return (
            <div className="turn-summery-container">
              <div className="user-sum">
                {/* <div>{user.username}</div> */}
                {/* <div>{round.turnNumber}</div> */}
                {round.correct ? (
                  <div className="correct-dot"></div>
                ) : (
                  <div className="wrong-dot"></div>
                )}
                {/* <div {round.correct? className={{ "correct": "wrong"}}}>{round.correct}</div> */}
                <div>{`${round.choices[round.songGuessed].artist} `}</div>
                <div>{round.choices[round.songGuessed].song}</div>
                <div className="num seconds">{`${round.pointsData.displayNum}s`}</div>
                <div className="num">{round.pointsData.points}</div>
              </div>
            </div>
          );
        })}
        <div className="sum-msg-wrap">
          <h3 className="greatJob">
            {" "}
            {`Great Job ${user.username}! Waiting for ${opponentData?.data.username} to play...`}{" "}
          </h3>
          <button onClick={navigateHome}>Back Home</button>
        </div>
      </>
  );
}

export default DoubleSum