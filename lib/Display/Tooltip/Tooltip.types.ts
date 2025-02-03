import * as React from "react";

export interface TooltipProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  children: React.ReactNode;
  placement?: "bottom" | "left" | "right" | "top";
  title: React.ReactNode;
}
