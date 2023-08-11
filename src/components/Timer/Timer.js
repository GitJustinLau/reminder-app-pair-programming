import { useState, useEffect } from 'react';

const Timer = () => {
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let totalSeconds = minutes * 60 + seconds;
    let interval;

    if (isActive && totalSeconds > 0) {
      interval = setInterval(() => {
        totalSeconds--;
        const remainingMinutes = Math.floor(totalSeconds / 60);
        const remainingSeconds = totalSeconds % 60;
        setMinutes(remainingMinutes);
        setSeconds(remainingSeconds);
      }, 1000);
    } else if (totalSeconds === 0) {
      // Handle animation completion here
    } else {
      clearInterval(interval);
    }

    return () => {
      clearInterval(interval);
    };
  }, [isActive, minutes, seconds]);

  const startTimer = () => {
    setIsActive(true);
  };

  const resetTimer = () => {
    setIsActive(false);
    setMinutes(0);
    setSeconds(0);
  };

  return (
    <div className="timer-container">
      <h1>Countdown Timer</h1>
      <div className={`timer ${minutes === 0 && seconds === 0 && isActive ? 'animation-class' : ''}`}>
        {`${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`}
      </div>
      {!isActive ? (
        <div>
          <input
            type="number"
            value={minutes}
            onChange={e => setMinutes(parseInt(e.target.value, 10))}
            min="0"
            step="1"
            placeholder="Minutes"
          />
          <input
            type="number"
            value={seconds}
            onChange={e => setSeconds(parseInt(e.target.value, 10))}
            min="0"
            max="59"
            step="1"
            placeholder="Seconds"
          />
          <button onClick={startTimer}>Start</button>
        </div>
      ) : (
        <button onClick={resetTimer}>Reset</button>
      )}
    </div>
  );
};

export default Timer;
