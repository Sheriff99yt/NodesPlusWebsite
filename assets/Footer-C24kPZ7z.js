import{u as l,j as e,a,L as x,N as d}from"./index-BoQlku25.js";const g=()=>{const{theme:n,toggleTheme:o}=l();return e.jsx("button",{className:"theme-toggle",onClick:o,"aria-label":`Switch to ${n==="light-theme"?"dark":"light"} mode`,title:`Switch to ${n==="light-theme"?"dark":"light"} mode`,children:n==="light-theme"?e.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",width:"20",height:"20",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",className:"theme-icon",children:e.jsx("path",{d:"M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"})}):e.jsxs("svg",{xmlns:"http://www.w3.org/2000/svg",width:"20",height:"20",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",className:"theme-icon",children:[e.jsx("circle",{cx:"12",cy:"12",r:"5"}),e.jsx("line",{x1:"12",y1:"1",x2:"12",y2:"3"}),e.jsx("line",{x1:"12",y1:"21",x2:"12",y2:"23"}),e.jsx("line",{x1:"4.22",y1:"4.22",x2:"5.64",y2:"5.64"}),e.jsx("line",{x1:"18.36",y1:"18.36",x2:"19.78",y2:"19.78"}),e.jsx("line",{x1:"1",y1:"12",x2:"3",y2:"12"}),e.jsx("line",{x1:"21",y1:"12",x2:"23",y2:"12"}),e.jsx("line",{x1:"4.22",y1:"19.78",x2:"5.64",y2:"18.36"}),e.jsx("line",{x1:"18.36",y1:"5.64",x2:"19.78",y2:"4.22"})]})})},v=()=>{const[n,o]=a.useState(!1),{theme:h}=l(),r=a.useRef(null),i=a.useRef(null);a.useEffect(()=>{function t(c){r.current&&!r.current.contains(c.target)&&i.current&&!i.current.contains(c.target)&&n&&s()}return document.addEventListener("mousedown",t),()=>{document.removeEventListener("mousedown",t),document.body.style.overflow="auto"}},[n]),a.useEffect(()=>{const t=()=>{window.innerWidth>768&&n&&s()};return window.addEventListener("resize",t),()=>window.removeEventListener("resize",t)},[n]),a.useEffect(()=>{console.log("Menu open state changed:",n)},[n]);const u=()=>{n?s():m()},m=()=>{o(!0),document.body.style.overflow="hidden"},s=()=>{o(!1),document.body.style.overflow="auto"};return e.jsx("header",{className:`navbar ${h}`,role:"banner",children:e.jsxs("div",{className:"navbar-content",children:[e.jsx(x,{to:"/",className:"navbar-logo","aria-label":"Nodes Plus Home",onClick:s,children:e.jsx("img",{className:"navbar-logo",src:"./images/branding/Logo.png",alt:"NodesPlus Logo",width:"180",height:"40"})}),e.jsx("div",{className:`menu-icon-container ${n?"active":""}`,children:e.jsx("button",{ref:i,className:"menu-toggle-btn",onClick:u,"aria-label":n?"Close menu":"Open menu","aria-expanded":n,children:e.jsxs("div",{className:"menu-icon",children:[e.jsx("span",{}),e.jsx("span",{}),e.jsx("span",{})]})})}),e.jsxs("nav",{ref:r,role:"navigation","aria-label":"Main Navigation",className:n?"open":"",children:[e.jsx(d,{to:"/",className:({isActive:t})=>t?"navbar-link active":"navbar-link",end:!0,onClick:s,children:"Home"}),e.jsx(d,{to:"/documentation",className:({isActive:t})=>t?"navbar-link active":"navbar-link",onClick:s,children:"Documentation"}),e.jsx("a",{href:"https://www.fab.com/sellers/Sherif%20Hany",target:"_blank",rel:"noopener noreferrer",className:"navbar-button navbar-button-blue","aria-label":"Get Nodes Plus on Fab.com (opens in a new tab)",onClick:s,children:"Get on Fab.com"}),e.jsx("a",{href:"https://discord.gg/2Pu9ywaptN",target:"_blank",rel:"noopener noreferrer",className:"navbar-button navbar-button-purple","aria-label":"Join Discord Community (opens in a new tab)",onClick:s,children:"Join Discord"}),e.jsx(g,{})]}),n&&e.jsx("div",{className:"navbar-overlay visible",onClick:s,"aria-hidden":"true"})]})})},j=({className:n})=>{const{theme:o}=l();return e.jsx("footer",{className:`footer ${o} ${n||""}`,children:e.jsx("div",{className:"content-wrapper",children:e.jsxs("div",{className:"footer-content",children:[e.jsxs("p",{className:"copyright",children:["© ",new Date().getFullYear()," NodesPlus. All rights reserved."]}),e.jsxs("div",{className:"footer-links",children:[e.jsx("a",{href:"https://discord.gg/2Pu9ywaptN",target:"_blank",rel:"noopener noreferrer",className:"footer-link",children:"Discord"}),e.jsx("a",{href:"https://github.com",target:"_blank",rel:"noopener noreferrer",className:"footer-link",children:"GitHub"})]})]})})})};export{j as F,v as N};
