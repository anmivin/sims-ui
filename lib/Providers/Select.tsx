import * as React from "react";

import TextField from "../Inputs/TextField/TextField";
import styled from "@emotion/styled";
import { InputBaseProps } from "../Inputs/TextField/TextField";

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
  onChange?: (event: SelectChangeEvent<Value>, child: React.ReactNode) => void;
  open?: boolean;
  value?: Value;
}

export interface BaseSelectProps extends InputBaseProps {
  /**
   * If `true`, the width of the popover will automatically be set according to the items inside the
   * menu, otherwise it will be at least the width of the select input.
   * @default false
   */
  autoWidth?: boolean;

  /**
   * If `true`, `value` must be an array and the menu will support multiple selections.
   * @default false
   */
  multiple?: boolean;
}

const Select = (props: BaseSelectProps) => {
  const {
    autoWidth = false,
    label,
    multiple = false,
    variant: variantProp = "outlined",
    ...other
  } = props;

  const variant = variantProp;

  const InputComponent =
    SelectInput ||
    {
      standard: <StyledInput />,
      outlined: <StyledOutlinedInput label={label} />,
      filled: <StyledFilledInput />,
    }[variant];

  return (
    <React.Fragment>
      {React.cloneElement(InputComponent, {
        inputProps: {
          children,
          error: fcs.error,
          IconComponent,
          variant,
          type: undefined, // We render a select. We can ignore the type provided by the `Input`.
          multiple,
          ...{
            autoWidth,
            open,
          },
        },
        ...(((multiple && native) || displayEmpty) && variant === "outlined"
          ? { notched: true }
          : {}),
        ref: inputComponentRef,
        className: clsx(InputComponent.props.className, className, classes.root),
        // If a custom input is provided via 'input' prop, do not allow 'variant' to be propagated to it's root element. See https://github.com/mui/material-ui/issues/33894.
        ...(!input && { variant }),
        ...other,
      })}
    </React.Fragment>
  );
};

export default Select;

import ownerDocument from "../utils/ownerDocument";
import Menu from "../Menu/Menu";
import { StyledSelectSelect, StyledSelectIcon } from "../NativeSelect/NativeSelectInput";

