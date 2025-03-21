import { useCallback, useState } from "react";
import { Dial } from "./Dial";
import { Button } from "./Button";
import styles from "./stopwatch.module.css";
import { useUpdateTime } from "./useUpdateTime";

export const Stopwatch = () => {
  const [time, setTime] = useState({
    minutes: 0,
    seconds: 0,
    milliseconds: 0,
  });

  const [circleTime, setCircleTime] = useState({
    minutes: 0,
    seconds: 0,
    milliseconds: 0,
  });

  const [circlesObj, setCirclesObj] = useState({
    circles: [],
    currentCircleIndex: 0,
  }); 

  const [isRunning, setIsRunning] = useState(false);

  const isInitialTime =
    time.minutes === 0 && time.seconds === 0 && time.milliseconds === 0;

  const toggleDial = useCallback(() => {
    setIsRunning((prevIsRunning) => !prevIsRunning);

    if (!isRunning) {
      if (circlesObj.circles.length === 0) {
        setCirclesObj((prevCirclesObj) => ({
          ...prevCirclesObj,
          currentCircleIndex: 1,
        }));
      }
    }
  }, [isRunning, circlesObj.circles.length]);

  const formatTime = (timeObject) => {
    return `${String(timeObject.minutes).padStart(2, "0")}:${String(
      timeObject.seconds
    ).padStart(2, "0")},${String(timeObject.milliseconds).padStart(2, "0")}`;
  };

  const resetStopwatch = useCallback(() => {
    setTime({ minutes: 0, seconds: 0, milliseconds: 0 });
    setCircleTime({ minutes: 0, seconds: 0, milliseconds: 0 });
    setCirclesObj({ circles: [], currentCircleIndex: 0 });
    setIsRunning(false);
  }, []);

  const saveCircle = useCallback(() => {
    setCirclesObj((prevCirclesObj) => ({
      circles: [...prevCirclesObj.circles, circleTime],
      currentCircleIndex: prevCirclesObj.currentCircleIndex + 1,
    }));
    setCircleTime({ minutes: 0, seconds: 0, milliseconds: 0 });
  }, [circleTime]);

  useUpdateTime(time, setTime, isRunning);
  useUpdateTime(
    circleTime,
    setCircleTime,
    isRunning && circlesObj.circles.length === circlesObj.currentCircleIndex - 1
  );

  const formattedCircleTimes = circlesObj.circles.map((circle) => formatTime(circle));

  const formattedTime = formatTime(time);
  const formattedCircleTime = formatTime(circleTime);

  return (
    <div className={styles.stopwatch}>
      <Dial formattedTime={formattedTime} />
      <div>
        <Button onClick={toggleDial} disabled={isRunning} text="Start" />
        <Button onClick={toggleDial} disabled={!isRunning} text="Stop" />
        <Button
          onClick={resetStopwatch}
          disabled={isInitialTime}
          text="Reset"
        />
        <Button onClick={saveCircle} text="Circle" />
      </div>
      <div>
        {circlesObj.currentCircleIndex > 0 &&
          Array.from({ length: circlesObj.currentCircleIndex }, (_, index) => {
            return (
              <Dial
                key={index + 1}
                index={index + 1}
                formattedTime={formattedCircleTimes[index] || formattedCircleTime}
              />
            );
          })}
      </div>
    </div>
  );
};
