"use client";
import * as React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import deepmerge from "@mui/utils/deepmerge";
import getReactNodeRef from "@mui/utils/getReactNodeRef";
import SelectInput from "./SelectInput";
import formControlState from "../mui/mui-material/src/FormControl/formControlState";
import useFormControl from "../mui/mui-material/src/FormControl/useFormControl";
import ArrowDropDownIcon from "../internal/svg-icons/ArrowDropDown";
import Input from "../mui/mui-material/src/Input";
import NativeSelectInput from "../NativeSelect/NativeSelectInput";
import FilledInput from "../mui/mui-material/src/FilledInput";
import OutlinedInput from "../OutlinedInput";
import useThemeProps from "../mui/mui-material/src/styles/useThemeProps";
import useForkRef from "../utils/useForkRef";
import { styled } from "../zero-styled";
import rootShouldForwardProp from "../mui/mui-material/src/styles/rootShouldForwardProp";

const useUtilityClasses = (ownerState) => {
  const { classes } = ownerState;

  return classes;
};

const styledRootConfig = {
  name: "MuiSelect",
  overridesResolver: (props, styles) => styles.root,
  shouldForwardProp: (prop) => rootShouldForwardProp(prop) && prop !== "variant",
  slot: "Root",
};

const StyledInput = styled(Input, styledRootConfig)("");

const StyledOutlinedInput = styled(OutlinedInput, styledRootConfig)("");

const StyledFilledInput = styled(FilledInput, styledRootConfig)("");

