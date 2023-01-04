import React, { useState, useEffect } from "react";
import MatchCard from "../../Components/MatchCard/MatchCard";
import "./TheirTurnMatchSum.css";

function TheirTurnMatchSum({ matches, user }) {
  function displayTheirTurnMatches() {
    const theirTurnMatches = matches?.filter(
      (match) => match.lastPlayed === user.id
    );
    console.log({ theirTurnMatches });
    return theirTurnMatches?.map((match) => {
      return <MatchCard userId={user.id} match={match} nudge/>;
    });
  }

  return <div className="MatchSum-container">{displayTheirTurnMatches()}</div>;
}

export default TheirTurnMatchSum;
