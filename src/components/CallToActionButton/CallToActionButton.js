import { Link } from "gatsby";
import React from "react";

export const CallToActionButton = ({
  label,
  destination,
  fullWidth,
  isActive,
}) => {
  return (
    <Link
      to={destination}
      className={`${isActive ? "cursor-default bg-teal-600" : ""} ${
        fullWidth ? "block w-full" : "inline-block"
      } btn`}
    >
      {label}
    </Link>
  );
};
