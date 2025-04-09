import{j as o}from"./jsx-runtime-DR9Q75dM.js";import{r}from"./index-DRjF_FHU.js";import{n as f}from"./emotion-styled.browser.esm-BfSMLqtG.js";import{D as T}from"./DefaultButton-C7ENlOEz.js";import{c as d}from"./clsx-B-dksMZM.js";import"./emotion-element-5486c51c.browser.esm-C62VgSX4.js";const k=f(T)(({theme:a})=>({maxWidth:360,minWidth:90,minHeight:48,flexShrink:0,padding:"12px 16px",overflow:"hidden",whiteSpace:"normal",textAlign:"center",lineHeight:1.25,"&.modern":{fontFamily:"The Sims Sans",fontSize:"20px",borderRadius:"10px 10px 0px 0px",color:"#0949ab",background:"linear-gradient(180deg, #fbfbfb 20%, #d9d9d9)",cursor:"pointer",padding:0,width:"300px",height:"60px","&.disabled":{background:a.color.disabledGradient,color:a.color.disabledText},"&:hover":{color:"#199c2c"},"&.selected":{background:"linear-gradient(180deg, #92ce31 20%, #3bb435)",color:"#fff","&:hover":{color:"#fff"}}},"&.old":{fontFamily:"Comic Sans Ms",fontSize:"20px",fontWeight:600,color:"#132178",backgroundColor:"#7997d5",padding:0,borderRadius:"10px 10px 0px 0px","&.disabled":{background:"#b9bcc7",color:a.color.disabledTextOld},"&.selected":{backgroundColor:"#94abdd",border:"2px solid #132178",borderBottom:0}}})),j=f("div")({overflow:"hidden",overflowX:"auto",minHeight:48,display:"flex","&.vertical":{flexDirection:"column"},"&.modern":{gap:"8px"},"&.old":{}}),x=r.forwardRef(a=>{const{onChange:y,orientation:g="horizontal",variant:t,value:C,options:v,iconPosition:h="start",...s}=a,[S,w]=r.useState(0);return o.jsx(j,{className:d(g,t),...s,children:v.map(e=>o.jsx(k,{disabled:e.disabled,onClick:()=>w(e.value),className:d(t,S===e.value&&"selected",e.disabled&&"disabled"),...s,children:h==="start"?o.jsxs(r.Fragment,{children:[e.icon,e.label]}):o.jsxs(r.Fragment,{children:[e.label,e.icon]})},e.value))})}),D=x;x.__docgenInfo={description:"",methods:[],displayName:"Tabs"};const R={},H={component:D,title:"Tabs",tags:["autodocs"],excludeStories:/.*Data$/,args:{...R}},l={args:{options:[{label:"one",value:1},{label:"two",value:2},{label:"three",value:3,disabled:!0},{label:"four",value:4}],variant:"old"}},n={args:{options:[{label:"one",value:1,disabled:!0},{label:"two",value:2},{label:"three",value:3},{label:"four",value:4}],variant:"modern"}};var i,c,b;l.parameters={...l.parameters,docs:{...(i=l.parameters)==null?void 0:i.docs,source:{originalSource:`{
  args: {
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
    }],
    variant: "old"
  }
}`,...(b=(c=l.parameters)==null?void 0:c.docs)==null?void 0:b.source}}};var u,m,p;n.parameters={...n.parameters,docs:{...(u=n.parameters)==null?void 0:u.docs,source:{originalSource:`{
  args: {
    options: [{
      label: "one",
      value: 1,
      disabled: true
    }, {
      label: "two",
      value: 2
    }, {
      label: "three",
      value: 3
    }, {
      label: "four",
      value: 4
    }],
    variant: "modern"
  }
}`,...(p=(m=n.parameters)==null?void 0:m.docs)==null?void 0:p.source}}};const N=["ActionsData","oldVertical","modernVeertical"];export{R as ActionsData,N as __namedExportsOrder,H as default,n as modernVeertical,l as oldVertical};
