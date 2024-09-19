import * as React from "react";
import isHostComponent from "../utils/isHostComponent";
import styled from "@emotion/styled";
import memoTheme from "../utils/memoTheme";
import { useDefaultProps } from "../DefaultPropsProvider";
import slotShouldForwardProp from "../styles/slotShouldForwardProp";
import shouldSpreadAdditionalProps from "../utils/shouldSpreadAdditionalProps";

function Identity(x) {
  return x;
}

export const SliderRoot = styled("span")({
  borderRadius: 12,
  boxSizing: "content-box",
  display: "inline-block",
  position: "relative",
  cursor: "pointer",
  height: 4,
  width: "100%",
  padding: "13px 0",
  "-disabled": {
    pointerEvents: "none",
    cursor: "default",
  },
});

export const SliderRail = styled("span")({
  display: "block",
  position: "absolute",
  borderRadius: "inherit",
  backgroundColor: "currentColor",
  opacity: 0.38,
  width: "100%",
  height: "inherit",
  top: "50%",
  transform: "translateY(-50%)",
});

export const SliderTrack = styled("span")({
  display: "block",
  position: "absolute",
  borderRadius: "inherit",
  border: "1px solid currentColor",
  backgroundColor: "currentColor",
  transition: "",
  height: "inherit",
  top: "50%",
  transform: "translateY(-50%)",
});

export const SliderThumb = styled("span")({
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
  transition: "",
  "&::before": {
    position: "absolute",
    content: '""',
    borderRadius: "inherit",
    width: "100%",
    height: "100%",
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
  "-disabled": {
    "&:hover": {
      boxShadow: "none",
    },
  },
  top: "50%",
  transform: "translate(-50%, -50%)",
});

export const SliderValueLabel = styled(BaseSliderValueLabel)({
  zIndex: 1,
  whiteSpace: "nowrap",
  fontWeight: 500,
  transition: "",
  position: "absolute",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "0.25rem 0.75rem",
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
});

export const SliderMark = styled("span")({
  position: "absolute",
  width: 2,
  height: 2,
  borderRadius: 1,
  backgroundColor: "currentColor",
  top: "50%",
  transform: "translate(-1px, -50%)",
});

export const SliderMarkLabel = styled("span")({
  top: 30,
  transform: "translateX(-50%)",
  "@media (pointer: coarse)": {
    top: 40,
  },

  position: "absolute",
  whiteSpace: "nowrap",
});

const Forward = ({ children }) => children;

const Slider = (props) => {
  const {
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

  // support both `slots` and `components` for backward compatibility
  const RootSlot = SliderRoot;
  const RailSlot = SliderRail;
  const TrackSlot = SliderTrack;
  const ThumbSlot = SliderThumb;
  const ValueLabelSlot = SliderValueLabel;
  const MarkSlot = SliderMark;
  const MarkLabelSlot = SliderMarkLabel;
  const InputSlot = "input";

  return (
    <RootSlot>
      <RailSlot />
      <TrackSlot />
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
                {...(!isHostComponent(MarkSlot) && {
                  markActive,
                })}
                style={{ ...style }}
              />
              {mark.label != null ? (
                <MarkLabelSlot
                  aria-hidden
                  data-index={index}
                  {...(!isHostComponent(MarkLabelSlot) && {
                    markLabelActive: markActive,
                  })}
                  style={{ ...style }}
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
          >
            <ThumbSlot
              data-index={index}
              style={{
                ...style,
                ...getThumbStyle(index),
              }}
            >
              <InputSlot data-index={index} value={values[index]} />
            </ThumbSlot>
          </ValueLabelComponent>
        );
      })}
    </RootSlot>
  );
};

export default Slider;

import { Mark } from "./useSlider.types";

export interface SliderOwnProps {
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
   * The granularity with which the slider can step through values. (A "discrete" slider.)
   * The `min` prop serves as the origin for the valid values.
   * We recommend (max - min) to be evenly divisible by the step.
   *
   * When step is `null`, the thumb can only be slid onto marks provided with the `marks` prop.
   * @default 1
   */
  step?: number | null;

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
}

import { SliderValueLabelProps } from "./SliderValueLabel.types";

export function SliderValueLabel(props: SliderValueLabelProps) {
  const { children, className, value } = props;

  if (!children) {
    return null;
  }

  return React.cloneElement(
    children,
    <React.Fragment>
      {children.props.children}

      <span>{value}</span>
    </React.Fragment>
  );
}

export interface SliderValueLabelProps {
  children?: React.ReactElement<any>;

