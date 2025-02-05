import * as React from "react";
import * as Styles from "./ContextMenu.styles";
import * as Types from "./ContextMenu.types";
import clsx from "clsx";

const ContextMenu = React.forwardRef<HTMLElement, Types.ContextMenuProps>((props) => {
  const { defaultOpen, options, variant, component } = props;
  const [open, setOpen] = React.useState(defaultOpen);
  return (
    <>
      <Styles.MenuContent numberItems={options.length}>
        {React.cloneElement(component, {
          onClick: () => setOpen(true),
        })}
        ,{/* <Modal open={open} hideBackdrop> */}
        {open && (
          <>
            {options.map((item, index) => (
              <Styles.MenuButton key={index} className={clsx(`menuItem_${index}`, variant)}>
                {item.item}
              </Styles.MenuButton>
            ))}
          </>
        )}
        {/* </Modal> */}
      </Styles.MenuContent>
    </>
  );
});
export default ContextMenu;
