import * as React from "react";
import * as Types from "./Tabs.types";
import * as Styles from "./Tabs.styles";
import clsx from "clsx";
const Tabs = React.forwardRef<HTMLDivElement, Types.TabsProps>((props) => {
  const {
    onChange,
    orientation = "horizontal",
    variant,
    value,
    options,
    iconPosition = "start",
    ...other
  } = props;
  const [selected, setSelected] = React.useState(0);
  return (
    <Styles.TabsRoot className={clsx(orientation, variant)} {...other}>
      {options.map((option) => (
        <Styles.TabRoot
          key={option.value}
          disabled={option.disabled}
          onClick={() => setSelected(option.value)}
          className={clsx(
            variant,
            selected === option.value && "selected",
            option.disabled && "disabled"
          )}
          {...other}
        >
          {iconPosition === "start" ? (
            <React.Fragment>
              {option.icon}
              {option.label}
            </React.Fragment>
          ) : (
            <React.Fragment>
              {option.label}
              {option.icon}
            </React.Fragment>
          )}
        </Styles.TabRoot>
      ))}
    </Styles.TabsRoot>
  );
});

export default Tabs;