const Select = React.forwardRef(function Select(inProps, ref) {
  const props = useThemeProps({ name: "MuiSelect", props: inProps });
  const {
    autoWidth = false,
    children,
    classes: classesProp = {},
    className,
    defaultOpen = false,
    displayEmpty = false,
    IconComponent = ArrowDropDownIcon,
    id,
    input,
    inputProps,
    label,
    labelId,
    MenuProps,
    multiple = false,
    native = false,
    onClose,
    onOpen,
    open,
    renderValue,
    SelectDisplayProps,
    variant: variantProp = "outlined",
    ...other
  } = props;

  const inputComponent = native ? NativeSelectInput : SelectInput;

  const muiFormControl = useFormControl();
  const fcs = formControlState({
    props,
    muiFormControl,
    states: ["variant", "error"],
  });

  const variant = fcs.variant || variantProp;

  const ownerState = { ...props, variant, classes: classesProp };
  const classes = useUtilityClasses(ownerState);
  const { root, ...restOfClasses } = classes;

  const InputComponent =
    input ||
    {
      standard: <StyledInput ownerState={ownerState} />,
      outlined: <StyledOutlinedInput label={label} ownerState={ownerState} />,
      filled: <StyledFilledInput ownerState={ownerState} />,
    }[variant];

  const inputComponentRef = useForkRef(ref, getReactNodeRef(InputComponent));

  return (
    <React.Fragment>
      {React.cloneElement(InputComponent, {
        // Most of the logic is implemented in `SelectInput`.
        // The `Select` component is a simple API wrapper to expose something better to play with.
        inputComponent,
        inputProps: {
          children,
          error: fcs.error,
          IconComponent,
          variant,
          type: undefined, // We render a select. We can ignore the type provided by the `Input`.
          multiple,
          ...(native
            ? { id }
            : {
                autoWidth,
                defaultOpen,
                displayEmpty,
                labelId,
                MenuProps,
                onClose,
                onOpen,
                open,
                renderValue,
                SelectDisplayProps: { id, ...SelectDisplayProps },
              }),
          ...inputProps,
          classes: inputProps ? deepmerge(restOfClasses, inputProps.classes) : restOfClasses,
          ...(input ? input.props.inputProps : {}),
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
});

Select.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * If `true`, the width of the popover will automatically be set according to the items inside the
   * menu, otherwise it will be at least the width of the select input.
   * @default false
   */
  autoWidth: PropTypes.bool,
  /**
   * The option elements to populate the select with.
   * Can be some `MenuItem` when `native` is false and `option` when `native` is true.
   *
   * ⚠️The `MenuItem` elements **must** be direct descendants when `native` is false.
   */
  children: PropTypes.node,
  /**
   * Override or extend the styles applied to the component.
   * @default {}
   */
  classes: PropTypes.object,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * If `true`, the component is initially open. Use when the component open state is not controlled (i.e. the `open` prop is not defined).
   * You can only use it when the `native` prop is `false` (default).
   * @default false
   */
  defaultOpen: PropTypes.bool,
  /**
   * The default value. Use when the component is not controlled.
   */
  defaultValue: PropTypes.any,
  /**
   * If `true`, a value is displayed even if no items are selected.
   *
   * In order to display a meaningful value, a function can be passed to the `renderValue` prop which
   * returns the value to be displayed when no items are selected.
   *
   * ⚠️ When using this prop, make sure the label doesn't overlap with the empty displayed value.
   * The label should either be hidden or forced to a shrunk state.
   * @default false
   */
  displayEmpty: PropTypes.bool,
  /**
   * The icon that displays the arrow.
   * @default ArrowDropDownIcon
   */
  IconComponent: PropTypes.elementType,
  /**
   * The `id` of the wrapper element or the `select` element when `native`.
   */
  id: PropTypes.string,
  /**
   * An `Input` element; does not have to be a material-ui specific `Input`.
   */
  input: PropTypes.element,
  /**
   * [Attributes](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#Attributes) applied to the `input` element.
   * When `native` is `true`, the attributes are applied on the `select` element.
   */
  inputProps: PropTypes.object,
  /**
   * See [OutlinedInput#label](https://mui.com/material-ui/api/outlined-input/#props)
   */
  label: PropTypes.node,
  /**
   * The ID of an element that acts as an additional label. The Select will
   * be labelled by the additional label and the selected value.
   */
  labelId: PropTypes.string,
  /**
   * Props applied to the [`Menu`](https://mui.com/material-ui/api/menu/) element.
   */
  MenuProps: PropTypes.object,
  /**
   * If `true`, `value` must be an array and the menu will support multiple selections.
   * @default false
   */
  multiple: PropTypes.bool,
  /**
   * If `true`, the component uses a native `select` element.
   * @default false
   */
  native: PropTypes.bool,
  /**
   * Callback fired when a menu item is selected.
   *
   * @param {SelectChangeEvent<Value>} event The event source of the callback.
   * You can pull out the new value by accessing `event.target.value` (any).
   * **Warning**: This is a generic event, not a change event, unless the change event is caused by browser autofill.
   * @param {object} [child] The react element that was selected when `native` is `false` (default).
   */
  onChange: PropTypes.func,
  /**
   * Callback fired when the component requests to be closed.
   * Use it in either controlled (see the `open` prop), or uncontrolled mode (to detect when the Select collapses).
   *
   * @param {object} event The event source of the callback.
   */
  onClose: PropTypes.func,
  /**
   * Callback fired when the component requests to be opened.
   * Use it in either controlled (see the `open` prop), or uncontrolled mode (to detect when the Select expands).
   *
   * @param {object} event The event source of the callback.
   */
  onOpen: PropTypes.func,
  /**
   * If `true`, the component is shown.
   * You can only use it when the `native` prop is `false` (default).
   */
  open: PropTypes.bool,
  /**
   * Render the selected value.
   * You can only use it when the `native` prop is `false` (default).
   *
   * @param {any} value The `value` provided to the component.
   * @returns {ReactNode}
   */
  renderValue: PropTypes.func,
  /**
   * Props applied to the clickable div element.
   */
  SelectDisplayProps: PropTypes.object,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])),
    PropTypes.func,
    PropTypes.object,
  ]),
  /**
   * The `input` value. Providing an empty string will select no options.
   * Set to an empty string `''` if you don't want any of the available options to be selected.
   *
   * If the value is an object it must have reference equality with the option in order to be selected.
   * If the value is not an object, the string representation must match with the string representation of the option in order to be selected.
   */
  value: PropTypes.oneOfType([PropTypes.oneOf([""]), PropTypes.any]),
  /**
   * The variant to use.
   * @default 'outlined'
   */
  variant: PropTypes.oneOf(["filled", "outlined", "standard"]),
};

