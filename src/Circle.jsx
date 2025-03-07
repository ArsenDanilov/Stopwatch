/* eslint-disable react/prop-types */
import { Dial } from "./Dial";

export const Circle = ({ formattedCircleTime, index }) => {

  return (
    <div>
      Circle {index}: <Dial formattedTime={formattedCircleTime} />
    </div>
  );
};
