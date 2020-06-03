import React from "react";

const Icon = ({
  width = "20",
  height = "20",
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
