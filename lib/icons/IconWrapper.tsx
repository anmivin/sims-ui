import { FC, HTMLAttributes, ReactNode } from 'react';
import styled from '@emotion/styled';


export interface IconProps extends HTMLAttributes<SVGSVGElement> {
  size?: number;
  viewBox?: string;
  color?: string;
  isLineIcon?: boolean;
  responsive?: boolean;
  children?: ReactNode;
}
export type IconComponent = FC<IconProps>;

const IconWrapper: IconComponent = ({
  size = 24,
  viewBox = '0 0 24 24',
  color,
  children,
  responsive,
  ...rest
}: IconProps) => {
  return (
    <StyledSvg
      {...rest}
      width={responsive ? '100%' : size}
      height={responsive ? undefined : size}
      responsive={responsive}
      viewBox={viewBox}
      color={color}
    >
      {children}
    </StyledSvg>
  );
};

const StyledSvg = styled('svg')<IconProps>`
  ${({ isLineIcon, color, responsive }) => {
  const cssColor = color ?? 'currentColor'

    return isLineIcon
      ? `
          fill: none;
          stroke: ${cssColor};
          stroke-width: 2;
          max-height: ${responsive ? '100%' : ''};
            stroke-linecap: round;
  stroke-linejoin: round;
        `
      : `
    /*       fill: ${cssColor}; */

          max-height: ${responsive ? '100%' : ''};
        `;
  }}
`;

export default IconWrapper;
