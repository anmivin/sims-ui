import styled from "@emotion/styled";
import DefaultButton from "../../Internal/DefaultButton";
export const ButtonRoot = styled(DefaultButton)(({ theme }) => ({
  position: "relative",
  "&.small": {
    fontSize: "18px",
    height: "32px",
    minWidth: "32px",
  },
  "&.medium": {
    fontSize: "22px",
    height: "44px",
    minWidth: "44px",
  },
  "&.large": {
    fontSize: "28px",
    height: "56px",
    minWidth: "56px",
  },

  "&.fullwidth": {
    width: "100%",
  },
  "&.disabled": {
    "&.modern": {
      color: theme.color.disabledText,
      background: theme.color.disabledGradient,
    },
    "&.old": {
      color: theme.color.disabledTextOld,
      borderColor: theme.color.disabledTextOld,
      backgroundColor: "#b9bcc7",
      "&:before": {
        borderColor: theme.color.disabledTextOld,
      },
    },
  },
  "&:hover": {
    textDecoration: "none",
  },

  "&.modern": {
    color: "#0949ab",
    background: theme.color.buttonGradient,
    transition: "transform 0.1s ease-in-out",
    "&.small": {
      padding: "0 16px",
      borderRadius: "16px",
      boxShadow: "0 2px 4px 0 #606164",
    },
    "&.medium": {
      padding: "0 24px",
      borderRadius: "22px",
      boxShadow: "0 3px 5px 0 #606164",
    },
    "&.large": {
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
    "&.small": {
      padding: "0 8px",
      borderWidth: "3px",
      borderRadius: "8px",
      "&:before": {
        top: "-2px",
        bottom: "-2px",
        left: "-2px",
        right: "-2px",
        borderRadius: "7px",
        borderWidth: "1px",
      },
    },
    "&.medium": {
      padding: "0 12px",
      borderWidth: "4px",
      borderRadius: "12px",
      "&:before": {
        top: "-3px",
        bottom: "-3px",
        left: "-3px",
        right: "-3px",
        borderRadius: "11px",
        borderWidth: "2px",
      },
    },
    "&.large": {
      padding: "0 16px",
      borderWidth: "4px",
      borderRadius: "16px",
      "&:before": {
        top: "-3px",
        bottom: "-3px",
        left: "-3px",
        right: "-3px",
        borderRadius: "15px",
        borderWidth: "2px",
      },
    },
    "&:before": {
      content: '""',
      position: "absolute",
      borderColor: "#000d60",
      borderStyle: "solid",
    },
    "&:hover:before": {
      borderColor: "white",
    },
    "&:active:before": {
      borderColor: theme.color.greenBase,
    },
  },
}));

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
