import * as React from "react";
import chainPropTypes from "@mui/utils/chainPropTypes";
import composeClasses from "@mui/utils/composeClasses";
import { alpha, lighten, darken } from "@mui/system/colorManipulator";
import { useRtl } from "@mui/system/RtlProvider";
import useSlotProps from "@mui/utils/useSlotProps";
import { useSlider, valueToPercent } from "./useSlider";
import isHostComponent from "../utils/isHostComponent";
import { styled } from "../zero-styled";
import memoTheme from "../utils/memoTheme";
import { useDefaultProps } from "../DefaultPropsProvider";
import slotShouldForwardProp from "../styles/slotShouldForwardProp";
import shouldSpreadAdditionalProps from "../utils/shouldSpreadAdditionalProps";
import capitalize from "../utils/capitalize";
import createSimplePaletteValueFilter from "../utils/createSimplePaletteValueFilter";
import BaseSliderValueLabel from "./SliderValueLabel";
import sliderClasses, { getSliderUtilityClass } from "./sliderClasses";

function Identity(x) {
  return x;
}

export const SliderRoot = styled("span", {
  name: "MuiSlider",
  slot: "Root",
  overridesResolver: (props, styles) => {
    const { ownerState } = props;

    return [
      styles.root,
      styles[`color${capitalize(ownerState.color)}`],
      ownerState.size !== "medium" && styles[`size${capitalize(ownerState.size)}`],
      ownerState.marked && styles.marked,
      ownerState.orientation === "vertical" && styles.vertical,
      ownerState.track === "inverted" && styles.trackInverted,
      ownerState.track === false && styles.trackFalse,
    ];
  },
})(
  memoTheme(({ theme }) => ({
    borderRadius: 12,
    boxSizing: "content-box",
    display: "inline-block",
    position: "relative",
    cursor: "pointer",
    touchAction: "none",
    WebkitTapHighlightColor: "transparent",
    "@media print": {
      colorAdjust: "exact",
    },
    [`&.${sliderClasses.disabled}`]: {
      pointerEvents: "none",
      cursor: "default",
      color: (theme.vars || theme).palette.grey[400],
    },
    [`&.${sliderClasses.dragging}`]: {
      [`& .${sliderClasses.thumb}, & .${sliderClasses.track}`]: {
        transition: "none",
      },
    },
    variants: [
      ...Object.entries(theme.palette)
        .filter(createSimplePaletteValueFilter())
        .map(([color]) => ({
          props: { color },
          style: {
            color: (theme.vars || theme).palette[color].main,
          },
        })),
      {
        props: { orientation: "horizontal" },
        style: {
          height: 4,
          width: "100%",
          padding: "13px 0",
          // The primary input mechanism of the device includes a pointing device of limited accuracy.
          "@media (pointer: coarse)": {
            // Reach 42px touch target, about ~8mm on screen.
            padding: "20px 0",
          },
        },
      },
      {
        props: { orientation: "horizontal", size: "small" },
        style: {
          height: 2,
        },
      },
      {
        props: { orientation: "horizontal", marked: true },
        style: {
          marginBottom: 20,
        },
      },
      {
        props: { orientation: "vertical" },
        style: {
          height: "100%",
          width: 4,
          padding: "0 13px",
          // The primary input mechanism of the device includes a pointing device of limited accuracy.
          "@media (pointer: coarse)": {
            // Reach 42px touch target, about ~8mm on screen.
            padding: "0 20px",
          },
        },
      },
      {
        props: { orientation: "vertical", size: "small" },
        style: {
          width: 2,
        },
      },
      {
        props: { orientation: "vertical", marked: true },
        style: {
          marginRight: 44,
        },
      },
    ],
  }))
);

export const SliderRail = styled("span", {
  name: "MuiSlider",
  slot: "Rail",
  overridesResolver: (props, styles) => styles.rail,
})({
  display: "block",
  position: "absolute",
  borderRadius: "inherit",
  backgroundColor: "currentColor",
  opacity: 0.38,
  variants: [
    {
      props: { orientation: "horizontal" },
      style: {
        width: "100%",
        height: "inherit",
        top: "50%",
        transform: "translateY(-50%)",
      },
    },
    {
      props: { orientation: "vertical" },
      style: {
        height: "100%",
        width: "inherit",
        left: "50%",
        transform: "translateX(-50%)",
      },
    },
    {
      props: { track: "inverted" },
      style: {
        opacity: 1,
      },
    },
  ],
});

export const SliderTrack = styled("span", {
  name: "MuiSlider",
  slot: "Track",
  overridesResolver: (props, styles) => styles.track,
})(
  memoTheme(({ theme }) => {
    return {
      display: "block",
      position: "absolute",
      borderRadius: "inherit",
      border: "1px solid currentColor",
      backgroundColor: "currentColor",
      transition: theme.transitions.create(["left", "width", "bottom", "height"], {
        duration: theme.transitions.duration.shortest,
      }),
      variants: [
        {
          props: { size: "small" },
          style: {
            border: "none",
          },
        },
        {
          props: { orientation: "horizontal" },
          style: {
            height: "inherit",
            top: "50%",
            transform: "translateY(-50%)",
          },
        },
        {
          props: { orientation: "vertical" },
          style: {
            width: "inherit",
            left: "50%",
            transform: "translateX(-50%)",
          },
        },
        {
          props: { track: false },
          style: {
            display: "none",
          },
        },
        ...Object.entries(theme.palette)
          .filter(createSimplePaletteValueFilter())
          .map(([color]) => ({
            props: { color, track: "inverted" },
            style: {
              ...(theme.vars
                ? {
                    backgroundColor: theme.vars.palette.Slider[`${color}Track`],
                    borderColor: theme.vars.palette.Slider[`${color}Track`],
                  }
                : {
                    backgroundColor: lighten(theme.palette[color].main, 0.62),
                    borderColor: lighten(theme.palette[color].main, 0.62),
                    ...theme.applyStyles("dark", {
                      backgroundColor: darken(theme.palette[color].main, 0.5),
                    }),
                    ...theme.applyStyles("dark", {
                      borderColor: darken(theme.palette[color].main, 0.5),
                    }),
                  }),
            },
          })),
      ],
    };
  })
);

export const SliderThumb = styled("span", {
  name: "MuiSlider",
  slot: "Thumb",
  overridesResolver: (props, styles) => {
    const { ownerState } = props;
    return [
      styles.thumb,
      styles[`thumbColor${capitalize(ownerState.color)}`],
      ownerState.size !== "medium" && styles[`thumbSize${capitalize(ownerState.size)}`],
    ];
  },
})(
  memoTheme(({ theme }) => ({
    position: "absolute",
    width: 20,
    height: 20,
    boxSizing: "border-box",
    borderRadius: "50%",
    outline: 0,
    backgroundColor: "currentColor",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: theme.transitions.create(["box-shadow", "left", "bottom"], {
      duration: theme.transitions.duration.shortest,
    }),
    "&::before": {
      position: "absolute",
      content: '""',
      borderRadius: "inherit",
      width: "100%",
      height: "100%",
      boxShadow: (theme.vars || theme).shadows[2],
    },
    "&::after": {
      position: "absolute",
      content: '""',
      borderRadius: "50%",
      // 42px is the hit target
      width: 42,
      height: 42,
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
    },
    [`&.${sliderClasses.disabled}`]: {
      "&:hover": {
        boxShadow: "none",
      },
    },
    variants: [
      {
        props: { size: "small" },
        style: {
          width: 12,
          height: 12,
          "&::before": {
            boxShadow: "none",
          },
        },
      },
      {
        props: { orientation: "horizontal" },
        style: {
          top: "50%",
          transform: "translate(-50%, -50%)",
        },
      },
      {
        props: { orientation: "vertical" },
        style: {
          left: "50%",
          transform: "translate(-50%, 50%)",
        },
      },
      ...Object.entries(theme.palette)
        .filter(createSimplePaletteValueFilter())
        .map(([color]) => ({
          props: { color },
          style: {
            [`&:hover, &.${sliderClasses.focusVisible}`]: {
              ...(theme.vars
                ? {
                    boxShadow: `0px 0px 0px 8px rgba(${theme.vars.palette[color].mainChannel} / 0.16)`,
                  }
                : {
                    boxShadow: `0px 0px 0px 8px ${alpha(theme.palette[color].main, 0.16)}`,
                  }),
              "@media (hover: none)": {
                boxShadow: "none",
              },
            },
            [`&.${sliderClasses.active}`]: {
              ...(theme.vars
                ? {
                    boxShadow: `0px 0px 0px 14px rgba(${theme.vars.palette[color].mainChannel} / 0.16)`,
                  }
                : {
                    boxShadow: `0px 0px 0px 14px ${alpha(theme.palette[color].main, 0.16)}`,
                  }),
            },
          },
        })),
    ],
  }))
);

