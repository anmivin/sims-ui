import styled from "@emotion/styled";
import React from "react";

import { OldButton } from "sims-ui";

import InfoIcon from "../../icons/Old/InfoIcon";
const StyledContainer = styled("div")({
  display: "flex",
  flexDirection: "row",
  alignItems: "end",
  gap: "8px",
  marginLeft: "42px",
  zIndex: 3,
});

const Content = styled("div")(({ theme }) => ({
  padding: "16px",
  width: "360px",
  color: "white",
  borderRadius: "16px",
  backgroundColor: theme.color.alertBrown,
  border: "1px solid #9B8752",
  boxShadow: "0px 2px 2px 1px rgba(0,0,0,0.5)",
}));

const Icon = styled("div")(({ theme }) => ({
  width: "52px",
  height: "52px",
  borderRadius: "50%",
  backgroundColor: "#3a3b7c",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const Main = styled("div")(({ theme }) => ({
  backgroundColor: theme.color.medium,
  width: "432px",
  height: "32px",
  borderRadius: "14px 0px 0px 14px",
  border: `2px solid ${theme.color.dark}`,
  borderRight: "none",
}));
const Second = styled("div")({
  backgroundColor: "#83a4fb",
  width: "40px",
  height: "42px",
  borderRadius: "14px 14px 0px 0px",
  border: "2px solid #444A73",
  borderBottom: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});
const Third = styled("div")({
  backgroundColor: "#83a4fb",
  width: "40px",
  height: "32px",
  borderBottomRightRadius: "14px",
  border: "2px solid #444A73",
  borderTop: "none",
  borderLeft: "none",
});

const StyledPath = styled("path")(({ theme }) => ({
  cursor: "pointer",
  fill: "#A9BCFF",
  stroke: "#162C88",
  strokeWidth: 2,
  "&:hover": {
    fill: "#199c2c",
    /*     transform: "scale(1.02)", */
  },
}));
export const AlertOld = ({
  children,
  action,
}: {
  children: React.ReactNode;
  action?: () => void;
}) => {
  return (
    <div style={{ width: "500px", display: "flex", gap: 3, flexDirection: "column" }}>
      <StyledContainer>
        <Icon>
          <InfoIcon size={52} color='#dae7fd' />
        </Icon>
        <Content>
          {/*  <IconButtonModern>
          <CloseIcon color='#9f1a1f' />
        </IconButtonModern> */}
          {children}
          {action && <OldButton />}
        </Content>
      </StyledContainer>
      <div
        style={{
          position: "relative",
          top: "-68px",
          display: "flex",
          gap: 0,
          flexDirection: "column",
          alignItems: "end",
        }}
      >
        <Second>
          <svg style={{ zIndex: 5 }} width='24' height='24' viewBox='0 0 24 24' fill='none'>
            <StyledPath d='M 2 2 C 3.5 0.5 6.5 0.5 8 2 L 12 6 L 16 2 C 17.5 0.5 20.5 0.5 22 2 C 23.5 3.5 23.5 6.5 22 8 L 18 12 L 22 16 C 23.5 17.5 23.5 20.5 22 22 C 20.5 23.5 17.5 23.5 16 22 L 12 18 L 8 22 C 6.5 23.5 3.5 23.5 2 22 C 0.5 20.5 0.5 17.5 2 16 L 6 12 L 2 8 C 0.5 6.5 0.5 3.5 2 2' />
          </svg>
        </Second>
        <div style={{ display: "flex", gap: 0, flexDirection: "row" }}>
          <Main />
          <Third />
        </div>
      </div>

      {/* <div style={{ display: "flex" }}>

        <StyledSvg width='402' height='78' viewBox='0 0 402 78' fill='none'>
          <g>
            <path
              d='M 400.5 9 C 400.5 5.134 397.366 2 393.5 2 H 371.5 C 367.634 2 364.5 5.134 364.5 9 V 39 C 364.5 42.866 361.366 46 357.5 46 H 9 C 5.134 46 2 49.134 2 53 V 68 C 2 71.866 5.134 75 9 75 H 393.5 C 397.366 75 400.5 71.866 400.5 68 V 9 Z'
              fill='#6A7BD0'
              fillOpacity='0.8'
              stroke='#444A73'
              stroke-width='2'
            />
          </g>
        </StyledSvg>
      </div> */}
    </div>
  );
};
