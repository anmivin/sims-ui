import * as React from "react";
import ownerDocument from "../../w/utils/ownerDocument";

import * as Types from "./Popover.types";
import * as Styles from "./Popover.styles";

const Popover = React.forwardRef<HTMLDivElement, Types.PopoverProps>((props, ref) => {
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
    onClose,
    hideBackdrop,
    onBackdropClick,
    invisibleBackdrop,
  } = props;

  const paperRef = React.useRef<HTMLDivElement | null>(null);

  const getOffset = (rect: Types.ElementRectProps, origin: Types.PopoverOrigin) => {
    let offsetTop = 0;
    let offsetLeft = 0;

    if (origin.vertical === "center") {
      offsetTop = rect.height / 2;
    } else if (origin.vertical === "bottom") {
      offsetTop = rect.height;
    }

    if (origin.horizontal === "center") {
      offsetLeft = rect.width / 2;
    } else if (origin.horizontal === "right") {
      offsetLeft = rect.width;
    }

    return { offsetTop, offsetLeft };
  };

  const setPositioningStyles = React.useCallback(() => {
    const element = paperRef.current;

    if (!element) return;

    const offset = getOffset(
      {
        width: element.offsetWidth,
        height: element.offsetHeight,
      },
      transformOrigin
    );

    const anchorElement =
      anchorEl && anchorEl.nodeType === 1 ? anchorEl : ownerDocument(paperRef.current).body;
    const anchorRect = anchorElement.getBoundingClientRect();
    const anchorOffset = getOffset(anchorElement.getBoundingClientRect(), anchorOrigin);

    const top = anchorRect.top + anchorOffset.offsetTop - offset.offsetTop;
    const left = anchorRect.left + anchorOffset.offsetLeft - offset.offsetLeft;

    element.style.top = `${Math.round(top)}px`;
    element.style.left = `${Math.round(left)}px`;
    element.style.transformOrigin = [offset.offsetLeft, offset.offsetTop]
      .map((n) => `${n}px`)
      .join(" ");
  }, [
    anchorEl,
    anchorOrigin.horizontal,
    anchorOrigin.vertical,
    transformOrigin.horizontal,
    transformOrigin.vertical,
  ]);

  React.useEffect(() => {
    if (open) {
      setPositioningStyles();
    }
  }, [open]);

  return (
    <Styles.PopoverRoot
      ref={ref}
      open={open}
      onClose={onClose}
      hideBackdrop={hideBackdrop}
      onBackdropClick={onBackdropClick}
      invisibleBackdrop={invisibleBackdrop}
    >
      <Styles.PopoverPaper ref={paperRef}>{children}</Styles.PopoverPaper>
    </Styles.PopoverRoot>
  );
});

export default Popover;
