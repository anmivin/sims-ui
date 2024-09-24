import {
  ModernButton,
  OldButton,
  OldCheckbox,
  ModernRadio,
  ModernCheckbox,
  OldRadio,
  CircularProgressOld,
  CircularProgressModern,
  DialogModern,
  DialogOld,
  Drawer,
  ModalProvider,
  TextField,
  TextFieldModern,
  TextFieldOld,
  MenuButtonModern,
  MenuButtonOld,
  OldTabs,
} from "sims-ui";
import "../lib/fonts/simsSans.css";

import "./App.css";
import { useState } from "react";
function App() {

  const [selected, setSelected] = useState(false)
  return (
    <ModalProvider>
      <OldTabs/>
{/* <MenuButtonOld selected>asdasd</MenuButtonOld> */}
    </ModalProvider>
  );
}

export default App;
