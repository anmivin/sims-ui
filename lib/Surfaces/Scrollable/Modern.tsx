import Scrollable, { ScrollableProps } from "./Scrollable";
import styled from "@emotion/styled";
import React from "react";

const StyledScrollable = styled(Scrollable)({
  "::-webkit-scrollbar": {
    width: "20px",
    height: "20px",
    borderRadius: "4px",
  },

  "::-webkit-scrollbar-track": {
    backgroundColor: "#e4e4e4",
    width: "10px",
  },

  "::-webkit-scrollbar-thumb": {
    background: "linear-gradient(180deg, #fafbfc 20%, #e8eff2)",
    borderRadius: "12px",
    minHeight: "24px",
    width: "40px",
    cursor: "pointer",
    boxShadow: "0px 1px 2px #838487",
  },
  
  "::-webkit-scrollbar-thumb:hover": {
    background: "linear-gradient(180deg, #c7ee7d 20%, #a8e15f)",
  },
  "::-webkit-scrollbar-thumb:active": {
    backgroundColor: "#56999f",
  },
});

const ModernScrollable = (props: ScrollableProps) => {
  const { children, width, height } = props;
  return (
    <StyledScrollable width={width} height={height}>
      {children}
    </StyledScrollable>
  );
};

export default ModernScrollable;
