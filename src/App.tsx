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
  ContextMenuModern,
  ContextMenuOld,
  Popover,
  Autocomplete,
  Tooltip,
  AlertModern,
  AlertOld,
  SimsThemeProvider,
  ColorInput,
  ModernTextfield
} from "sims-ui";
import "../lib/fonts/simsSans.css";

import { useRef, useState } from "react";

function App() {
  const [open, setOpen] = useState(false);
  const [popopen, setPopOpen] = useState(false);
  const butRef = useRef<HTMLButtonElement | null>(null);
  return (
    <div style={{ padding: "100px" /*  background: "#8ccbff" */ }}>
      <SimsThemeProvider>
        <ModalProvider>
         {/*  <ModernTextfield variant="filled"/> */}
          {/*    <ColorInput /> */}
          {/*           <AlertModern className='success'>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
          </AlertModern> */}
          {/*          <AlertOld>
            <div>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            </div>
          </AlertOld> */}
          {/*         <Autocomplete
          options={[
            { id: "1", label: "привет" },
            { id: "2", label: "здравствуйте" },
            { id: "3", label: "хэллоу" },
          ]}
          onChange={() => {}}
        /> */}
          <Tooltip title='dgdhde ddj'>
            <ModernButton onClick={() => setPopOpen(true)} ref={butRef}>
              open popover
            </ModernButton>
          </Tooltip>
          <Popover
            anchorOrigin={{
              vertical: "top",
              horizontal: "center",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            open={popopen}
            onClose={() => setPopOpen(false)}
            onBackdropClick={() => setPopOpen(false)}
            anchorEl={butRef.current}
          >
            dldldldd
          </Popover>
          {/* 
      <ContextMenuOld />
      <ContextMenuModern />
      <CircularProgressModern />
      <ModernButton onClick={() => setOpen(true)}>asdsad</ModernButton> */}
          <DialogOld
            title='sdadas'
            open={open}
            onClose={() => setOpen(false)}
            actions={[
              { title: "Ok", action: () => console.log("ok") },
              { title: "No", action: () => console.log("no") },
            ]}
          >
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
            dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
            mollit anim id est laborum
          </DialogOld>

          {/*       <MenuButtonOld selected>asdasd</MenuButtonOld> */}
        </ModalProvider>
      </SimsThemeProvider>
    </div>
  );
}

export default App;
