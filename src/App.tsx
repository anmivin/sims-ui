
import {Button, Button2, Checkbox, Checkbox2, TextField, TextField2, Modal2, Modal, IconButton, MenuButton} from 'sims-ui'
import '../lib/fonts/simsSans.css'
import {CloxeIcon} from '../lib/icons/closeIcon'
import CloseIcon from '../lib/icons/CloseIcon copy'
function App() {

  return (
    <>
      <div style={{backgroundColor: '#c8d5e6', padding: '60px', display:'flex', flexWrap: 'wrap', gap: 8}}>
{/*        
       <Button>dsfsdf</Button>
       <Button2>dsfsdf</Button2>
       <Checkbox label='sadasdasdaasda'/>
       <Checkbox2 label='sadasdasdaasda'/>
       <TextField placeholder='sda'/>
       <TextField2 placeholder='sda'/> */}
{/*        <Modal2/> */}
       {/*  */}
       <MenuButton>sdasdasdasd</MenuButton>
       <MenuButton selected>sdasdasdasd</MenuButton>
       <IconButton><CloseIcon size={40}/></IconButton>
       <Modal title='sadlaskdlkaskd'>saddsadasdasda asda sda asdasdas asdas</Modal>
      </div>

    </>
  )
}

export default App
