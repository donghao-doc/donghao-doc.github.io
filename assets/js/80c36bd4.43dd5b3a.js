"use strict";(self.webpackChunkdonghao_doc_github_io=self.webpackChunkdonghao_doc_github_io||[]).push([[6901],{4236:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>o,contentTitle:()=>i,default:()=>p,frontMatter:()=>a,metadata:()=>r,toc:()=>d});const r=JSON.parse('{"id":"react/\u521b\u5efa\u9879\u76ee","title":"\u521b\u5efa\u9879\u76ee","description":"Vite","source":"@site/docs/react/\u521b\u5efa\u9879\u76ee.md","sourceDirName":"react","slug":"/react/\u521b\u5efa\u9879\u76ee","permalink":"/docs/react/\u521b\u5efa\u9879\u76ee","draft":false,"unlisted":false,"editUrl":"https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/docs/react/\u521b\u5efa\u9879\u76ee.md","tags":[],"version":"current","sidebarPosition":1,"frontMatter":{"sidebar_position":1,"title":"\u521b\u5efa\u9879\u76ee"},"sidebar":"reactSidebar","next":{"title":"JSX","permalink":"/docs/react/jsx"}}');var c=n(4848),s=n(8453);const a={sidebar_position:1,title:"\u521b\u5efa\u9879\u76ee"},i=void 0,o={},d=[{value:"Vite",id:"vite",level:2},{value:"create-react-app",id:"create-react-app",level:2},{value:"\u5165\u53e3\u6587\u4ef6",id:"\u5165\u53e3\u6587\u4ef6",level:2}];function l(e){const t={a:"a",code:"code",h2:"h2",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,s.R)(),...e.components};return(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(t.h2,{id:"vite",children:"Vite"}),"\n",(0,c.jsx)(t.pre,{children:(0,c.jsx)(t.code,{className:"language-bash",children:"pnpm create vite\n"})}),"\n",(0,c.jsxs)(t.p,{children:["\u53c2\u8003\uff1a",(0,c.jsx)(t.a,{href:"https://vitejs.cn/vite3-cn/guide/#scaffolding-your-first-vite-project",children:"\u642d\u5efa\u7b2c\u4e00\u4e2a Vite \u9879\u76ee"})]}),"\n",(0,c.jsx)(t.h2,{id:"create-react-app",children:"create-react-app"}),"\n",(0,c.jsxs)(t.p,{children:[(0,c.jsx)(t.code,{children:"create-react-app"})," \u662f React \u5b98\u65b9\u63d0\u4f9b\u7684\u4e00\u4e2a\u811a\u624b\u67b6\uff0c\u57fa\u4e8e Webpack \u521b\u5efa React \u9879\u76ee\u3002"]}),"\n",(0,c.jsx)(t.pre,{children:(0,c.jsx)(t.code,{className:"language-bash",metastring:'title="\u5b89\u88c5 create-react-app"',children:"npm install -g create-react-app\n"})}),"\n",(0,c.jsx)(t.pre,{children:(0,c.jsx)(t.code,{className:"language-bash",metastring:'title="\u521b\u5efa\u9879\u76ee"',children:"create-react-app \u9879\u76ee\u540d\u79f0\n"})}),"\n",(0,c.jsx)(t.h2,{id:"\u5165\u53e3\u6587\u4ef6",children:"\u5165\u53e3\u6587\u4ef6"}),"\n",(0,c.jsx)(t.pre,{children:(0,c.jsx)(t.code,{className:"language-jsx",metastring:'title="src/index.js"',children:"import React from 'react';\nimport ReactDOM from 'react-dom';\nimport './index.css';\nimport App from './App';\n// reportWebVitals.js \u7528\u4e8e\u8bb0\u5f55\u9875\u9762\u6027\u80fd\nimport reportWebVitals from './reportWebVitals';\n\nReactDOM.render(\n  // React.StrictMode \u53ef\u7528\u4e8e\u68c0\u67e5 App \u7ec4\u4ef6\u4e2d\u7684 React \u4ee3\u7801\u662f\u5426\u5408\u7406\n  <React.StrictMode>\n    <App />\n  </React.strictMode>,\n  document.getElementById('root')\n);\n\nreportwebVitals();\n"})}),"\n",(0,c.jsx)(t.p,{children:(0,c.jsx)(t.strong,{children:"React.StrictMode"})}),"\n",(0,c.jsxs)(t.p,{children:[(0,c.jsx)(t.code,{children:"React.StrictMode"})," \u662f React \u63d0\u4f9b\u7684\u4e00\u4e2a\u7ec4\u4ef6\uff0c\u5b83\u5f00\u542f\u4e86\u4e25\u683c\u6a21\u5f0f\u68c0\u67e5\u548c\u8b66\u544a\uff0c\u7528\u4e8e\u5e2e\u52a9\u6211\u4eec\u53d1\u73b0\u6f5c\u5728\u95ee\u9898\uff0c\u4ee5\u786e\u4fdd\u4ee3\u7801\u8d28\u91cf\u3002"]}),"\n",(0,c.jsxs)(t.p,{children:["\u4ee5\u4e0b\u662f ",(0,c.jsx)(t.code,{children:"React.StrictMode"})," \u7684\u4e00\u4e9b\u529f\u80fd\uff1a"]}),"\n",(0,c.jsxs)(t.ul,{children:["\n",(0,c.jsxs)(t.li,{children:["\u68c0\u6d4b\u4e0d\u5b89\u5168\u7684\u751f\u547d\u5468\u671f\uff1a\u5982 ",(0,c.jsx)(t.code,{children:"componentWillMount"}),"\u3001",(0,c.jsx)(t.code,{children:"componentWillReceiveProps"})," \u7b49\u3002"]}),"\n",(0,c.jsxs)(t.li,{children:["\u68c0\u6d4b\u8fc7\u65f6\u7684 API\uff1a\u5982\u5728\u7ec4\u4ef6\u4e2d\u4f7f\u7528\u5b57\u7b26\u4e32 refs \u800c\u4e0d\u662f\u4f7f\u7528\u56de\u8c03\u51fd\u6570\u6216 ",(0,c.jsx)(t.code,{children:"React.createRef()"}),"\u3002"]}),"\n",(0,c.jsx)(t.li,{children:"\u68c0\u6d4b\u610f\u5916\u7684\u526f\u4f5c\u7528\uff1a\u5982\u5728\u6e32\u67d3\u8fc7\u7a0b\u4e2d\u53d1\u8d77\u7f51\u7edc\u8bf7\u6c42\uff0c\u8fd9\u53ef\u80fd\u5bfc\u81f4\u4e0d\u4e00\u81f4\u7684 UI \u72b6\u6001\u3002"}),"\n"]})]})}function p(e={}){const{wrapper:t}={...(0,s.R)(),...e.components};return t?(0,c.jsx)(t,{...e,children:(0,c.jsx)(l,{...e})}):l(e)}},8453:(e,t,n)=>{n.d(t,{R:()=>a,x:()=>i});var r=n(6540);const c={},s=r.createContext(c);function a(e){const t=r.useContext(s);return r.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function i(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(c):e.components||c:a(e.components),r.createElement(s.Provider,{value:t},e.children)}}}]);