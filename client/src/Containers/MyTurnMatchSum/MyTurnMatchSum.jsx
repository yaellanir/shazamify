import React, { useState, useEffect } from "react";
import MatchCard from "../../Components/MatchCard/MatchCard";
import "./MyTurnMatchSum.css";

function MyTurnMatchSum({ matches, user }) {
  function displayMyTurnMatches() {
    const myTurnMatches = matches?.filter(
      (match) => match.lastPlayed !== user.id
    );
    console.log({ myTurnMatches });
    return myTurnMatches?.map((match) => {
      return <MatchCard userId={user.id} match={match} />;
    });
  }

  return <div className="MatchSum-container">{displayMyTurnMatches()}</div>;
}

export default MyTurnMatchSum;
