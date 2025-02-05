import styled from "@emotion/styled";

export const ButtonRoot = styled("button")({
  /*   display: "inline-flex", */
  alignItems: "center",
  justifyContent: "center",
  outline: 0,
  border: 0,
  margin: 0,
  padding: 0,
  cursor: "pointer",
  textDecoration: "none",

  "&.s": {
    fontSize: "18px",
    height: "32px",
    minWidth: "32px",
  },
  "&.m": {
    fontSize: "22px",
    height: "44px",
    minWidth: "44px",
  },
  "&.l": {
    fontSize: "28px",
    height: "56px",
    minWidth: "56px",
  },

  "&.fullwidth": {
    width: "100%",
  },
  "&.disabled": {
    pointerEvents: "none",
    cursor: "default",
  },
  "&:hover": {
    textDecoration: "none",
  },

  "&.modern": {
    color: "#0949ab",
    background: "linear-gradient(180deg, #fbfbfb 20%, #d9d9d9)",
    transition: "transform 0.1s ease-in-out",
    "&.s": {
      padding: "0 16px",
      borderRadius: "16px",
      boxShadow: "0 2px 4px 0 #606164",
    },
    "&.m": {
      padding: "0 24px",
      borderRadius: "22px",
      boxShadow: "0 3px 5px 0 #606164",
    },
    "&.l": {
      padding: "0 32px",
      borderRadius: "28px",
      boxShadow: "0 4px 6px 0 #606164",
    },
    "&:hover": {
      color: "#199c2c",
      transform: "scale(1.02)",
    },

    "&:active": {
      color: "#006634",
      background: "linear-gradient(180deg, #e1e1e1 20%, #c3c3c3)",
    },
  },

  "&.old": {
    color: "#100d60",
    borderColor: "#000d60",
    borderStyle: "solid",
    backgroundColor: "#95a6de",
    "&.s": {
      padding: "0 8px",
      borderWidth: "2px",
      borderRadius: "8px",
    },
    "&.m": {
      padding: "0 12px",
      borderWidth: "3px",
      borderRadius: "12px",
    },
    "&.l": {
      padding: "0 16px",
      borderWidth: "4px",
      borderRadius: "16px",
    },
    /*     "&:before": {
      content: '""',
      position: "absolute",
      top: "0px",
      left: "0px",
      width: "100%",
      height: "100%",
      border: "2px solid #000d60",
      borderRadius: "14px",
    }, */
    "&:hover:before": {
      border: "2px solid white",
    },
    "&:active:before": {
      border: "2px solid #00ff00",
    },
  },
});

export const ButtonStartIcon = styled("span")({
  display: "inherit",
  marginRight: 8,
  marginLeft: -4,
});

export const ButtonEndIcon = styled("span")({
  display: "inherit",
  marginRight: -4,
  marginLeft: 8,
});
