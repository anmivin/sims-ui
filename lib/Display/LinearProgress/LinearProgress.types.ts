export interface LinearProgressProps
  extends Omit<React.HTMLAttributes<HTMLSpanElement>, "children"> {
  value?: number;
  variant?: "determinate" | "indeterminate";
}