const SelectSelect = styled(StyledSelectSelect)({
  // Win specificity over the input base
  [`&.${selectClasses.select}`]: {
    height: "auto", // Resets for multiple select with chips
    minHeight: "1.4375em", // Required for select\text-field height consistency
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    overflow: "hidden",
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

  // The value could be a number, the DOM will stringify it anyway.
  return String(a) === String(b);
}

function isEmpty(display) {
  return display == null || (typeof display === "string" && !display.trim());
}

const SelectInput = (props: BaseSelectProps) => {
  const {
    autoWidth,
    children,
    defaultValue,
    disabled,
    error = false,
    multiple,
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

  // Resize menu on `defaultOpen` automatic toggle.
  React.useEffect(() => {
    if (defaultOpen && openState && displayNode && !isOpenControlled) {
      setMenuMinWidthState(autoWidth ? null : anchorElement.clientWidth);
      displayRef.current.focus();
    }
    // TODO: uncomment once we enable eslint-plugin-react-compiler // eslint-disable-next-line react-compiler/react-compiler
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [displayNode, autoWidth]);
  // `isOpenControlled` is ignored because the component should never switch between controlled and uncontrolled modes.
  // `defaultOpen` and `openState` are ignored to avoid unnecessary callbacks.
  React.useEffect(() => {
    if (autoFocus) {
      displayRef.current.focus();
    }
  }, [autoFocus]);

  React.useEffect(() => {
    if (!labelId) {
      return undefined;
    }
    const label = ownerDocument(displayRef.current).getElementById(labelId);
    if (label) {
      const handler = () => {
        if (getSelection().isCollapsed) {
          displayRef.current.focus();
        }
      };
      label.addEventListener("click", handler);
      return () => {
        label.removeEventListener("click", handler);
      };
    }
    return undefined;
  }, [labelId]);

  const update = (open, event) => {
    if (open) {
      if (onOpen) {
        onOpen(event);
      }
    } else if (onClose) {
      onClose(event);
    }

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
      onChange(event, child);
    }
  };

  const handleItemClick = (child) => (event) => {
    let newValue;

    // We use the tabindex attribute to signal the available options.
    if (!event.currentTarget.hasAttribute("tabindex")) {
      return;
    }

    if (multiple) {
      newValue = Array.isArray(value) ? value.slice() : [];
      const itemIndex = value.indexOf(child.props.value);
      if (itemIndex === -1) {
        newValue.push(child.props.value);
      } else {
        newValue.splice(itemIndex, 1);
      }
    } else {
      newValue = child.props.value;
    }

    if (child.props.onClick) {
      child.props.onClick(event);
    }

    if (value !== newValue) {
      setValueState(newValue);

      if (onChange) {
        // Redefine target to allow name and value to be read.
        // This allows seamless integration with the most popular form libraries.
        // https://github.com/mui/material-ui/issues/13485#issuecomment-676048492
        // Clone the event to not override `target` of the original event.
        const nativeEvent = event.nativeEvent || event;
        const clonedEvent = new nativeEvent.constructor(nativeEvent.type, nativeEvent);

        Object.defineProperty(clonedEvent, "target", {
          writable: true,
          value: { value: newValue, name },
        });
        onChange(clonedEvent, child);
      }
    }

    if (!multiple) {
      update(false, event);
    }
  };

  const open = displayNode !== null && openState;

  let display;
  let displaySingle;
  const displayMultiple = [];
  let computeDisplay = false;
  let foundMatch = false;

  // No need to display any value if the field is empty.
  if (isFilled({ value }) || displayEmpty) {
    if (renderValue) {
      display = renderValue(value);
    } else {
      computeDisplay = true;
    }
  }

  const items = childrenArray.map((child) => {
    if (!React.isValidElement(child)) {
      return null;
    }

    let selected;

    if (multiple) {
      selected = value.some((v) => areEqualValues(v, child.props.value));
      if (selected && computeDisplay) {
        displayMultiple.push(child.props.children);
      }
    } else {
      selected = areEqualValues(value, child.props.value);
      if (selected && computeDisplay) {
        displaySingle = child.props.children;
      }
    }

    if (selected) {
      foundMatch = true;
    }

    return React.cloneElement(child, {
      onClick: handleItemClick(child),
      onKeyUp: (event) => {
        if (event.key === " ") {
          // otherwise our MenuItems dispatches a click event
          // it's not behavior of the native <option> and causes
          // the select to close immediately since we open on space keydown
          event.preventDefault();
        }

        if (child.props.onKeyUp) {
          child.props.onKeyUp(event);
        }
      },
      role: "option",
      selected,
      value: undefined, // The value is most likely not a valid HTML attribute.
      "data-value": child.props.value, // Instead, we provide it as a data attribute.
    });
  });

  if (computeDisplay) {
    if (multiple) {
      if (displayMultiple.length === 0) {
        display = null;
      } else {
        display = displayMultiple.reduce((output, child, index) => {
          output.push(child);
          if (index < displayMultiple.length - 1) {
            output.push(", ");
          }
          return output;
        }, []);
      }
    } else {
      display = displaySingle;
    }
  }

  // Avoid performing a layout computation in the render method.
  let menuMinWidth = menuMinWidthState;

  if (!autoWidth && isOpenControlled && displayNode) {
    menuMinWidth = anchorElement.clientWidth;
  }

  let tabIndex;
  if (typeof tabIndexProp !== "undefined") {
    tabIndex = tabIndexProp;
  } else {
    tabIndex = disabled ? null : 0;
  }

  const buttonId = SelectDisplayProps.id || (name ? `mui-component-select-${name}` : undefined);

  return (
    <React.Fragment>
      <SelectSelect
        as='div'
        ref={handleDisplayRef}
        tabIndex={tabIndex}
        role='combobox'
        onKeyDown={handleKeyDown}
        onMouseDown={disabled || readOnly ? null : handleMouseDown}
        onBlur={handleBlur}
        onFocus={onFocus}
        {...SelectDisplayProps}
        // The id is required for proper a11y
        id={buttonId}
      >
        {/* So the vertical align positioning algorithm kicks in. */}
        {isEmpty(display) ? (
          // notranslate needed while Google Translate will not fix zero-width space issue
          <span className='notranslate'>&#8203;</span>
        ) : (
          display
        )}
      </SelectSelect>
      <SelectNativeInput
        aria-invalid={error}
        value={Array.isArray(value) ? value.join(",") : value}
        name={name}
        ref={inputRef}
        aria-hidden
        onChange={handleChange}
        tabIndex={-1}
        disabled={disabled}
        autoFocus={autoFocus}
        {...other}
      />
      <SelectIcon as={IconComponent} />
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

export default SelectInput;
