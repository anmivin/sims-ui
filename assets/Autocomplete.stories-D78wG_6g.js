import{j as s}from"./jsx-runtime-DR9Q75dM.js";import{r as p}from"./index-DRjF_FHU.js";import{n as C}from"./emotion-styled.browser.esm-BfSMLqtG.js";import{P as K}from"./Popper-ZhBlxGP-.js";import{c as E}from"./clsx-B-dksMZM.js";import{T as Q}from"./TextField-B_1lHNlX.js";import{C as U,m as X}from"./PlusIcon-CAlJ3yNJ.js";import"./Icon-CTL9QgQY.js";import{I as W}from"./IconButton-ba3KxyGf.js";import"./emotion-element-5486c51c.browser.esm-C62VgSX4.js";import"./color-B1X_6X5_.js";import"./DefaultButton-C7ENlOEz.js";const Y=C(K)(({textfieldWidth:l})=>({width:l?`${l-10}px`:"unset"})),Z=C("p")({width:"fit-content",margin:0}),ee=C("div")({display:"flex",gap:4}),te=C("div")({color:"",padding:"14px 16px"}),oe=C("div")(({theme:l,textfieldWidth:h})=>({display:"flex",flexDirection:"column",width:h?`${h}px`:"unset","&.modern":{color:"blue",border:`1px solid ${l.color.tooltipBorder}`,boxShadow:"0 4px 6px 0 #606164",background:l.color.tooltipGradient},"&.old":{color:"#050a67",border:"1px solid #4c63a3",boxShadow:"0 4px 6px 0 #606164",backgroundColor:"#94abdd"}})),ne=C("li")(({theme:l})=>({listStyleType:"none",cursor:"pointer",padding:"8px 16px",display:"flex",overflow:"hidden",justifyContent:"flex-start",alignItems:"center","&.disabled":{opacity:.5,pointerEvents:"none"},"&.modern":{":not(:first-child)":{borderTop:"1px solid #d9d9d9"},"&.selected":{color:l.color.green}},"&.old":{"&.selected":{backgroundColor:"#CDD6FF"}}})),se=l=>{const{defaultValue:h=l.multiple?[]:null,getOptionDisabled:x,getOptionLabel:g=e=>e.label,multiple:a,onChange:d,options:$}=l,[t,S]=p.useState(h),[r,m]=p.useState(""),[f,j]=p.useState(!1),y=(e,n)=>e.id===n.id,k=p.useCallback(e=>{if(e===null)return;const n=g(e);r!==n&&m(n)},[g,r,m]),_=p.useCallback(e=>{Array.isArray(t)&&(t.length>=e.length||r!==""&&m(""))},[r,m,t]),O=(!a&&t!=null&&r===g(t)?"":r).trim().toLowerCase(),v=f?$.filter(e=>O?g(e).includes(O):!0):[],A=p.useCallback(e=>{t!==e&&(d==null||d(e),S(e))},[t]),V=p.useCallback(e=>{Array.isArray(t)&&(t.length===e.length&&t.every((n,c)=>n===e[c])||(d==null||d(e),S(e)))},[t]),i=()=>{!f&&j(!0)},I=()=>{f&&j(!1)},F=e=>{let n=e,c=[e];if(a){c=Array.isArray(t)?t.slice():[];const P=c.findIndex(D=>y(e,D));P===-1?c.push(e):c.splice(P,1),_(c),V(c)}else k(n),A(n);I()},L=()=>{m(""),a?V([]):A(null)},w=e=>{r!==e&&m(e),e===""?a||A(null):i()},o=e=>{const n=Number(e.currentTarget.getAttribute("data-option-index"));F(v[n])},u=()=>{f?I():i()};let b=r.length>0;return b=b||(a?(t==null?void 0:t.length)>0:t!==null),{inputValue:r,value:t,dirty:b,expanded:f,filteredOptions:v,valueInput:r,onInputChange:w,onClickClear:L,onOpen:i,onClose:I,onClickIndicator:u,optionProps:(e,n)=>{const c=(a?t:[t]).some(D=>D!=null&&y(e,D)),P=x?x(e):!1;return{key:`${g(e)}_${n}`,onClick:o,"data-option-index":n,disabled:P,selected:c}}}},J=l=>{const{defaultValue:h,disabled:x,getOptionDisabled:g,getOptionLabel:a=o=>o.label,multiple:d,noOptionsText:$="No options",onChange:t,options:S,variant:r="modern"}=l,{inputValue:m,value:f,dirty:j,expanded:y,filteredOptions:k,onInputChange:_,onOpen:M,onClose:O,onClickClear:v,onClickIndicator:A,optionProps:V}=se({defaultValue:h,getOptionDisabled:g,getOptionLabel:a,multiple:d,onChange:t,options:S}),[i,I]=p.useState(null),F=(o,u)=>{const{key:b,selected:e,...n}=o;return s.jsx(ne,{...n,className:E(r,e&&"selected"),children:a(u)},b)},L=(o,u)=>{const b=V(o,u);return F(b,o)},w=p.useMemo(()=>{if(d)return f.map(u=>a(u)).join(", ")},[d,f,a]);return s.jsxs(p.Fragment,{children:[s.jsx(Q,{variant:r,ref:I,defaultValue:m,disabled:x,fullWidth:!0,startAdornment:s.jsx(Z,{children:w}),onChange:o=>{_(o.target.value)},appearence:"primary",onClick:M,endAdornment:s.jsxs(ee,{children:[!x&&j&&s.jsx(W,{onClick:o=>{o.stopPropagation(),v()},children:s.jsx(U,{})}),s.jsx(W,{disabled:x,className:E(y&&"open",x&&"desabled"),onClick:o=>{o.stopPropagation(),A()},style:{transform:y?"rotate(180deg)":void 0},children:s.jsx(X,{})})]})}),s.jsx(Y,{placement:"bottom",open:y,onClose:O,anchorEl:i,textfieldWidth:i==null?void 0:i.offsetWidth,children:s.jsx(oe,{className:E(r),textfieldWidth:i==null?void 0:i.offsetWidth,children:k.length?s.jsx(s.Fragment,{children:k.map((o,u)=>L(o,u))}):s.jsx(te,{children:$})})})]})},le=J;J.__docgenInfo={description:"",methods:[],displayName:"Autocomplete"};const re={},ye={component:l=>s.jsx("div",{style:{padding:"100px"},children:s.jsx(le,{...l})}),title:"Autocomplete",tags:["autodocs"],excludeStories:/.*Data$/,args:{...re}},N={args:{options:[{id:"1",label:"sss"},{id:"2",label:"dfs"},{id:"3",label:"tyuur"}],variant:"old"}},T={args:{options:[{id:"1",label:"sss"},{id:"2",label:"dfs"},{id:"3",label:"tyuur"}],variant:"modern"}};var B,q,G;N.parameters={...N.parameters,docs:{...(B=N.parameters)==null?void 0:B.docs,source:{originalSource:`{
  args: {
    options: [{
      id: "1",
      label: "sss"
    }, {
      id: "2",
      label: "dfs"
    }, {
      id: "3",
      label: "tyuur"
    }],
    variant: "old"
  }
}`,...(G=(q=N.parameters)==null?void 0:q.docs)==null?void 0:G.source}}};var R,z,H;T.parameters={...T.parameters,docs:{...(R=T.parameters)==null?void 0:R.docs,source:{originalSource:`{
  args: {
    options: [{
      id: "1",
      label: "sss"
    }, {
      id: "2",
      label: "dfs"
    }, {
      id: "3",
      label: "tyuur"
    }],
    variant: "modern"
  }
}`,...(H=(z=T.parameters)==null?void 0:z.docs)==null?void 0:H.source}}};const Ce=["ActionsData","s","m"];export{re as ActionsData,Ce as __namedExportsOrder,ye as default,T as m,N as s};
