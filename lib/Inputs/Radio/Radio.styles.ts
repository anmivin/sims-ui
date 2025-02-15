import styled from "@emotion/styled";

export const RadioGroupRoot = styled("div")({
  display: "flex",
  flexDirection: "column",
  flexWrap: "wrap",
  "&.row": {
    flexDirection: "row",
  },
});

export const RadioGroupItem = styled("div")({
  display: "flex",
  gap: "10px",
});

export const RadioLable = styled("p")(({ theme }) => ({
  "&.disabled": {
    color: theme.color.disabledText,
  },
}));
