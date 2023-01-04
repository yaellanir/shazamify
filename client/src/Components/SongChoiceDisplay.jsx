import React, { useEffect } from "react";
import { timeToHuman } from "../utils";
import "./SongChoiceDisplay.css";
const SongChoiceDisplay = ({
  song,
  index,
  winningSong,
  clickedOn,
  onClick,
  optionThatWasClicked,
  showOpponentsTime,
  opponentTurnSummary,
}) => {
  const className = index === winningSong ? "correct" : "wrong";
  useEffect(() => {
    console.log({ index, className, winningSong, optionThatWasClicked });
  }, [optionThatWasClicked]);
  const styleToShow = () => {
    if (clickedOn) {
      return className;
    }
    if (winningSong === index && optionThatWasClicked != null) {
      return "correct";
    }
    return "default";
  };
  function handleClick() {
    console.log(optionThatWasClicked);
    if (optionThatWasClicked !== null) {
      return;
    }
    onClick(index);
  }
  return (
    <div className={`answerBox ${styleToShow()}`} onClick={handleClick}>
      {showOpponentsTime && opponentTurnSummary.songGuessed === index && (
        <div className="opponent-time-display">
          {timeToHuman(opponentTurnSummary.time)}
        </div>
      )}
      {song}
    </div>
  );
};

export default SongChoiceDisplay;
