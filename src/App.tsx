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
  ModalProvider,
  TextFieldModern,
  TextFieldOld,
  OldTabs,
  AlertModern,
  AlertOld,
} from "sims-ui";
import "../lib/fonts/simsSans.css";

import { useState } from "react";
function App() {
  const [selected, setSelected] = useState(false);
  return (
    <ModalProvider>
      <AlertOld action={() => {}}>dasdasdlasdl</AlertOld>
      {/*       <OldTabs /> */}

      <OldCheckbox label='as' />

      {/* <MenuButtonOld selected>asdasd</MenuButtonOld> */}
    </ModalProvider>
  );
}

export default App;
