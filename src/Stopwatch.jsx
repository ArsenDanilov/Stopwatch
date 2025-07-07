import { useCallback, useRef, useState } from "react";
import { Dial } from "./Dial";
import { Button } from "./Button";
import styles from "./stopwatch.module.css";
import { useUpdateTime } from "./useUpdateTime";

export const Stopwatch = () => {
  const INITIALSTATE = {
    minutes: 0,
    seconds: 0,
    milliseconds: 0,
  };

  const [time, setTime] = useState(INITIALSTATE);

  const [circleTime, setCircleTime] = useState(INITIALSTATE);

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
    setTime(INITIALSTATE);
    setCircleTime(INITIALSTATE);
    setCirclesObj({ circles: [], currentCircleIndex: 0 });
    setIsRunning(false);
  }, []);

  const circleTimeRef = useRef(circleTime);
  circleTimeRef.current = circleTime;

  const saveCircle = useCallback(() => {
    setCirclesObj((prevCirclesObj) => ({
      circles: [...prevCirclesObj.circles, circleTimeRef.current],
      currentCircleIndex: prevCirclesObj.currentCircleIndex + 1,
    }));
    setCircleTime(INITIALSTATE);
  }, []);

  useUpdateTime(time, setTime, isRunning);
  useUpdateTime(
    circleTime,
    setCircleTime,
    isRunning && circlesObj.circles.length === circlesObj.currentCircleIndex - 1
  );

  const formattedCircleTimes = circlesObj.circles.map((circle) =>
    formatTime(circle)
  );

  const formattedTime = formatTime(time);
  const formattedCircleTime = formatTime(circleTime);

  return (
    <div className={styles.stopwatch}>
      <Dial formattedTime={formattedTime} />
      <div>
        <Button onClick={toggleDial} text={isRunning ? 'Stop' : 'Start'} />
        <Button
          onClick={resetStopwatch}
          disabled={isInitialTime}
          text="Reset"
        />
        <Button onClick={saveCircle} text="Circle" disabled={!isRunning}/>
      </div>
      <div>
        {circlesObj.currentCircleIndex > 0 &&
          Array.from({ length: circlesObj.currentCircleIndex }, (_, index) => {
            return (
              <Dial
                key={index + 1}
                index={index + 1}
                formattedTime={
                  formattedCircleTimes[index] || formattedCircleTime
                }
              />
            );
          })}
      </div>
    </div>
  );
};
