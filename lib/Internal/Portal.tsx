
import * as React from "react";
import * as ReactDOM from "react-dom";

export interface PortalProps {
  /**
   * The children to render into the `container`.
   */
  children?: React.ReactNode;
  /**
   * An HTML element or function that returns one.
   * The `container` will have the portal children appended to it.
   *
   * You can also provide a callback, which is called in a React layout effect.
   * This lets you set the container from a ref, and also makes server-side rendering possible.
   *
   * By default, it uses the body of the top-level document object,
   * so it's simply `document.body` most of the time.
   */
  container?: Element | (() => Element | null) | null;
  /**
   * The `children` will be under the DOM hierarchy of the parent component.
   * @default false
   */
  disablePortal?: boolean;
}


function getContainer(container: PortalProps["container"]) {
  return typeof container === "function" ? container() : container;
}

const Portal = (
  props: PortalProps,
) => {
  const { children, container, disablePortal = false } = props;
  const [mountNode, setMountNode] = React.useState<ReturnType<typeof getContainer>>(null);

  React.useEffect(() => {
    if (!disablePortal) {
      setMountNode(getContainer(container) || document.body);
    }
  }, [container, disablePortal]);

  if (disablePortal) {
    if (React.isValidElement(children)) {
      return children;
    }
    return <React.Fragment>{children}</React.Fragment>;
  }

  return (
    <React.Fragment>
      {mountNode ? ReactDOM.createPortal(children, mountNode) : mountNode}
    </React.Fragment>
  );
};


export default Portal;