export const SliderValueLabel = styled(BaseSliderValueLabel, {
  name: "MuiSlider",
  slot: "ValueLabel",
  overridesResolver: (props, styles) => styles.valueLabel,
})(
  memoTheme(({ theme }) => ({
    zIndex: 1,
    whiteSpace: "nowrap",
    ...theme.typography.body2,
    fontWeight: 500,
    transition: theme.transitions.create(["transform"], {
      duration: theme.transitions.duration.shortest,
    }),
    position: "absolute",
    backgroundColor: (theme.vars || theme).palette.grey[600],
    borderRadius: 2,
    color: (theme.vars || theme).palette.common.white,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "0.25rem 0.75rem",
    variants: [
      {
        props: { orientation: "horizontal" },
        style: {
          transform: "translateY(-100%) scale(0)",
          top: "-10px",
          transformOrigin: "bottom center",
          "&::before": {
            position: "absolute",
            content: '""',
            width: 8,
            height: 8,
            transform: "translate(-50%, 50%) rotate(45deg)",
            backgroundColor: "inherit",
            bottom: 0,
            left: "50%",
          },
          [`&.${sliderClasses.valueLabelOpen}`]: {
            transform: "translateY(-100%) scale(1)",
          },
        },
      },
      {
        props: { orientation: "vertical" },
        style: {
          transform: "translateY(-50%) scale(0)",
          right: "30px",
          top: "50%",
          transformOrigin: "right center",
          "&::before": {
            position: "absolute",
            content: '""',
            width: 8,
            height: 8,
            transform: "translate(-50%, -50%) rotate(45deg)",
            backgroundColor: "inherit",
            right: -8,
            top: "50%",
          },
          [`&.${sliderClasses.valueLabelOpen}`]: {
            transform: "translateY(-50%) scale(1)",
          },
        },
      },
      {
        props: { size: "small" },
        style: {
          fontSize: theme.typography.pxToRem(12),
          padding: "0.25rem 0.5rem",
        },
      },
      {
        props: { orientation: "vertical", size: "small" },
        style: {
          right: "20px",
        },
      },
    ],
  }))
);

export const SliderMark = styled("span", {
  name: "MuiSlider",
  slot: "Mark",
  shouldForwardProp: (prop) => slotShouldForwardProp(prop) && prop !== "markActive",
  overridesResolver: (props, styles) => {
    const { markActive } = props;

    return [styles.mark, markActive && styles.markActive];
  },
})(
  memoTheme(({ theme }) => ({
    position: "absolute",
    width: 2,
    height: 2,
    borderRadius: 1,
    backgroundColor: "currentColor",
    variants: [
      {
        props: { orientation: "horizontal" },
        style: {
          top: "50%",
          transform: "translate(-1px, -50%)",
        },
      },
      {
        props: { orientation: "vertical" },
        style: {
          left: "50%",
          transform: "translate(-50%, 1px)",
        },
      },
      {
        props: { markActive: true },
        style: {
          backgroundColor: (theme.vars || theme).palette.background.paper,
          opacity: 0.8,
        },
      },
    ],
  }))
);

export const SliderMarkLabel = styled("span", {
  name: "MuiSlider",
  slot: "MarkLabel",
  shouldForwardProp: (prop) => slotShouldForwardProp(prop) && prop !== "markLabelActive",
  overridesResolver: (props, styles) => styles.markLabel,
})(
  memoTheme(({ theme }) => ({
    ...theme.typography.body2,
    color: (theme.vars || theme).palette.text.secondary,
    position: "absolute",
    whiteSpace: "nowrap",
    variants: [
      {
        props: { orientation: "horizontal" },
        style: {
          top: 30,
          transform: "translateX(-50%)",
          "@media (pointer: coarse)": {
            top: 40,
          },
        },
      },
      {
        props: { orientation: "vertical" },
        style: {
          left: 36,
          transform: "translateY(50%)",
          "@media (pointer: coarse)": {
            left: 44,
          },
        },
      },
      {
        props: { markLabelActive: true },
        style: {
          color: (theme.vars || theme).palette.text.primary,
        },
      },
    ],
  }))
);

const useUtilityClasses = (ownerState) => {
  const { disabled, dragging, marked, orientation, track, classes, color, size } = ownerState;

  const slots = {
    root: [
      "root",
      disabled && "disabled",
      dragging && "dragging",
      marked && "marked",
      orientation === "vertical" && "vertical",
      track === "inverted" && "trackInverted",
      track === false && "trackFalse",
      color && `color${capitalize(color)}`,
      size && `size${capitalize(size)}`,
    ],
    rail: ["rail"],
    track: ["track"],
    mark: ["mark"],
    markActive: ["markActive"],
    markLabel: ["markLabel"],
    markLabelActive: ["markLabelActive"],
    valueLabel: ["valueLabel"],
    thumb: [
      "thumb",
      disabled && "disabled",
      size && `thumbSize${capitalize(size)}`,
      color && `thumbColor${capitalize(color)}`,
    ],
    active: ["active"],
    disabled: ["disabled"],
    focusVisible: ["focusVisible"],
  };

  return composeClasses(slots, getSliderUtilityClass, classes);
};

const Forward = ({ children }) => children;

