import * as React from "react";
import * as Types from "./Popper.types";
import * as Styles from "./Popper.styles";
import clsx from "clsx";

const Popper = React.forwardRef<HTMLDivElement, Types.PopoverProps>((props, ref) => {
  const { anchorEl, children, open, arrow, placement = "bottom" } = props;

  const paperRef = React.useRef<HTMLDivElement | null>(null);

  const setPositioningStyles = React.useCallback(() => {
    const element = paperRef.current;

    if (!element || !anchorEl) return;

    const anchorRect = anchorEl.getBoundingClientRect();

    let top = anchorRect.top + element.offsetHeight;
    let left = anchorRect.left;

    const rightPlacement = anchorRect.left + anchorRect.width + (arrow ? 10 : 0);
    const centerPlacement = anchorRect.left + (anchorRect.width / 2 - element.offsetWidth / 2);
    const leftPlacement = anchorRect.left - element.offsetWidth - (arrow ? 10 : 0);

    const topPlacement = anchorRect.top - element.offsetHeight - (arrow ? 10 : 0);
    const middlePlacement = anchorRect.top + (anchorRect.height / 2 - element.offsetHeight / 2);
    const bottomPlacement = anchorRect.top + anchorRect.height + (arrow ? 10 : 0);
    switch (placement) {
      case "top": {
        top = topPlacement;
        left = centerPlacement;
        break;
      }
      case "top-right": {
        top = topPlacement;
        left = rightPlacement;
        break;
      }
      case "right": {
        top = middlePlacement;
        left = rightPlacement;
        break;
      }
      case "bottom-right": {
        top = bottomPlacement;
        left = rightPlacement;
        break;
      }
      case "bottom": {
        top = bottomPlacement;
        left = centerPlacement;
        break;
      }
      case "bottom-left": {
        top = bottomPlacement;
        left = leftPlacement;
        break;
      }
      case "left": {
        top = middlePlacement;
        left = leftPlacement;
        break;
      }
      case "top-left": {
        top = topPlacement;
        left = leftPlacement;
        break;
      }
    }

    element.style.top = `${Math.round(top)}px`;
    element.style.left = `${Math.round(left)}px`;
  }, [anchorEl, placement, arrow]);

  React.useEffect(() => {
    if (open) {
      setPositioningStyles();
    }
  }, [open]);

  return (
    <div ref={ref} style={{ display: open ? "flex" : "none" }}>
      <Styles.PopoverPaper ref={paperRef}>{children}</Styles.PopoverPaper>
      {arrow && <Styles.PopoverArrow className={clsx(placement)} />}
    </div>
  );
});

export default Popper;
