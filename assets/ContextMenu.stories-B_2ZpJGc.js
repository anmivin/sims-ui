import{j as n}from"./jsx-runtime-DR9Q75dM.js";import{r as s}from"./index-DRjF_FHU.js";import{n as x}from"./emotion-styled.browser.esm-BfSMLqtG.js";import{c as v}from"./emotion-react.browser.esm-D71b7ji9.js";import{D as w}from"./DefaultButton-C7ENlOEz.js";import{c as C}from"./clsx-B-dksMZM.js";import"./emotion-element-5486c51c.browser.esm-C62VgSX4.js";const j=e=>{const a={},o=360/e;for(let t=0;t<e;t+=1)a[`.menuItem_${t}`]=v`
      position: absolute;
      transform: translate(-50%, -50%);
      left: calc(50% + 120px * cos(${t*o-90}deg));
      top: calc(50% + 120px * sin(${t*o-90}deg));
    `;return a},M=x("div")(({numberItems:e})=>({position:"relative",width:"400px",height:"400px",borderRadius:"50%",backgroundColor:"#f0f0f0",...j(e),".menuComponent":{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%, -50%)",width:"40px",height:"20px"}})),O=x(w)({"&.modern":{fontFamily:"The Sims Sans",fontSize:"16px",borderRadius:"50px",color:"#0949ab",background:"linear-gradient(180deg, #fbfbfb 20%, #eaeaea)",boxShadow:"0 4px 6px 0 #606164",padding:"10px 30px",height:"40px",transition:"transform 0.1s ease-in-out","&:hover":{color:"#199c2c"}},"&.old":{fontFamily:"Comic Sans Ms",fontSize:"16px",borderRadius:"50px",color:"#a8b4fd",backgroundColor:"#36378f",boxShadow:"inset 0 -2px 18px 2px #b1c0fc, 0 0 1px 2px #222a55",padding:"10px 30px",height:"40px",width:"fit-content",transition:"color 0.1s ease-in-out","&:hover":{color:"#00ff00"}}}),g=s.forwardRef(e=>{const{defaultOpen:a,options:o,variant:t,component:h}=e,[b,k]=s.useState(a);return n.jsx(n.Fragment,{children:n.jsxs(M,{numberItems:o.length,children:[s.cloneElement(h,{onClick:()=>k(!0)}),",",b&&n.jsx(n.Fragment,{children:o.map((S,c)=>n.jsx(O,{className:C(`menuItem_${c}`,t),children:S.item},c))})]})})}),_=g;g.__docgenInfo={description:"",methods:[],displayName:"ContextMenu"};const y={},A={component:_,title:"ContextMenu",tags:["autodocs"],excludeStories:/.*Data$/,args:{...y}},i={args:{options:[{item:"one long name",action:()=>{}},{item:"two long name",action:()=>{}},{item:"three",action:()=>{}},{item:"four",action:()=>{}},{item:"five",action:()=>{}}],component:n.jsx(n.Fragment,{children:"kkdkd"}),defaultOpen:!1,variant:"modern"}},r={args:{options:[{item:"one long name",action:()=>{}},{item:"two long name",action:()=>{}},{item:"three",action:()=>{}},{item:"four",action:()=>{}},{item:"five",action:()=>{}}],component:n.jsx(n.Fragment,{children:"kkdkd"}),defaultOpen:!1,variant:"old"}};var m,p,d;i.parameters={...i.parameters,docs:{...(m=i.parameters)==null?void 0:m.docs,source:{originalSource:`{
  args: {
    options: [{
      item: "one long name",
      action: () => {}
    }, {
      item: "two long name",
      action: () => {}
    }, {
      item: "three",
      action: () => {}
    }, {
      item: "four",
      action: () => {}
    }, {
      item: "five",
      action: () => {}
    }],
    component: <>kkdkd</>,
    defaultOpen: false,
    variant: "modern"
  }
}`,...(d=(p=i.parameters)==null?void 0:p.docs)==null?void 0:d.source}}};var l,f,u;r.parameters={...r.parameters,docs:{...(l=r.parameters)==null?void 0:l.docs,source:{originalSource:`{
  args: {
    options: [{
      item: "one long name",
      action: () => {}
    }, {
      item: "two long name",
      action: () => {}
    }, {
      item: "three",
      action: () => {}
    }, {
      item: "four",
      action: () => {}
    }, {
      item: "five",
      action: () => {}
    }],
    component: <>kkdkd</>,
    defaultOpen: false,
    variant: "old"
  }
}`,...(u=(f=r.parameters)==null?void 0:f.docs)==null?void 0:u.source}}};const B=["ActionsData","s","m"];export{y as ActionsData,B as __namedExportsOrder,A as default,r as m,i as s};
