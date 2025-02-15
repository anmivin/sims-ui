import styled from "@emotion/styled";

const grad = `
linear-gradient(to top,
hsl(0deg 100% 0%), 
hsl(0deg 0% 0% / 0%),
hsl(0deg 100% 100%)
),
linear-gradient(to right,
hsl(0deg 100% 50%), 
hsl(60deg 100% 50%),
hsl(120deg 100% 50%),
hsl(180deg 100% 50%),
hsl(240deg 100% 50%),
hsl(300deg 100% 50%),
hsl(360deg 100% 50%)
)`;

export const ColorInput = styled("div")({
  width: "500px",
  height: "500px",
  background: grad,
});

export const Picker = styled("div")({
  position: "fixed",
  width: "20px",
  height: "20px",
  backgroundColor: "trasparent",
  borderRadius: "50%",
  border: "2px solid white",
  boxShadow: "inset 0px 0px 4px black, 0px 0px 4px black",
});
