import React, { useEffect } from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import "./SongSpinnerCountdown.css";

function SongSpinnerCountdown({ onLoad }) {
  useEffect(() => {
    if (onLoad) {
      onLoad();
    }
  }, [onLoad]);

  const renderTime = ({ remainingTime }) => {
    if (remainingTime === 0) {
      return <div className="timer">Too Late</div>;
    }
    return (
      <div className="timer">
        {/* <div className="text">Remaining</div> */}
        <div className="value">{remainingTime}</div>
        {/* <div className="text">seconds</div> */}
      </div>
    );
  };

  return (
    
      <>
      <CountdownCircleTimer
        isPlaying
        duration={15}
        colors={["#00FF00", "#F7B801", "#A30000", "#A30000"]}
        colorsTime={[15, 10, 6, 0]}
        onComplete={() => ({ shouldRepeat: true, delay: 1 })}
        size={120}
      >
        {renderTime}
      </CountdownCircleTimer>
    </>
  );
}

export default SongSpinnerCountdown;