Select.muiName = "Select";

export default Select;

("use client");
import * as React from "react";
import { isFragment } from "react-is";
import PropTypes from "prop-types";
import clsx from "clsx";
import MuiError from "@mui/internal-babel-macros/MuiError.macro";
import composeClasses from "@mui/utils/composeClasses";
import useId from "@mui/utils/useId";
import refType from "@mui/utils/refType";
import ownerDocument from "../utils/ownerDocument";
import capitalize from "../utils/capitalize";
import Menu from "../Menu/Menu";
import { StyledSelectSelect, StyledSelectIcon } from "../NativeSelect/NativeSelectInput";
import { isFilled } from "../InputBase/utils";
import { styled } from "../zero-styled";
import slotShouldForwardProp from "../mui/mui-material/src/styles/slotShouldForwardProp";
import useForkRef from "../utils/useForkRef";
import useControlled from "../utils/useControlled";
import selectClasses, { getSelectUtilityClasses } from "./selectClasses";

const SelectSelect = styled(StyledSelectSelect, {
  name: "MuiSelect",
  slot: "Select",
  overridesResolver: (props, styles) => {
    const { ownerState } = props;
    return [
      // Win specificity over the input base
      { [`&.${selectClasses.select}`]: styles.select },
      { [`&.${selectClasses.select}`]: styles[ownerState.variant] },
      { [`&.${selectClasses.error}`]: styles.error },
      { [`&.${selectClasses.multiple}`]: styles.multiple },
    ];
  },
})({
  // Win specificity over the input base
  [`&.${selectClasses.select}`]: {
    height: "auto", // Resets for multiple select with chips
    minHeight: "1.4375em", // Required for select\text-field height consistency
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    overflow: "hidden",
  },
});

const SelectIcon = styled(StyledSelectIcon, {
  name: "MuiSelect",
  slot: "Icon",
  overridesResolver: (props, styles) => {
    const { ownerState } = props;
    return [
      styles.icon,
      ownerState.variant && styles[`icon${capitalize(ownerState.variant)}`],
      ownerState.open && styles.iconOpen,
    ];
  },
})({});

