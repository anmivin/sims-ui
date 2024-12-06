import * as React from "react";
import styled from "@emotion/styled";

const AccordionDetailsRoot = styled("div")({
  padding: "",
});

const AccordionDetails = (props: AccordionDetailsProps) => {
  const { children, ...other } = props;

  return <AccordionDetailsRoot {...other}>{children}</AccordionDetailsRoot>;
};

export default AccordionDetails;

export interface AccordionDetailsProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * The content of the component.
   */
  children?: React.ReactNode;
}
