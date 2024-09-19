import * as React from "react";

import styled from "@emotion/styled";

import useEventCallback from "../utils/useEventCallback";

import ownerWindow from "../utils/ownerWindow";

const TabsRoot = styled("div")({
  overflow: "hidden",
  minHeight: 48,
  display: "flex",
  "-vertical": {
    lexDirection: "column",
  },
});

const TabsScroller = styled("div")({
  position: "relative",
  display: "inline-block",
  flex: "1 1 auto",
  whiteSpace: "nowrap",
  "-fixed": {
    overflowX: "hidden",
    width: "100%",
  },
  "-hidescrollbar": {
    scrollbarWidth: "none", // Firefox
    "&::-webkit-scrollbar": {
      display: "none", // Safari + Chrome
    },
  },
  "-scrollableX": {
    overflowX: "auto",
    overflowY: "hidden",
  },
  "-scrollableY": {
    overflowY: "auto",
    overflowX: "hidden",
  },
});

const FlexContainer = styled("div")({
  display: "flex",
  "-vertical": {
    flexDirection: "column",
  },
  "-centered": {
    justifyContent: "center",
  },
});

const TabsIndicator = styled("span")({
  position: "absolute",
  height: 2,
  bottom: 0,
  width: "100%",
  transition: "",
  "-vertical": {
    height: "100%",
    width: 2,
    right: 0,
  },
});

const defaultIndicatorStyle = {};

const Tabs = (props: TabsOwnProps) => {
  const {
    children: childrenProp,
    onChange,
    orientation = "horizontal",
    scrollButtons = "auto",
    value,
    variant = "standard",
    visibleScrollbar = false,
    ...other
  } = props;
  const scrollable = variant === "scrollable";
  const vertical = orientation === "vertical";

  const size = vertical ? "height" : "width";

  const [mounted, setMounted] = React.useState(false);
  const [indicatorStyle, setIndicatorStyle] = React.useState(defaultIndicatorStyle);

  const [scrollerStyle, setScrollerStyle] = React.useState({
    overflow: "hidden",
    scrollbarWidth: 0,
  });

  const valueToIndex = new Map();
  const tabsRef = React.useRef(null);
  const tabListRef = React.useRef(null);

  const getTabsMeta = () => {
    const tabsNode = tabsRef.current;
    let tabsMeta;
    if (tabsNode) {
      const rect = tabsNode.getBoundingClientRect();
      // create a new object with ClientRect class props + scrollLeft
      tabsMeta = {
        clientWidth: tabsNode.clientWidth,
        scrollLeft: tabsNode.scrollLeft,
        scrollTop: tabsNode.scrollTop,
        scrollWidth: tabsNode.scrollWidth,
        top: rect.top,
        bottom: rect.bottom,
        left: rect.left,
        right: rect.right,
      };
    }

    let tabMeta;
    if (tabsNode && value !== false) {
      const children = tabListRef.current.children;

      if (children.length > 0) {
        const tab = children[valueToIndex.get(value)];
        tabMeta = tab ? tab.getBoundingClientRect() : null;
      }
    }
    return { tabsMeta, tabMeta };
  };

  const updateIndicatorState = useEventCallback(() => {
    const { tabsMeta, tabMeta } = getTabsMeta();
    let startValue = 0;
    let startIndicator;

    if (vertical) {
      startIndicator = "top";
      if (tabMeta && tabsMeta) {
        startValue = tabMeta.top - tabsMeta.top + tabsMeta.scrollTop;
      }
    } else {
      startIndicator = "left";
      if (tabMeta && tabsMeta) {
        startValue = tabMeta[startIndicator] - tabsMeta[startIndicator] + tabsMeta.scrollLeft;
      }
    }

    const newIndicatorStyle = {
      [startIndicator]: startValue,
      // May be wrong until the font is loaded.
      [size]: tabMeta ? tabMeta[size] : 0,
    };

    if (
      typeof indicatorStyle[startIndicator] !== "number" ||
      typeof indicatorStyle[size] !== "number"
    ) {
      setIndicatorStyle(newIndicatorStyle);
    } else {
      const dStart = Math.abs(indicatorStyle[startIndicator] - newIndicatorStyle[startIndicator]);
      const dSize = Math.abs(indicatorStyle[size] - newIndicatorStyle[size]);

      if (dStart >= 1 || dSize >= 1) {
        setIndicatorStyle(newIndicatorStyle);
      }
    }
  });

  React.useEffect(() => {
    let resizeObserver;

    /**
     * @type {MutationCallback}
     */
    const handleMutation = (records) => {
      records.forEach((record) => {
        record.removedNodes.forEach((item) => {
          resizeObserver?.unobserve(item);
        });
        record.addedNodes.forEach((item) => {
          resizeObserver?.observe(item);
        });
      });
    };

    const win = ownerWindow(tabsRef.current);
    win.addEventListener("resize", handleResize);

    let mutationObserver;

    if (typeof ResizeObserver !== "undefined") {
      resizeObserver = new ResizeObserver(handleResize);
      Array.from(tabListRef.current.children).forEach((child) => {
        resizeObserver.observe(child);
      });
    }

    if (typeof MutationObserver !== "undefined") {
      mutationObserver = new MutationObserver(handleMutation);
      mutationObserver.observe(tabListRef.current, {
        childList: true,
      });
    }

    return () => {
      mutationObserver?.disconnect();
      resizeObserver?.disconnect();
    };
  }, [updateIndicatorState]);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  React.useEffect(() => {
    updateIndicatorState();
  });

  React.useImperativeHandle(
    action,
    () => ({
      updateIndicator: updateIndicatorState,
      updateScrollButtons: updateScrollButtonState,
    }),
    [updateIndicatorState, updateScrollButtonState]
  );

  const indicator = (
    <TabsIndicator
      style={{
        ...indicatorStyle,
      }}
    />
  );

  let childIndex = 0;
  const children = React.Children.map(childrenProp, (child) => {
    if (!React.isValidElement(child)) {
      return null;
    }

    const childValue = child.props.value === undefined ? childIndex : child.props.value;
    valueToIndex.set(childValue, childIndex);
    const selected = childValue === value;

    childIndex += 1;
    return React.cloneElement(child, {
      fullWidth: variant === "fullWidth",
      indicator: selected && !mounted && indicator,
      selected,
      onChange,
      value: childValue,
      ...(childIndex === 1 && value === false && !child.props.tabIndex ? { tabIndex: 0 } : {}),
    });
  });

  return (
    <TabsRoot {...other}>
      <TabsScroller ref={tabsRef}>
        <FlexContainer ref={tabListRef} role='tablist'>
          {children}
        </FlexContainer>
        {mounted && indicator}
      </TabsScroller>
    </TabsRoot>
  );
};

