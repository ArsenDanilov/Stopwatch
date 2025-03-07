/* eslint-disable react/prop-types */

export const Dial = ({ formattedTime, index }) => {

  if (index !== undefined) {
    return (
      <div>
        Circle {index}: {formattedTime}
      </div>
    );
  }

  return <p>{formattedTime}</p>;
};
