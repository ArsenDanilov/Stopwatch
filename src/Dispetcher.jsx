import { useEffect, useState } from "react";
import { Dial } from "./Dial";
import { useUpdateTime } from "./useUpdateTime";

// eslint-disable-next-line react/prop-types
export const Dispetcher = ({ dispetcherState }) => {
  // eslint-disable-next-line react/prop-types
  const { isActive, isInitialTime, circleIndex } = dispetcherState;

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
    lastCircleIndex: 0,
  });

  const { lastCircleIndex } = circlesObj;

  console.log(`Current index: ${circleIndex} | last index: ${lastCircleIndex}`);

  const formatTime = (timeObject) => {
    return `${String(timeObject.minutes).padStart(2, "0")}:${String(
      timeObject.seconds
    ).padStart(2, "0")},${String(timeObject.milliseconds).padStart(2, "0")}`;
  };

  useEffect(() => {
    if (isInitialTime) {
      setTime({ minutes: 0, seconds: 0, milliseconds: 0 });
      setCircleTime({ minutes: 0, seconds: 0, milliseconds: 0 });
      setCirclesObj({ circles: [], lastCircleIndex: 0 });
    }
  }, [isInitialTime]);

  useEffect(() => {
    if (circleIndex === lastCircleIndex + 2) {
      setCirclesObj((prevCirclesObj) => ({
        circles: [...prevCirclesObj.circles, circleTime],
        lastCircleIndex: prevCirclesObj.lastCircleIndex + 1,
      }));
      setCircleTime({ minutes: 0, seconds: 0, milliseconds: 0 });
    }
  }, [circleTime, circleIndex, lastCircleIndex]);

  useUpdateTime(time, setTime, isActive);
  useUpdateTime(
    circleTime,
    setCircleTime,
    isActive && circlesObj.circles.length === circleIndex - 1
  );

  const formattedCircleTimes = circlesObj.circles.map((circle) =>
    formatTime(circle)
  );

  const formattedTime = formatTime(time);
  const formattedCircleTime = formatTime(circleTime);

  return (
    <div>
      <Dial formattedTime={formattedTime} />
      {circleIndex > 0 &&
        Array.from({ length: circleIndex }, (_, index) => {
          return (
            <Dial
              key={index + 1}
              index={index + 1}
              formattedTime={formattedCircleTimes[index] || formattedCircleTime}
            />
          );
        })}
    </div>
  );
};
