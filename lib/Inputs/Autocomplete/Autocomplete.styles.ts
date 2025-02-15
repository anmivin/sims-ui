import styled from "@emotion/styled";
import Popper from "../../Internal/Popper";

export const AutocompletePopper = styled(Popper)<{ textfieldWidth?: number }>(
  ({ textfieldWidth }) => ({
    width: textfieldWidth ? `${textfieldWidth - 10}px` : "unset",
  })
);

export const AutocompleteStartAdornment = styled("p")({
  width: "fit-content",
  margin: 0,
});

export const AutocompleteEndAdornment = styled("div")({
  display: "flex",
  gap: 4,
});

export const AutocompleteNoOptions = styled("div")({
  color: "",
  padding: "14px 16px",
});
export const AutocompletePaper = styled("div")<{ textfieldWidth?: number }>(
  ({ theme, textfieldWidth }) => ({
    display: "flex",
    flexDirection: "column",
    width: textfieldWidth ? `${textfieldWidth}px` : "unset",
    "&.modern": {
      color: "blue",
      border: `1px solid ${theme.color.tooltipBorder}`,
      boxShadow: "0 4px 6px 0 #606164",
      background: theme.color.tooltipGradient,
    },
    "&.old": {
      color: "#050a67",
      border: "1px solid #4c63a3",
      boxShadow: "0 4px 6px 0 #606164",
      backgroundColor: "#94abdd",
    },
  })
);

export const AutocompleteOption = styled("li")(({ theme }) => ({
  listStyleType: "none",
  cursor: "pointer",
  padding: "8px 16px",
  display: "flex",
  overflow: "hidden",
  justifyContent: "flex-start",
  alignItems: "center",
  "&.disabled": {
    opacity: 0.5,
    pointerEvents: "none",
  },

  "&.modern": {
    ":not(:first-child)": {
      borderTop: "1px solid #d9d9d9",
    },

    "&.selected": {
      color: theme.color.green,
    },
  },
  "&.old": {
    "&.selected": {
      backgroundColor: "#CDD6FF",
    },
  },
}));
