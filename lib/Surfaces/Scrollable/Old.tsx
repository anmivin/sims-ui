import Scrollable, { ScrollableProps } from "./Scrollable";
import styled from "@emotion/styled";

const StyledScrollable = styled(Scrollable)({
  "::-webkit-scrollbar": {
    width: "20px",
    height: "20px",
    borderRadius: "4px",
  },

  "::-webkit-scrollbar-track": {
    backgroundColor: "#c5d0fe",
    width: "10px",
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
});
const OldScrollable = (props: ScrollableProps) => {
  const { children, width, height } = props;
  return (
    <StyledScrollable width={width} height={height}>
      {children}
    </StyledScrollable>
  );
};
