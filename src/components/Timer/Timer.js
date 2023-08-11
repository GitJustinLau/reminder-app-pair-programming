import React, { useState, useEffect } from 'react';

const Timer = () => {
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [startTime, setStartTime] = useState(0);
  const [laps, setLaps] = useState([]);

  useEffect(() => {
    let interval;

    if (isRunning) {
      interval = setInterval(() => {
        setElapsedTime((Date.now() - startTime) / 1000);
      }, 100);
    } else {
      clearInterval(interval);
    }

    return () => {
      clearInterval(interval);
    };
  }, [isRunning, startTime]);

  const handleStart = () => {
    if (!isRunning) {
      setStartTime(Date.now() - elapsedTime * 1000);
      setIsRunning(true);
    }
  };

  const handleStop = () => {
    setIsRunning(false);
  };

  const handleReset = () => {
    setIsRunning(false);
    setElapsedTime(0);
    setLaps([]);
  };

  const handleLap = () => {
    if (isRunning) {
      setLaps([...laps, elapsedTime]);
    }
  };

  return (
    <div>
      <div>
        <span>{elapsedTime.toFixed(3)}</span> s
      </div>
      <div>
        {isRunning ? (
          <button onClick={handleStop}>Stop</button>
        ) : (
          <button onClick={handleStart}>Start</button>
        )}
        {isRunning && <button onClick={handleLap}>Lap</button>}
        <button onClick={handleReset}>Reset</button>
      </div>
      <div>
        {laps.length > 0 && (
          <ul>
            {laps.map((lapTime, index) => (
              <li key={index}>{`Lap ${index + 1}: ${lapTime.toFixed(3)} s`}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Timer;
