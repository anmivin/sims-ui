import * as React from "react";
import { isFragment } from "react-is";
import chainPropTypes from "@mui/utils/chainPropTypes";
import composeClasses from "@mui/utils/composeClasses";

import memoTheme from "../utils/memoTheme";
import { useDefaultProps } from "../DefaultPropsProvider";
import Collapse from "../Collapse";
import Paper from "../Paper";
import AccordionContext from "./AccordionContext";
import useControlled from "../utils/useControlled";
import useSlot from "../utils/useSlot";
import accordionClasses, { getAccordionUtilityClass } from "./accordionClasses";
import styled from "@emotion/styled";

const AccordionRoot = styled(Paper)(
  memoTheme(({ theme }) => {
    const transition = {
      duration: theme.transitions.duration.shortest,
    };

    return {
      position: "relative",
      transition: theme.transitions.create(["margin"], transition),
      overflowAnchor: "none", // Keep the same scrolling position
      "&::before": {
        position: "absolute",
        left: 0,
        top: -1,
        right: 0,
        height: 1,
        content: '""',
        opacity: 1,
        backgroundColor: (theme.vars || theme).palette.divider,
        transition: theme.transitions.create(["opacity", "background-color"], transition),
      },
      "&:first-of-type": {
        "&::before": {
          display: "none",
        },
      },
      [`&.${accordionClasses.expanded}`]: {
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
      [`&.${accordionClasses.disabled}`]: {
        backgroundColor: (theme.vars || theme).palette.action.disabledBackground,
      },
    };
  }),
  memoTheme(({ theme }) => ({
    variants: [
      {
        props: (props) => !props.square,
        style: {
          borderRadius: 0,
          "&:first-of-type": {
            borderTopLeftRadius: (theme.vars || theme).shape.borderRadius,
            borderTopRightRadius: (theme.vars || theme).shape.borderRadius,
          },
          "&:last-of-type": {
            borderBottomLeftRadius: (theme.vars || theme).shape.borderRadius,
            borderBottomRightRadius: (theme.vars || theme).shape.borderRadius,
            // Fix a rendering issue on Edge
            "@supports (-ms-ime-align: auto)": {
              borderBottomLeftRadius: 0,
              borderBottomRightRadius: 0,
            },
          },
        },
      },
      {
        props: (props) => !props.disableGutters,
        style: {
          [`&.${accordionClasses.expanded}`]: {
            margin: "16px 0",
          },
        },
      },
    ],
  }))
);

const AccordionHeading = styled("h3")({
  all: "unset",
});

const Accordion = React.forwardRef(function Accordion(inProps, ref) {
  const props = useDefaultProps({ props: inProps, name: "MuiAccordion" });
  const {
    children: childrenProp,
    className,
    defaultExpanded = false,
    disabled = false,
    disableGutters = false,
    expanded: expandedProp,
    onChange,
    square = false,
    slots = {},
    slotProps = {},
    TransitionComponent: TransitionComponentProp,
    TransitionProps: TransitionPropsProp,
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

  const ownerState = {
    ...props,
    square,
    disabled,
    disableGutters,
    expanded,
  };

  const backwardCompatibleSlots = { transition: TransitionComponentProp, ...slots };
  const backwardCompatibleSlotProps = { transition: TransitionPropsProp, ...slotProps };

  const externalForwardedProps = {
    slots: backwardCompatibleSlots,
    slotProps: backwardCompatibleSlotProps,
  };

  const [AccordionHeadingSlot, accordionProps] = useSlot("heading", {
    elementType: AccordionHeading,
    externalForwardedProps,
    className: classes.heading,
    ownerState,
  });

  const [TransitionSlot, transitionProps] = useSlot("transition", {
    elementType: Collapse,
    externalForwardedProps,
    ownerState,
  });

  return (
    <AccordionRoot
      className={clsx(classes.root, className)}
      ref={ref}
      ownerState={ownerState}
      square={square}
      {...other}
    >
      <AccordionHeadingSlot {...accordionProps}>
        <AccordionContext.Provider value={contextValue}>{summary}</AccordionContext.Provider>
      </AccordionHeadingSlot>
      <TransitionSlot in={expanded} timeout='auto' {...transitionProps}>
        <div
          aria-labelledby={summary.props.id}
          id={summary.props["aria-controls"]}
          role='region'
          className={classes.region}
        >
          {children}
        </div>
      </TransitionSlot>
    </AccordionRoot>
  );
});

export default Accordion;

import { SxProps } from "@mui/system";
import { Theme } from "..";
import { TransitionProps } from "../transitions/transition";
import { AccordionClasses } from "./accordionClasses";
import { OverridableComponent, OverrideProps } from "../OverridableComponent";
import { ExtendPaperTypeMap } from "../Paper/Paper";
import { CreateSlotsAndSlotProps, SlotProps } from "../utils/types";

export interface AccordionSlots {
  /**
   * The component that renders the heading.
   * @default 'h3'
   */
  heading: React.ElementType;
  /**
   * The component that renders the transition.
   * [Follow this guide](https://mui.com/material-ui/transitions/#transitioncomponent-prop) to learn more about the requirements for this component.
   * @default Collapse
   */
  transition: React.JSXElementConstructor<
    TransitionProps & { children?: React.ReactElement<unknown, any> }
  >;
}

export type AccordionSlotsAndSlotProps = CreateSlotsAndSlotProps<
  AccordionSlots,
  {
    heading: SlotProps<
      React.ElementType<React.HTMLProps<HTMLHeadingElement>>,
      AccordionHeadingSlotPropsOverrides,
      AccordionOwnerState
    >;
    transition: SlotProps<
      React.ElementType<TransitionProps>,
      AccordionTransitionSlotPropsOverrides,
      AccordionOwnerState
    >;
  }
>;

export type AccordionTypeMap<
  AdditionalProps = {},
  RootComponent extends React.ElementType = "div"
> = ExtendPaperTypeMap<
  {
    props: AdditionalProps & {
      /**
       * The content of the component.
       */
      children: NonNullable<React.ReactNode>;
      /**
       * If `true`, expands the accordion by default.
       * @default false
       */
      defaultExpanded?: boolean;
      /**
       * If `true`, the component is disabled.
       * @default false
       */
      disabled?: boolean;
      /**
       * If `true`, expands the accordion, otherwise collapse it.
       * Setting this prop enables control over the accordion.
       */
      expanded?: boolean;
    } & AccordionSlotsAndSlotProps;
    defaultComponent: RootComponent;
  },
  "onChange" | "classes"
>;

export type AccordionProps<
  RootComponent extends React.ElementType = AccordionTypeMap["defaultComponent"],
  AdditionalProps = {}
> = OverrideProps<AccordionTypeMap<AdditionalProps, RootComponent>, RootComponent> & {
  component?: React.ElementType;
};

/**
 * @ignore - internal component.
 * @type {React.Context<{} | {expanded: boolean, disabled: boolean, toggle: () => void}>}
 */
export const AccordionContext = React.createContext({});
