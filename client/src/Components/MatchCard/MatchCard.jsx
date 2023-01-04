import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AiOutlineDelete } from "react-icons/ai";
import "./MatchCard.css";

const API_URL = process.env.API_URL || "http://localhost:3001";

const MatchCard = ({ match, userId, nudge }) => {
  const [opponent, setOpponent] = useState(null);
  const [deleted, setDeleted] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const opponentId = match.participants.find(
      (participant) => participant !== userId
    );
    const getOpponent = async () => {
      try {
        const { data } = await axios.get(
          `${API_URL}/users/find/id/${opponentId}`
        );
        setOpponent(data);
      } catch (error) {
        console.log(error);
      }
    };
    if (opponentId) {
      getOpponent();
    }
  }, [match, userId]);

  async function deleteMatch(params) {
    try {
      const matchDeleted = await axios.delete(
        `${API_URL}/matches/${match._id}`
      );
      console.log(matchDeleted);
      setDeleted(true);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      {deleted ? null : (
        <div className="card">
          <img
            className="card-img"
            src={
              opponent?.avatar && `data:image/png;base64,${opponent?.avatar}`
            }
            alt="avatar"
          />
          <div>{opponent?.username}</div>
          <div>score</div>
          <div className="sum-btn-container">
            {nudge ? (
              <button className="sum-btn">NUDGE</button>
            ) : (
              <button
                className="sum-btn"
                onClick={() =>
                  navigate(`/matches/friend-mode/${match._id}/default`)
                }
              >
                PLAY
              </button>
            )}
            <button className="sum-btn" onClick={deleteMatch}>
              <AiOutlineDelete className="icon-trash" />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default MatchCard;
