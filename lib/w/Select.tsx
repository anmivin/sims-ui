import * as React from "react";

import TextField from "../Inputs/TextField/TextField";
import styled from "@emotion/styled";
import { InputBaseProps } from "../Inputs/TextField/TextField";
import Menu from "./Menu";
import { MenuProps } from "./Menu";

export interface SelectInputProps<Value = unknown> {
  autoWidth: boolean;
  defaultOpen?: boolean;
  disabled?: boolean;
  error?: boolean;
  inputRef?: (
    ref: HTMLSelectElement | { node: HTMLInputElement; value: SelectInputProps<Value>["value"] }
  ) => void;
  MenuProps?: Partial<MenuProps>;
  multiple: boolean;
  onChange?: (child: React.ReactNode) => void;
  open?: boolean;
  value?: Value;
}

export interface BaseSelectProps extends InputBaseProps {
  autoWidth?: boolean;
}

const Select = (props: BaseSelectProps) => {
  const { autoWidth = false, label, variant: variantProp = "outlined", error, ...other } = props;

  const variant = variantProp;

  const InputComponent = <SelectInput variant={variant} />;

  return (
    <React.Fragment>
      {React.cloneElement(InputComponent, {
        inputProps: {
          error: error,
          variant,
          type: undefined, // We render a select. We can ignore the type provided by the `Input`.
          ...{
            autoWidth,
            open,
          },
        },
        ...other,
      })}
    </React.Fragment>
  );
};

export default Select;

export const StyledSelectSelect = styled("select")({
  borderRadius: 0,
  cursor: "pointer",
  ".disabled": {
    cursor: "default",
  },
  ".multiple": {
    height: "auto",
  },
});

const SelectSelect = styled(StyledSelectSelect)({
  // Win specificity over the input base
  ".selected": {
    height: "auto", // Resets for multiple select with chips
    minHeight: "1.4375em", // Required for select\text-field height consistency
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    overflow: "hidden",
  },
});

export const StyledSelectIcon = styled("svg")({
  position: "absolute",
  right: 0,
  top: "calc(50% - .5em)",
  pointerEvents: "none",
  color: "",
  ".disabled": {
    color: "",
  },
  ".open": {
    transform: "rotate(180deg)",
  },
});

const SelectIcon = styled(StyledSelectIcon)({});

const SelectNativeInput = styled("input")({
  bottom: 0,
  left: 0,
  position: "absolute",
  opacity: 0,
  pointerEvents: "none",
  width: "100%",
  boxSizing: "border-box",
});

function areEqualValues(a, b) {
  if (typeof b === "object" && b !== null) {
    return a === b;
  }
  return String(a) === String(b);
}

function isEmpty(display) {
  return display == null || (typeof display === "string" && !display.trim());
}

