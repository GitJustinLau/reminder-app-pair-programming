// import React, { useState, useEffect } from 'react';

// const Timer = () => {
//   const [elapsedTime, setElapsedTime] = useState(0);
//   const [isRunning, setIsRunning] = useState(false);
//   const [startTime, setStartTime] = useState(0);
//   const [laps, setLaps] = useState([]);

//   useEffect(() => {
//     let interval;

//     if (isRunning) {
//       interval = setInterval(() => {
//         setElapsedTime((Date.now() - startTime) / 1000);
//       }, 100);
//     } else {
//       clearInterval(interval);
//     }

//     return () => {
//       clearInterval(interval);
//     };
//   }, [isRunning, startTime]);

//   const handleStart = () => {
//     if (!isRunning) {
//       setStartTime(Date.now() - elapsedTime * 1000);
//       setIsRunning(true);
//     }
//   };

//   const handleStop = () => {
//     setIsRunning(false);
//   };

//   const handleReset = () => {
//     setIsRunning(false);
//     setElapsedTime(0);
//     setLaps([]);
//   };

//   const handleLap = () => {
//     if (isRunning) {
//       setLaps([...laps, elapsedTime]);
//     }
//   };

//   return (
//     <div>
//       <div>
//         <span>{elapsedTime.toFixed(3)}</span> s
//       </div>
//       <div>
//         {isRunning ? (
//           <button onClick={handleStop}>Stop</button>
//         ) : (
//           <button onClick={handleStart}>Start</button>
//         )}
//         {isRunning && <button onClick={handleLap}>Lap</button>}
//         <button onClick={handleReset}>Reset</button>
//       </div>
//       <div>
//         {laps.length > 0 && (
//           <ul>
//             {laps.map((lapTime, index) => (
//               <li key={index}>{`Lap ${index + 1}: ${lapTime.toFixed(3)} s`}</li>
//             ))}
//           </ul>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Timer;

import React, { useState, useEffect } from 'react';

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
