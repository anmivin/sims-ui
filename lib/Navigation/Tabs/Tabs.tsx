import * as React from "react";

import styled from "@emotion/styled";
import clsx from "clsx";

import Tab from "./Tab";

export interface TabsOwnProps {
  onChange?: (value: any) => void;
  orientation?: "horizontal" | "vertical";
  value?: any;
  options: { label: string; value: any }[];
}

const TabsRoot = styled("div")({
  overflow: "hidden",
  minHeight: 48,
  display: "flex",
  ".vertical": {
    flexDirection: "column",
  },
});

const FlexContainer = styled("div")({
  display: "flex",
  justifyContent: "center",
  ".vertical": {
    flexDirection: "column",
  },
});

const Tabs = (props: TabsOwnProps) => {
  const { onChange, orientation = "horizontal", value, options, ...other } = props;

  return (
    <TabsRoot className={clsx(orientation === "vertical" && "vertical")} {...other}>
      <FlexContainer className={clsx("tabs-container", orientation === "vertical" && "vertical")}>
        {options.map((option) => (
          <Tab
            label={option.label}
            value={option.value}
            selected={value === option.value}
            onClick={onChange}
          />
        ))}
      </FlexContainer>
    </TabsRoot>
  );
};

export default Tabs;
