import React from "react";

const Icon = ({
  width = "1.3rem",
  height = "1.3rem",
  fill = "currentColor",
  children,
}) => {
  return (
    <svg fill={fill} width={width} height={height} viewBox="0 0 20 20">
      {children}
    </svg>
  );
};

export default Icon;
