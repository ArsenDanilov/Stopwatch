/* eslint-disable react/prop-types */

// eslint-disable-next-line react/display-name
export const Dial = ({ formattedTime, index }) => {
  return (
    <div>
      <div>
        {index !== undefined
          ? `Circle ${index}: ${formattedTime}`
          : formattedTime}
      </div>
    </div>
  );
};
