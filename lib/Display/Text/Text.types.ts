import { Variant } from "../../shared/types";
export enum TextVariant {
  body1 = "body1",
  body2 = "body2",
  body3 = "body3",
  subtitle1 = "subtitle1",
  subtitle2 = "subtitle2",
  button = "button",
  caption = "caption",
  mini = "mini",
}

export enum TitleVariant {
  h1 = "h1",
  h2 = "h2",
  h3 = "h3",
  h4 = "h4",
  h5 = "h5",
  h6 = "h6",
}

export type TextType = keyof typeof TextVariant;

export type TitleType = keyof typeof TitleVariant;

export interface TextProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: string;
  type: TextType | TitleType;
  variant?: Variant;
  noWrap?: boolean;
}
