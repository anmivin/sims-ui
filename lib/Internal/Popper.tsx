import * as React from "react";
import styled from "@emotion/styled";

const PopperBody = styled("div")<{ isOpen: boolean }>(({ isOpen }) => ({
  display: isOpen ? "flex" : "none",
  zIndex: 10,
  position: "fixed",
}));

export type Placement = "top" | "bottom" | "left" | "right";

export interface PopperProps extends React.HTMLAttributes<HTMLDivElement> {
  anchorEl: HTMLElement | null;
  children?: React.ReactNode;
  onClose?: () => void;
  open: boolean;
  placement?: Placement;
}

const Popper = React.forwardRef<HTMLDivElement, PopperProps>((props, ref) => {
  const { anchorEl, children, open, className, onClose, placement = "bottom" } = props;

  const popperRef = React.useRef<HTMLDivElement | null>(null);

  const setPositioningStyles = React.useCallback(() => {
    const element = popperRef.current;

    if (!element || !anchorEl) return;

    let top = anchorEl.offsetTop + element.offsetHeight;
    let left = anchorEl.offsetLeft;

    const rightPlacement = anchorEl.offsetLeft + anchorEl.offsetWidth;
    const centerPlacement =
      anchorEl.offsetLeft + (anchorEl.offsetWidth / 2 - element.offsetWidth / 2);
    const leftPlacement = anchorEl.offsetLeft - element.offsetWidth;

    const topPlacement = anchorEl.offsetTop - element.offsetHeight;
    const middlePlacement =
      anchorEl.offsetTop + (anchorEl.offsetHeight / 2 - element.offsetHeight / 2);
    const bottomPlacement = anchorEl.offsetTop + anchorEl.offsetHeight;

    switch (placement) {
      case "top": {
        top = topPlacement;
        left = centerPlacement;
        break;
      }
      case "right": {
        top = middlePlacement;
        left = rightPlacement;
        break;
      }
      case "bottom": {
        top = bottomPlacement;
        left = centerPlacement;
        break;
      }
      case "left": {
        top = middlePlacement;
        left = leftPlacement;
        break;
      }
    }

    element.style.top = `${Math.round(top)}px`;
    element.style.left = `${Math.round(left)}px`;
  }, [anchorEl, placement]);

  React.useEffect(() => {
    if (open) {
      setPositioningStyles();
    }
    window.addEventListener("resize", setPositioningStyles);

    return () => window.removeEventListener("resize", setPositioningStyles);
  }, [open]);

  React.useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (open && !anchorEl?.contains(e.target)) {
        onClose?.();
      }
    };
    window.addEventListener("click", handleClick);

    return () => {
      window.removeEventListener("click", handleClick);
    };
  }, [open]);

  return (
    <PopperBody className={className} ref={popperRef} isOpen={open}>
      {children}
    </PopperBody>
  );
});

export default Popper;
