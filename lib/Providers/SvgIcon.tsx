
import * as React from "react";
import capitalize from "../utils/capitalize";
import styled from "@emotion/styled";
import memoTheme from "../utils/memoTheme";
import { useDefaultProps } from "../DefaultPropsProvider";
import { getSvgIconUtilityClass } from "./svgIconClasses";

const SvgIconRoot = styled("svg")(
{
    userSelect: "none",
    width: "1em",
    height: "1em",
    display: "inline-block",
    flexShrink: 0,
    transition: theme.transitions?.create?.("fill", {
      duration: (theme.vars ?? theme).transitions?.duration?.shorter,
    }),
    variants: [
      {
        props: (props) => !props.hasSvgAsChild,
        style: {
          // the <svg> will define the property that has `currentColor`
          // for example heroicons uses fill="none" and stroke="currentColor"
          fill: "currentColor",
        },
      },
      {
        props: { fontSize: "inherit" },
        style: { fontSize: "inherit" },
      },
      {
        props: { fontSize: "small" },
        style: { fontSize: theme.typography?.pxToRem?.(20) || "1.25rem" },
      },
      {
        props: { fontSize: "medium" },
        style: { fontSize: theme.typography?.pxToRem?.(24) || "1.5rem" },
      },
      {
        props: { fontSize: "large" },
        style: { fontSize: theme.typography?.pxToRem?.(35) || "2.1875rem" },
      },
      // TODO v5 deprecate color prop, v6 remove for sx
      ...Object.entries((theme.vars ?? theme).palette)
        .filter(([, value]) => value && value.main)
        .map(([color]) => ({
          props: { color },
          style: { color: (theme.vars ?? theme).palette?.[color]?.main },
        })),
      {
        props: { color: "action" },
        style: { color: (theme.vars ?? theme).palette?.action?.active },
      },
      {
        props: { color: "disabled" },
        style: { color: (theme.vars ?? theme).palette?.action?.disabled },
      },
      {
        props: { color: "inherit" },
        style: { color: undefined },
      },
    ],
  });

const SvgIcon = (props: SvgIconOwnProps) => {

  const {
    children,
    htmlColor,
    viewBox = "0 0 24 24",
    ...other
  } = props;

  const hasSvgAsChild = React.isValidElement(children) && children.type === "svg";

  return (
    <SvgIconRoot
      viewBox={viewBox}
      focusable='false'
      color={htmlColor}
      {...other}
    >
      {hasSvgAsChild ? children.props.children : children}

    </SvgIconRoot>
  );
};

export default SvgIcon;

export interface SvgIconOwnProps {
  /**
   * Node passed into the SVG element.
   */
  children?: React.ReactNode;

  /**
   * Applies a color attribute to the SVG element.
   */
  htmlColor?: string;

  /**
   * Allows you to redefine what the coordinates without units mean inside an SVG element.
   * For example, if the SVG element is 500 (width) by 200 (height),
   * and you pass viewBox="0 0 50 20",
   * this means that the coordinates inside the SVG will go from the top left corner (0,0)
   * to bottom right (50,20) and each unit will be worth 10px.
   * @default '0 0 24 24'
   */
  viewBox?: string;
}
