export const useFormatTime = (timeObject) => {
    return `${String(timeObject.minutes).padStart(2, "0")}:${String(
        timeObject.seconds
      ).padStart(2, "0")},${String(timeObject.milliseconds).padStart(2, "0")}`;
};
