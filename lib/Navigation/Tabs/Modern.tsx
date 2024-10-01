import styled from "@emotion/styled";
import Tabs from "./Tabs";

import React from "react";

const StyledTabs = styled(Tabs)({
  ".tabs-container": {
    gap: "8px",
  },

  ".tab": {
    fontFamily: "The Sims Sans",
    fontSize: "20px",
    borderRadius: "10px 10px 0px 0px",
    color: "#0949ab",
    background: "linear-gradient(180deg, #fbfbfb 20%, #d9d9d9)",
    cursor: "pointer",
    padding: 0,
    width: "300px",
    height: "60px",
    "&:hover": {
      color: "#199c2c",
    },
  },
  ".selected": {
    background: "linear-gradient(180deg, #92ce31 20%, #3bb435)",
    color: "#fff",
    "&:hover": {
      color: "#fff",
    },
  },
});

export const ModernTabs = () => {
  const [selected, setSelected] = React.useState(0);
  const options = [
    { label: "one", value: 1 },
    { label: "two", value: 2 },
    { label: "three", value: 3 },
    { label: "four", value: 4 },
  ];

  return (
    <StyledTabs
      onChange={(val: number) => {
        setSelected(val);
      }}
      options={options}
      value={selected}
    />
  );
};
