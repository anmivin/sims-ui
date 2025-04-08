import * as Styles from "./Alert.styles";
import React from "react";

import * as Types from "./Alert.types";
import IconButton from "../../Inputs/IconButton/IconButton";
import clsx from "clsx";

const InfoIcon = () => {
  return (
    <svg viewBox='0 0 24 24' width={52} fill='#dae7fd'>
      <path d='M 12 2 C 10.3 2 9 3.3 9 5 C 9 6.8 10.4 8 12 8 C 13.8 8 15 6.8 15 5 C 15 3.3 13.8 2 12 2 M 12 9 C 10.5 9 9 10 9 12 L 9 19 C 9 21 10.5 22 12 22 C 13.5 22 15 21 15 19 M 15 19 L 15 12 C 15 10 13.5 9 12 9' />
    </svg>
  );
};

const ErrorIcon = () => {
  return (
    <svg viewBox='0 0 24 24' width={52} fill='#dae7fd'>
      <path d='M 6 10 C 5 9 5 7 6 6 C 7 5 9 5 10 6 L 12 8 L 14 6 C 15 5 17 5 18 6 C 19 7 19 9 18 10 L 16 12 L 18 14 C 19 15 19 17 18 18 C 17 19 15 19 14 18 L 12 16 L 10 18 C 9 19 7 19 6 18 C 5 17 5 15 6 14 L 8 12 L 6 10' />
    </svg>
  );
};

const SuccessIcon = () => {
  return (
    <svg viewBox='0 0 24 24' width={52} fill='#dae7fd'>
      <path d='M 10 14 L 6 9 C 5 8 4 8 3 9 C 2 11 2 12 4 14 L 8 19 C 9 20 11 21 13 19 L 20 11 C 21 10 21 8 20 7 C 19 6 17 6 16 7 L 10 14' />
    </svg>
  );
};

const WarningIcon = () => {
  return (
    <svg viewBox='0 0 24 24' width={52} fill='#dae7fd'>
      <path d='M 12 22 C 13.7 22 15 20.7 15 19 C 15 17.2 13.6 16 12 16 C 10.2 16 9 17.2 9 19 C 9 20.7 10.2 22 12 22 M 12 15 C 13.5 15 15 14 15 12 L 15 5 C 15 3 13.5 2 12 2 C 10.5 2 9 3 9 5 M 9 5 L 9 12 C 9 14 10.5 15 12 15' />
    </svg>
  );
};

const iconMapping: Record<Types.Alertlevel, React.ReactNode> = {
  success: <SuccessIcon />,
  warning: <WarningIcon />,
  error: <ErrorIcon />,
  info: <InfoIcon />,
};

const AlertOld = (props: Types.AlertProps) => {
  const { children, level = "success", ...other } = props;
  return (
    <div style={{ width: "500px", display: "flex", gap: 3, flexDirection: "column" }}>
      <Styles.OldAlert {...other}>
        <Styles.Icon>{iconMapping[level]}</Styles.Icon>
        <Styles.OldAlertContent className={clsx(level)}>{children}</Styles.OldAlertContent>
      </Styles.OldAlert>
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
        <Styles.Second>
          <IconButton>
            <svg style={{ zIndex: 5 }} width='24' height='24' viewBox='0 0 24 24' fill='none'>
              <Styles.StyledPath d='M 2 2 C 3.5 0.5 6.5 0.5 8 2 L 12 6 L 16 2 C 17.5 0.5 20.5 0.5 22 2 C 23.5 3.5 23.5 6.5 22 8 L 18 12 L 22 16 C 23.5 17.5 23.5 20.5 22 22 C 20.5 23.5 17.5 23.5 16 22 L 12 18 L 8 22 C 6.5 23.5 3.5 23.5 2 22 C 0.5 20.5 0.5 17.5 2 16 L 6 12 L 2 8 C 0.5 6.5 0.5 3.5 2 2' />
            </svg>
          </IconButton>
        </Styles.Second>
        <div style={{ display: "flex", gap: 0, flexDirection: "row" }}>
          <Styles.Main />
          <Styles.Third />
        </div>
      </div>
    </div>
  );
};

export default AlertOld;
