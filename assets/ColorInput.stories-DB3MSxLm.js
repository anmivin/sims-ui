import{j as o}from"./jsx-runtime-DR9Q75dM.js";import{r as t}from"./index-DRjF_FHU.js";import{n as C}from"./emotion-styled.browser.esm-BfSMLqtG.js";import"./emotion-element-5486c51c.browser.esm-C62VgSX4.js";const j=`
linear-gradient(to top,
hsl(0deg 100% 0%), 
hsl(0deg 0% 0% / 0%),
hsl(0deg 100% 100%)
),
linear-gradient(to right,
hsl(0deg 100% 50%), 
hsl(60deg 100% 50%),
hsl(120deg 100% 50%),
hsl(180deg 100% 50%),
hsl(240deg 100% 50%),
hsl(300deg 100% 50%),
hsl(360deg 100% 50%)
)`,L=C("div")({width:"500px",height:"500px",background:j}),R=C("div")({position:"fixed",width:"20px",height:"20px",backgroundColor:"trasparent",borderRadius:"50%",border:"2px solid white",boxShadow:"inset 0px 0px 4px black, 0px 0px 4px black"}),E=()=>{const[w,I]=t.useState(""),[l,n]=t.useState(!1),s=t.useRef(null),r=t.useRef(null),p=t.useCallback(e=>{!l||!s.current||(s.current.style.top=`${e.clientY}px`,s.current.style.left=`${e.clientX}px`)},[l,s]);t.useEffect(()=>{var e,a,c;return(e=r.current)==null||e.addEventListener("mousedown",()=>n(!0)),(a=r.current)==null||a.addEventListener("mouseUp",()=>n(!1)),(c=r.current)==null||c.addEventListener("mousemove",d=>p(d)),()=>{var d,g,m;(d=r.current)==null||d.removeEventListener("mousedown",()=>n(!0)),(g=r.current)==null||g.removeEventListener("mouseUp",()=>n(!1)),(m=r.current)==null||m.removeEventListener("mousemove",$=>p($))}},[r]);const S=e=>{const a=Math.round(360*e.clientX/e.currentTarget.offsetWidth),c=100-Math.round((e.clientY-e.currentTarget.offsetTop)*100/e.currentTarget.offsetHeight);I(`hsl(${a}deg 100% ${c}%)`)};return o.jsxs(o.Fragment,{children:[o.jsx("div",{style:{width:"50px",height:"50px",border:"1px solid black",background:w}}),o.jsx(L,{ref:r,onClick:S,children:o.jsx(R,{ref:s})})]})},y=E;E.__docgenInfo={description:"",methods:[],displayName:"ColorInput"};const _={},P={component:y,title:"ColorInput",tags:["autodocs"],excludeStories:/.*Data$/,args:{..._}},i={args:{}},u={args:{}};var h,x,f;i.parameters={...i.parameters,docs:{...(h=i.parameters)==null?void 0:h.docs,source:{originalSource:`{
  args: {}
}`,...(f=(x=i.parameters)==null?void 0:x.docs)==null?void 0:f.source}}};var v,k,b;u.parameters={...u.parameters,docs:{...(v=u.parameters)==null?void 0:v.docs,source:{originalSource:`{
  args: {}
}`,...(b=(k=u.parameters)==null?void 0:k.docs)==null?void 0:b.source}}};const U=["ActionsData","s","m"];export{_ as ActionsData,U as __namedExportsOrder,P as default,u as m,i as s};
