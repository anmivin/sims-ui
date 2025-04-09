import{j as a}from"./jsx-runtime-DR9Q75dM.js";import{r as _}from"./index-DRjF_FHU.js";import{n as x}from"./emotion-styled.browser.esm-BfSMLqtG.js";import{c as j}from"./emotion-react.browser.esm-D71b7ji9.js";import"./emotion-element-5486c51c.browser.esm-C62VgSX4.js";const n=["#46ddf0","#3bd0b0","#39c359","#46d147","#93e8a7","#c2fde9","#b2f4f3","#70e7fb"],s=(t,r)=>t+r<n.length?n[t+r]:n[t+r-n.length],$=()=>{let t="";for(let r=0;r<8;r+=1)t+=`
       .path_0${r+1} {
         animation: change-path_0${r+1} 1.5s linear infinite;
       }
         @keyframes change-path_0${r+1} {
         0% {fill: ${s(r,0)}}
         13% {fill: ${s(r,1)}}
         25% {fill: ${s(r,2)}}
         38% {fill: ${s(r,3)}}
         50% {fill: ${s(r,4)}}
         63% {fill: ${s(r,5)}}
         75% {fill: ${s(r,6)}}
         88% {fill: ${s(r,7)}}
         100% {fill: ${s(r,0)}}         
         }
     `;return j`
    ${t}
  `},M=x("svg")({...$()}),N=x("svg")({filter:"drop-shadow(1px 0 0 #13192e) drop-shadow(-1px 0 0 #13192e) drop-shadow(0 1px 0 #13192e) drop-shadow(0 -1px 0 #13192e)",".contour":{transformOrigin:"50% 50%",animation:"change-contour 3s linear infinite"},".hourglass_1":{animation:"change-hourglass_1 3s linear infinite"},".hourglass_2":{animation:"change-hourglass_2 3s linear infinite"},".hourglass_3":{transformOrigin:"50% 50%",animation:"change-hourglass_3 3s linear infinite"},"@keyframes change-contour":{"0%":{transform:"rotate(0deg)"},"60%":{transform:"rotate(0deg)"},"100%":{transform:"rotate(180deg)"}},"@keyframes change-hourglass_1":{"0%":{opacity:0},"10%":{opacity:1},"20%":{opacity:1},"30%":{opacity:0},"100%":{opacity:0}},"@keyframes change-hourglass_2":{"0%":{opacity:0},"20%":{opacity:0},"30%":{opacity:1},"40%":{opacity:1},"50%":{opacity:0},"100%":{opacity:0}},"@keyframes change-hourglass_3":{"0%":{opacity:1,transform:"rotate(180deg)"},"10%":{opacity:0,transform:"rotate(180deg)"},"20%":{opacity:0,transform:"rotate(0deg)"},"40%":{opacity:0,transform:"rotate(0deg)"},"50%":{opacity:1,transform:"rotate(0deg)"},"60%":{opacity:1,transform:"rotate(0deg)"},"100%":{opacity:1,transform:"rotate(180deg)"}}}),y=_.forwardRef(t=>{const{variant:r="modern",size:e=120}=t;return a.jsx(a.Fragment,{children:r==="modern"?a.jsxs(M,{width:e,height:e*2,viewBox:"0 0 24 24",children:[a.jsx("path",{className:"path_01",d:"M 12 16 L 14 20 L 12 24 L 10 20 Z"}),a.jsx("path",{className:"path_02",d:"M 9.1716 14.8284 L 7.7574 19.0711 L 3.5147 20.4853 L 4.9289 16.2426 Z"}),a.jsx("path",{className:"path_03",d:"M 8 12 L 4 14 L 0 12 L 4 10 Z"}),a.jsx("path",{className:"path_04",d:"M 9.1716 9.1716 L 4.9289 7.7574 L 3.5147 3.5147 L 7.7574 4.9289 Z"}),a.jsx("path",{className:"path_05",d:"M 12 8 L 10 4 L 12 0 L 14 4 Z"}),a.jsx("path",{className:"path_06",d:"M 14.8284 9.1716 L 16.2426 4.9289 L 20.4853 3.5147 L 19.0711 7.7574 Z"}),a.jsx("path",{className:"path_07",d:"M 16 12 L 20 10 L 24 12 L 20 14 Z"}),a.jsx("path",{className:"path_08",d:"M 14.8284 14.8284 L 19.0711 16.2426 L 20.4853 20.4853 L 16.2426 19.0711 Z"})]}):a.jsxs(N,{width:e,height:e,viewBox:"0 0 52 52",children:[a.jsxs("radialGradient",{id:"background",x1:"0%",x2:"0%",y1:"0%",y2:"100%",children:[a.jsx("stop",{offset:"0%",stopColor:"#5166a9"}),a.jsx("stop",{offset:"100%",stopColor:"#222943"})]}),a.jsxs("radialGradient",{id:"fill",x1:"0%",x2:"0%",y1:"0%",y2:"100%",children:[a.jsx("stop",{offset:"0%",stopColor:"#6c9add"}),a.jsx("stop",{offset:"100%",stopColor:"#365fa0"})]}),a.jsx("path",{strokeLinejoin:"round",className:"contour",stroke:"#cad4db",fill:"url(#background)",d:"M 11 8 L 41 8 L 28 26 L 41 44 L 11 44 L 24 26 L 11 8 Z"}),a.jsx("path",{fill:"url(#fill)",className:"hourglass_1",d:"M 15 12 L 37 12 L 27 26 L 27 37 L 35 37 L 39 43 L 13 43 L 17 37 L 25 37 L 25 26 L 15 12 Z"}),a.jsx("path",{fill:"url(#fill)",className:"hourglass_2",d:"M 20 19 L 32 19 L 27 26 L 27 33 L 32 33 L 39 43 L 13 43 L 20 33 L 25 33 L 25 26 L 20 19 Z"}),a.jsx("path",{fill:"url(#fill)",className:"hourglass_3",d:"M 25 26 L 27 26 L 39 43 L 13 43 L 25 26 Z"})]})})}),Z=y;y.__docgenInfo={description:"",methods:[],displayName:"CircularProgress"};const o={},b={component:Z,title:"CircularProgress",args:{...o}},i={args:{variant:"old"}},l={args:{variant:"modern"}};var c,d,p;o.parameters={...o.parameters,docs:{...(c=o.parameters)==null?void 0:c.docs,source:{originalSource:"{}",...(p=(d=o.parameters)==null?void 0:d.docs)==null?void 0:p.source}}};var m,f,h;i.parameters={...i.parameters,docs:{...(m=i.parameters)==null?void 0:m.docs,source:{originalSource:`{
  args: {
    variant: "old"
  }
}`,...(h=(f=i.parameters)==null?void 0:f.docs)==null?void 0:h.source}}};var g,L,u;l.parameters={...l.parameters,docs:{...(g=l.parameters)==null?void 0:g.docs,source:{originalSource:`{
  args: {
    variant: "modern"
  }
}`,...(u=(L=l.parameters)==null?void 0:L.docs)==null?void 0:u.source}}};const P=["ActionsData","s","m"];export{o as ActionsData,P as __namedExportsOrder,b as default,l as m,i as s};