const Slider = React.forwardRef(function Slider(inputProps, ref) {
  const props = useDefaultProps({ props: inputProps, name: "MuiSlider" });

  const isRtl = useRtl();

  const {
    "aria-label": ariaLabel,
    "aria-valuetext": ariaValuetext,
    "aria-labelledby": ariaLabelledby,
    // eslint-disable-next-line react/prop-types
    component = "span",
    components = {},
    componentsProps = {},
    color = "primary",
    classes: classesProp,
    className,
    disableSwap = false,
    disabled = false,
    getAriaLabel,
    getAriaValueText,
    marks: marksProp = false,
    max = 100,
    min = 0,
    name,
    onChange,
    onChangeCommitted,
    orientation = "horizontal",
    shiftStep = 10,
    size = "medium",
    step = 1,
    scale = Identity,
    slotProps,
    slots,
    tabIndex,
    track = "normal",
    value: valueProp,
    valueLabelDisplay = "off",
    valueLabelFormat = Identity,
    ...other
  } = props;

  const ownerState = {
    ...props,
    isRtl,
    max,
    min,
    classes: classesProp,
    disabled,
    disableSwap,
    orientation,
    marks: marksProp,
    color,
    size,
    step,
    shiftStep,
    scale,
    track,
    valueLabelDisplay,
    valueLabelFormat,
  };

  const {
    axisProps,
    getRootProps,
    getHiddenInputProps,
    getThumbProps,
    open,
    active,
    axis,
    focusedThumbIndex,
    range,
    dragging,
    marks,
    values,
    trackOffset,
    trackLeap,
    getThumbStyle,
  } = useSlider({ ...ownerState, rootRef: ref });

  ownerState.marked = marks.length > 0 && marks.some((mark) => mark.label);
  ownerState.dragging = dragging;
  ownerState.focusedThumbIndex = focusedThumbIndex;

  const classes = useUtilityClasses(ownerState);

  // support both `slots` and `components` for backward compatibility
  const RootSlot = slots?.root ?? components.Root ?? SliderRoot;
  const RailSlot = slots?.rail ?? components.Rail ?? SliderRail;
  const TrackSlot = slots?.track ?? components.Track ?? SliderTrack;
  const ThumbSlot = slots?.thumb ?? components.Thumb ?? SliderThumb;
  const ValueLabelSlot = slots?.valueLabel ?? components.ValueLabel ?? SliderValueLabel;
  const MarkSlot = slots?.mark ?? components.Mark ?? SliderMark;
  const MarkLabelSlot = slots?.markLabel ?? components.MarkLabel ?? SliderMarkLabel;
  const InputSlot = slots?.input ?? components.Input ?? "input";

  const rootSlotProps = slotProps?.root ?? componentsProps.root;
  const railSlotProps = slotProps?.rail ?? componentsProps.rail;
  const trackSlotProps = slotProps?.track ?? componentsProps.track;
  const thumbSlotProps = slotProps?.thumb ?? componentsProps.thumb;
  const valueLabelSlotProps = slotProps?.valueLabel ?? componentsProps.valueLabel;
  const markSlotProps = slotProps?.mark ?? componentsProps.mark;
  const markLabelSlotProps = slotProps?.markLabel ?? componentsProps.markLabel;
  const inputSlotProps = slotProps?.input ?? componentsProps.input;

  const rootProps = useSlotProps({
    elementType: RootSlot,
    getSlotProps: getRootProps,
    externalSlotProps: rootSlotProps,
    externalForwardedProps: other,
    additionalProps: {
      ...(shouldSpreadAdditionalProps(RootSlot) && {
        as: component,
      }),
    },
    ownerState: {
      ...ownerState,
      ...rootSlotProps?.ownerState,
    },
    className: [classes.root, className],
  });

  const railProps = useSlotProps({
    elementType: RailSlot,
    externalSlotProps: railSlotProps,
    ownerState,
    className: classes.rail,
  });

  const trackProps = useSlotProps({
    elementType: TrackSlot,
    externalSlotProps: trackSlotProps,
    additionalProps: {
      style: {
        ...axisProps[axis].offset(trackOffset),
        ...axisProps[axis].leap(trackLeap),
      },
    },
    ownerState: {
      ...ownerState,
      ...trackSlotProps?.ownerState,
    },
    className: classes.track,
  });

  const thumbProps = useSlotProps({
    elementType: ThumbSlot,
    getSlotProps: getThumbProps,
    externalSlotProps: thumbSlotProps,
    ownerState: {
      ...ownerState,
      ...thumbSlotProps?.ownerState,
    },
    className: classes.thumb,
  });

  const valueLabelProps = useSlotProps({
    elementType: ValueLabelSlot,
    externalSlotProps: valueLabelSlotProps,
    ownerState: {
      ...ownerState,
      ...valueLabelSlotProps?.ownerState,
    },
    className: classes.valueLabel,
  });

  const markProps = useSlotProps({
    elementType: MarkSlot,
    externalSlotProps: markSlotProps,
    ownerState,
    className: classes.mark,
  });

  const markLabelProps = useSlotProps({
    elementType: MarkLabelSlot,
    externalSlotProps: markLabelSlotProps,
    ownerState,
    className: classes.markLabel,
  });

  const inputSliderProps = useSlotProps({
    elementType: InputSlot,
    getSlotProps: getHiddenInputProps,
    externalSlotProps: inputSlotProps,
    ownerState,
  });

  return (
    <RootSlot {...rootProps}>
      <RailSlot {...railProps} />
      <TrackSlot {...trackProps} />
      {marks
        .filter((mark) => mark.value >= min && mark.value <= max)
        .map((mark, index) => {
          const percent = valueToPercent(mark.value, min, max);
          const style = axisProps[axis].offset(percent);

          let markActive;
          if (track === false) {
            markActive = values.includes(mark.value);
          } else {
            markActive =
              (track === "normal" &&
                (range
                  ? mark.value >= values[0] && mark.value <= values[values.length - 1]
                  : mark.value <= values[0])) ||
              (track === "inverted" &&
                (range
                  ? mark.value <= values[0] || mark.value >= values[values.length - 1]
                  : mark.value >= values[0]));
          }

          return (
            <React.Fragment key={index}>
              <MarkSlot
                data-index={index}
                {...markProps}
                {...(!isHostComponent(MarkSlot) && {
                  markActive,
                })}
                style={{ ...style, ...markProps.style }}
                className={clsx(markProps.className, {
                  [classes.markActive]: markActive,
                })}
              />
              {mark.label != null ? (
                <MarkLabelSlot
                  aria-hidden
                  data-index={index}
                  {...markLabelProps}
                  {...(!isHostComponent(MarkLabelSlot) && {
                    markLabelActive: markActive,
                  })}
                  style={{ ...style, ...markLabelProps.style }}
                  className={clsx(classes.markLabel, markLabelProps.className, {
                    [classes.markLabelActive]: markActive,
                  })}
                >
                  {mark.label}
                </MarkLabelSlot>
              ) : null}
            </React.Fragment>
          );
        })}
      {values.map((value, index) => {
        const percent = valueToPercent(value, min, max);
        const style = axisProps[axis].offset(percent);

        const ValueLabelComponent = valueLabelDisplay === "off" ? Forward : ValueLabelSlot;

        return (
          /* TODO v6: Change component structure. It will help in avoiding the complicated React.cloneElement API added in SliderValueLabel component. Should be: Thumb -> Input, ValueLabel. Follow Joy UI's Slider structure. */
          <ValueLabelComponent
            key={index}
            {...(!isHostComponent(ValueLabelComponent) && {
              valueLabelFormat,
              valueLabelDisplay,
              value:
                typeof valueLabelFormat === "function"
                  ? valueLabelFormat(scale(value), index)
                  : valueLabelFormat,
              index,
              open: open === index || active === index || valueLabelDisplay === "on",
              disabled,
            })}
            {...valueLabelProps}
          >
            <ThumbSlot
              data-index={index}
              {...thumbProps}
              className={clsx(classes.thumb, thumbProps.className, {
                [classes.active]: active === index,
                [classes.focusVisible]: focusedThumbIndex === index,
              })}
              style={{
                ...style,
                ...getThumbStyle(index),
                ...thumbProps.style,
              }}
            >
              <InputSlot
                data-index={index}
                aria-label={getAriaLabel ? getAriaLabel(index) : ariaLabel}
                aria-valuenow={scale(value)}
                aria-labelledby={ariaLabelledby}
                aria-valuetext={
                  getAriaValueText ? getAriaValueText(scale(value), index) : ariaValuetext
                }
                value={values[index]}
                {...inputSliderProps}
              />
            </ThumbSlot>
          </ValueLabelComponent>
        );
      })}
    </RootSlot>
  );
});

