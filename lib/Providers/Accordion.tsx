import * as React from "react";

import useControlled from "../utils/useControlled";

import styled from "@emotion/styled";

const AccordionRoot = styled("div")({
  position: "relative",

  overflowAnchor: "none", // Keep the same scrolling position
  "&::before": {
    position: "absolute",
    left: 0,
    top: -1,
    right: 0,
    height: 1,
    content: '""',
    opacity: 1,
    backgroundColor: "",
    transition: "",
  },
  "&:first-of-type": {
    "&::before": {
      display: "none",
    },
  },
  "-expanded": {
    "&::before": {
      opacity: 0,
    },
    "&:first-of-type": {
      marginTop: 0,
    },
    "&:last-of-type": {
      marginBottom: 0,
    },
    "& + &": {
      "&::before": {
        display: "none",
      },
    },
  },
});

const AccordionHeading = styled("h3")({
  all: "unset",
});

const Accordion = React.forwardRef(function Accordion(props, ref) {
  const {
    children: childrenProp,
    className,
    defaultExpanded = false,
    disabled = false,
    disableGutters = false,
    expanded: expandedProp,
    onChange,
    ...other
  } = props;

  const [expanded, setExpandedState] = useControlled({
    controlled: expandedProp,
    default: defaultExpanded,
  });

  const handleChange = React.useCallback(
    (event) => {
      setExpandedState(!expanded);

      if (onChange) {
        onChange(event, !expanded);
      }
    },
    [expanded, onChange, setExpandedState]
  );

  const [summary, ...children] = React.Children.toArray(childrenProp);
  const contextValue = React.useMemo(
    () => ({ expanded, disabled, disableGutters, toggle: handleChange }),
    [expanded, disabled, disableGutters, handleChange]
  );

  return (
    <AccordionRoot ref={ref} square={square} {...other}>
      <AccordionHeading>
        <AccordionContext.Provider value={contextValue}>{summary}</AccordionContext.Provider>
      </AccordionHeading>
      <div role='region'>{children}</div>
    </AccordionRoot>
  );
});

export default Accordion;

export const AccordionContext = React.createContext({});
