import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "./Summary.css";
const API_URL = process.env.API_URL || "http://localhost:3001";

function Summary({ roundSummary, user, opponentId, match, turn }) {
  const [totalPoints, setTotalPoints] = useState(
    roundSummary.reduce((acc, turn) => acc + turn.pointsData.points, 0)
  );
  const [savedMatchInDb, setSavedMatchInDb] = useState(false);
  const [opponentRoundSummary, setOpponentRoundSummary] = useState(null);
  const { match_id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (match.createdBy !== user.id) {
      const lastRoundData = match.rounds[match.rounds.length - 1];
      console.log({ opponentsLastRound: lastRoundData });
      setOpponentRoundSummary(lastRoundData);
    }
    const roundData = {
      roundSummary,
      matchId: match_id,
      lastPlayed: user.id,
    };
    const addRoundToMatchDB = async () => {
      const result = await axios.patch(`${API_URL}/matches/me`, roundData);
      setSavedMatchInDb(true);
      console.log(result);
    };
    if (!savedMatchInDb) {
      try {
        addRoundToMatchDB();
      } catch (error) {
        console.log(error);
      }
    }
    addRoundToMatchDB();
  }, []);

  function navigateHome() {
    navigate("/main");
  }
  // console.log(roundSummary);

  return (
    <div className="turn-summery-container">
      <h4>{totalPoints}</h4>
      {roundSummary.map((round) => {
        return (
          <div className="turn-summery-container">
            <div className="user-sum">
              {/* <div>{user.username}</div> */}
              {/* <div>{round.turnNumber}</div> */}
              {round.correct ? (
                <div className="correct">V</div>
              ) : (
                <div className="wrong">X</div>
              )}
              {/* <div {round.correct? className={{ "correct": "wrong"}}}>{round.correct}</div> */}
              <div>{`${round.choices[round.songGuessed].artist} - `}</div>
              <div>{round.choices[round.songGuessed].song}</div>
              <div className="seconds">{`${round.pointsData.displayNum}s`}</div>
              <div>{round.pointsData.points}</div>
            </div>
          </div>
        );
      })}
      <h3> {`Great Job ${user.name}!`} </h3>
      <button onClick={navigateHome}>Back Home</button>
    </div>
  );
}

export default Summary;