Slider.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The label of the slider.
   */
  "aria-label": chainPropTypes(PropTypes.string, (props) => {
    const range = Array.isArray(props.value || props.defaultValue);

    if (range && props["aria-label"] != null) {
      return new Error(
        "MUI: You need to use the `getAriaLabel` prop instead of `aria-label` when using a range slider."
      );
    }

    return null;
  }),
  /**
   * The id of the element containing a label for the slider.
   */
  "aria-labelledby": PropTypes.string,
  /**
   * A string value that provides a user-friendly name for the current value of the slider.
   */
  "aria-valuetext": chainPropTypes(PropTypes.string, (props) => {
    const range = Array.isArray(props.value || props.defaultValue);

    if (range && props["aria-valuetext"] != null) {
      return new Error(
        "MUI: You need to use the `getAriaValueText` prop instead of `aria-valuetext` when using a range slider."
      );
    }

    return null;
  }),
  /**
   * @ignore
   */
  children: PropTypes.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: PropTypes.object,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * The color of the component.
   * It supports both default and custom theme colors, which can be added as shown in the
   * [palette customization guide](https://mui.com/material-ui/customization/palette/#custom-colors).
   * @default 'primary'
   */
  color: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(["primary", "secondary", "error", "info", "success", "warning"]),
    PropTypes.string,
  ]),
  /**
   * The components used for each slot inside.
   *
   * @deprecated use the `slots` prop instead. This prop will be removed in v7. See [Migrating from deprecated APIs](https://mui.com/material-ui/migration/migrating-from-deprecated-apis/) for more details.
   *
   * @default {}
   */
  components: PropTypes.shape({
    Input: PropTypes.elementType,
    Mark: PropTypes.elementType,
    MarkLabel: PropTypes.elementType,
    Rail: PropTypes.elementType,
    Root: PropTypes.elementType,
    Thumb: PropTypes.elementType,
    Track: PropTypes.elementType,
    ValueLabel: PropTypes.elementType,
  }),
  /**
   * The extra props for the slot components.
   * You can override the existing props or add new ones.
   *
   * @deprecated use the `slotProps` prop instead. This prop will be removed in v7. See [Migrating from deprecated APIs](https://mui.com/material-ui/migration/migrating-from-deprecated-apis/) for more details.
   *
   * @default {}
   */
  componentsProps: PropTypes.shape({
    input: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    mark: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    markLabel: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    rail: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    root: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    thumb: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    track: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    valueLabel: PropTypes.oneOfType([
      PropTypes.func,
      PropTypes.shape({
        children: PropTypes.element,
        className: PropTypes.string,
        open: PropTypes.bool,
        style: PropTypes.object,
        value: PropTypes.number,
        valueLabelDisplay: PropTypes.oneOf(["auto", "off", "on"]),
      }),
    ]),
  }),
  /**
   * The default value. Use when the component is not controlled.
   */
  defaultValue: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.number), PropTypes.number]),
  /**
   * If `true`, the component is disabled.
   * @default false
   */
  disabled: PropTypes.bool,
  /**
   * If `true`, the active thumb doesn't swap when moving pointer over a thumb while dragging another thumb.
   * @default false
   */
  disableSwap: PropTypes.bool,
  /**
   * Accepts a function which returns a string value that provides a user-friendly name for the thumb labels of the slider.
   * This is important for screen reader users.
   * @param {number} index The thumb label's index to format.
   * @returns {string}
   */
  getAriaLabel: PropTypes.func,
  /**
   * Accepts a function which returns a string value that provides a user-friendly name for the current value of the slider.
   * This is important for screen reader users.
   * @param {number} value The thumb label's value to format.
   * @param {number} index The thumb label's index to format.
   * @returns {string}
   */
  getAriaValueText: PropTypes.func,
  /**
   * Marks indicate predetermined values to which the user can move the slider.
   * If `true` the marks are spaced according the value of the `step` prop.
   * If an array, it should contain objects with `value` and an optional `label` keys.
   * @default false
   */
  marks: PropTypes.oneOfType([
    PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.node,
        value: PropTypes.number.isRequired,
      })
    ),
    PropTypes.bool,
  ]),
  /**
   * The maximum allowed value of the slider.
   * Should not be equal to min.
   * @default 100
   */
  max: PropTypes.number,
  /**
   * The minimum allowed value of the slider.
   * Should not be equal to max.
   * @default 0
   */
  min: PropTypes.number,
  /**
   * Name attribute of the hidden `input` element.
   */
  name: PropTypes.string,
  /**
   * Callback function that is fired when the slider's value changed.
   *
   * @param {Event} event The event source of the callback.
   * You can pull out the new value by accessing `event.target.value` (any).
   * **Warning**: This is a generic event not a change event.
   * @param {number | number[]} value The new value.
   * @param {number} activeThumb Index of the currently moved thumb.
   */
  onChange: PropTypes.func,
  /**
   * Callback function that is fired when the `mouseup` is triggered.
   *
   * @param {React.SyntheticEvent | Event} event The event source of the callback. **Warning**: This is a generic event not a change event.
   * @param {number | number[]} value The new value.
   */
  onChangeCommitted: PropTypes.func,
  /**
   * The component orientation.
   * @default 'horizontal'
   */
  orientation: PropTypes.oneOf(["horizontal", "vertical"]),
  /**
   * A transformation function, to change the scale of the slider.
   * @param {any} x
   * @returns {any}
   * @default function Identity(x) {
   *   return x;
   * }
   */
  scale: PropTypes.func,
  /**
   * The granularity with which the slider can step through values when using Page Up/Page Down or Shift + Arrow Up/Arrow Down.
   * @default 10
   */
  shiftStep: PropTypes.number,
  /**
   * The size of the slider.
   * @default 'medium'
   */
  size: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(["small", "medium"]),
    PropTypes.string,
  ]),
  /**
   * The props used for each slot inside the Slider.
   * @default {}
   */
  slotProps: PropTypes.shape({
    input: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    mark: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    markLabel: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    rail: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    root: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    thumb: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    track: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    valueLabel: PropTypes.oneOfType([
      PropTypes.func,
      PropTypes.shape({
        children: PropTypes.element,
        className: PropTypes.string,
        open: PropTypes.bool,
        style: PropTypes.object,
        value: PropTypes.number,
        valueLabelDisplay: PropTypes.oneOf(["auto", "off", "on"]),
      }),
    ]),
  }),
  /**
   * The components used for each slot inside the Slider.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  slots: PropTypes.shape({
    input: PropTypes.elementType,
    mark: PropTypes.elementType,
    markLabel: PropTypes.elementType,
    rail: PropTypes.elementType,
    root: PropTypes.elementType,
    thumb: PropTypes.elementType,
    track: PropTypes.elementType,
    valueLabel: PropTypes.elementType,
  }),
  /**
   * The granularity with which the slider can step through values. (A "discrete" slider.)
   * The `min` prop serves as the origin for the valid values.
   * We recommend (max - min) to be evenly divisible by the step.
   *
   * When step is `null`, the thumb can only be slid onto marks provided with the `marks` prop.
   * @default 1
   */
  step: PropTypes.number,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])),
    PropTypes.func,
    PropTypes.object,
  ]),
  /**
   * Tab index attribute of the hidden `input` element.
   */
  tabIndex: PropTypes.number,
  /**
   * The track presentation:
   *
   * - `normal` the track will render a bar representing the slider value.
   * - `inverted` the track will render a bar representing the remaining slider value.
   * - `false` the track will render without a bar.
   * @default 'normal'
   */
  track: PropTypes.oneOf(["inverted", "normal", false]),
  /**
   * The value of the slider.
   * For ranged sliders, provide an array with two values.
   */
  value: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.number), PropTypes.number]),
  /**
   * Controls when the value label is displayed:
   *
   * - `auto` the value label will display when the thumb is hovered or focused.
   * - `on` will display persistently.
   * - `off` will never display.
   * @default 'off'
   */
  valueLabelDisplay: PropTypes.oneOf(["auto", "off", "on"]),
  /**
   * The format function the value label's value.
   *
   * When a function is provided, it should have the following signature:
   *
   * - {number} value The value label's value to format
   * - {number} index The value label's index to format
   * @param {any} x
   * @returns {any}
   * @default function Identity(x) {
   *   return x;
   * }
   */
  valueLabelFormat: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
};

export default Slider;

import * as React from "react";
import { SxProps } from "@mui/system";
import { OverridableStringUnion } from "@mui/types";
import { Mark } from "./useSlider.types";
import { SlotComponentProps } from "../utils/types";
import { Theme } from "../styles";
import { OverrideProps, OverridableComponent } from "../OverridableComponent";
import SliderValueLabelComponent from "./SliderValueLabel";
import { SliderClasses } from "./sliderClasses";

export interface SliderPropsColorOverrides {}

export interface SliderPropsSizeOverrides {}

export interface SliderComponentsPropsOverrides {}

export interface SliderOwnerState extends SliderProps {
  dragging: boolean;
  marked: boolean;
  focusedThumbIndex: number;
}

