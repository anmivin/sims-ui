import * as React from "react";
import styled from "@emotion/styled";

export interface ToggleProps {
  readonly id?: string;
  readonly className?: string;
  readonly value?: boolean;
  readonly trackSize?: string;
  readonly trackHeight?: string;
  readonly thumbSize?: string;
  readonly margin?: string;
  readonly callback?: (id: string, value: boolean) => void;
}

const ToggleComponent: React.FC<ToggleProps> = ({ id, className, value = false, callback }) => {
  return (
    <div
      data-testid={id}
      className={className}
      onClick={() => {
        if (callback && id) {
          callback(id, !value);
        }
      }}
    />
  );
};

export const Toggle = styled(ToggleComponent)<ToggleProps>`
  border-radius: 100px;
  width: ${(props) => (props.trackSize ? props.trackSize : "60px")};
  height: ${(props) => (props.trackHeight ? props.trackHeight : "20px")};
  position: relative;
  cursor: pointer;
  transition: 0.3s;
  background: ${(props) => (props.value ? `#1E1146` : "#828180")};
  margin: ${(props) => (props.margin ? props.margin : "10px 0")};

  &::after {
    content: "";
    display: block;
    border-radius: 500px;
    position: absolute;
    height: ${(props) => (props.thumbSize ? props.thumbSize : "30px")};
    width: ${(props) => (props.thumbSize ? props.thumbSize : "30px")};
    top: -5px;
    transition: 0.3s;

    background: ${(props) => (props.value ? `#5C286F` : "#B6B4B3")};
    ${(props) =>
      props.value ? `left: calc(100% - ${props.thumbSize ? props.thumbSize : "30px"})` : "left: 0"};
  }
`;

export default Toggle;
