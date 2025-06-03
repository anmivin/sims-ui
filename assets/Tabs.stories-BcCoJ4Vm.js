import{j as r}from"./jsx-runtime-DR9Q75dM.js";import{r as l}from"./index-DRjF_FHU.js";import{n as b}from"./emotion-styled.browser.esm-BfSMLqtG.js";import{D as h}from"./DefaultButton-C7ENlOEz.js";import{c as d}from"./clsx-B-dksMZM.js";import"./emotion-element-5486c51c.browser.esm-C62VgSX4.js";const v=b(h)(({theme:o})=>({maxWidth:360,minWidth:90,minHeight:48,flexShrink:0,padding:"12px 16px",overflow:"hidden",whiteSpace:"normal",textAlign:"center",lineHeight:1.25,"&.modern":{fontFamily:"The Sims Sans",fontSize:"20px",borderRadius:"10px 10px 0px 0px",color:"#0949ab",background:"linear-gradient(180deg, #fbfbfb 20%, #d9d9d9)",cursor:"pointer",padding:0,width:"300px",height:"60px","&.disabled":{background:o.color.disabledGradient,color:o.color.disabledText},"&:hover":{color:"#199c2c"},"&.selected":{background:"linear-gradient(180deg, #92ce31 20%, #3bb435)",color:"#fff","&:hover":{color:"#fff"}}},"&.old":{fontFamily:"Comic Sans Ms",fontSize:"20px",fontWeight:600,color:"#132178",backgroundColor:"#7997d5",padding:0,borderRadius:"10px 10px 0px 0px","&.disabled":{background:"#b9bcc7",color:o.color.disabledTextOld},"&.selected":{backgroundColor:"#94abdd",border:"2px solid #132178",borderBottom:0}}})),S=b("div")({overflow:"hidden",overflowX:"auto",minHeight:48,display:"flex","&.vertical":{flexDirection:"column"},"&.modern":{gap:"8px"},"&.old":{}}),p=l.forwardRef(o=>{const{onChange:w,orientation:m="horizontal",variant:t,value:T,options:u,iconPosition:x="start",...n}=o,[f,g]=l.useState(0);return r.jsx(S,{className:d(m,t),...n,children:u.map(e=>r.jsx(v,{disabled:e.disabled,onClick:()=>g(e.value),className:d(t,f===e.value&&"selected",e.disabled&&"disabled"),...n,children:x==="start"?r.jsxs(l.Fragment,{children:[e.icon,e.label]}):r.jsxs(l.Fragment,{children:[e.label,e.icon]})},e.value))})});p.__docgenInfo={description:"",methods:[],displayName:"Tabs"};const a={options:[{label:"one",value:1},{label:"two",value:2},{label:"three",value:3,disabled:!0},{label:"four",value:4}]},F={component:p,title:"Tabs",args:{...a},argTypes:{variant:{options:["old","modern"],control:{type:"radio"}}}};var s,i,c;a.parameters={...a.parameters,docs:{...(s=a.parameters)==null?void 0:s.docs,source:{originalSource:`{
  options: [{
    label: "one",
    value: 1
  }, {
    label: "two",
    value: 2
  }, {
    label: "three",
    value: 3,
    disabled: true
  }, {
    label: "four",
    value: 4
  }]
}`,...(c=(i=a.parameters)==null?void 0:i.docs)==null?void 0:c.source}}};const _=["ActionsData"];export{a as ActionsData,_ as __namedExportsOrder,F as default};