export interface SliderOwnProps {
  /**
   * The label of the slider.
   */
  "aria-label"?: string;
  /**
   * The id of the element containing a label for the slider.
   */
  "aria-labelledby"?: string;
  /**
   * A string value that provides a user-friendly name for the current value of the slider.
   */
  "aria-valuetext"?: string;
  /**
   * The color of the component.
   * It supports both default and custom theme colors, which can be added as shown in the
   * [palette customization guide](https://mui.com/material-ui/customization/palette/#custom-colors).
   * @default 'primary'
   */
  color?: OverridableStringUnion<
    "primary" | "secondary" | "error" | "info" | "success" | "warning",
    SliderPropsColorOverrides
  >;
  /**
   * The components used for each slot inside.
   *
   * @deprecated use the `slots` prop instead. This prop will be removed in v7. See [Migrating from deprecated APIs](https://mui.com/material-ui/migration/migrating-from-deprecated-apis/) for more details.
   *
   * @default {}
   */
  components?: {
    Root?: React.ElementType;
    Track?: React.ElementType;
    Rail?: React.ElementType;
    Thumb?: React.ElementType;
    Mark?: React.ElementType;
    MarkLabel?: React.ElementType;
    ValueLabel?: React.ElementType;
    Input?: React.ElementType;
  };
  /**
   * The extra props for the slot components.
   * You can override the existing props or add new ones.
   *
   * @deprecated use the `slotProps` prop instead. This prop will be removed in v7. See [Migrating from deprecated APIs](https://mui.com/material-ui/migration/migrating-from-deprecated-apis/) for more details.
   *
   * @default {}
   */
  componentsProps?: {
    root?: SlotComponentProps<"span", SliderComponentsPropsOverrides, SliderOwnerState>;
    track?: SlotComponentProps<"span", SliderComponentsPropsOverrides, SliderOwnerState>;
    rail?: SlotComponentProps<"span", SliderComponentsPropsOverrides, SliderOwnerState>;
    thumb?: SlotComponentProps<"span", SliderComponentsPropsOverrides, SliderOwnerState>;
    mark?: SlotComponentProps<"span", SliderComponentsPropsOverrides, SliderOwnerState>;
    markLabel?: SlotComponentProps<"span", SliderComponentsPropsOverrides, SliderOwnerState>;
    valueLabel?: SlotComponentProps<
      typeof SliderValueLabelComponent,
      SliderComponentsPropsOverrides,
      SliderOwnerState
    >;
    input?: SlotComponentProps<"input", SliderComponentsPropsOverrides, SliderOwnerState>;
  };
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: Partial<SliderClasses>;
  /**
   * @ignore
   */
  className?: string;
  /**
   * The default value. Use when the component is not controlled.
   */
  defaultValue?: number | number[];
  /**
   * If `true`, the component is disabled.
   * @default false
   */
  disabled?: boolean;
  /**
   * If `true`, the active thumb doesn't swap when moving pointer over a thumb while dragging another thumb.
   * @default false
   */
  disableSwap?: boolean;
  /**
   * Accepts a function which returns a string value that provides a user-friendly name for the thumb labels of the slider.
   * This is important for screen reader users.
   * @param {number} index The thumb label's index to format.
   * @returns {string}
   */
  getAriaLabel?: (index: number) => string;
  /**
   * Accepts a function which returns a string value that provides a user-friendly name for the current value of the slider.
   * This is important for screen reader users.
   * @param {number} value The thumb label's value to format.
   * @param {number} index The thumb label's index to format.
   * @returns {string}
   */
  getAriaValueText?: (value: number, index: number) => string;
  /**
   * Marks indicate predetermined values to which the user can move the slider.
   * If `true` the marks are spaced according the value of the `step` prop.
   * If an array, it should contain objects with `value` and an optional `label` keys.
   * @default false
   */
  marks?: boolean | Mark[];
  /**
   * The maximum allowed value of the slider.
   * Should not be equal to min.
   * @default 100
   */
  max?: number;
  /**
   * The minimum allowed value of the slider.
   * Should not be equal to max.
   * @default 0
   */
  min?: number;
  /**
   * Name attribute of the hidden `input` element.
   */
  name?: string;
  /**
   * Callback function that is fired when the slider's value changed.
   *
   * @param {Event} event The event source of the callback.
   * You can pull out the new value by accessing `event.target.value` (any).
   * **Warning**: This is a generic event not a change event.
   * @param {number | number[]} value The new value.
   * @param {number} activeThumb Index of the currently moved thumb.
   */
  onChange?: (event: Event, value: number | number[], activeThumb: number) => void;
  /**
   * Callback function that is fired when the `mouseup` is triggered.
   *
   * @param {React.SyntheticEvent | Event} event The event source of the callback. **Warning**: This is a generic event not a change event.
   * @param {number | number[]} value The new value.
   */
  onChangeCommitted?: (event: React.SyntheticEvent | Event, value: number | number[]) => void;
  /**
   * The component orientation.
   * @default 'horizontal'
   */
  orientation?: "horizontal" | "vertical";
  /**
   * A transformation function, to change the scale of the slider.
   * @param {any} x
   * @returns {any}
   * @default function Identity(x) {
   *   return x;
   * }
   */
  scale?: (value: number) => number;
  /**
   * The granularity with which the slider can step through values when using Page Up/Page Down or Shift + Arrow Up/Arrow Down.
   * @default 10
   */
  shiftStep?: number;
  /**
   * The size of the slider.
   * @default 'medium'
   */
  size?: OverridableStringUnion<"small" | "medium", SliderPropsSizeOverrides>;
  /**
   * The props used for each slot inside the Slider.
   * @default {}
   */
  slotProps?: {
    root?: SlotComponentProps<"span", SliderComponentsPropsOverrides, SliderOwnerState>;
    track?: SlotComponentProps<"span", SliderComponentsPropsOverrides, SliderOwnerState>;
    rail?: SlotComponentProps<"span", SliderComponentsPropsOverrides, SliderOwnerState>;
    thumb?: SlotComponentProps<"span", SliderComponentsPropsOverrides, SliderOwnerState>;
    mark?: SlotComponentProps<"span", SliderComponentsPropsOverrides, SliderOwnerState>;
    markLabel?: SlotComponentProps<"span", SliderComponentsPropsOverrides, SliderOwnerState>;
    valueLabel?: SlotComponentProps<
      typeof SliderValueLabelComponent,
      SliderComponentsPropsOverrides,
      SliderOwnerState
    >;
    input?: SlotComponentProps<"input", SliderComponentsPropsOverrides, SliderOwnerState>;
  };
  /**
   * The components used for each slot inside the Slider.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  slots?: {
    root?: React.ElementType;
    track?: React.ElementType;
    rail?: React.ElementType;
    thumb?: React.ElementType;
    mark?: React.ElementType;
    markLabel?: React.ElementType;
    valueLabel?: React.ElementType;
    input?: React.ElementType;
  };
  /**
   * The granularity with which the slider can step through values. (A "discrete" slider.)
   * The `min` prop serves as the origin for the valid values.
   * We recommend (max - min) to be evenly divisible by the step.
   *
   * When step is `null`, the thumb can only be slid onto marks provided with the `marks` prop.
   * @default 1
   */
  step?: number | null;
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: SxProps<Theme>;
  /**
   * Tab index attribute of the hidden `input` element.
   */
  tabIndex?: number;
  /**
   * The track presentation:
   *
   * - `normal` the track will render a bar representing the slider value.
   * - `inverted` the track will render a bar representing the remaining slider value.
   * - `false` the track will render without a bar.
   * @default 'normal'
   */
  track?: "normal" | false | "inverted";
  /**
   * The value of the slider.
   * For ranged sliders, provide an array with two values.
   */
  value?: number | number[];
  /**
   * Controls when the value label is displayed:
   *
   * - `auto` the value label will display when the thumb is hovered or focused.
   * - `on` will display persistently.
   * - `off` will never display.
   * @default 'off'
   */
  valueLabelDisplay?: "on" | "auto" | "off";
  /**
   * The format function the value label's value.
   *
   * When a function is provided, it should have the following signature:
   *
   * - {number} value The value label's value to format
   * - {number} index The value label's index to format
   * @param {any} x
   * @returns {any}
   * @default function Identity(x) {
   *   return x;
   * }
   */
  valueLabelFormat?: string | ((value: number, index: number) => React.ReactNode);
}

export interface SliderTypeMap<
  RootComponent extends React.ElementType = "span",
  AdditionalProps = {}
> {
  props: AdditionalProps & SliderOwnProps;
  defaultComponent: RootComponent;
}

export interface SliderValueLabelProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactElement<unknown>;
  index: number;
  open: boolean;
  value: number;
}

type SliderRootProps = NonNullable<SliderTypeMap["props"]["componentsProps"]>["root"];
type SliderMarkProps = NonNullable<SliderTypeMap["props"]["componentsProps"]>["mark"];
type SliderMarkLabelProps = NonNullable<SliderTypeMap["props"]["componentsProps"]>["markLabel"];
type SliderRailProps = NonNullable<SliderTypeMap["props"]["componentsProps"]>["rail"];
type SliderTrackProps = NonNullable<SliderTypeMap["props"]["componentsProps"]>["track"];
type SliderThumbProps = NonNullable<SliderTypeMap["props"]["componentsProps"]>["thumb"];

export declare const SliderRoot: React.FC<SliderRootProps>;
export declare const SliderMark: React.FC<SliderMarkProps>;
export declare const SliderMarkLabel: React.FC<SliderMarkLabelProps>;
export declare const SliderRail: React.FC<SliderRailProps>;
export declare const SliderTrack: React.FC<SliderTrackProps>;
export declare const SliderThumb: React.FC<SliderThumbProps>;
export declare const SliderValueLabel: React.FC<SliderValueLabelProps>;

/**
 *
 * Demos:
 *
 * - [Slider](https://mui.com/material-ui/react-slider/)
 *
 * API:
 *
 * - [Slider API](https://mui.com/material-ui/api/slider/)
 */
declare const Slider: OverridableComponent<SliderTypeMap>;

export type SliderProps<
  RootComponent extends React.ElementType = SliderTypeMap["defaultComponent"],
  AdditionalProps = {}
> = OverrideProps<SliderTypeMap<RootComponent, AdditionalProps>, RootComponent> & {
  component?: React.ElementType;
};

export default Slider;



import PropTypes from "prop-types";

import { SliderValueLabelProps } from "./SliderValueLabel.types";

const useValueLabelClasses = (props: SliderValueLabelProps) => {
  const { open } = props;

  const utilityClasses = {
    offset: clsx({
      [sliderClasses.valueLabelOpen]: open,
    }),
    circle: sliderClasses.valueLabelCircle,
    label: sliderClasses.valueLabelLabel,
  };

  return utilityClasses;
};

/**
 * @ignore - internal component.
 */
export default function SliderValueLabel(props: SliderValueLabelProps) {
  const { children, className, value } = props;
  const classes = useValueLabelClasses(props);

  if (!children) {
    return null;
  }

  return React.cloneElement(
    children,
    {
      className: clsx(children.props.className),
    },
    <React.Fragment>
      {children.props.children}
      <span className={clsx(classes.offset, className)} aria-hidden>
        <span className={classes.circle}>
          <span className={classes.label}>{value}</span>
        </span>
      </span>
    </React.Fragment>
  );
}

SliderValueLabel.propTypes = {
  children: PropTypes.element.isRequired,
  className: PropTypes.string,
  value: PropTypes.node,
} as any;

export interface SliderValueLabelProps {
  children?: React.ReactElement<any>;
  className?: string;
  style?: React.CSSProperties;
  /**
   * If `true`, the value label is visible.
   */
  open: boolean;
  /**
   * The value of the slider.
   * For ranged sliders, provide an array with two values.
   */
  value: number;
  /**
   * Controls when the value label is displayed:
   *
   * - `auto` the value label will display when the thumb is hovered or focused.
   * - `on` will display persistently.
   * - `off` will never display.
   * @default 'off'
   */
  valueLabelDisplay?: "on" | "auto" | "off";
}

import {
  unstable_ownerDocument as ownerDocument,
  unstable_useControlled as useControlled,
  unstable_useEnhancedEffect as useEnhancedEffect,
  unstable_useEventCallback as useEventCallback,
  unstable_useForkRef as useForkRef,
  unstable_isFocusVisible as isFocusVisible,
  visuallyHidden,
  clamp,
} from "@mui/utils";
import extractEventHandlers from "@mui/utils/extractEventHandlers";
import {
  Mark,
  UseSliderHiddenInputProps,
  UseSliderParameters,
  UseSliderReturnValue,
  UseSliderRootSlotProps,
  UseSliderThumbSlotProps,
} from "./useSlider.types";
import { EventHandlers } from "../utils/types";
import areArraysEqual from "../utils/areArraysEqual";

