import * as React from "react";
import styled from "@emotion/styled";

const grad = `
linear-gradient(to top,
hsl(0deg 100% 0%), 
hsl(0deg 0% 0% / 10%),
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
export const StyledContainer = styled("div")({
  border: "1px solid blue",
  width: "500px",
  height: "500px",
  background: grad,
  cursor: "crosshair",
});

const ColorInput = () => {
  const [curr, setCurr] = React.useState<string>("");
  return (
    <>
      <div style={{ width: "50px", height: "50px", border: "1px solid black", background: curr }} />
      <StyledContainer
        onClick={(e) => {
          const hue = Math.round((360 * e.clientX) / e.currentTarget.offsetWidth);
          const lightnes =
            100 -
            Math.round(
              ((e.clientY - e.currentTarget.offsetTop) * 100) / e.currentTarget.offsetHeight
            );
          setCurr(`hsl(${hue}deg 100% ${lightnes}%)`);
        }}
      />
    </>
  );
};

export default ColorInput;
