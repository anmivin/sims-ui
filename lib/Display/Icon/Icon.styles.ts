import styled from "@emotion/styled";
import { colors, Color } from "../../Providers/Theme/color";

export const Svg = styled("svg")<{ isFilledIcon?: boolean; color?: string }>(
  ({ theme, isFilledIcon, color }) => {
    const iconColor = color
      ? Object.keys(colors).includes(color)
        ? theme.color[color as keyof Color]
        : color
      : "currentColor";
    return {
      fill: isFilledIcon ? iconColor : "none",
      stroke: isFilledIcon ? "none" : iconColor,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      strokeWidth: 2,
    };
  }
);
