
import * as React from 'react';
import {
  unstable_ownerDocument as ownerDocument,
  unstable_useControlled as useControlled,
  unstable_useEnhancedEffect as useEnhancedEffect,
  unstable_useEventCallback as useEventCallback,
  unstable_useForkRef as useForkRef,
  unstable_isFocusVisible as isFocusVisible,
  visuallyHidden,
  clamp,
} from '@mui/utils';
import extractEventHandlers from '@mui/utils/extractEventHandlers';

import { EventHandlers } from '../utils/types';
import areArraysEqual from '../utils/areArraysEqual';


export interface UseSliderParameters {
  defaultValue?: number;
  disabled?: boolean;
  marks?: boolean;
  max?: number;
  min?: number;
  onChange?: (event: Event, value: number | number[], activeThumb: number) => void;
  onChangeCommitted?: (event: React.SyntheticEvent | Event, value: number | number[]) => void;
  orientation?: 'horizontal' | 'vertical';
  /**
   * The ref attached to the root of the Slider.
   */
  rootRef?: React.Ref<Element>;
  step?: number | null;
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
  step?: number | 'any';
  style: React.CSSProperties;
  tabIndex?: number;
  type?: React.InputHTMLAttributes<HTMLInputElement>['type'];
};

export type UseSliderHiddenInputProps<ExternalProps = {}> = Omit<
  ExternalProps,
  keyof UseSliderHiddenInputOwnProps
> &
  UseSliderHiddenInputOwnProps;

export type Axis = 'horizontal' | 'vertical';

export interface AxisProps<T extends Axis> {
  offset: (
    percent: number,
  ) => T extends 'horizontal'
    ? { left: string }
    : T extends 'vertical'
      ? { bottom: string }
      : T extends 'horizontal-reverse'
        ? { right: string }
        : never;
  leap: (
    percent: number,
  ) => T extends 'horizontal' | 'horizontal-reverse'
    ? { width: string }
    : T extends 'vertical'
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
   * Returns the `offset` and `leap` methods to calculate the positioning styles based on the slider axis.
   */
  axisProps: { [key in Axis]: AxisProps<key> };
  /**
   * Resolver for the hidden input slot's props.
   * @param externalProps props for the hidden input slot
   * @returns props that should be spread on the hidden input slot
   */
  getHiddenInputProps: <ExternalProps extends Record<string, unknown> = {}>(
    externalProps?: ExternalProps,
  ) => UseSliderHiddenInputProps<ExternalProps>;
  /**
   * Resolver for the root slot's props.
   * @param externalProps props for the root slot
   * @returns props that should be spread on the root slot
   */
  getRootProps: <ExternalProps extends Record<string, unknown> = {}>(
    externalProps?: ExternalProps,
  ) => UseSliderRootSlotProps<ExternalProps>;
  /**
   * Resolver for the thumb slot's props.
   * @param externalProps props for the thumb slot
   * @returns props that should be spread on the thumb slot
   */
  getThumbProps: <ExternalProps extends Record<string, unknown> = {}>(
    externalProps?: ExternalProps,
  ) => UseSliderThumbSlotProps<ExternalProps>;
  /**
   * Resolver for the thumb slot's style prop.
   * @param index of the currently moved thumb
   * @returns props that should be spread on the style prop of thumb slot
   */
  getThumbStyle: (index: number) => object;
  /**
   * The marks of the slider. Marks indicate predetermined values to which the user can move the slider.
   */
  marks: Mark[];
  /**
   * The thumb index for the current value when in hover state.
   */
  open: number;
  /**
   * Ref to the root slot's DOM node.
   */
  rootRef: React.RefCallback<Element> | null;
  /**
   * The track leap for the current value of the slider.
   */
  trackLeap: number;
  /**
   * The track offset for the current value of the slider.
   */
  trackOffset: number;
  /**
   * The possible values of the slider.
   */
  values: number[];
}


const INTENTIONAL_DRAG_COUNT_THRESHOLD = 2;

const findClosest = (values: number[], currentValue: number) => {
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
      null,
    ) ?? {};
  return closestIndex;
}

function trackFinger(
  event: TouchEvent | MouseEvent | React.MouseEvent,
  touchId: React.RefObject<any>,
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
    const parts = num.toExponential().split('e-');
    const matissaDecimalPart = parts[0].split('.')[1];
    return (matissaDecimalPart ? matissaDecimalPart.length : 0) + parseInt(parts[1], 10);
  }

  const decimalPart = num.toString().split('.')[1];
  return decimalPart ? decimalPart.length : 0;
}

