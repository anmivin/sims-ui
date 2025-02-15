import styled from "@emotion/styled";

export const Scrollable = styled("div")<{ containerWidth?: number; containerHeight?: number }>(
  ({ theme, containerHeight, containerWidth }) => ({
    width: containerWidth ?? "unset",
    height: containerHeight ?? "unset",
    overflow: "auto",
    "&.old": {
      "::-webkit-scrollbar": {
        width: "20px",
        height: "20px",
        borderRadius: "4px",
      },

      "::-webkit-scrollbar-track": {
        backgroundColor: "#c5d0fe",
        width: "10px",
        borderRadius: "12px",
      },

      "::-webkit-scrollbar-thumb": {
        backgroundColor: "95A6DE",
        borderRadius: "12px",
        minHeight: "24px",
        width: "40px",
        cursor: "pointer",
        border: "4px solid #121B61",
      },
      "::-webkit-scrollbar-thumb:hover": {
        backgroundColor: "#bfff8e",
      },
      "::-webkit-scrollbar-thumb:active": {
        backgroundColor: "#CDD6FF",
      },
    },
    "&.modern": {
      "::-webkit-scrollbar": {
        width: "20px",
        height: "20px",
        borderRadius: "4px",
      },

      "::-webkit-scrollbar-track": {
        backgroundColor: theme.color.scrollBarTrack,
        width: "10px",
        borderRadius: "12px",
      },

      "::-webkit-scrollbar-thumb": {
        background: theme.color.scrollBarThumb,
        borderRadius: "12px",
        minHeight: "24px",
        width: "40px",
        cursor: "pointer",
        boxShadow: "0px 1px 2px #838487",
      },

      "::-webkit-scrollbar-thumb:hover": {
        background: theme.color.scrollBarThumbHover,
      },
      "::-webkit-scrollbar-thumb:active": {
        backgroundColor: "#56999f",
      },
    },
  })
);
