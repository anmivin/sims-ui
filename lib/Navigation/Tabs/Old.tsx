import styled from "@emotion/styled";
import Tabs from "./Tabs";

import React from "react";

const StyledTabs = styled(Tabs)({
    '.tabs-container': {
        backgroundColor: "#7997d5",
    },

    '.tab': {
      fontFamily: 'Comic Sans Ms',
      fontSize: '20px',
      fontWeight: 600,
      color:"#132178",
     backgroundColor: "#7997d5",
      padding: 0,

    
    },    '.selected': {
        backgroundColor: "#94abdd",
        border: '2px solid #132178',
        borderBottom: 0,
        borderRadius: '10px 10px 0px 0px',
          },

})

export const OldTabs = () => {

    const [selected, setSelected] = React.useState(0);
    const options = [{label: 'one', value: 1},{label: 'two', value: 2},{label: 'three', value: 3},{label: 'four', value: 4}]

    return (
        <StyledTabs onChange={(val: number) => {console.log(val);setSelected(val)}} options={options} value={selected}/>

    )
}