const INTENTIONAL_DRAG_COUNT_THRESHOLD = 2;

function asc(a: number, b: number) {
  return a - b;
}

function findClosest(values: number[], currentValue: number) {
  const { index: closestIndex } =
    values.reduce<{ distance: number; index: number } | null>(
      (acc, value: number, index: number) => {
        const distance = Math.abs(currentValue - value);

        if (acc === null || distance < acc.distance || distance === acc.distance) {
          return {
            distance,
            index,
          };
        }

        return acc;
      },
      null
    ) ?? {};
  return closestIndex;
}

function trackFinger(
  event: TouchEvent | MouseEvent | React.MouseEvent,
  touchId: React.RefObject<any>
) {
  // The event is TouchEvent
  if (touchId.current !== undefined && (event as TouchEvent).changedTouches) {
    const touchEvent = event as TouchEvent;
    for (let i = 0; i < touchEvent.changedTouches.length; i += 1) {
      const touch = touchEvent.changedTouches[i];
      if (touch.identifier === touchId.current) {
        return {
          x: touch.clientX,
          y: touch.clientY,
        };
      }
    }

    return false;
  }

  // The event is MouseEvent
  return {
    x: (event as MouseEvent).clientX,
    y: (event as MouseEvent).clientY,
  };
}

export function valueToPercent(value: number, min: number, max: number) {
  return ((value - min) * 100) / (max - min);
}

function percentToValue(percent: number, min: number, max: number) {
  return (max - min) * percent + min;
}

function getDecimalPrecision(num: number) {
  // This handles the case when num is very small (0.00000001), js will turn this into 1e-8.
  // When num is bigger than 1 or less than -1 it won't get converted to this notation so it's fine.
  if (Math.abs(num) < 1) {
    const parts = num.toExponential().split("e-");
    const matissaDecimalPart = parts[0].split(".")[1];
    return (matissaDecimalPart ? matissaDecimalPart.length : 0) + parseInt(parts[1], 10);
  }

  const decimalPart = num.toString().split(".")[1];
  return decimalPart ? decimalPart.length : 0;
}

function roundValueToStep(value: number, step: number, min: number) {
  const nearest = Math.round((value - min) / step) * step + min;
  return Number(nearest.toFixed(getDecimalPrecision(step)));
}

function setValueIndex({
  values,
  newValue,
  index,
}: {
  values: number[];
  newValue: number;
  index: number;
}) {
  const output = values.slice();
  output[index] = newValue;
  return output.sort(asc);
}

function focusThumb({
  sliderRef,
  activeIndex,
  setActive,
}: {
  sliderRef: React.RefObject<any>;
  activeIndex: number;
  setActive?: (num: number) => void;
}) {
  const doc = ownerDocument(sliderRef.current);
  if (
    !sliderRef.current?.contains(doc.activeElement) ||
    Number(doc?.activeElement?.getAttribute("data-index")) !== activeIndex
  ) {
    sliderRef.current?.querySelector(`[type="range"][data-index="${activeIndex}"]`).focus();
  }

  if (setActive) {
    setActive(activeIndex);
  }
}

function areValuesEqual(
  newValue: number | ReadonlyArray<number>,
  oldValue: number | ReadonlyArray<number>
): boolean {
  if (typeof newValue === "number" && typeof oldValue === "number") {
    return newValue === oldValue;
  }
  if (typeof newValue === "object" && typeof oldValue === "object") {
    return areArraysEqual(newValue, oldValue);
  }
  return false;
}

const axisProps = {
  horizontal: {
    offset: (percent: number) => ({ left: `${percent}%` }),
    leap: (percent: number) => ({ width: `${percent}%` }),
  },
  "horizontal-reverse": {
    offset: (percent: number) => ({ right: `${percent}%` }),
    leap: (percent: number) => ({ width: `${percent}%` }),
  },
  vertical: {
    offset: (percent: number) => ({ bottom: `${percent}%` }),
    leap: (percent: number) => ({ height: `${percent}%` }),
  },
};

export const Identity = (x: any) => x;

// TODO: remove support for Safari < 13.
// https://caniuse.com/#search=touch-action
//
// Safari, on iOS, supports touch action since v13.
// Over 80% of the iOS phones are compatible
// in August 2020.
// Utilizing the CSS.supports method to check if touch-action is supported.
// Since CSS.supports is supported on all but Edge@12 and IE and touch-action
// is supported on both Edge@12 and IE if CSS.supports is not available that means that
// touch-action will be supported
let cachedSupportsTouchActionNone: any;
function doesSupportTouchActionNone() {
  if (cachedSupportsTouchActionNone === undefined) {
    if (typeof CSS !== "undefined" && typeof CSS.supports === "function") {
      cachedSupportsTouchActionNone = CSS.supports("touch-action", "none");
    } else {
      cachedSupportsTouchActionNone = true;
    }
  }
  return cachedSupportsTouchActionNone;
}