  /**
   * If `true`, the value label is visible.
   */
  open: boolean;
  /**
   * The value of the slider.
   * For ranged sliders, provide an array with two values.
   */
  value: number;
}

import {
  unstable_ownerDocument as ownerDocument,
  unstable_useControlled as useControlled,
  unstable_useEventCallback as useEventCallback,
  unstable_useForkRef as useForkRef,
  clamp,
} from "@mui/utils";

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

export function useSlider(parameters: UseSliderParameters): UseSliderReturnValue {
  const {
    defaultValue,
    disabled = false,
    max = 100,
    min = 0,
    onChange,
    onChangeCommitted,
    rootRef: ref,
    step = 1,
    value: valueProp,
  } = parameters;

  const touchId = React.useRef<number | undefined>(undefined);
  const [active, setActive] = React.useState(-1);
  const [open, setOpen] = React.useState(-1);
  const [dragging, setDragging] = React.useState(false);
  const moveCount = React.useRef(0);

  const [valueDerived, setValueState] = React.useState(defaultValue);

  const handleChange = (event: Event, value: number, thumbIndex: number) => {
    onChange?.(event, value, thumbIndex);
  };

  let values = [valueDerived];
  values = values.map((value) => (value == null ? min : clamp(value, min, max)));

  const [focusedThumbIndex, setFocusedThumbIndex] = React.useState(-1);

  const sliderRef = React.useRef<HTMLSpanElement | null>(null);
  const handleRef = useForkRef(ref, sliderRef);

  const changeValue = (event: React.KeyboardEvent | React.ChangeEvent, valueInput: number) => {
    const index = Number(event.currentTarget.getAttribute("data-index"));
    const value = values[index];

    let newValue: number = valueInput;

    newValue = clamp(newValue, min, max);

    setValueState(newValue);
    setFocusedThumbIndex(index);

    if (handleChange && !areValuesEqual(newValue, valueDerived)) {
      handleChange(event, newValue, index);
    }

    if (onChangeCommitted) {
      onChangeCommitted(event, newValue);
    }
  };

  if (disabled && active !== -1) {
    setActive(-1);
  }
  if (disabled && focusedThumbIndex !== -1) {
    setFocusedThumbIndex(-1);
  }

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
  }, [handleTouchEnd, handleTouchMove]);

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

  return {
    createHandleMouseLeave,
    createHandleMouseOver,
    createHandleMouseDown,
    active,
    dragging,
    focusedThumbIndex,
    open,
    range,
    rootRef: handleRef,
    trackLeap,
    trackOffset,
    values,
  };
}

export interface UseSliderParameters {
  /**
   * The default value. Use when the component is not controlled.
   */
  defaultValue?: number;
  /**
   * If `true`, the component is disabled.
   * @default false
   */
  disabled?: boolean;

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
   * Callback function that is fired when the slider's value changed.
   *
   * @param {Event} event The event source of the callback.
   * You can pull out the new value by accessing `event.target.value` (any).
   * **Warning**: This is a generic event not a change event.
   * @param {number | number[]} value The new value.
   * @param {number} activeThumb Index of the currently moved thumb.
   */
  onChange?: (event: Event, value: number, activeThumb: number) => void;
  /**
   * Callback function that is fired when the `mouseup` is triggered.
   *
   * @param {React.SyntheticEvent | Event} event The event source of the callback. **Warning**: This is a generic event not a change event.
   * @param {number | number[]} value The new value.
   */
  onChangeCommitted?: (event: React.SyntheticEvent | Event, value: number) => void;

  /**
   * The ref attached to the root of the Slider.
   */
  rootRef?: React.Ref<Element>;

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
   * The value of the slider.
   */
  value?: number;
}

export interface Mark {
  value: number;
  label?: React.ReactNode;
}

export type UseSliderRootSlotOwnProps = {
  onMouseDown: React.MouseEventHandler;
  ref: React.RefCallback<Element> | null;
};

export type UseSliderThumbSlotOwnProps = {
  onMouseLeave: React.MouseEventHandler;
  onMouseOver: React.MouseEventHandler;
};

export type UseSliderHiddenInputOwnProps = {
  disabled: boolean;
  name?: string;
  onBlur: React.FocusEventHandler;
  onChange: React.ChangeEventHandler;
  onFocus: React.FocusEventHandler;
  step?: number | "any";
  tabIndex?: number;
  type?: React.InputHTMLAttributes<HTMLInputElement>["type"];
};

export interface UseSliderReturnValue {
  /**
   * The active index of the slider.
   */
  active: number;
  /**
   * The thumb index for the current value when in hover state.
   */
  open: number;

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
