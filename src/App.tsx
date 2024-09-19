import { ModernButton, OldButton, OldCheckbox, ModernRadio, ModernCheckbox, OldRadio,CircularProgressOld,CircularProgressModern } from "sims-ui";
import "../lib/fonts/simsSans.css";

import "./App.css";
function App() {
  return (
    <>
{/*    <CircularProgressOld/> */}
   {/*   <CircularProgressModern/> */}
     <ModernRadio/>
   <OldRadio/> 
      <OldCheckbox label='sda' />
      <OldButton>кнопа кнопа</OldButton>
      <ModernCheckbox label='asdasd' />
      <ModernButton>asddaads</ModernButton>
    {/*   <div
        style={{
          backgroundColor: "#c8d5e6",
          padding: "60px",
          width: "100px",
          height: "100px",
          overflowY: "auto",
        }}
      >
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
        ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
        laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
        voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
        cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
      </div>  */}
    </>
  );
}

export default App;
