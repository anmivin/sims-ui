import{j as s}from"./jsx-runtime-DR9Q75dM.js";import{r}from"./index-DRjF_FHU.js";import{n as f}from"./emotion-styled.browser.esm-BfSMLqtG.js";import"./emotion-element-5486c51c.browser.esm-C62VgSX4.js";const w=`
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
)`,I=f("div")({width:"500px",height:"500px",background:w}),$=f("div")({position:"fixed",width:"20px",height:"20px",backgroundColor:"trasparent",borderRadius:"50%",border:"2px solid white",boxShadow:"inset 0px 0px 4px black, 0px 0px 4px black"}),v=()=>{const[k,b]=r.useState(""),[l,n]=r.useState(!1),o=r.useRef(null),t=r.useRef(null),u=r.useCallback(e=>{!l||!o.current||(o.current.style.top=`${e.clientY}px`,o.current.style.left=`${e.clientX}px`)},[l,o]);r.useEffect(()=>{var e,c,a;return(e=t.current)==null||e.addEventListener("mousedown",()=>n(!0)),(c=t.current)==null||c.addEventListener("mouseUp",()=>n(!1)),(a=t.current)==null||a.addEventListener("mousemove",i=>u(i)),()=>{var i,p,g;(i=t.current)==null||i.removeEventListener("mousedown",()=>n(!0)),(p=t.current)==null||p.removeEventListener("mouseUp",()=>n(!1)),(g=t.current)==null||g.removeEventListener("mousemove",E=>u(E))}},[t]);const C=e=>{const c=Math.round(360*e.clientX/e.currentTarget.offsetWidth),a=100-Math.round((e.clientY-e.currentTarget.offsetTop)*100/e.currentTarget.offsetHeight);b(`hsl(${c}deg 100% ${a}%)`)};return s.jsxs(s.Fragment,{children:[s.jsx("div",{style:{width:"50px",height:"50px",border:"1px solid black",background:k}}),s.jsx(I,{ref:t,onClick:C,children:s.jsx($,{ref:o})})]})},j=v;v.__docgenInfo={description:"",methods:[],displayName:"ColorInput"};const L={},D={component:j,title:"ColorInput",tags:["autodocs"],excludeStories:/.*Data$/,args:{...L}},d={args:{}};var h,m,x;d.parameters={...d.parameters,docs:{...(h=d.parameters)==null?void 0:h.docs,source:{originalSource:`{
  args: {}
}`,...(x=(m=d.parameters)==null?void 0:m.docs)==null?void 0:x.source}}};const M=["ActionsData","s"];export{L as ActionsData,M as __namedExportsOrder,D as default,d as s};