export function useSlider(parameters: UseSliderParameters): UseSliderReturnValue {
  const {
    "aria-labelledby": ariaLabelledby,
    defaultValue,
    disabled = false,
    disableSwap = false,
    isRtl = false,
    marks: marksProp = false,
    max = 100,
    min = 0,
    name,
    onChange,
    onChangeCommitted,
    orientation = "horizontal",
    rootRef: ref,
    scale = Identity,
    step = 1,
    shiftStep = 10,
    tabIndex,
    value: valueProp,
  } = parameters;

  const touchId = React.useRef<number | undefined>(undefined);
  // We can't use the :active browser pseudo-classes.
  // - The active state isn't triggered when clicking on the rail.
  // - The active state isn't transferred when inversing a range slider.
  const [active, setActive] = React.useState(-1);
  const [open, setOpen] = React.useState(-1);
  const [dragging, setDragging] = React.useState(false);
  const moveCount = React.useRef(0);

  const [valueDerived, setValueState] = useControlled({
    controlled: valueProp,
    default: defaultValue ?? min,
    name: "Slider",
  });

  const handleChange =
    onChange &&
    ((event: Event | React.SyntheticEvent, value: number | number[], thumbIndex: number) => {
      // Redefine target to allow name and value to be read.
      // This allows seamless integration with the most popular form libraries.
      // https://github.com/mui/material-ui/issues/13485#issuecomment-676048492
      // Clone the event to not override `target` of the original event.
      const nativeEvent = (event as React.SyntheticEvent).nativeEvent || event;
      // @ts-ignore The nativeEvent is function, not object
      const clonedEvent = new nativeEvent.constructor(nativeEvent.type, nativeEvent);

      Object.defineProperty(clonedEvent, "target", {
        writable: true,
        value: { value, name },
      });

      onChange(clonedEvent, value, thumbIndex);
    });

  const range = Array.isArray(valueDerived);
  let values = range ? valueDerived.slice().sort(asc) : [valueDerived];
  values = values.map((value) => (value == null ? min : clamp(value, min, max)));

  const marks =
    marksProp === true && step !== null
      ? [...Array(Math.floor((max - min) / step) + 1)].map((_, index) => ({
          value: min + step * index,
        }))
      : marksProp || [];

  const marksValues = (marks as Mark[]).map((mark: Mark) => mark.value);

  const [focusedThumbIndex, setFocusedThumbIndex] = React.useState(-1);

  const sliderRef = React.useRef<HTMLSpanElement | null>(null);
  const handleRef = useForkRef(ref, sliderRef);

  const createHandleHiddenInputFocus =
    (otherHandlers: EventHandlers) => (event: React.FocusEvent) => {
      const index = Number(event.currentTarget.getAttribute("data-index"));
      if (isFocusVisible(event.target)) {
        setFocusedThumbIndex(index);
      }
      setOpen(index);
      otherHandlers?.onFocus?.(event);
    };
  const createHandleHiddenInputBlur =
    (otherHandlers: EventHandlers) => (event: React.FocusEvent) => {
      if (!isFocusVisible(event.target)) {
        setFocusedThumbIndex(-1);
      }
      setOpen(-1);
      otherHandlers?.onBlur?.(event);
    };

  const changeValue = (event: React.KeyboardEvent | React.ChangeEvent, valueInput: number) => {
    const index = Number(event.currentTarget.getAttribute("data-index"));
    const value = values[index];
    const marksIndex = marksValues.indexOf(value);
    let newValue: number | number[] = valueInput;

    if (marks && step == null) {
      const maxMarksValue = marksValues[marksValues.length - 1];
      if (newValue > maxMarksValue) {
        newValue = maxMarksValue;
      } else if (newValue < marksValues[0]) {
        newValue = marksValues[0];
      } else {
        newValue = newValue < value ? marksValues[marksIndex - 1] : marksValues[marksIndex + 1];
      }
    }

    newValue = clamp(newValue, min, max);

    if (range) {
      // Bound the new value to the thumb's neighbours.
      if (disableSwap) {
        newValue = clamp(newValue, values[index - 1] || -Infinity, values[index + 1] || Infinity);
      }

      const previousValue = newValue;
      newValue = setValueIndex({
        values,
        newValue,
        index,
      });

      let activeIndex = index;

      // Potentially swap the index if needed.
      if (!disableSwap) {
        activeIndex = newValue.indexOf(previousValue);
      }

      focusThumb({ sliderRef, activeIndex });
    }

    setValueState(newValue);
    setFocusedThumbIndex(index);

    if (handleChange && !areValuesEqual(newValue, valueDerived)) {
      handleChange(event, newValue, index);
    }

    if (onChangeCommitted) {
      onChangeCommitted(event, newValue);
    }
  };

  const createHandleHiddenInputKeyDown =
    (otherHandlers: EventHandlers) => (event: React.KeyboardEvent) => {
      // The Shift + Up/Down keyboard shortcuts for moving the slider makes sense to be supported
      // only if the step is defined. If the step is null, this means tha the marks are used for specifying the valid values.
      if (step !== null) {
        const index = Number(event.currentTarget.getAttribute("data-index"));
        const value = values[index];

        let newValue = null;
        if (
          ((event.key === "ArrowLeft" || event.key === "ArrowDown") && event.shiftKey) ||
          event.key === "PageDown"
        ) {
          newValue = Math.max(value - shiftStep, min);
        } else if (
          ((event.key === "ArrowRight" || event.key === "ArrowUp") && event.shiftKey) ||
          event.key === "PageUp"
        ) {
          newValue = Math.min(value + shiftStep, max);
        }

        if (newValue !== null) {
          changeValue(event, newValue);
          event.preventDefault();
        }
      }

      otherHandlers?.onKeyDown?.(event);
    };

  useEnhancedEffect(() => {
    if (disabled && sliderRef.current!.contains(document.activeElement)) {
      // This is necessary because Firefox and Safari will keep focus
      // on a disabled element:
      // https://codesandbox.io/p/sandbox/mui-pr-22247-forked-h151h?file=/src/App.js
      // @ts-ignore
      document.activeElement?.blur();
    }
  }, [disabled]);

  if (disabled && active !== -1) {
    setActive(-1);
  }
  if (disabled && focusedThumbIndex !== -1) {
    setFocusedThumbIndex(-1);
  }

  const createHandleHiddenInputChange =
    (otherHandlers: EventHandlers) => (event: React.ChangeEvent) => {
      otherHandlers.onChange?.(event);
      // @ts-ignore
      changeValue(event, event.target.valueAsNumber);
    };

  const previousIndex = React.useRef<number | undefined>(undefined);
  let axis = orientation;
  if (isRtl && orientation === "horizontal") {
    axis += "-reverse";
  }

  const getFingerNewValue = ({
    finger,
    move = false,
  }: {
    finger: { x: number; y: number };
    move?: boolean;
  }) => {
    const { current: slider } = sliderRef;
    const { width, height, bottom, left } = slider!.getBoundingClientRect();
    let percent;

    if (axis.startsWith("vertical")) {
      percent = (bottom - finger.y) / height;
    } else {
      percent = (finger.x - left) / width;
    }

    if (axis.includes("-reverse")) {
      percent = 1 - percent;
    }

    let newValue;
    newValue = percentToValue(percent, min, max);
    if (step) {
      newValue = roundValueToStep(newValue, step, min);
    } else {
      const closestIndex = findClosest(marksValues, newValue);
      newValue = marksValues[closestIndex!];
    }

    newValue = clamp(newValue, min, max);
    let activeIndex = 0;

    if (range) {
      if (!move) {
        activeIndex = findClosest(values, newValue)!;
      } else {
        activeIndex = previousIndex.current!;
      }

      // Bound the new value to the thumb's neighbours.
      if (disableSwap) {
        newValue = clamp(
          newValue,
          values[activeIndex - 1] || -Infinity,
          values[activeIndex + 1] || Infinity
        );
      }

      const previousValue = newValue;
      newValue = setValueIndex({
        values,
        newValue,
        index: activeIndex,
      });

      // Potentially swap the index if needed.
      if (!(disableSwap && move)) {
        activeIndex = newValue.indexOf(previousValue);
        previousIndex.current = activeIndex;
      }
    }

    return { newValue, activeIndex };
  };

  const handleTouchMove = useEventCallback((nativeEvent: TouchEvent | MouseEvent) => {
    const finger = trackFinger(nativeEvent, touchId);

    if (!finger) {
      return;
    }

    moveCount.current += 1;

    // Cancel move in case some other element consumed a mouseup event and it was not fired.
    // @ts-ignore buttons doesn't not exists on touch event
    if (nativeEvent.type === "mousemove" && nativeEvent.buttons === 0) {
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      handleTouchEnd(nativeEvent);
      return;
    }

    const { newValue, activeIndex } = getFingerNewValue({
      finger,
      move: true,
    });

    focusThumb({ sliderRef, activeIndex, setActive });
    setValueState(newValue);

    if (!dragging && moveCount.current > INTENTIONAL_DRAG_COUNT_THRESHOLD) {
      setDragging(true);
    }

    if (handleChange && !areValuesEqual(newValue, valueDerived)) {
      handleChange(nativeEvent, newValue, activeIndex);
    }
  });

  const handleTouchEnd = useEventCallback((nativeEvent: TouchEvent | MouseEvent) => {
    const finger = trackFinger(nativeEvent, touchId);
    setDragging(false);

    if (!finger) {
      return;
    }

    const { newValue } = getFingerNewValue({ finger, move: true });

    setActive(-1);
    if (nativeEvent.type === "touchend") {
      setOpen(-1);
    }

    if (onChangeCommitted) {
      onChangeCommitted(nativeEvent, newValue);
    }

    touchId.current = undefined;

    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    stopListening();
  });

  const handleTouchStart = useEventCallback((nativeEvent: TouchEvent) => {
    if (disabled) {
      return;
    }
    // If touch-action: none; is not supported we need to prevent the scroll manually.
    if (!doesSupportTouchActionNone()) {
      nativeEvent.preventDefault();
    }

    const touch = nativeEvent.changedTouches[0];
    if (touch != null) {
      // A number that uniquely identifies the current finger in the touch session.
      touchId.current = touch.identifier;
    }
    const finger = trackFinger(nativeEvent, touchId);
    if (finger !== false) {
      const { newValue, activeIndex } = getFingerNewValue({ finger });
      focusThumb({ sliderRef, activeIndex, setActive });

      setValueState(newValue);

      if (handleChange && !areValuesEqual(newValue, valueDerived)) {
        handleChange(nativeEvent, newValue, activeIndex);
      }
    }

    moveCount.current = 0;
    const doc = ownerDocument(sliderRef.current);
    doc.addEventListener("touchmove", handleTouchMove, { passive: true });
    doc.addEventListener("touchend", handleTouchEnd, { passive: true });
  });

  const stopListening = React.useCallback(() => {
    const doc = ownerDocument(sliderRef.current);
    doc.removeEventListener("mousemove", handleTouchMove);
    doc.removeEventListener("mouseup", handleTouchEnd);
    doc.removeEventListener("touchmove", handleTouchMove);
    doc.removeEventListener("touchend", handleTouchEnd);
  }, [handleTouchEnd, handleTouchMove]);

  React.useEffect(() => {
    const { current: slider } = sliderRef;
    slider!.addEventListener("touchstart", handleTouchStart, {
      passive: doesSupportTouchActionNone(),
    });

    return () => {
      slider!.removeEventListener("touchstart", handleTouchStart);

      stopListening();
    };
  }, [stopListening, handleTouchStart]);

  React.useEffect(() => {
    if (disabled) {
      stopListening();
    }
  }, [disabled, stopListening]);

  const createHandleMouseDown =
    (otherHandlers: EventHandlers) => (event: React.MouseEvent<HTMLSpanElement>) => {
      otherHandlers.onMouseDown?.(event);
      if (disabled) {
        return;
      }

      if (event.defaultPrevented) {
        return;
      }

      // Only handle left clicks
      if (event.button !== 0) {
        return;
      }

      // Avoid text selection
      event.preventDefault();
      const finger = trackFinger(event, touchId);
      if (finger !== false) {
        const { newValue, activeIndex } = getFingerNewValue({ finger });
        focusThumb({ sliderRef, activeIndex, setActive });

        setValueState(newValue);

        if (handleChange && !areValuesEqual(newValue, valueDerived)) {
          handleChange(event, newValue, activeIndex);
        }
      }

      moveCount.current = 0;
      const doc = ownerDocument(sliderRef.current);
      doc.addEventListener("mousemove", handleTouchMove, { passive: true });
      doc.addEventListener("mouseup", handleTouchEnd);
    };

  const trackOffset = valueToPercent(range ? values[0] : min, min, max);
  const trackLeap = valueToPercent(values[values.length - 1], min, max) - trackOffset;

  const getRootProps = <ExternalProps extends Record<string, unknown> = {}>(
    externalProps: ExternalProps = {} as ExternalProps
  ): UseSliderRootSlotProps<ExternalProps> => {
    const externalHandlers = extractEventHandlers(externalProps);

    const ownEventHandlers = {
      onMouseDown: createHandleMouseDown(externalHandlers || {}),
    };

    const mergedEventHandlers = {
      ...externalHandlers,
      ...ownEventHandlers,
    };

    return {
      ...externalProps,
      ref: handleRef,
      ...mergedEventHandlers,
    };
  };

  const createHandleMouseOver =
    (otherHandlers: EventHandlers) => (event: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
      otherHandlers.onMouseOver?.(event);

      const index = Number(event.currentTarget.getAttribute("data-index"));
      setOpen(index);
    };

  const createHandleMouseLeave =
    (otherHandlers: EventHandlers) => (event: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
      otherHandlers.onMouseLeave?.(event);

      setOpen(-1);
    };

  const getThumbProps = <ExternalProps extends Record<string, unknown> = {}>(
    externalProps: ExternalProps = {} as ExternalProps
  ): UseSliderThumbSlotProps<ExternalProps> => {
    const externalHandlers = extractEventHandlers(externalProps);

    const ownEventHandlers = {
      onMouseOver: createHandleMouseOver(externalHandlers || {}),
      onMouseLeave: createHandleMouseLeave(externalHandlers || {}),
    };

    return {
      ...externalProps,
      ...externalHandlers,
      ...ownEventHandlers,
    };
  };

  const getThumbStyle = (index: number) => {
    return {
      // So the non active thumb doesn't show its label on hover.
      pointerEvents: active !== -1 && active !== index ? "none" : undefined,
    };
  };

  const getHiddenInputProps = <ExternalProps extends Record<string, unknown> = {}>(
    externalProps: ExternalProps = {} as ExternalProps
  ): UseSliderHiddenInputProps<ExternalProps> => {
    const externalHandlers = extractEventHandlers(externalProps);

    const ownEventHandlers = {
      onChange: createHandleHiddenInputChange(externalHandlers || {}),
      onFocus: createHandleHiddenInputFocus(externalHandlers || {}),
      onBlur: createHandleHiddenInputBlur(externalHandlers || {}),
      onKeyDown: createHandleHiddenInputKeyDown(externalHandlers || {}),
    };

    const mergedEventHandlers = {
      ...externalHandlers,
      ...ownEventHandlers,
    };

    return {
      tabIndex,
      "aria-labelledby": ariaLabelledby,
      "aria-orientation": orientation,
      "aria-valuemax": scale(max),
      "aria-valuemin": scale(min),
      name,
      type: "range",
      min: parameters.min,
      max: parameters.max,
      step: parameters.step === null && parameters.marks ? "any" : parameters.step ?? undefined,
      disabled,
      ...externalProps,
      ...mergedEventHandlers,
      style: {
        ...visuallyHidden,
        direction: isRtl ? "rtl" : "ltr",
        // So that VoiceOver's focus indicator matches the thumb's dimensions
        width: "100%",
        height: "100%",
      },
    };
  };

  return {
    active,
    axis: axis as keyof typeof axisProps,
    axisProps,
    dragging,
    focusedThumbIndex,
    getHiddenInputProps,
    getRootProps,
    getThumbProps,
    marks: marks as Mark[],
    open,
    range,
    rootRef: handleRef,
    trackLeap,
    trackOffset,
    values,
    getThumbStyle,
  };
}

