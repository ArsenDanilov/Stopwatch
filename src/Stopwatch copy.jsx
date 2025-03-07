import { useEffect, useState } from "react";
import { Button } from "./Button";
import styles from "./dial.module.css";
import { Circle } from "./Circle";

export const Stopwatch = () => {
  const [time, setTime] = useState({
    minutes: 0,
    seconds: 0,
    milliseconds: 0,
  })
  const [isRunning, setIsRunning] = useState(false);
  const [circlesArr, setCirclesArr] = useState([]);

  const isReset = time.minutes === 0 && time.seconds === 0 && time.milliseconds === 0;

  const formatTime = () => {
    return `${String(time.minutes).padStart(2, "0")}:${String(time.seconds).padStart(
      2,
      "0"
    )},${String(time.milliseconds).padStart(2, "0")}`;
  };

  const toggleDial = () => {
    isRunning ? setIsRunning(false) : setIsRunning(true);
  };

  const resetDial = () => {
    setTime({ minutes: 0, seconds: 0, milliseconds: 0 });
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
        if (time.milliseconds < 99) {
          setTime((t) => ({ ...t, milliseconds: t.milliseconds + 1 }));
        } else {
          setTime((t) => ({ ...t, milliseconds: 0 }));
          if (time.seconds < 59) {
            setTime((t) => ({ ...t, seconds: t.seconds + 1 }));
          } else {
            setTime((t) => ({ ...t, seconds: 0 }));
            setTime((t) => ({ ...t, minutes: t.minutes + 1 }));
          }
        }
      };

      timerIntervalId = setInterval(updateTime, 8);
    }

    return () => clearInterval(timerIntervalId);
  }, [isRunning, time]);

  const formattedTime = formatTime();
  
  return (
    <div className={styles.dial}>
      <p>{formattedTime}</p>
      <div className={styles.dial__buttons}>
        <Button onClick={toggleDial} disabled={isRunning} text="Start" />
        <Button onClick={toggleDial} disabled={!isRunning} text="Stop" />
        <Button onClick={resetDial} disabled={isReset} text="Reset" />
        <Button onClick={saveCircle} text="Circle" />
      </div>
      <p>{formattedTime}</p>
      <div>
        {circlesArr.map((circleTime, index) => (
          <Circle key={index} time={circleTime} index={index + 1} />
        ))}
      </div>
    </div>
  );
};
