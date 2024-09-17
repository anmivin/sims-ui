import * as React from "react";

import clamp from "@mui/utils/clamp";

import isFocusVisible from "@mui/utils/isFocusVisible";

import styled from "@emotion/styled";

function getDecimalPrecision(num) {
  const decimalPart = num.toString().split(".")[1];
  return decimalPart ? decimalPart.length : 0;
}

function roundValueToPrecision(value, precision) {
  if (value == null) {
    return value;
  }

  const nearest = Math.round(value / precision) * precision;
  return Number(nearest.toFixed(getDecimalPrecision(precision)));
}

const RatingRoot = styled("span")({
  display: "inline-flex",
  // Required to position the pristine input absolutely
  position: "relative",
  fontSize: theme.typography.pxToRem(24),
  color: "#faaf00",
  cursor: "pointer",
  textAlign: "left",
  width: "min-content",
  WebkitTapHighlightColor: "transparent",
  "-disabled": {
    opacity: (theme.vars || theme).palette.action.disabledOpacity,
    pointerEvents: "none",
  },
});

const RatingLabel = styled("label")({
  cursor: "inherit",
  "-emptyValueFocused": {
    top: 0,
    bottom: 0,
    position: "absolute",
    outline: "1px solid #999",
    width: "100%",
  },
});

const RatingIcon = styled("span")({
  // Fit wrapper to actual icon size.
  display: "flex",
  transition: "",
  pointerEvents: "none",
  "-iconActive": {
    transform: "scale(1.2)",
  },
  "-iconEmpty": {
    color: "gray",
  },
});

const RatingDecimal = styled("span")({
  position: "relative",
  "-iconActive": {
    transform: "scale(1.2)",
  },
});

function IconContainer(props) {
  const { value, ...other } = props;
  return <span {...other} />;
}

IconContainer.propTypes = {
  value: PropTypes.number.isRequired,
};

function RatingItem(props) {
  const {
    classes,
    disabled,
    emptyIcon,
    focus,
    getLabelText,
    highlightSelectedOnly,
    hover,
    icon,
    IconContainerComponent,
    isActive,
    itemValue,
    labelProps,
    name,
    onBlur,
    onChange,
    onClick,
    onFocus,
    readOnly,
    ownerState,
    ratingValue,
    ratingValueRounded,
  } = props;

  const isFilled = highlightSelectedOnly ? itemValue === ratingValue : itemValue <= ratingValue;
  const isHovered = itemValue <= hover;
  const isFocused = itemValue <= focus;
  const isChecked = itemValue === ratingValueRounded;

  const id = useId();
  const container = (
    <RatingIcon
      as={IconContainerComponent}
      value={itemValue}
      className={clsx(classes.icon, {
        [classes.iconEmpty]: !isFilled,
        [classes.iconFilled]: isFilled,
        [classes.iconHover]: isHovered,
        [classes.iconFocus]: isFocused,
        [classes.iconActive]: isActive,
      })}
      ownerState={{
        ...ownerState,
        iconEmpty: !isFilled,
        iconFilled: isFilled,
        iconHover: isHovered,
        iconFocus: isFocused,
        iconActive: isActive,
      }}
    >
      {emptyIcon && !isFilled ? emptyIcon : icon}
    </RatingIcon>
  );

  if (readOnly) {
    return <span {...labelProps}>{container}</span>;
  }

  return (
    <React.Fragment>
      <RatingLabel
        ownerState={{ ...ownerState, emptyValueFocused: undefined }}
        htmlFor={id}
        {...labelProps}
      >
        {container}
        <span className={classes.visuallyHidden}>{getLabelText(itemValue)}</span>
      </RatingLabel>
      <input
        className={classes.visuallyHidden}
        onFocus={onFocus}
        onBlur={onBlur}
        onChange={onChange}
        onClick={onClick}
        disabled={disabled}
        value={itemValue}
        id={id}
        type='radio'
        name={name}
        checked={isChecked}
      />
    </React.Fragment>
  );
}