const SelectInput = (props: BaseSelectProps) => {
  const {
    autoWidth,
    defaultValue,
    disabled,
    error = false,
    onChange,
    value: valueProp,
    variant = "standard",
    ...other
  } = props;

  const [value, setValueState] = React.useState(defaultValue);
  const [openState, setOpenState] = React.useState(false);

  const inputRef = React.useRef(null);
  const displayRef = React.useRef(null);
  const [displayNode, setDisplayNode] = React.useState(null);
  const { current: isOpenControlled } = React.useRef(openProp != null);
  const [menuMinWidthState, setMenuMinWidthState] = React.useState();

  const handleDisplayRef = React.useCallback((node) => {
    displayRef.current = node;

    if (node) {
      setDisplayNode(node);
    }
  }, []);

  const anchorElement = displayNode?.parentNode;

  React.useImperativeHandle(
    handleRef,
    () => ({
      focus: () => {
        displayRef.current.focus();
      },
      node: inputRef.current,
      value,
    }),
    [value]
  );

  const update = (open, event) => {
    if (!isOpenControlled) {
      setMenuMinWidthState(autoWidth ? null : anchorElement.clientWidth);
      setOpenState(open);
    }
  };

  const handleMouseDown = (event) => {
    // Ignore everything but left-click
    if (event.button !== 0) {
      return;
    }
    // Hijack the default focus behavior.
    event.preventDefault();
    displayRef.current.focus();

    update(true, event);
  };

  const handleClose = (event) => {
    update(false, event);
  };

  const childrenArray = React.Children.toArray(children);

  // Support autofill.
  const handleChange = (event) => {
    const child = childrenArray.find((childItem) => childItem.props.value === event.target.value);

    if (child === undefined) {
      return;
    }

    setValueState(child.props.value);

    if (onChange) {
      onChange(child);
    }
  };

  const handleItemClick = (child) => (event) => {
    let newValue;

    // We use the tabindex attribute to signal the available options.
    if (!event.currentTarget.hasAttribute("tabindex")) {
      return;
    }

    newValue = child.props.value;

    if (child.props.onClick) {
      child.props.onClick(event);
    }

    if (value !== newValue) {
      setValueState(newValue);

      if (onChange) {
        onChange(child);
      }
    }

    update(false, event);
  };

  const open = displayNode !== null && openState;

  let display;
  let displaySingle;
  let computeDisplay = false;

  const items = childrenArray.map((child) => {
    if (!React.isValidElement(child)) {
      return null;
    }

    let selected;

    selected = areEqualValues(value, child.props.value);
    if (selected && computeDisplay) {
      displaySingle = child.props.children;
    }

    return React.cloneElement(child, {
      onClick: handleItemClick(child),
      role: "option",
      selected,
      value: undefined, // The value is most likely not a valid HTML attribute.
    });
  });

  if (computeDisplay) {
    display = displaySingle;
  }

  // Avoid performing a layout computation in the render method.
  let menuMinWidth = menuMinWidthState;

  if (!autoWidth && isOpenControlled && displayNode) {
    menuMinWidth = anchorElement.clientWidth;
  }

  let tabIndex;
  tabIndex = disabled ? null : 0;

  return (
    <React.Fragment>
      <SelectSelect ref={handleDisplayRef} tabIndex={tabIndex}>
        {display}
      </SelectSelect>
      <SelectNativeInput
        aria-invalid={error}
        value={Array.isArray(value) ? value.join(",") : value}
        ref={inputRef}
        aria-hidden
        onChange={handleChange}
        tabIndex={-1}
        disabled={disabled}
        {...other}
      />
      <SelectIcon />
      <Menu
        anchorEl={anchorElement}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        {items}
      </Menu>
    </React.Fragment>
  );
};

export interface NativeSelectInputProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  disabled?: boolean;
  inputRef?: React.Ref<HTMLSelectElement>;
  variant?: "standard" | "outlined" | "filled";
  error?: boolean;
}

const NativeSelectSelect = styled(StyledSelectSelect)({});

const NativeSelectIcon = styled(StyledSelectIcon)({});

export const NativeSelectInput = (props: NativeSelectInputProps) => {
  const { className, disabled, error, inputRef, variant = "standard", ...other } = props;

  return (
    <React.Fragment>
      <NativeSelectSelect disabled={disabled} ref={inputRef} {...other} />
      {props.multiple ? null : <NativeSelectIcon />}
    </React.Fragment>
  );
};

export interface NativeSelectProps
  extends Omit<InputBaseProps, "inputProps" | "value" | "onChange"> {
  children?: React.ReactNode;
  /**
   * Callback fired when a menu item is selected.
   *
   * @param {React.ChangeEvent<HTMLSelectElement>} event The event source of the callback.
   * You can pull out the new value by accessing `event.target.value` (string).
   */
  onChange?: NativeSelectInputProps["onChange"];
  /**
   * The `input` value. The DOM API casts this to a string.
   */
  value?: unknown;
  /**
   * The variant to use.
   */
  variant?: "standard" | "outlined" | "filled";
}

const defaultInput = <TextField />;

export const NativeSelect = (props: NativeSelectProps) => {
  const { children, variant, ...other } = props;

  return (
    <React.Fragment>
      <NativeSelectInput variant={variant} {...other}>
        {children}
      </NativeSelectInput>
    </React.Fragment>
  );
};
