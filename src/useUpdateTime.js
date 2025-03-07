import { useEffect } from "react";

export const useUpdateTime = (timeObject, setTimeObject, isRunning) => {
  useEffect(() => {
    let timerIntervalId;

    if (isRunning) {
      const updateTime = () => {
        if (timeObject.milliseconds < 99) {
          setTimeObject((t) => ({ ...t, milliseconds: t.milliseconds + 1 }));
        } else {
          setTimeObject((t) => ({ ...t, milliseconds: 0 }));
          if (timeObject.seconds < 59) {
            setTimeObject((t) => ({ ...t, seconds: t.seconds + 1 }));
          } else {
            setTimeObject((t) => ({ ...t, seconds: 0 }));
            setTimeObject((t) => ({ ...t, minutes: t.minutes + 1 }));
          }
        }
      };
      timerIntervalId = setInterval(updateTime, 8);
    }

    return () => clearInterval(timerIntervalId);
  }, [timeObject, setTimeObject, isRunning]);
};
