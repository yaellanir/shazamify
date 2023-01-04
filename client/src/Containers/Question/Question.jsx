import React, { useState, useEffect, useRef } from "react";
import SongSpinnerCountdown from "../../Containers/SongSpinnerCountdown/SongSpinnerCountdown";
import { getSongByTrackName } from "../../Fetches/deezer";
import { categories } from "../../constants";
import coin from "../../imgs/correct.mp3";
import wrong from "../../imgs/wrong.mp3";
import SongChoiceDisplay from "../../Components/SongChoiceDisplay";
import StopWatch from "../StopWatch/StopWatch";
// import test from "../../songs-short/50 Cent - In Da Club.mp3";
import "./Question.css";

const NUM_OF_OPTIONS = 4;

// {
//  turnNumber: int,
//  pointsAcumulated: 0,
//  isWinner: false,
//  time: 0.0,
//  songGuessed: "",
//  correct: bool,
// }
function Question({ turn, setTurn, category, setRoundSummary, match, user }) {
  const [showQuestionCountdown, setShowQuestionCountdown] = useState(true);
  const [generatedRandomOptions, setGeneratedRandomOptions] = useState(null);
  const [winningSong, setWinningSong] = useState(null);
  const [opponentTurnSummary, setOpponentTurnSummary] = useState(null);
  const [showOpponentsTime, setShowOpponentsTime] = useState(false);

  // Stopwatch state
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);
  const [clickedOption, setClickedOption] = useState(null);

  // const turnData = useRef();
  const audioPlayer = useRef(null);
  const questionTimeout = useRef(null);

  const chooseRandomCategory = () => {
    const categoryKeys = Object.keys(categories);
    return categoryKeys[Math.floor(Math.random() * categoryKeys.length)];
  };

  function timeToHuman(time) {
    const seconds = time.toString().slice(0, -3);
    const milliseconds = time.toString().slice(-3, -1);
    const millisecondsRounded = Math.round(Number(milliseconds) / 10);
    return `${seconds}.${millisecondsRounded}`;
  }

  function calculatePoints() {
    const maxPoints = 1500;
    const decreaseValue = 10;
    const seconds = time.toString().slice(0, -3);
    const milliseconds = time.toString().slice(-3, -1);
    const millisecondsRounded = Math.round(Number(milliseconds) / 10);
    const displayNum = `${seconds}.${millisecondsRounded}`;
    const pointsLost =
      seconds * 10 * decreaseValue + millisecondsRounded * decreaseValue;
    const points = maxPoints - pointsLost;
    console.log({
      seconds,
      milliseconds,
      millisecondsRounded,
      pointsLost,
      displayNum,
      points,
    });
    return {
      displayNum,
      points,
    };
  }

  function summerizeTurn(index) {
    const turnNumber = turn;
    const correct = winningSong === index;
    const winningSongIndex = winningSong;
    const songGuessed = index;
    const pointsData = calculatePoints();
    setRoundSummary((prev) => [
      ...prev,
      {
        turnNumber,
        correct,
        songGuessed,
        time,
        pointsData,
        winningSongIndex,
        choices: generatedRandomOptions,
      },
    ]);
  }

  useEffect(() => {
    return () => audioPlayer?.current?.pause();
  }, []);

  useEffect(() => {
    if (time && opponentTurnSummary) {
      if (
        time.toString().slice(0, 3) ===
        opponentTurnSummary.time.toString().slice(0, 3)
      ) {
        setShowOpponentsTime(true);
      }
    }
  }, [time]);

  useEffect(() => {
    let categoryToUse =
      category === "default" ? chooseRandomCategory() : category;
    console.log(turn, categoryToUse);
    if (questionTimeout.current) {
      clearTimeout(questionTimeout.current);
    }
    if (match.createdBy === user.id) {
      const shuffled = categories[categoryToUse].sort(
        () => 0.5 - Math.random()
      );
      setGeneratedRandomOptions(shuffled.slice(0, NUM_OF_OPTIONS));
    } else {
      const lastRoundData = match.rounds[match.rounds.length - 1];
      const opponentsTurnData = lastRoundData[turn - 1];
      console.log(opponentsTurnData);
      setOpponentTurnSummary(opponentsTurnData);
      const songsArray = opponentsTurnData.choices;
      setGeneratedRandomOptions(songsArray);
    }
    // const shuffled = categories[categoryToUse].sort(
    //       () => 0.5 - Math.random()
    //     );
    // setGeneratedRandomOptions(shuffled.slice(0, NUM_OF_OPTIONS));
    setShowQuestionCountdown(true);
    setTime(0);
    setRunning(true);
    questionTimeout.current = setTimeout(() => {
      setShowQuestionCountdown(false);
    }, 16000);
    // cleanup
    return () => clearTimeout(questionTimeout.current);
  }, [turn]);

  useEffect(() => {
    if (generatedRandomOptions) {
      const randomSongIndex = Math.floor(
        Math.random() * (NUM_OF_OPTIONS - 1 - 0 + 1) + 0
      );
      console.log("generate random options changed");
      if (match.createdBy === user.id) {
        setWinningSong(randomSongIndex);
      } else {
        const lastRoundData = match.rounds[match.rounds.length - 1];
        const opponentsTurnData = lastRoundData[turn - 1];
        setWinningSong(opponentsTurnData.winningSongIndex);
      }
    }
  }, [generatedRandomOptions]);

  function handleChoice(index) {
    setClickedOption(index);
    // todo remove all this shit to a use effect dependant on click option
    summerizeTurn(index);
    audioPlayer.current.pause();
    setRunning(false);
    setTimeout(() => {
      setWinningSong(null);
      setClickedOption(null);
      setShowOpponentsTime(false);
      setTurn((prev) => prev + 1);
    }, 2000);
    setShowQuestionCountdown(false);
    if (index === winningSong) {
      new Audio(coin).play();
      console.log("correct");
    } else {
      new Audio(wrong).play();
      console.log("wrong");
    }
  }
  async function playSong(artist, song) {
    try {
      const { song_url } = await getSongByTrackName(artist, song);
      const player = new Audio(song_url);
      audioPlayer.current = player;
      player.play();
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    // console.log(winningSong);
    if (winningSong !== null && generatedRandomOptions) {
      console.log(generatedRandomOptions, winningSong);
      const { artist, song } = generatedRandomOptions[winningSong];
      playSong(artist, song);
    }
  }, [winningSong]);

  // function generateRockQuestion(arr, num) {
  //   const shuffled = [...arr].sort(() => 0.5 - Math.random());
  //   setGeneratedRandomOptions(shuffled.slice(0, num));
  // }
  // generateRockQuestion(arr, 4);
  // console.log(generatedRandomOptions);

  return (
    <div className="Question-container">
      <div className="timer-wrapper">
        {showQuestionCountdown && <SongSpinnerCountdown onLoad={null} />}
      </div>
      <div className="answers-container">
        <StopWatch
          running={running}
          setRunning={setRunning}
          time={time}
          setTime={setTime}
        />
        {showOpponentsTime && (
          <div style={{ color: "white", fontSize: "1.5rem" }}>
            {timeToHuman(opponentTurnSummary.time)}
          </div>
        )}
        {generatedRandomOptions?.map((song, i) => {
          return (
            <SongChoiceDisplay
              key={song.song}
              song={song.song}
              index={i}
              opponentTurnSummary={opponentTurnSummary}
              showOpponentsTime={showOpponentsTime}
              winningSong={winningSong}
              onClick={handleChoice}
              clickedOn={clickedOption === i}
              optionThatWasClicked={clickedOption}
            />
          );
        })}
      </div>
    </div>
  );
}

export default Question;
