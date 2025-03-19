import { Button } from "./Button";
import { Dispetcher } from "./Dispetcher";
import styles from "./stopwatch.module.css";
import { useState } from "react";

export const Stopwatch = () => {
  const [dispetcherState, setDispetcherState] = useState({
    isActive: false,
    isInitialTime: true,
    circleIndex: 0,
  });

  const { isActive, isInitialTime, circleIndex } = dispetcherState;

  const toggleStopwatch = () => {
    setDispetcherState((prevDispetcherState) => ({
      ...prevDispetcherState,
      isActive: !prevDispetcherState.isActive,
      isInitialTime: false,
    }));

    if (!isActive && circleIndex === 0) {
      setDispetcherState((prevDispetcherState) => ({
        ...prevDispetcherState,
        circleIndex: 1,
      }));
    }
  };

  const resetStopwatch = () => {
    setDispetcherState({
      isActive: false,
      isInitialTime: true,
      circleIndex: 0,
    });
  };

  const saveCircle = () => {
    setDispetcherState((prevDispetcherState) => ({
      ...prevDispetcherState,
      circleIndex: prevDispetcherState.circleIndex + 1,
    }));
  };

  return (
    <div className={styles.stopwatch}>
      <div>
        <Button onClick={toggleStopwatch} text={isActive ? "Stop" : "Start"} />
        <Button
          onClick={resetStopwatch}
          disabled={isInitialTime}
          text="Reset"
        />
        <Button onClick={saveCircle} disabled={isInitialTime} text="Circle" />
      </div>
      <Dispetcher dispetcherState={dispetcherState} />
    </div>
  );
};