export default Tabs;

export interface TabsOwnProps {
  /**
   * The content of the component.
   */
  children?: React.ReactNode;

  /**
   * Callback fired when the value changes.
   *
   * @param {React.SyntheticEvent} event The event source of the callback. **Warning**: This is a generic event not a change event.
   * @param {any} value We default to the index of the child (number)
   */
  onChange?: (event: React.SyntheticEvent, value: any) => void;
  /**
   * The component orientation (layout flow direction).
   * @default 'horizontal'
   */
  orientation?: "horizontal" | "vertical";

  /**
   * Determine behavior of scroll buttons when tabs are set to scroll:
   *
   * - `auto` will only present them when not all the items are visible.
   * - `true` will always present them.
   * - `false` will never present them.
   *
   * By default the scroll buttons are hidden on mobile.
   * This behavior can be disabled with `allowScrollButtonsMobile`.
   * @default 'auto'
   */
  scrollButtons?: "auto" | true | false;

  /**
   * The value of the currently selected `Tab`.
   * If you don't want any selected `Tab`, you can set this prop to `false`.
   */
  value?: any;
  /**
   *  Determines additional display behavior of the tabs:
   *
   *  - `scrollable` will invoke scrolling properties and allow for horizontally
   *  scrolling (or swiping) of the tab bar.
   *  - `fullWidth` will make the tabs grow to use all the available space,
   *  which should be used for small views, like on mobile.
   *  - `standard` will render the default state.
   * @default 'standard'
   */
  variant?: "standard" | "scrollable" | "fullWidth";
  /**
   * If `true`, the scrollbar is visible. It can be useful when displaying
   * a long vertical list of tabs.
   * @default false
   */
  visibleScrollbar?: boolean;
}

export interface TabsActions {
  updateIndicator(): void;
  updateScrollButtons(): void;
}
