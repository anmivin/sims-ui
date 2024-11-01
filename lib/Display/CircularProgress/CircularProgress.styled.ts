import styled from "@emotion/styled";
import { css } from "@emotion/react";


const createStyles = () => {
  let styles = '';

  for (let i = 1; i < 9; i += 1) {
    styles += `
       .path_0${i} {
         animation: change-path_0${i} 1.5s linear infinite;
         fill: white;
       }
     `;
  }

  return css`
    ${styles}
  `;
};

export const StyledModernSpinner = styled("svg")({
  ...createStyles(),
   "@keyframes change-path_01": {
    "100%": {
      fill: "#46ddf0",
    },

    "88%": {
      fill: "#70e7fb",
    },

    "75%": {
      fill: "#b2f4f3",
    },

    "63%": {
      fill: "#c2fde9",
    },

    "50%": {
      fill: " #93e8a7",
    },

    "38%": {
      fill: "#46d147",
    },

    "25%": {
      fill: "#39c359",
    },

    "13%": {
      fill: "#3bd0b0",
    },
    "0%": {
      fill: "#46ddf0",
    },
  },
  "@keyframes change-path_02": {
    "100%": {
      fill: "#70e7fb",
    },
    "88%": {
      fill: "#b2f4f3",
    },

    "75%": {
      fill: "#c2fde9",
    },

    "63%": {
      fill: " #93e8a7",
    },

    "50%": {
      fill: "#46d147",
    },

    "38%": {
      fill: "#39c359",
    },

    "25%": {
      fill: "#3bd0b0",
    },

    "13%": {
      fill: "#46ddf0",
    },

    "0%": {
      fill: "#70e7fb",
    },
  },
  "@keyframes change-path_03": {
    "100%": {
      fill: "#b2f4f3",
    },

    "88%": {
      fill: "#c2fde9",
    },

    "75%": {
      fill: "#93e8a7",
    },
    "63%": {
      fill: "#46d147",
    },

    "50%": {
      fill: "#39c359",
    },

    "38%": {
      fill: "#3bd0b0",
    },

    "25%": {
      fill: "#46ddf0",
    },

    "13%": {
      fill: "#70e7fb",
    },

    "0%": {
      fill: "#b2f4f3",
    },
  },
  "@keyframes change-path_04": {
    "100%": {
      fill: "#c2fde9",
    },
    "88%": {
      fill: "#93e8a7",
    },

    "75%": {
      fill: "#46d147",
    },

    "63%": {
      fill: "#39c359",
    },

    "50%": {
      fill: "#3bd0b0",
    },

    "38%": {
      fill: "#46ddf0",
    },

    "25%": {
      fill: "#70e7fb",
    },

    "13%": {
      fill: "#b2f4f3",
    },

    "0%": {
      fill: "#c2fde9",
    },
  },
  "@keyframes change-path_05": {
    "100%": {
      fill: "#93e8a7",
    },
    "88%": {
      fill: "#46d147",
    },

    "75%": {
      fill: "#39c359",
    },

    "63%": {
      fill: "#3bd0b0",
    },

    "50%": {
      fill: "#46ddf0",
    },

    "38%": {
      fill: "#70e7fb",
    },

    "25%": {
      fill: "#b2f4f3",
    },

    "13%": {
      fill: "#c2fde9",
    },

    "0%": {
      fill: " #93e8a7",
    },
  },
  "@keyframes change-path_06": {
    "100%": {
      fill: "#46d147",
    },
    "88%": {
      fill: "#39c359",
    },

    "75%": {
      fill: "#3bd0b0",
    },

    "63%": {
      fill: "#46ddf0",
    },

    "50%": {
      fill: "#70e7fb",
    },

    "38%": {
      fill: "#b2f4f3",
    },

    "25%": {
      fill: "#c2fde9",
    },

    "13%": {
      fill: "#93e8a7",
    },
    "0%": {
      fill: "#46d147",
    },
  },
  "@keyframes change-path_07": {
    "100%": {
      fill: "#39c359",
    },
    "88%": {
      fill: "#3bd0b0",
    },

    "75%": {
      fill: "#46ddf0",
    },

    "63%": {
      fill: "#70e7fb",
    },

    "50%": {
      fill: "#b2f4f3",
    },

    "38%": {
      fill: "#c2fde9",
    },

    "25%": {
      fill: "#93e8a7",
    },

    "13%": {
      fill: "#46d147",
    },

    "0%": {
      fill: "#39c359",
    },
  },
  "@keyframes change-path_08": {
    "100%": {
      fill: "#3bd0b0",
    },
    "88%": {
      fill: "#46ddf0",
    },

    "75%": {
      fill: "#70e7fb",
    },

    "63%": {
      fill: "#b2f4f3",
    },

    "50%": {
      fill: "#c2fde9",
    },

    "38%": {
      fill: " #93e8a7",
    },

    "25%": {
      fill: "#46d147",
    },

    "13%": {
      fill: "#39c359",
    },

    "0%": {
      fill: "#3bd0b0",
    },
  },
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
