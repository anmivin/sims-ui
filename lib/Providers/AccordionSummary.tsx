import * as React from "react";

import styled from "@emotion/styled";

import ButtonBase from "../Internal/ButtonBase";
import AccordionContext from "./Accordion";

const AccordionSummaryRoot = styled(ButtonBase)({
  display: "flex",
  minHeight: 48,
  "-disabled": {
    opacity: 0.5,
  },
  ":hover:not(-disabled)": {
    cursor: "pointer",
  },
});
const AccordionSummaryContent = styled("div")({
  display: "flex",
  flexGrow: 1,
  margin: "12px 0",
});

const AccordionSummaryExpandIconWrapper = styled("div")({
  display: "flex",
  transform: "rotate(0deg)",
  expanded: {
    transform: "rotate(180deg)",
  },
});

const AccordionSummary = (props: AccordionSummaryOwnProps) => {
  const { children, expandIcon, onClick, ...other } = props;

  const { disabled = false, disableGutters, expanded, toggle } = React.useContext(AccordionContext);
  const handleChange = (event) => {
    if (toggle) {
      toggle(event);
    }
    if (onClick) {
      onClick(event);
    }
  };

  return (
    <AccordionSummaryRoot
      disabled={disabled}
      aria-expanded={expanded}
      onClick={handleChange}
      {...other}
    >
      <AccordionSummaryContent>{children}</AccordionSummaryContent>
      {expandIcon && (
        <AccordionSummaryExpandIconWrapper>{expandIcon}</AccordionSummaryExpandIconWrapper>
      )}
    </AccordionSummaryRoot>
  );
};

export default AccordionSummary;

export interface AccordionSummaryOwnProps {
  /**
   * The content of the component.
   */
  children?: React.ReactNode;
  /**
   * The icon to display as the expand indicator.
   */
  expandIcon?: React.ReactNode;
}
