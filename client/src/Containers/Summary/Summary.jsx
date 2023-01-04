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
  score,
  match,
  turn,
}) {
  const [totalPoints, setTotalPoints] = useState(
    roundSummary.reduce((acc, turn) => acc + turn.pointsData.points, 0)
  );
  const [savedMatchInDb, setSavedMatchInDb] = useState(false);
  const [opponentRoundSummary, setOpponentRoundSummary] = useState(null);
  const [winner, setWinner] = useState(null);
  const { match_id } = useParams();
  const navigate = useNavigate();
  // const defaultWinnerObject = {
  //   creator: 0,
  //   opponent: 0,
  // };
  useEffect(() => {
    let winnerOfRound = getWinnerOfRound();
    if (match.createdBy !== user.id) {
      setWinner(winnerOfRound);
      const lastRoundData = match.rounds[match.rounds.length - 1];
      console.log({ opponentsLastRound: lastRoundData });
      setOpponentRoundSummary(lastRoundData);
    }
    const roundData = {
      roundSummary,
      matchId: match_id,
      lastPlayed: user.id,
      wins: winnerOfRound
        ? {
            ...match.wins,
            [winnerOfRound]: match.wins[winnerOfRound] + 1,
          }
        : null,
      // winner:
      //   match.winner && winnerOfRound
      //     ? {
      //         ...match.winner,
      //         [winnerOfRound]: match.winner[winnerOfRound] + 1,
      //       }
      //     : match.winner
      //     ? {
      //         ...match.winner,
      //       }
      //     : defaultWinnerObject,
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
  }, []);

  function getWinnerOfRound() {
    const player = match.createdBy !== user.id ? "opponent" : "creator";
    const winner =
      score.totalPoints > score.opponentPoints &&
      score.opponentPoints !== score.totalPoints
        ? player
        : player === "opponent"
        ? "creator"
        : "opponent";
    console.log(winner);
    if (match.createdBy !== user.id) {
      return winner;
    }
    return null;
  }

  return (
    <div className="summery-wrapper">
      {opponentRoundSummary ? (
        <DoubleSum
          roundSummary={roundSummary}
          user={user}
          opponentData={opponentData}
          match={match}
          turn={turn}
          opponentRoundSummary={opponentRoundSummary}
        />
      ) : (
        <SingleSum
          roundSummary={roundSummary}
          user={user}
          opponentData={opponentData}
          match={match}
          turn={turn}
        />
      )}
    </div>
  );
}

export default Summary;