function roundValueToStep(value: number, step: number, min: number) {
  const nearest = Math.round((value - min) / step) * step + min;
  return Number(nearest.toFixed(getDecimalPrecision(step)));
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
    Number(doc?.activeElement?.getAttribute('data-index')) !== activeIndex
  ) {
    sliderRef.current?.querySelector(`[type="range"][data-index="${activeIndex}"]`).focus();
  }

  if (setActive) {
    setActive(activeIndex);
  }
}

function areValuesEqual(
  newValue: number | ReadonlyArray<number>,
  oldValue: number | ReadonlyArray<number>,
): boolean {
  if (typeof newValue === 'number' && typeof oldValue === 'number') {
    return newValue === oldValue;
  }
  if (typeof newValue === 'object' && typeof oldValue === 'object') {
    return areArraysEqual(newValue, oldValue);
  }
  return false;
}

const axisProps = {
  horizontal: {
    offset: (percent: number) => ({ left: `${percent}%` }),
    leap: (percent: number) => ({ width: `${percent}%` }),
  },
  vertical: {
    offset: (percent: number) => ({ bottom: `${percent}%` }),
    leap: (percent: number) => ({ height: `${percent}%` }),
  },
};

let cachedSupportsTouchActionNone: any;
function doesSupportTouchActionNone() {
  if (cachedSupportsTouchActionNone === undefined) {
    if (typeof CSS !== 'undefined' && typeof CSS.supports === 'function') {
      cachedSupportsTouchActionNone = CSS.supports('touch-action', 'none');
    } else {
      cachedSupportsTouchActionNone = true;
    }
  }
  return cachedSupportsTouchActionNone;
}

