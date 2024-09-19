import React from "react";

export interface ScrollableProps {
  children: React.ReactNode;
  width?: number;
  height?: number;
}
const Scrollable = (props: ScrollableProps) => {
  const { children, width, height } = props;
  return <div style={{ width, height, overflow: "auto" }}>{children}</div>;
};

export default Scrollable;
