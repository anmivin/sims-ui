import * as React from "react";

export function clamp(value: number, min?: number, max?: number) {
  if (!min && !max) return value;

  if (!!min && !max) return Math.max(value, min);

  if (!min && !!max) return Math.min(value, max);

  return Math.min(Math.max(value, min!), max!);
}

export const findClosestNumber = (value: number, numbers: number[]): number => {
  if (numbers.length === 0) {
    return value;
  }

  return numbers.reduce((prev, curr) =>
    Math.abs(curr - value) < Math.abs(prev - value) ? curr : prev
  );
};

export interface UseMovePosition {
  x: number;
  y: number;
}

interface useMoveHandlers {
  onScrubStart?: () => void;
  onScrubEnd?: () => void;
}

export function useMove<T extends HTMLElement = any>(
  onChange: (value: number) => void,
  handlers?: useMoveHandlers
) {
  const ref = React.useRef<T>(null);
  const mounted = React.useRef<boolean>(false);
  const isSliding = React.useRef(false);
  const frame = React.useRef(0);
  const [active, setActive] = React.useState(false);

  React.useEffect(() => {
    mounted.current = true;
  }, []);

  React.useEffect(() => {
    const node = ref.current;

    const onScrub = (position: number) => {
      cancelAnimationFrame(frame.current);

      frame.current = requestAnimationFrame(() => {
        if (mounted.current && node) {
          node.style.userSelect = "none";
          const rect = node.getBoundingClientRect();

          if (rect.width && rect.height) {
            const _x = clamp((position - rect.left) / rect.width, 0, 1);
            onChange(clamp((position - rect.left) / rect.width, 0, 1));
          }
        }
      });
    };

    const startScrubbing = () => {
      if (!isSliding.current && mounted.current) {
        isSliding.current = true;
        typeof handlers?.onScrubStart === "function" && handlers.onScrubStart();
        setActive(true);
        document.addEventListener("mousemove", onMouseMove);
        document.addEventListener("mouseup", stopScrubbing);
      }
    };

    const stopScrubbing = () => {
      if (isSliding.current && mounted.current) {
        isSliding.current = false;
        setActive(false);
        document.removeEventListener("mousemove", onMouseMove);
        document.removeEventListener("mouseup", stopScrubbing);
        setTimeout(() => {
          typeof handlers?.onScrubEnd === "function" && handlers.onScrubEnd();
        }, 0);
      }
    };

    const onMouseDown = (event: MouseEvent) => {
      startScrubbing();
      event.preventDefault();
      onMouseMove(event);
    };

    const onMouseMove = (event: MouseEvent) => onScrub({ x: event.clientX, y: event.clientY });

    node?.addEventListener("mousedown", onMouseDown);

    return () => {
      if (node) node.removeEventListener("mousedown", onMouseDown);
    };
  }, [onChange]);

  return { ref, active };
}

interface GetChangeValue {
  value: number;
  min: number;
  max: number;
  step: number;
}

export const getChangeValue = ({ value, min, max, step }: GetChangeValue) => {
  const dx = value * (max - min);
  const nextValue = (dx !== 0 ? Math.round(dx / step) * step : 0) + min;

  return Math.max(nextValue, min);
};

interface GetPosition {
  value: number;
  min: number;
  max: number;
}

export const getPosition = ({ value, min, max }: GetPosition) => {
  const position = ((value - min) / (max - min)) * 100;
  return Math.min(Math.max(position, 0), 100);
};

export interface SliderProps {
  min?: number;
  max?: number;
  step?: number;
  value?: number;
  defaultValue?: number;
  onChange?: (value: number) => void;
  onChangeEnd?: (value: number) => void;
  marks?: { value: number; label?: React.ReactNode }[];
  label?: React.ReactNode;
  thumbLabel?: string;
  disabled?: boolean;
  restrictToMarks?: boolean;
}

export const Slider = (props: SliderProps, ref) => {
  const {
    value,
    onChange,
    onChangeEnd,
    min = 0,
    max = 100,
    step = 1,
    defaultValue,
    marks = [],
    label,
    thumbLabel = "",
    disabled = false,
    restrictToMarks,
    ...others
  } = props;

  const [hovered, setHovered] = React.useState(false);
  const [_value, setValue] = React.useState(
    defaultValue ? clamp(defaultValue, min!, max!) : clamp(0, min!, max!)
  );

  const valueRef = React.useRef(_value);
  const root = React.useRef<HTMLDivElement>(null);
  const thumb = React.useRef<HTMLDivElement>(null);
  const position = getPosition({ value: _value, min: min!, max: max! });

  const handleChange = React.useCallback(
    (position: number) => {
      if (!disabled) {
        const nextValue = getChangeValue({
          value: position,
          min: min!,
          max: max!,
          step: step!,
        });
        setValue(
          restrictToMarks && marks?.length
            ? findClosestNumber(
                nextValue,
                marks.map((mark) => mark.value)
              )
            : nextValue
        );
        valueRef.current = nextValue;
      }
    },
    [disabled, min, max, step, setValue, marks, restrictToMarks]
  );

  const { active } = useMove(handleChange, {
    onScrubEnd: () =>
      !disabled &&
      onChangeEnd?.(
        restrictToMarks && marks?.length
          ? findClosestNumber(
              valueRef.current,
              marks.map((mark) => mark.value)
            )
          : valueRef.current
      ),
  });

  const [focused, setFocused] = React.useState(false);

  const isVisible = active || focused || hovered;

  return (
    <div {...others} ref={useMergedRef(ref, root)}>
      <div onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
        <div>
          <div />
          <div
            ref={ref}
            onFocus={(event) => {
              setFocused(true);
            }}
            onBlur={(event) => {
              setFocused(false);
            }}
            onTouchStart={onMouseDown}
            onMouseDown={onMouseDown}
            onClick={(event) => event.stopPropagation()}
          >
            <div>{label}</div>
          </div>
          {marks.map((mark, index) => (
            <div key={index}>
              <div />
              {mark.label && <div>{mark.label}</div>}
            </div>
          ))}
        </div>
      </div>

      <input type='hidden' value={_value} />
    </div>
  );
};
