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
  Tooltip,
} from "sims-ui";
import "../lib/fonts/simsSans.css";

import "./App.css";
import { useState } from "react";
function App() {
  const [selected, setSelected] = useState(false);
  return (
    <ModalProvider>
      <OldTabs />
      <Tooltip title='ad'>
        <div>
          <OldCheckbox label='as' />
        </div>
      </Tooltip>
      {/* <MenuButtonOld selected>asdasd</MenuButtonOld> */}
    </ModalProvider>
  );
}

export default App;
