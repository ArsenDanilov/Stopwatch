import { useEffect, useState } from "react";
import { Button } from "./Button";
import styles from "./dial.module.css";
import { Circle } from "./Circle";

export const Dial = () => {
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [milliseconds, setMilliseconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [circlesArr, setCirclesArr] = useState([]);

  const isReset = minutes === 0 && seconds === 0 && milliseconds === 0;

  const formatTime = () => {
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0"
    )},${String(milliseconds).padStart(2, "0")}`;
  };

  const toggleDial = () => {
    isRunning ? setIsRunning(false) : setIsRunning(true);
  };

  const resetDial = () => {
    setMilliseconds(0);
    setSeconds(0);
    setMinutes(0);
    setIsRunning(false);
    setCirclesArr([]);
  };

  const saveCircle = () => {

    const newCircle = formatTime();

    setCirclesArr(prevCircle => [...prevCircle, newCircle])
  };
  
  useEffect(() => {
    let timerIntervalId;

    if (isRunning) {
      const updateTime = () => {
        if (milliseconds < 99) {
          setMilliseconds(milliseconds + 1);
        } else {
          setMilliseconds(0);
          if (seconds < 59) {
            setSeconds(seconds + 1);
          } else {
            setSeconds(0);
            setMinutes(setMinutes + 1);
          }
        }
      };

      timerIntervalId = setInterval(updateTime, 8);
    }

    return () => clearInterval(timerIntervalId);
  }, [isRunning, minutes, seconds, milliseconds]);

  const time = formatTime();

  return (
    <div className={styles.dial}>
      <p>{time}</p>
      <div className={styles.dial__buttons}>
        <Button onClick={toggleDial} disabled={isRunning} text="Start" />
        <Button onClick={toggleDial} disabled={!isRunning} text="Stop" />
        <Button onClick={resetDial} disabled={isReset} text="Reset" />
        <Button onClick={saveCircle} text="Circle" />
      </div>
      <p>{time}</p>
      <div>
        {circlesArr.map((time, index) => (
          <Circle key={index} time={time} index={index} />
        ))}
      </div>
    </div>
  );
};
