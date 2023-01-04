import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Question from "../../Containers/Question/Question.jsx";
import Countdown from "../../Containers/Countdown/Countdown";
import Summary from "../../Containers/Summary/Summary";
import vs from "../../imgs/vs.png";
import "./FriendMode.css";
import axios from "axios";

const defaultImg = "";

const API_URL = process.env.API_URL || "http://localhost:3001";
const NUM_OF_TURNS = 5;
function FriendMode({ user }) {
  const [showCountDown, setShowCountDown] = useState(true);
  const [opponentData, setOpponentData] = useState(null);
  const [turn, setTurn] = useState(1);
  const [roundSummary, setRoundSummary] = useState([]);
  const { match_id, category } = useParams();
  const [match, setMatch] = useState(null);
  const [totalScore, setTotalScore] = useState(0);
  const [opponentScore, setOpponentScore] = useState(0);
  // console.log(category);
  useEffect(() => {
    async function getMatchData() {
      try {
        const { data: createdMatch } = await axios.get(
          `${API_URL}/matches/${match_id}`
        );
        const opponent_id = createdMatch.participants.filter(
          (id) => id !== user.id
        )[0];
        const opponentDataResults = await axios.get(
          `${API_URL}/users/find/id/${opponent_id}`
        );
        setOpponentData(opponentDataResults);
        setMatch(createdMatch);
        // console.log(results.data);
        // console.log(opponentDataResults);
      } catch (error) {
        console.log(error);
      }
    }
    getMatchData();
  }, [match_id]);

  useEffect(() => {
    if (match?.rounds.length > 0 && match?.createdBy !== user.id) {
      console.log({ MATCH_INSIDE_FRIENDMODE: match });
      const lastRoundData = match.rounds[match.rounds.length - 1];
      setOpponentScore(
        lastRoundData.reduce((acc, turn) => acc + turn.pointsData.points, 0)
      );
    }
  }, [match]);

  setTimeout(() => {
    setShowCountDown(false);
  }, 3000);

  return (
    <div className="FriendMode-container">
      <div className="user-display-container">
        <div className="user-display">
          <img
            className="userimage"
            src={`data:image/png;base64,${user?.avatar}`}
            alt="userImg"
          />
          <h3 className="userNAME">{user?.username}</h3>
          <h4 className="score">{totalScore}</h4>
        </div>
        <img className="VS" src={vs} alt="vs" />
        <div className="user-display">
          <img
            className="userimage"
            src={
              opponentData?.data.avatar
                ? `data:image/png;base64,${opponentData?.data.avatar}`
                : defaultImg
            }
            alt="userImg"
          />
          <h3 className="userNAME">
            {opponentData?.data.username || "opponent"}
          </h3>
          <h4 className="score">{opponentScore}</h4>
        </div>
      </div>
      {showCountDown && <Countdown />}
      {!showCountDown && turn < NUM_OF_TURNS + 1 && match && (
        <Question
          category={category}
          setRoundSummary={setRoundSummary}
          setTurn={setTurn}
          turn={turn}
          match={match}
          user={user}
          setTotalScore={setTotalScore}
          opponentData={opponentData}
        />
      )}
      {turn > NUM_OF_TURNS && (
        <Summary
          user={user}
          roundSummary={roundSummary}
          matchId={match_id}
          opponentId={opponentData?.data?._id}
          opponentData={opponentData}
          category={category}
          turn={turn}
          match={match}
          score={{ totalScore, opponentScore }}
        />
      )}
    </div>
  );
}

export default FriendMode;
