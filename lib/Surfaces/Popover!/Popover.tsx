import * as React from "react";

import styled from "@emotion/styled";

import debounce from "../../w/utils/debounce";
import ownerDocument from "../../w/utils/ownerDocument";
import ownerWindow from "../../w/utils/ownerWindow";
import Modal, { ModalProps } from "../../Internal/Modal";

export interface PopoverOrigin {
  vertical: "top" | "center" | "bottom";
  horizontal: "left" | "center" | "right";
}

export interface PopoverProps extends Omit<ModalProps, "children"> {
  anchorEl: HTMLElement | null;
  anchorOrigin?: PopoverOrigin;
  children?: React.ReactNode;
  onClose?: () => void;
  open: boolean;
  transformOrigin?: PopoverOrigin;
}

const getOffsetTop = (rect, vertical) => {
  let offset = 0;

 if (vertical === "center") {
    offset = rect.height / 2;
  } else if (vertical === "bottom") {
    offset = rect.height;
  }

  return offset;
}

const getOffsetLeft = (rect, horizontal) => {
  let offset = 0;

 if (horizontal === "center") {
    offset = rect.width / 2;
  } else if (horizontal === "right") {
    offset = rect.width;
  }

  return offset;
}

const getTransformOriginValue = (transformOrigin) => {
  return [transformOrigin.horizontal, transformOrigin.vertical]
    .map((n) => (typeof n === "number" ? `${n}px` : n))
    .join(" ");
}

export const PopoverRoot = styled(Modal)({});

export const PopoverPaper = styled("div")({
  position: "absolute",
  overflowY: "auto",
  overflowX: "hidden",
  minWidth: 16,
  minHeight: 16,
  maxWidth: "calc(100% - 32px)",
  maxHeight: "calc(100% - 32px)",
  outline: 0,
  backgroundColor: "red",
});

const Popover = React.forwardRef((props: PopoverProps, ref: React.ForwardedRef<HTMLDivElement>) => {
  const {
    anchorEl,
    anchorOrigin = {
      vertical: "top",
      horizontal: "left",
    },
    transformOrigin = {
      vertical: "top",
      horizontal: "left",
    },
    children,
    open,

    ...other
  } = props;

  const paperRef = React.useRef<HTMLDivElement | null>(null);

  const getAnchorOffset = React.useCallback(() => {

    const anchorElement =
    anchorEl && anchorEl.nodeType === 1
        ? anchorEl
        : ownerDocument(paperRef.current).body;
    const anchorRect = anchorElement.getBoundingClientRect();

    return {
      top: anchorRect.top + getOffsetTop(anchorRect, anchorOrigin.vertical),
      left: anchorRect.left + getOffsetLeft(anchorRect, anchorOrigin.horizontal),
    };
  }, [anchorEl, anchorOrigin.horizontal, anchorOrigin.vertical]);

  // Returns the base transform origin using the element
  const getTransformOrigin = React.useCallback(
    (elemRect) => {
      return {
        vertical: getOffsetTop(elemRect, transformOrigin.vertical),
        horizontal: getOffsetLeft(elemRect, transformOrigin.horizontal),
      };
    },
    [transformOrigin.horizontal, transformOrigin.vertical]
  );

  const getPositioningStyle = React.useCallback(
    (element) => {
      const elemRect = {
        width: element.offsetWidth,
        height: element.offsetHeight,
      };

      // Get the transform origin point on the element itself
      const elemTransformOrigin = getTransformOrigin(elemRect);

      // Get the offset of the anchoring element
      const anchorOffset = getAnchorOffset();

      // Calculate element positioning
      const top = anchorOffset.top - elemTransformOrigin.vertical;
      const left = anchorOffset.left - elemTransformOrigin.horizontal;

      return {
        top: `${Math.round(top)}px`,
        left: `${Math.round(left)}px`,
        transformOrigin: getTransformOriginValue(elemTransformOrigin),
      };
    },
    [anchorEl, getAnchorOffset, getTransformOrigin]
  );

  const setPositioningStyles = React.useCallback(() => {
    const element = paperRef.current;

    if (!element) {
      return;
    }

    const positioning = getPositioningStyle(element);

    if (positioning.top !== null) {
      element.style.setProperty("top", positioning.top);
    }
    if (positioning.left !== null) {
      element.style.left = positioning.left;
    }
    element.style.transformOrigin = positioning.transformOrigin;
  }, [getPositioningStyle]);

  React.useEffect(() => {
    if (open) {
      setPositioningStyles();
    }
  },[open]);


  return (
    <PopoverRoot open={open} {...other} ref={ref} invisibleBackdrop>
      <PopoverPaper ref={paperRef}>{children}</PopoverPaper>
    </PopoverRoot>
  );
});

export default Popover;


