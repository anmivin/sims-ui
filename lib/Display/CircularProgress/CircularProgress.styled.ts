import styled from "@emotion/styled";
import { css } from "@emotion/react";

const colorArray = [
  "#46ddf0",
  "#3bd0b0",
  "#39c359",
  "#46d147",
  "#93e8a7",
  "#c2fde9",
  "#b2f4f3",
  "#70e7fb",
];

const getColor = (i: number, pos: number) => {
  if (i + pos < colorArray.length) return colorArray[i + pos];
  else return colorArray[i + pos - colorArray.length];
};

const createSpinnerStyles = () => {
  let styles = "";

  for (let i = 0; i < 8; i += 1) {
    styles += `
       .path_0${i + 1} {
         animation: change-path_0${i + 1} 1.5s linear infinite;
       }
         @keyframes change-path_0${i + 1} {
         0% {fill: ${getColor(i, 0)}}
         13% {fill: ${getColor(i, 1)}}
         25% {fill: ${getColor(i, 2)}}
         38% {fill: ${getColor(i, 3)}}
         50% {fill: ${getColor(i, 4)}}
         63% {fill: ${getColor(i, 5)}}
         75% {fill: ${getColor(i, 6)}}
         88% {fill: ${getColor(i, 7)}}
         100% {fill: ${getColor(i, 0)}}         
         }
     `;
  }

  return css`
    ${styles}
  `;
};

export const StyledModernSpinner = styled("svg")({
  ...createSpinnerStyles(),
});

export const StyledOldSpinner = styled("svg")({
  filter:
    "drop-shadow(1px 0 0 #13192e) drop-shadow(-1px 0 0 #13192e) drop-shadow(0 1px 0 #13192e) drop-shadow(0 -1px 0 #13192e)",
  ".contour": {
    transformOrigin: "50% 50%",
    animation: "change-contour 3s linear infinite",
  },

  ".hourglass_1": {
    animation: "change-hourglass_1 3s linear infinite",
  },
  ".hourglass_2": {
    animation: "change-hourglass_2 3s linear infinite",
  },

  ".hourglass_3": {
    transformOrigin: "50% 50%",
    animation: "change-hourglass_3 3s linear infinite",
  },

  "@keyframes change-contour": {
    "0%": {
      transform: "rotate(0deg)",
    },
    "60%": {
      transform: "rotate(0deg)",
    },
    "100%": {
      transform: "rotate(180deg)",
    },
  },

  "@keyframes change-hourglass_1": {
    "0%": {
      opacity: 0,
    },
    "10%": {
      opacity: 1,
    },
    "20%": {
      opacity: 1,
    },
    "30%": {
      opacity: 0,
    },

    "100%": {
      opacity: 0,
    },
  },
  "@keyframes change-hourglass_2": {
    "0%": {
      opacity: 0,
    },
    "20%": {
      opacity: 0,
    },
    "30%": {
      opacity: 1,
    },
    "40%": {
      opacity: 1,
    },
    "50%": {
      opacity: 0,
    },
    "100%": {
      opacity: 0,
    },
  },
  "@keyframes change-hourglass_3": {
    "0%": {
      opacity: 1,
      transform: "rotate(180deg)",
    },
    "10%": {
      opacity: 0,
      transform: "rotate(180deg)",
    },
    "20%": {
      opacity: 0,
      transform: "rotate(0deg)",
    },
    "40%": {
      opacity: 0,
      transform: "rotate(0deg)",
    },
    "50%": {
      opacity: 1,
      transform: "rotate(0deg)",
    },
    "60%": {
      opacity: 1,
      transform: "rotate(0deg)",
    },
    "100%": {
      opacity: 1,
      transform: "rotate(180deg)",
    },
  },
});
