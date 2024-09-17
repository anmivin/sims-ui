import {
  ModernButton,
  OldButton,
  OldCheckbox,
/*   Button2, */
  ModernCheckbox,
/*   Checkbox2,
  TextField,
  TextField2,
  Modal2,
  Modal,
  IconButton,
  MenuButton,
  Che */
} from "sims-ui";
import "../lib/fonts/simsSans.css";
import { CloxeIcon } from "../lib/icons/closeIcon";
import CloseIcon from "../lib/icons/CloseIcon copy";
import "./App.css";
function App() {
  return (
    <>
    <OldCheckbox label='sda'/>
    <OldButton>кнопа кнопа</OldButton>
    <ModernCheckbox label='asdasd'/>
    <ModernButton>asddaads</ModernButton>
      {/*       <div style={{ width: "899px", height: "200px", backgroundColor: "#c8d223" }}> */}

      {/*       </div> */}
     <div
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
      </div> 
      {/*       <div
        style={{
          backgroundColor: "#c8d5e6",
          padding: "60px",
          display: "flex",
          flexWrap: "wrap",
          gap: 8,
        }}
      > */}
      {/*         <Button>КНОпка</Button>
        <Button2>КНОПка</Button2> */}
      {/*       <Checkbox label='sadasdasdaasda' /> */}
      {/*    <Checkbox2 label='sadasdasdaasda'/>
       <TextField placeholder='sda'/>
       <TextField2 placeholder='sda'/> */}
      {/*        <Modal2/> */}
      {/*  */}
      {/*         <MenuButton>sdasdasdasd</MenuButton>
        <MenuButton selected>sdasdasdasd</MenuButton>
        <IconButton>
          <CloseIcon size={40} />
        </IconButton> */}
      {/*       <Modal title='sadlaskdlkaskd'>saddsadasdasda asda sda asdasdas asdas</Modal> */}
      {/*    </div> */}
    </>
  );
}

export default App;
