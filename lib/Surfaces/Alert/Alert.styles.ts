import styled from "@emotion/styled";

export const ModernAlert = styled("div")(({ theme }) => ({
  width: "360px",
  color: "white",
  borderRadius: "8px",
  "&.success": {
    background: theme.color.alertSuccess,
  },
  "&.warning": {
    background: theme.color.alertWarning,
  },
  "&.info": {
    background: theme.color.alertInfo,
  },
  "&.error": {
    background: theme.color.alertError,
  },
}));

export const ModernAlertHeader = styled("div")({
  width: "100%",
  height: "40px",
  backgroundColor: "rgba(255, 255, 255, 0.3)",
  padding: "4px",
  display: "flex",
  justifyContent: "end",
});

export const ModernAlertContent = styled("div")({
  padding: "16px",
});

export const OldAlert = styled("div")({
  display: "flex",
  flexDirection: "row",
  alignItems: "end",
  gap: "8px",
  marginLeft: "42px",
  zIndex: 3,
});

export const OldAlertContent = styled("div")(() => ({
  padding: "16px",
  width: "360px",
  color: "#2f385f",
  borderRadius: "16px",
  backgroundColor: "#e3daa3",
  border: "1px solid #48320b",
  boxShadow: "0px 2px 2px 1px rgba(0,0,0,0.5)",

  "&.success, &.info": {
    backgroundColor: "#d2e3f6",
    borderColor: "#223a44",
  },
}));

export const Icon = styled("div")(() => ({
  width: "52px",
  height: "52px",
  borderRadius: "50%",
  backgroundColor: "#3a3b7c",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  boxShadow: "0px 0px 3px 2px rgba(0,0,0,0.5)",
}));

export const Main = styled("div")(({ theme }) => ({
  backgroundColor: theme.color.medium,
  width: "432px",
  height: "32px",
  borderRadius: "14px 0px 0px 14px",
  border: `2px solid ${theme.color.dark}`,
  borderRight: "none",
}));
export const Second = styled("div")(({ theme }) => ({
  backgroundColor: theme.color.medium,
  width: "40px",
  height: "42px",
  borderRadius: "14px 14px 0px 0px",
  border: "2px solid #444A73",
  borderBottom: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));
export const Third = styled("div")(({ theme }) => ({
  backgroundColor: theme.color.medium,
  width: "40px",
  height: "32px",
  borderBottomRightRadius: "14px",
  border: "2px solid #444A73",
  borderTop: "none",
  borderLeft: "none",
}));

export const StyledPath = styled("path")(() => ({
  fill: "#A9BCFF",
  stroke: "#162C88",
  strokeWidth: 2,
  "&:hover": {
    fill: "#d2e3f6",
  },
}));
