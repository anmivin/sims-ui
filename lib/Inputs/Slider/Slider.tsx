import * as React from 'react';
import * as Styles from './Slider.styles';
import clsx from 'clsx';
import { useSlider, valueToPercent } from './useSlider';

const Slider = React.forwardRef(function Slider(inputProps, ref) {
  const props = useDefaultProps({ props: inputProps, name: 'MuiSlider' });

  const {
    component = 'span',
    componentsProps = {},
    color = 'primary',
    classes: classesProp,
    className,
    disableSwap = false,
    disabled = false,
    getAriaLabel,
    getAriaValueText,
    marks: marksProp = false,
    max = 100,
    min = 0,
    onChange,
    onChangeCommitted,
    orientation = 'horizontal',
    shiftStep = 10,
    size = 'medium',
    step = 1,
    scale = Identity,
    slotProps,
    slots,
    track = 'normal',
    value: valueProp,
    valueLabelDisplay = 'off',
    ...other
  } = props;

  const ownerState = {
    ...props,
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
  };

  const {
    axisProps,
    getRootProps,
    getHiddenInputProps,
    getThumbProps,
    axis,
    marks,
    values,
    trackOffset,
    trackLeap,
    getThumbStyle,
  } = useSlider({ ...ownerState, rootRef: ref });

  ownerState.marked = marks.length > 0 && marks.some((mark) => mark.label);

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
    <Styles.SliderRoot {...rootProps}>
      <Styles.SliderRail {...railProps} />
      <Styles.SliderTrack {...trackProps} />
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
              (track === 'normal' &&
                (mark.value <= values[0]))
          }

          return (
            <React.Fragment key={index}>
              <Styles.SliderMark
                data-index={index}
                {...markProps}
                style={{ ...style, ...markProps.style }}
                className={clsx(markActive && 'markActive')}
              />
              {mark.label != null ? (
                <Styles.SliderMarkLabel
                  aria-hidden
                  data-index={index}
                  {...markLabelProps}
                  style={{ ...style, ...markLabelProps.style }}
                  className={clsx('markLabel')}
                >
                  {mark.label}
                </Styles.SliderMarkLabel>
              ) : null}
            </React.Fragment>
          );
        })}
      {values.map((value, index) => {
        const percent = valueToPercent(value, min, max);
        const style = axisProps[axis].offset(percent);

        return (
          <Styles.SliderValueLabel
            key={index}
            {...valueLabelProps}
          >
            <Styles.SliderThumb
              data-index={index}
              {...thumbProps}
              className={clsx('thumb')}
              style={{
                ...style,
                ...getThumbStyle(index),
                ...thumbProps.style,
              }}
            >
              <input
                data-index={index}
                value={values[index]}
                {...inputSliderProps}
              />
            </Styles.SliderThumb>
          </Styles.SliderValueLabel>
        );
      })}
    </Styles.SliderRoot>
  );
});

export default Slider;