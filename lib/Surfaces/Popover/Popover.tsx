import * as React from "react";

import styled from "@emotion/styled";

import debounce from "../../utils/debounce";
import ownerDocument from "../../utils/ownerDocument";
import ownerWindow from "../../utils/ownerWindow";
import Modal, { ModalOwnProps } from "../../Internal/Modal";

export interface PopoverProps extends Omit<ModalOwnProps, "children"> {
  anchorEl?: Node;

  anchorOrigin?: PopoverOrigin;

  anchorPosition?: PopoverPosition;

  children?: React.ReactNode;

  onClose?: () => void;

  open: boolean;

  /**
   * This is the point on the popover which
   * will attach to the anchor's origin.
   *
   * Options:
   * vertical: [top, center, bottom, x(px)];
   * horizontal: [left, center, right, x(px)].
   * @default
   *   vertical: 'top',
   *   horizontal: 'left',
   * }
   */
  transformOrigin?: PopoverOrigin;
}

export function getOffsetTop(rect, vertical) {
  let offset = 0;

  if (typeof vertical === "number") {
    offset = vertical;
  } else if (vertical === "center") {
    offset = rect.height / 2;
  } else if (vertical === "bottom") {
    offset = rect.height;
  }

  return offset;
}

export function getOffsetLeft(rect, horizontal) {
  let offset = 0;

  if (typeof horizontal === "number") {
    offset = horizontal;
  } else if (horizontal === "center") {
    offset = rect.width / 2;
  } else if (horizontal === "right") {
    offset = rect.width;
  }

  return offset;
}

function getTransformOriginValue(transformOrigin) {
  return [transformOrigin.horizontal, transformOrigin.vertical]
    .map((n) => (typeof n === "number" ? `${n}px` : n))
    .join(" ");
}

function resolveAnchorEl(anchorEl) {
  return typeof anchorEl === "function" ? anchorEl() : anchorEl;
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

const Popover = (props: PopoverProps) => {
  const {
    anchorEl,
    anchorOrigin = {
      vertical: "top",
      horizontal: "left",
    },
    anchorPosition,
    children,
    open,
    transformOrigin = {
      vertical: "top",
      horizontal: "left",
    },
    ...other
  } = props;

  const paperRef = React.useRef<HTMLDivElement | null>(null);

  const getAnchorOffset = React.useCallback(() => {
    const resolvedAnchorEl = resolveAnchorEl(anchorEl);

    const anchorElement =
      resolvedAnchorEl && resolvedAnchorEl.nodeType === 1
        ? resolvedAnchorEl
        : ownerDocument(paperRef.current).body;
    const anchorRect = anchorElement.getBoundingClientRect();

    return {
      top: anchorRect.top + getOffsetTop(anchorRect, anchorOrigin.vertical),
      left: anchorRect.left + getOffsetLeft(anchorRect, anchorOrigin.horizontal),
    };
  }, [anchorEl, anchorOrigin.horizontal, anchorOrigin.vertical, anchorPosition]);

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
  });

  React.useEffect(() => {
    if (!open) {
      return undefined;
    }

    const handleResize = debounce(() => {
      setPositioningStyles();
    });

    const containerWindow = ownerWindow(anchorEl);
    containerWindow.addEventListener("resize", handleResize);
    return () => {
      handleResize.clear();
      containerWindow.removeEventListener("resize", handleResize);
    };
  }, [anchorEl, open, setPositioningStyles]);

  return (
    <PopoverRoot open={open} {...other}>
      <PopoverPaper ref={paperRef}>{children}</PopoverPaper>
    </PopoverRoot>
  );
};

export default Popover;

export interface PopoverOrigin {
  vertical: "top" | "center" | "bottom" | number;
  horizontal: "left" | "center" | "right" | number;
}

export interface PopoverPosition {
  top: number;
  left: number;
}

export type PopoverReference = "anchorEl" | "anchorPosition" | "none";
