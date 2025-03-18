/* eslint-disable react/prop-types */

import { memo } from "react";

// eslint-disable-next-line react/display-name
export const Dial = memo(({ formattedTime, index }) => {
  return (
    <div>
      <div>
        {index !== undefined
          ? `Circle ${index}: ${formattedTime}`
          : formattedTime}
      </div>
    </div>
  );
});
