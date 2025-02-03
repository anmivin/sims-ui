import * as React from "react";

import styled from "@emotion/styled";

import IconButton from "../IconButton";
import SuccessOutlinedIcon from "../internal/svg-icons/SuccessOutlined";
import ReportProblemOutlinedIcon from "../internal/svg-icons/ReportProblemOutlined";
import ErrorOutlineIcon from "../internal/svg-icons/ErrorOutline";
import InfoOutlinedIcon from "../internal/svg-icons/InfoOutlined";
import CloseIcon from "../internal/svg-icons/Close";

import { PaperProps } from "../mui/mui-material/src/Paper";

export type AlertColor = "success" | "info" | "warning" | "error";

export interface AlertProps extends Omit<PaperProps, "variant"> {
  action?: React.ReactNode;
  variant?: AlertColor;
  onClose?: (event: React.SyntheticEvent) => void;
}

const AlertRoot = styled("div")({
  backgroundColor: "transparent",
  display: "flex",
  padding: "6px 16px",
});

const AlertIcon = styled("div")({
  marginRight: 12,
  padding: "7px 0",
  display: "flex",
  fontSize: 22,
  opacity: 0.9,
});

const AlertMessage = styled("div")({
  padding: "8px 0",
  minWidth: 0,
  overflow: "auto",
});

const AlertAction = styled("div")({
  display: "flex",
  alignItems: "flex-start",
  padding: "4px 0 0 16px",
  marginLeft: "auto",
  marginRight: -8,
});

const defaultIconMapping = {
  success: <SuccessOutlinedIcon fontSize='inherit' />,
  warning: <ReportProblemOutlinedIcon fontSize='inherit' />,
  error: <ErrorOutlineIcon fontSize='inherit' />,
  info: <InfoOutlinedIcon fontSize='inherit' />,
};

const Alert = (props: AlertProps) => {
  const {
    action,
    children,
    className,
    iconMapping = defaultIconMapping,
    onClose,
    variant = "success",
    ...other
  } = props;

  return (
    <AlertRoot>
      <AlertMessage>{children}</AlertMessage>
      {action != null ? <AlertAction>{action}</AlertAction> : null}
      {action == null && onClose ? (
        <AlertAction>
          <IconButton size='small' color='inherit' onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </AlertAction>
      ) : null}
    </AlertRoot>
  );
};

export default Alert;
