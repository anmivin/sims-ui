import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { ThemeContext } from "./ThemeContext";
import { useContext } from "react";

const useTheme = <C extends React.ComponentClass<React.ComponentProps<C>>>(component: C) => {
  const theme = useContext(ThemeContext);
};
