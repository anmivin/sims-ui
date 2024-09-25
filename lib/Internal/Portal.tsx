import * as React from "react";
import * as ReactDOM from "react-dom";

export interface PortalProps {
  children?: React.ReactNode;
}

const Portal = (props: PortalProps) => {
  const { children } = props;
  const [mountNode, setMountNode] = React.useState<ReturnType<typeof getContainer>>(null);

  React.useEffect(() => {
    setMountNode(document.body);
  }, []);

  return (
    <React.Fragment>
      {mountNode ? ReactDOM.createPortal(children, mountNode) : mountNode}
    </React.Fragment>
  );
};

export default Portal;
