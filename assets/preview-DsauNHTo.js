import{j as t}from"./jsx-runtime-DR9Q75dM.js";import{c as h,s as f}from"./color-B1X_6X5_.js";import{c as u,G as g}from"./emotion-react.browser.esm-D71b7ji9.js";import{a as b}from"./emotion-element-5486c51c.browser.esm-C62VgSX4.js";import{r as a}from"./index-DRjF_FHU.js";var d=(e=>(e.modern="modern",e.old="old",e))(d||{});const v=(e,o)=>u`
  body {
    margin: 0;
    font-family: ${o===d.modern?"The Sims Sans":"Comic Sans Ms"}, sans-serif;
    font-size: 14px;
    line-height: 20px;
    letter-spacing: 0.25px;
    font-weight: 400;
    color: ${o===d.modern?e.color.darkBlue:e.color.textMenu};
    overflow: hidden;
  }

  *,
  *:before,
  *:after {
    box-sizing: border-box;
  }

  p {
    margin: 0;
  }

  #storybook-docs {
    height: 100vh;
    overflow: auto;
  }
`,c={color:h,shadow:f},l=({children:e,themeVariant:o})=>t.jsxs(t.Fragment,{children:[t.jsx(b,{theme:c,children:e}),t.jsx(g,{styles:v(c,o)})]});l.__docgenInfo={description:"",methods:[],displayName:"SimsThemeProvider",props:{children:{required:!0,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""},themeVariant:{required:!1,tsType:{name:"ThemeName"},description:""}}};const y=a.createContext({}),m=({children:e})=>{const[o,i]=a.useState([]),p=a.useCallback(s=>{let r=o.indexOf(s);return r!==-1||(r=o.length,i(n=>[...n,s])),r},[o]),x=a.useCallback(s=>{const r=o.indexOf(s);return r===-1||i(n=>n.splice(r,1)),r},[o]);return t.jsx(y.Provider,{value:{add:p,remove:x},children:e})};m.__docgenInfo={description:"",methods:[],displayName:"ModalProvider",props:{children:{required:!0,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""}}};const M={actions:{argTypesRegex:"^on[A-Z].*"},controls:{matchers:{color:/(background|color)$/i,date:/Date$/}}},N=[e=>t.jsx(l,{children:t.jsx(m,{children:t.jsx(e,{})})})];export{N as decorators,M as parameters};
