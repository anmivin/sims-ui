import DefaultButton from "../../Internal/DefaultButton";
import styled from "@emotion/styled";

export const IconButton = styled(DefaultButton)(({ theme }) => ({
  textAlign: "center",
  flex: "0 0 auto",
  borderRadius: "50%",
  "&.small": {
    fontSize: "18px",
    height: "28px",
    width: "28px",
  },
  "&.medium": {
    fontSize: "22px",
    height: "38px",
    width: "38px",
  },
  "&.large": {
    fontSize: "28px",
    height: "48px",
    width: "48px",
  },
  "&.modern": {
    color: "#124fae",
    backgrounColor: "red",
    background: theme.color.buttonGradient,
    boxShadow: "0 4px 6px 0 #606164",

    transition: "transform 0.1s ease-in-out",
    "&.disabled": {
      color: "grey",
      background: theme.color.disabledGradient,
    },

    "&:hover": {
      color: "#199c2c",
      transform: "scale(1.02)",
    },
  },
}));
