import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "./Summary.css";
import SingleSum from "./SingleSum/SingleSum";
import DoubleSum from "./DoubleSum/DoubleSum";
const API_URL = process.env.API_URL || "http://localhost:3001";

function Summary({
  roundSummary,
  user,
  opponentId,
  opponentData,
  match,
  turn,
}) {
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


  return (
    <div className="summery-wrapper">
      {opponentRoundSummary? 
      <DoubleSum
      roundSummary={roundSummary}
      user={user}
      opponentData= {opponentData}
      match={match}
      turn={turn}
      opponentRoundSummary={opponentRoundSummary} /> :
      <SingleSum 
      roundSummary={roundSummary}
      user={user}
      opponentData= {opponentData}
      match={match}
      turn={turn}  />
    }
    </div>
  );
}

export default Summary;