export interface UseSliderParameters {
  /**
   * The default value. Use when the component is not controlled.
   */
  defaultValue?: number | ReadonlyArray<number>;
  /**
   * If `true`, the component is disabled.
   * @default false
   */
  disabled?: boolean;
  /**
   * If `true`, the active thumb doesn't swap when moving pointer over a thumb while dragging another thumb.
   * @default false
   */
  disableSwap?: boolean;

  /**
   * Marks indicate predetermined values to which the user can move the slider.
   * If `true` the marks are spaced according the value of the `step` prop.
   * If an array, it should contain objects with `value` and an optional `label` keys.
   * @default false
   */
  marks?: boolean | ReadonlyArray<Mark>;
  /**
   * The maximum allowed value of the slider.
   * Should not be equal to min.
   * @default 100
   */
  max?: number;
  /**
   * The minimum allowed value of the slider.
   * Should not be equal to max.
   * @default 0
   */
  min?: number;
  /**
   * Name attribute of the hidden `input` element.
   */
  name?: string;
  /**
   * Callback function that is fired when the slider's value changed.
   *
   * @param {Event} event The event source of the callback.
   * You can pull out the new value by accessing `event.target.value` (any).
   * **Warning**: This is a generic event not a change event.
   * @param {number | number[]} value The new value.
   * @param {number} activeThumb Index of the currently moved thumb.
   */
  onChange?: (event: Event, value: number | number[], activeThumb: number) => void;
  /**
   * Callback function that is fired when the `mouseup` is triggered.
   *
   * @param {React.SyntheticEvent | Event} event The event source of the callback. **Warning**: This is a generic event not a change event.
   * @param {number | number[]} value The new value.
   */
  onChangeCommitted?: (event: React.SyntheticEvent | Event, value: number | number[]) => void;
  /**
   * The component orientation.
   * @default 'horizontal'
   */
  orientation?: "horizontal" | "vertical";
  /**
   * The ref attached to the root of the Slider.
   */
  rootRef?: React.Ref<Element>;

  /**
   * The granularity with which the slider can step through values when using Page Up/Page Down or Shift + Arrow Up/Arrow Down.
   * @default 10
   */
  shiftStep?: number;
  /**
   * The granularity with which the slider can step through values. (A "discrete" slider.)
   * The `min` prop serves as the origin for the valid values.
   * We recommend (max - min) to be evenly divisible by the step.
   *
   * When step is `null`, the thumb can only be slid onto marks provided with the `marks` prop.
   * @default 1
   */
  step?: number | null;
  /**
   * Tab index attribute of the hidden `input` element.
   */
  tabIndex?: number;
  /**
   * The value of the slider.
   * For ranged sliders, provide an array with two values.
   */
  value?: number | ReadonlyArray<number>;
}

export interface Mark {
  value: number;
  label?: React.ReactNode;
}

export type UseSliderRootSlotOwnProps = {
  onMouseDown: React.MouseEventHandler;
  ref: React.RefCallback<Element> | null;
};

export type UseSliderRootSlotProps<ExternalProps = {}> = Omit<
  ExternalProps,
  keyof UseSliderRootSlotOwnProps
> &
  UseSliderRootSlotOwnProps;

export type UseSliderThumbSlotOwnProps = {
  onMouseLeave: React.MouseEventHandler;
  onMouseOver: React.MouseEventHandler;
};

export type UseSliderThumbSlotProps<ExternalProps = {}> = Omit<
  ExternalProps,
  keyof UseSliderThumbSlotOwnProps
> &
  UseSliderThumbSlotOwnProps;

export type UseSliderHiddenInputOwnProps = {
  disabled: boolean;
  name?: string;
  onBlur: React.FocusEventHandler;
  onChange: React.ChangeEventHandler;
  onFocus: React.FocusEventHandler;
  step?: number | "any";
  style: React.CSSProperties;
  tabIndex?: number;
  type?: React.InputHTMLAttributes<HTMLInputElement>["type"];
};

export type UseSliderHiddenInputProps<ExternalProps = {}> = Omit<
  ExternalProps,
  keyof UseSliderHiddenInputOwnProps
> &
  UseSliderHiddenInputOwnProps;

export type Axis = "horizontal" | "vertical" | "horizontal-reverse";

export interface AxisProps<T extends Axis> {
  offset: (
    percent: number
  ) => T extends "horizontal"
    ? { left: string }
    : T extends "vertical"
    ? { bottom: string }
    : T extends "horizontal-reverse"
    ? { right: string }
    : never;
  leap: (
    percent: number
  ) => T extends "horizontal" | "horizontal-reverse"
    ? { width: string }
    : T extends "vertical"
    ? { height: string }
    : never;
}

export interface UseSliderReturnValue {
  /**
   * The active index of the slider.
   */
  active: number;
  /**
   * The orientation of the slider.
   */
  axis: Axis;
    /**
   * The marks of the slider. Marks indicate predetermined values to which the user can move the slider.
   */
  marks: Mark[];
  /**
   * The thumb index for the current value when in hover state.
   */
  open: number;
  /**
   * If `true`, the slider is a range slider when the `value` prop passed is an array.
   */
  range: boolean;
  /**
   * Ref to the root slot's DOM node.
   */
  rootRef: React.RefCallback<Element> | null;

  /**
   * The track offset for the current value of the slider.
   */
  trackOffset: number;
  /**
   * The possible values of the slider.
   */
  values: number[];
}
