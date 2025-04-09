import{j as t}from"./jsx-runtime-DR9Q75dM.js";import{n as g}from"./emotion-styled.browser.esm-BfSMLqtG.js";import{c as n}from"./clsx-B-dksMZM.js";import"./index-DRjF_FHU.js";import"./emotion-element-5486c51c.browser.esm-C62VgSX4.js";const v=g("span")(({theme:r})=>({position:"relative",overflow:"hidden",display:"block",height:"20px",borderRadius:"12px","&.old":{backgroundColor:"#747ed5"},"&.modern":{backgroundColor:r.color.scrollBarTrack}})),b=g("span")(({theme:r})=>({width:"100%",position:"absolute",left:0,bottom:0,top:0,transformOrigin:"left",transition:"transform .4s linear","&.old":{background:"linear-gradient(0deg, #4affff, #28c4d3)"},"&.modern":{background:r.color.scrollBarThumbHover}})),u=r=>{const{value:a,variant:e,...f}=r;return t.jsx(v,{role:"progressbar",...f,className:n(e),children:t.jsx(b,{className:n(e),style:{transform:a?`translateX(${a-100}%)`:void 0}})})},x=u;u.__docgenInfo={description:"",methods:[],displayName:"LinearProgress"};const h={},y={component:x,title:"LinearProgress",tags:["autodocs"],excludeStories:/.*Data$/,args:{...h}},o={args:{variant:"old",value:90}},s={args:{variant:"modern",value:50}};var i,c,d;o.parameters={...o.parameters,docs:{...(i=o.parameters)==null?void 0:i.docs,source:{originalSource:`{
  args: {
    variant: "old",
    value: 90
  }
}`,...(d=(c=o.parameters)==null?void 0:c.docs)==null?void 0:d.source}}};var l,m,p;s.parameters={...s.parameters,docs:{...(l=s.parameters)==null?void 0:l.docs,source:{originalSource:`{
  args: {
    variant: "modern",
    value: 50
  }
}`,...(p=(m=s.parameters)==null?void 0:m.docs)==null?void 0:p.source}}};const S=["ActionsData","s","m"];export{h as ActionsData,S as __namedExportsOrder,y as default,s as m,o as s};