RatingItem.propTypes = {
  classes: PropTypes.object.isRequired,
  disabled: PropTypes.bool.isRequired,
  emptyIcon: PropTypes.node,
  focus: PropTypes.number.isRequired,
  getLabelText: PropTypes.func.isRequired,
  highlightSelectedOnly: PropTypes.bool.isRequired,
  hover: PropTypes.number.isRequired,
  icon: PropTypes.node,
  IconContainerComponent: PropTypes.elementType.isRequired,
  isActive: PropTypes.bool.isRequired,
  itemValue: PropTypes.number.isRequired,
  labelProps: PropTypes.object,
  name: PropTypes.string,
  onBlur: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
  onFocus: PropTypes.func.isRequired,
  ownerState: PropTypes.object.isRequired,
  ratingValue: PropTypes.number,
  ratingValueRounded: PropTypes.number,
  readOnly: PropTypes.bool.isRequired,
};

const defaultIcon = <Star fontSize='inherit' />;
const defaultEmptyIcon = <StarBorder fontSize='inherit' />;

function defaultLabelText(value) {
  return `${value || "0"} Star${value !== 1 ? "s" : ""}`;
}

const Rating = (props: RatingProps) => {
  const {
    className,
    defaultValue = null,
    disabled = false,
    emptyIcon = defaultEmptyIcon,
    emptyLabelText = "Empty",
    getLabelText = defaultLabelText,
    highlightSelectedOnly = false,
    icon = defaultIcon,
    max = 5,
    onChange,
    onMouseLeave,
    onMouseMove,
    precision = 1,
    value: valueProp,
    ...other
  } = props;

  const [valueDerived, setValueState] = React.useState(defaultValue);

  const valueRounded = roundValueToPrecision(valueDerived, precision);

  const [{ hover, focus }, setState] = React.useState({
    hover: -1,
    focus: -1,
  });

  let value = valueRounded;
  if (hover !== -1) {
    value = hover;
  }
  if (focus !== -1) {
    value = focus;
  }

  const [focusVisible, setFocusVisible] = React.useState(false);

  const rootRef = React.useRef();
  const handleRef = useForkRef(rootRef, ref);

  const handleMouseMove = (event) => {
    if (onMouseMove) {
      onMouseMove(event);
    }

    const rootNode = rootRef.current;
    const { right, left, width: containerWidth } = rootNode.getBoundingClientRect();

    let percent;

    percent = (event.clientX - left) / containerWidth;

    let newHover = roundValueToPrecision(max * percent + precision / 2, precision);
    newHover = clamp(newHover, precision, max);

    setState((prev) =>
      prev.hover === newHover && prev.focus === newHover
        ? prev
        : {
            hover: newHover,
            focus: newHover,
          }
    );

    setFocusVisible(false);
  };
  const handleMouseLeave = (event) => {
    if (onMouseLeave) {
      onMouseLeave(event);
    }

    const newHover = -1;
    setState({
      hover: newHover,
      focus: newHover,
    });
  };

  const handleChange = (event) => {
    let newValue = event.target.value === "" ? null : parseFloat(event.target.value);

    setValueState(newValue);

    if (onChange) {
      onChange(event, newValue);
    }
  };

  const handleClear = (event) => {
    setState({
      hover: -1,
      focus: -1,
    });

    setValueState(null);

    if (onChange && parseFloat(event.target.value) === valueRounded) {
      onChange(event, null);
    }
  };

  const handleFocus = (event) => {
    if (isFocusVisible(event.target)) {
      setFocusVisible(true);
    }

    const newFocus = parseFloat(event.target.value);
    setState((prev) => ({
      hover: prev.hover,
      focus: newFocus,
    }));
  };

  const handleBlur = (event) => {
    if (hover !== -1) {
      return;
    }

    if (!isFocusVisible(event.target)) {
      setFocusVisible(false);
    }

    const newFocus = -1;
    setState((prev) => ({
      hover: prev.hover,
      focus: newFocus,
    }));
  };

  const [emptyValueFocused, setEmptyValueFocused] = React.useState(false);

  const ownerState = {
    ...props,
    defaultValue,
    disabled,
    emptyIcon,
    emptyLabelText,
    emptyValueFocused,
    focusVisible,
    getLabelText,
    icon,
    max,
    precision,
  };

  return (
    <RatingRoot
      ref={handleRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      ownerState={ownerState}
      {...other}
    >
      {Array.from(new Array(max)).map((_, index) => {
        const itemValue = index + 1;

        const ratingItemProps = {
          disabled,
          emptyIcon,
          focus,
          getLabelText,
          highlightSelectedOnly,
          hover,
          icon,

          onBlur: handleBlur,
          onChange: handleChange,
          onClick: handleClear,
          onFocus: handleFocus,
          ratingValue: value,
          ratingValueRounded: valueRounded,
        };

        const isActive = itemValue === Math.ceil(value) && (hover !== -1 || focus !== -1);
        if (precision < 1) {
          const items = Array.from(new Array(1 / precision));
          return (
            <RatingDecimal key={itemValue} ownerState={ownerState} iconActive={isActive}>
              {items.map(($, indexDecimal) => {
                const itemDecimalValue = roundValueToPrecision(
                  itemValue - 1 + (indexDecimal + 1) * precision,
                  precision
                );

                return (
                  <RatingItem
                    key={itemDecimalValue}
                    {...ratingItemProps}
                    // The icon is already displayed as active
                    isActive={false}
                    itemValue={itemDecimalValue}
                    labelProps={{
                      style:
                        items.length - 1 === indexDecimal
                          ? {}
                          : {
                              width:
                                itemDecimalValue === value
                                  ? `${(indexDecimal + 1) * precision * 100}%`
                                  : "0%",
                              overflow: "hidden",
                              position: "absolute",
                            },
                    }}
                  />
                );
              })}
            </RatingDecimal>
          );
        }

        return (
          <RatingItem
            key={itemValue}
            {...ratingItemProps}
            isActive={isActive}
            itemValue={itemValue}
          />
        );
      })}
      {!disabled && (
        <RatingLabel ownerState={ownerState}>
          <input
            value=''
            id={`${name}-empty`}
            type='radio'
            checked={valueRounded == null}
            onFocus={() => setEmptyValueFocused(true)}
            onBlur={() => setEmptyValueFocused(false)}
            onChange={handleChange}
          />
          <span>{emptyLabelText}</span>
        </RatingLabel>
      )}
    </RatingRoot>
  );
};

export default Rating;

export interface RatingProps
  extends Omit<React.HTMLAttributes<HTMLSpanElement>, "children" | "onChange"> {
  /**
   * The default value. Use when the component is not controlled.
   * @default null
   */
  defaultValue?: number;
  /**
   * If `true`, the component is disabled.
   * @default false
   */
  disabled?: boolean;
  /**
   * The icon to display when empty.
   * @default <StarBorder fontSize="inherit" />
   */
  emptyIcon?: React.ReactNode;
  /**
   * The label read when the rating input is empty.
   * @default 'Empty'
   */
  emptyLabelText?: React.ReactNode;
  /**
   * Accepts a function which returns a string value that provides a user-friendly name for the current value of the rating.
   * This is important for screen reader users.
   *
   * For localization purposes, you can use the provided [translations](https://mui.com/material-ui/guides/localization/).
   * @param {number} value The rating label's value to format.
   * @returns {string}
   * @default function defaultLabelText(value) {
   *   return `${value || '0'} Star${value !== 1 ? 's' : ''}`;
   * }
   */
  getLabelText?: (value: number) => string;
  /**
   * If `true`, only the selected icon will be highlighted.
   * @default false
   */
  highlightSelectedOnly?: boolean;
  /**
   * The icon to display.
   * @default <Star fontSize="inherit" />
   */
  icon?: React.ReactNode;

  /**
   * Maximum rating.
   * @default 5
   */
  max?: number;

  /**
   * Callback fired when the value changes.
   * @param {React.SyntheticEvent} event The event source of the callback.
   * @param {number|null} value The new value.
   */
  onChange?: (event: React.SyntheticEvent, value: number | null) => void;
  /**
   * The minimum increment value change allowed.
   * @default 1
   */
  precision?: number;
  /**
   * The rating value.
   */
  value?: number | null;
}
