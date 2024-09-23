import * as React from "react";

import styled from "@emotion/styled";

const ListRoot = styled("ul")({
  listStyle: "none",
  margin: 0,
  padding: 0,
  position: "relative",
});

export interface MenuListOwnProps {
  children?: React.ReactNode;
}

const MenuList = (props: MenuListOwnProps) => {
  const { children } = props;

  const items = React.Children.map(children, (child, index) => {
    return child;
  });

  return <ListRoot>{items}</ListRoot>;
};

export default MenuList;
