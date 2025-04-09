import{j as e}from"./jsx-runtime-DR9Q75dM.js";import{c as i,s as n}from"./color-B1X_6X5_.js";import{c,G as d}from"./emotion-react.browser.esm-D71b7ji9.js";import{a as m}from"./emotion-element-5486c51c.browser.esm-C62VgSX4.js";import"./index-DRjF_FHU.js";var s=(o=>(o.modern="modern",o.old="old",o))(s||{});const l=(o,r)=>c`
  body {
    margin: 0;
    font-family: ${r===s.modern?"The Sims Sans":"Comic Sans Ms"}, sans-serif;
    font-size: 14px;
    line-height: 20px;
    letter-spacing: 0.25px;
    font-weight: 400;
    color: ${r===s.modern?o.color.darkBlue:o.color.textMenu};
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
`,t={color:i,shadow:n},a=({children:o,themeVariant:r})=>e.jsxs(e.Fragment,{children:[e.jsx(m,{theme:t,children:o}),e.jsx(d,{styles:l(t,r)})]});a.__docgenInfo={description:"",methods:[],displayName:"SimsThemeProvider",props:{children:{required:!0,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""},themeVariant:{required:!1,tsType:{name:"ThemeName"},description:""}}};const u={actions:{argTypesRegex:"^on[A-Z].*"},controls:{matchers:{color:/(background|color)$/i,date:/Date$/}}},b=[o=>e.jsx(a,{children:e.jsx(o,{})})];export{b as decorators,u as parameters};
