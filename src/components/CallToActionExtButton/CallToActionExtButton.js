import React from "react";

export const CallToActionExtButton = ({
  label,
  destination,
  fullWidth,
  isActive,
}) => {
  return (
    <a
      href={destination}
      className={`${isActive ? "cursor-default bg-teal-600" : ""} ${
        fullWidth ? "block w-full" : "inline-block"
      } btn`}
    >
      {label}
    </a>
  );
};
