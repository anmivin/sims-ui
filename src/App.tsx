import {
  ModernButton,
  ModernCheckbox,
  OldButton,
  OldCheckbox,
  IconButtonModern,
  OldRadio,
  CircularProgressModern,
  CircularProgressOld,
  ModernRadio,
  DialogModern,
  DialogOld,
  ModalProvider,
  TextFieldModern,
  TextFieldOld,
  ModernTabs,
  OldTabs,
} from "sims-ui";
import "../lib/fonts/simsSans.css";

import { useState } from "react";
function App() {
  const [open, setOpen] = useState(false);
  return (
    <ModalProvider>
      <CircularProgressModern />
      <ModernButton onClick={() => setOpen(true)}>asdsad</ModernButton>
      <DialogOld title='sdadas' open={open} onClose={() => setOpen(false)}>
        {" "}
        sdf
      </DialogOld>

      {/* <MenuButtonOld selected>asdasd</MenuButtonOld> */}
    </ModalProvider>
  );
}

export default App;
