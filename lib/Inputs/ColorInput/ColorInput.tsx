import * as React from "react";
import * as Styles from "./ColorInput.styles.ts";

const ColorInput = () => {
  const [curr, setCurr] = React.useState<string>("");
  const [dragging, setDragging] = React.useState(false);
  const pickerRef = React.useRef<HTMLDivElement | null>(null);
  const colorRef = React.useRef<HTMLDivElement | null>(null);

  const handleMouseMove = React.useCallback(
    (e: MouseEvent) => {
      if (!dragging || !pickerRef.current) return;
      pickerRef.current.style.top = `${e.clientY}px`;
      pickerRef.current.style.left = `${e.clientX}px`;
    },
    [dragging, pickerRef]
  );
  React.useEffect(() => {
    colorRef.current?.addEventListener("mousedown", () => setDragging(true));
    colorRef.current?.addEventListener("mouseUp", () => setDragging(false));
    colorRef.current?.addEventListener("mousemove", (e) => handleMouseMove(e));
    return () => {
      colorRef.current?.removeEventListener("mousedown", () => setDragging(true));
      colorRef.current?.removeEventListener("mouseUp", () => setDragging(false));
      colorRef.current?.removeEventListener("mousemove", (e) => handleMouseMove(e));
    };
  }, [colorRef]);

  const onPickerClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const hue = Math.round((360 * e.clientX) / e.currentTarget.offsetWidth);
    const lightnes =
      100 -
      Math.round(((e.clientY - e.currentTarget.offsetTop) * 100) / e.currentTarget.offsetHeight);
    setCurr(`hsl(${hue}deg 100% ${lightnes}%)`);
  };
  return (
    <>
      <div style={{ width: "50px", height: "50px", border: "1px solid black", background: curr }} />
      <Styles.ColorInput ref={colorRef} onClick={onPickerClick}>
        <Styles.Picker ref={pickerRef} />
      </Styles.ColorInput>
    </>
  );
};

export default ColorInput;