const SelectNativeInput = styled("input", {
  shouldForwardProp: (prop) => slotShouldForwardProp(prop) && prop !== "classes",
  name: "MuiSelect",
  slot: "NativeInput",
  overridesResolver: (props, styles) => styles.nativeInput,
})({
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

const useUtilityClasses = (ownerState) => {
  const { classes, variant, disabled, multiple, open, error } = ownerState;

  const slots = {
    select: ["select", variant, disabled && "disabled", multiple && "multiple", error && "error"],
    icon: ["icon", `icon${capitalize(variant)}`, open && "iconOpen", disabled && "disabled"],
    nativeInput: ["nativeInput"],
  };

  return composeClasses(slots, getSelectUtilityClasses, classes);
};

/**
 * @ignore - internal component.
 */
const SelectInput = React.forwardRef(function SelectInput(props, ref) {
  const {
    "aria-describedby": ariaDescribedby,
    "aria-label": ariaLabel,
    autoFocus,
    autoWidth,
    children,
    className,
    defaultOpen,
    defaultValue,
    disabled,
    displayEmpty,
    error = false,
    IconComponent,
    inputRef: inputRefProp,
    labelId,
    MenuProps = {},
    multiple,
    name,
    onBlur,
    onChange,
    onClose,
    onFocus,
    onOpen,
    open: openProp,
    readOnly,
    renderValue,
    SelectDisplayProps = {},
    tabIndex: tabIndexProp,
    // catching `type` from Input which makes no sense for SelectInput
    type,
    value: valueProp,
    variant = "standard",
    ...other
  } = props;

  const [value, setValueState] = useControlled({
    controlled: valueProp,
    default: defaultValue,
    name: "Select",
  });
  const [openState, setOpenState] = useControlled({
    controlled: openProp,
    default: defaultOpen,
    name: "Select",
  });

  const inputRef = React.useRef(null);
  const displayRef = React.useRef(null);
  const [displayNode, setDisplayNode] = React.useState(null);
  const { current: isOpenControlled } = React.useRef(openProp != null);
  const [menuMinWidthState, setMenuMinWidthState] = React.useState();
  const handleRef = useForkRef(ref, inputRefProp);

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

  const handleKeyDown = (event) => {
    if (!readOnly) {
      const validKeys = [
        " ",
        "ArrowUp",
        "ArrowDown",
        // The native select doesn't respond to enter on macOS, but it's recommended by
        // https://www.w3.org/WAI/ARIA/apg/patterns/combobox/examples/combobox-select-only/
        "Enter",
      ];

      if (validKeys.includes(event.key)) {
        event.preventDefault();
        update(true, event);
      }
    }
  };

  const open = displayNode !== null && openState;

  const handleBlur = (event) => {
    // if open event.stopImmediatePropagation
    if (!open && onBlur) {
      // Preact support, target is read only property on a native event.
      Object.defineProperty(event, "target", { writable: true, value: { value, name } });
      onBlur(event);
    }
  };

  delete other["aria-invalid"];

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

    if (process.env.NODE_ENV !== "production") {
      if (isFragment(child)) {
        console.error(
          [
            "MUI: The Select component doesn't accept a Fragment as a child.",
            "Consider providing an array instead.",
          ].join("\n")
        );
      }
    }

    let selected;

    if (multiple) {
      if (!Array.isArray(value)) {
        throw new MuiError(
          "MUI: The `value` prop must be an array " +
            "when using the `Select` component with `multiple`."
        );
      }

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
      "aria-selected": selected ? "true" : "false",
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

  if (process.env.NODE_ENV !== "production") {
    // TODO: uncomment once we enable eslint-plugin-react-compiler // eslint-disable-next-line react-compiler/react-compiler
    // eslint-disable-next-line react-hooks/rules-of-hooks
    React.useEffect(() => {
      if (!foundMatch && !multiple && value !== "") {
        const values = childrenArray.map((child) => child.props.value);
        console.warn(
          [
            `MUI: You have provided an out-of-range value \`${value}\` for the select ${
              name ? `(name="${name}") ` : ""
            }component.`,
            "Consider providing a value that matches one of the available options or ''.",
            `The available values are ${
              values
                .filter((x) => x != null)
                .map((x) => `\`${x}\``)
                .join(", ") || '""'
            }.`,
          ].join("\n")
        );
      }
    }, [foundMatch, childrenArray, multiple, name, value]);
  }

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

  const ownerState = {
    ...props,
    variant,
    value,
    open,
    error,
  };

  const classes = useUtilityClasses(ownerState);

  const paperProps = {
    ...MenuProps.PaperProps,
    ...MenuProps.slotProps?.paper,
  };

  const listboxId = useId();

  return (
    <React.Fragment>
      <SelectSelect
        as='div'
        ref={handleDisplayRef}
        tabIndex={tabIndex}
        role='combobox'
        aria-controls={listboxId}
        aria-disabled={disabled ? "true" : undefined}
        aria-expanded={open ? "true" : "false"}
        aria-haspopup='listbox'
        aria-label={ariaLabel}
        aria-labelledby={[labelId, buttonId].filter(Boolean).join(" ") || undefined}
        aria-describedby={ariaDescribedby}
        onKeyDown={handleKeyDown}
        onMouseDown={disabled || readOnly ? null : handleMouseDown}
        onBlur={handleBlur}
        onFocus={onFocus}
        {...SelectDisplayProps}
        ownerState={ownerState}
        className={clsx(SelectDisplayProps.className, classes.select, className)}
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
        className={classes.nativeInput}
        autoFocus={autoFocus}
        {...other}
        ownerState={ownerState}
      />
      <SelectIcon as={IconComponent} className={classes.icon} ownerState={ownerState} />
      <Menu
        id={`menu-${name || ""}`}
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
        {...MenuProps}
        MenuListProps={{
          "aria-labelledby": labelId,
          role: "listbox",
          "aria-multiselectable": multiple ? "true" : undefined,
          disableListWrap: true,
          id: listboxId,
          ...MenuProps.MenuListProps,
        }}
        slotProps={{
          ...MenuProps.slotProps,
          paper: {
            ...paperProps,
            style: {
              minWidth: menuMinWidth,
              ...(paperProps != null ? paperProps.style : null),
            },
          },
        }}
      >
        {items}
      </Menu>
    </React.Fragment>
  );
});

export default SelectInput;

import { MenuProps } from "./Menu";

export interface SelectInputProps<Value = unknown> {
  autoFocus?: boolean;
  autoWidth: boolean;
  defaultOpen?: boolean;
  disabled?: boolean;
  error?: boolean;
  inputRef?: (
    ref: HTMLSelectElement | { node: HTMLInputElement; value: SelectInputProps<Value>["value"] }
  ) => void;
  MenuProps?: Partial<MenuProps>;
  multiple: boolean;
  onBlur?: React.FocusEventHandler<any>;
  onChange?: (event: SelectChangeEvent<Value>, child: React.ReactNode) => void;
  onClose?: (event: React.SyntheticEvent) => void;
  onFocus?: React.FocusEventHandler<any>;
  onOpen?: (event: React.SyntheticEvent) => void;
  open?: boolean;
  renderValue?: (value: SelectInputProps<Value>["value"]) => React.ReactNode;
  value?: Value;
  variant?: "standard" | "outlined" | "filled";
}

export default SelectInput;

import { InternalStandardProps as StandardProps, Theme } from "..";
import { InputProps } from "../mui/mui-material/src/Input";
import { SelectChangeEvent, SelectInputProps } from "./SelectInput";

export { SelectChangeEvent };

export interface BaseSelectProps<Value = unknown>
  extends StandardProps<InputProps, "value" | "onChange"> {
  /**
   * If `true`, the width of the popover will automatically be set according to the items inside the
   * menu, otherwise it will be at least the width of the select input.
   * @default false
   */
  autoWidth?: boolean;
  /**
   * The option elements to populate the select with.
   * Can be some `MenuItem` when `native` is false and `option` when `native` is true.
   *
   * ⚠️The `MenuItem` elements **must** be direct descendants when `native` is false.
   */
  children?: React.ReactNode;

  /**
   * The default value. Use when the component is not controlled.
   */
  defaultValue?: Value;

  /**
   * The `id` of the wrapper element or the `select` element when `native`.
   */
  id?: string;

  /**
   * See [OutlinedInput#label](https://mui.com/material-ui/api/outlined-input/#props)
   */
  label?: React.ReactNode;

  /**
   * If `true`, `value` must be an array and the menu will support multiple selections.
   * @default false
   */
  multiple?: boolean;

  /**
   * Callback fired when a menu item is selected.
   *
   * @param {SelectChangeEvent<Value>} event The event source of the callback.
   * You can pull out the new value by accessing `event.target.value` (any).
   * **Warning**: This is a generic event, not a change event, unless the change event is caused by browser autofill.
   * @param {object} [child] The react element that was selected when `native` is `false` (default).
   */
  onChange?: SelectInputProps<Value>["onChange"];

  /**
   * If `true`, the component is shown.
   * You can only use it when the `native` prop is `false` (default).
   */
  open?: boolean;
  /**
   * Render the selected value.
   * You can only use it when the `native` prop is `false` (default).
   *
   * @param {any} value The `value` provided to the component.
   * @returns {ReactNode}
   */
  renderValue?: (value: Value) => React.ReactNode;

  /**
   * The `input` value. Providing an empty string will select no options.
   * Set to an empty string `''` if you don't want any of the available options to be selected.
   *
   * If the value is an object it must have reference equality with the option in order to be selected.
   * If the value is not an object, the string representation must match with the string representation of the option in order to be selected.
   */
  value?: Value | "";
  /**
   * The variant to use.
   * @default 'outlined'
   */
  variant?: SelectVariants;
}

export type SelectVariants = "outlined" | "standard" | "filled";