export function useSlider(parameters: UseSliderParameters): UseSliderReturnValue {
  const {
    defaultValue,
    disabled = false,
    marks: marksProp = false,
    max = 100,
    min = 0,
    onChange,
    onChangeCommitted,
    orientation = 'horizontal',
    rootRef: ref,
    step = 1,
    value: valueProp,
  } = parameters;

  const touchId = React.useRef<number>(undefined);
  const [active, setActive] = React.useState(-1);
  const [open, setOpen] = React.useState(-1);
  const [dragging, setDragging] = React.useState(false);

  const [valueDerived, setValueState] = useControlled({
    controlled: valueProp,
    default: defaultValue ?? min,
    name: 'Slider',
  });

  const moveCount = React.useRef(0);

  const lastChangedValue = React.useRef<number | number[] | null>(null);



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

      Object.defineProperty(clonedEvent, 'target', {
        writable: true,
        value: { value, name },
      });

      lastChangedValue.current = value;
      onChange(clonedEvent, value, thumbIndex);
    });


  let values = [valueDerived];
  values = values.map((value) => (value == null ? min : clamp(value, min, max)));

  const marks =
    marksProp === true && step !== null
      ? [...Array(Math.floor((max - min) / step) + 1)].map((_, index) => ({
          value: min + step * index,
        }))
      : marksProp || [];

  const marksValues = (marks as Mark[]).map((mark: Mark) => mark.value);

  const [focusedThumbIndex, setFocusedThumbIndex] = React.useState(-1);

  const sliderRef = React.useRef<HTMLSpanElement>(null);
  const handleRef = useForkRef(ref, sliderRef);

  const createHandleHiddenInputFocus =
    (otherHandlers: EventHandlers) => (event: React.FocusEvent) => {
      const index = Number(event.currentTarget.getAttribute('data-index'));
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
    const index = Number(event.currentTarget.getAttribute('data-index'));
    const value = values[index];
    const marksIndex = marksValues.indexOf(value);

    let newValue: number | number[] = valueInput;
    if (marks && step == null) {
      const maxMarksValue = marksValues[marksValues.length - 1];
      if (newValue >= maxMarksValue) {
        newValue = maxMarksValue;
      } else if (newValue <= marksValues[0]) {
        newValue = marksValues[0];
      } else {
        newValue = newValue < value ? marksValues[marksIndex - 1] : marksValues[marksIndex + 1];
      }
    }

    newValue = clamp(newValue, min, max);

    setValueState(newValue);
    setFocusedThumbIndex(index);

    if (handleChange && !areValuesEqual(newValue, valueDerived)) {
      handleChange(event, newValue, index);
    }

    if (onChangeCommitted) {
      onChangeCommitted(event, lastChangedValue.current ?? newValue);
    }
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
      // this handles value change by Pointer or Touch events
      // @ts-ignore
      changeValue(event, event.target.valueAsNumber);
    };


  const axis = orientation;

  const getFingerNewValue = ({
    finger,
  }: {
    finger: { x: number; y: number };
    move?: boolean;
  }) => {
    const { current: slider } = sliderRef;
    const { width, height, bottom, left } = slider!.getBoundingClientRect();
    let percent;

    if (axis.startsWith('vertical')) {
      percent = (bottom - finger.y) / height;
    } else {
      percent = (finger.x - left) / width;
    }

    if (axis.includes('-reverse')) {
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

    return { newValue, activeIndex: 0 };
  };

  const handleTouchMove = useEventCallback((nativeEvent: TouchEvent | MouseEvent) => {
    const finger = trackFinger(nativeEvent, touchId);

    if (!finger) {
      return;
    }

    moveCount.current += 1;

    // Cancel move in case some other element consumed a mouseup event and it was not fired.
    // @ts-ignore buttons doesn't not exists on touch event
    if (nativeEvent.type === 'mousemove' && nativeEvent.buttons === 0) {
       
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
    if (nativeEvent.type === 'touchend') {
      setOpen(-1);
    }

    if (onChangeCommitted) {
      onChangeCommitted(nativeEvent, lastChangedValue.current ?? newValue);
    }

    touchId.current = undefined;

     
    stopListening();
  });

  const handleTouchStart = useEventCallback((nativeEvent: TouchEvent) => {
    if (disabled) {
      return;
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
    doc.addEventListener('touchmove', handleTouchMove, { passive: true });
    doc.addEventListener('touchend', handleTouchEnd, { passive: true });
  });

  const stopListening = React.useCallback(() => {
    const doc = ownerDocument(sliderRef.current);
    doc.removeEventListener('mousemove', handleTouchMove);
    doc.removeEventListener('mouseup', handleTouchEnd);
    doc.removeEventListener('touchmove', handleTouchMove);
    doc.removeEventListener('touchend', handleTouchEnd);
  }, [handleTouchEnd, handleTouchMove]);

  React.useEffect(() => {
    const { current: slider } = sliderRef;
    slider!.addEventListener('touchstart', handleTouchStart, {
      passive: doesSupportTouchActionNone(),
    });

    return () => {
      slider!.removeEventListener('touchstart', handleTouchStart);

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
      doc.addEventListener('mousemove', handleTouchMove, { passive: true });
      doc.addEventListener('mouseup', handleTouchEnd);
    };

  const trackOffset = valueToPercent(range ? values[0] : min, min, max);
  const trackLeap = valueToPercent(values[values.length - 1], min, max) - trackOffset;

  const getRootProps = <ExternalProps extends Record<string, unknown> = {}>(
    externalProps: ExternalProps = {} as ExternalProps,
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

      const index = Number(event.currentTarget.getAttribute('data-index'));
      setOpen(index);
    };

  const createHandleMouseLeave =
    (otherHandlers: EventHandlers) => (event: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
      otherHandlers.onMouseLeave?.(event);

      setOpen(-1);
    };

  const getThumbProps = <ExternalProps extends Record<string, unknown> = {}>(
    externalProps: ExternalProps = {} as ExternalProps,
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
      pointerEvents: active !== -1 && active !== index ? 'none' : undefined,
    };
  };

  let cssWritingMode: 'vertical-rl' | 'vertical-lr' | undefined;
  if (orientation === 'vertical') {
    cssWritingMode = isRtl ? 'vertical-rl' : 'vertical-lr';
  }

  const getHiddenInputProps = <ExternalProps extends Record<string, unknown> = {}>(
    externalProps: ExternalProps = {} as ExternalProps,
  ): UseSliderHiddenInputProps<ExternalProps> => {
    const externalHandlers = extractEventHandlers(externalProps);

    const ownEventHandlers = {
      onChange: createHandleHiddenInputChange(externalHandlers || {}),
      onFocus: createHandleHiddenInputFocus(externalHandlers || {}),
      onBlur: createHandleHiddenInputBlur(externalHandlers || {}),
    };

    const mergedEventHandlers = {
      ...externalHandlers,
      ...ownEventHandlers,
    };

    return {
      name,
      type: 'range',
      min: parameters.min,
      max: parameters.max,
      step: parameters.step === null && parameters.marks ? 'any' : (parameters.step ?? undefined),
      disabled,
      ...externalProps,
      ...mergedEventHandlers,
      style: {
        ...visuallyHidden,
        direction: 'ltr',
        // So that VoiceOver's focus indicator matches the thumb's dimensions
        width: '100%',
        height: '100%',
        writingMode: cssWritingMode,
      },
    };
  };

  return {
    active,
    axis: axis as keyof typeof axisProps,
    axisProps,
    getHiddenInputProps,
    getRootProps,
    getThumbProps,
    marks: marks as Mark[],
    open,
    rootRef: handleRef,
    trackLeap,
    trackOffset,
    values,
    getThumbStyle,
  };
}