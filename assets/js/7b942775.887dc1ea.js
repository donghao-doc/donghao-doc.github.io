"use strict";(self.webpackChunkdonghao_doc_github_io=self.webpackChunkdonghao_doc_github_io||[]).push([[9986],{2516:(n,e,t)=>{t.r(e),t.d(e,{assets:()=>a,contentTitle:()=>o,default:()=>u,frontMatter:()=>i,metadata:()=>c,toc:()=>l});var r=t(4848),s=t(8453);const i={sidebar_position:3,title:"React \u4e8b\u4ef6\u5904\u7406"},o=void 0,c={id:"framework/react18/\u4e8b\u4ef6\u5904\u7406",title:"React \u4e8b\u4ef6\u5904\u7406",description:"\u4e8b\u4ef6\u7ed1\u5b9a",source:"@site/docs/framework/react18/03-\u4e8b\u4ef6\u5904\u7406.md",sourceDirName:"framework/react18",slug:"/framework/react18/\u4e8b\u4ef6\u5904\u7406",permalink:"/docs/framework/react18/\u4e8b\u4ef6\u5904\u7406",draft:!1,unlisted:!1,editUrl:"https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/docs/framework/react18/03-\u4e8b\u4ef6\u5904\u7406.md",tags:[],version:"current",sidebarPosition:3,frontMatter:{sidebar_position:3,title:"React \u4e8b\u4ef6\u5904\u7406"},sidebar:"framework",previous:{title:"React \u7ec4\u4ef6",permalink:"/docs/framework/react18/\u7ec4\u4ef6"},next:{title:"React \u7ec4\u4ef6\u4f20\u503c",permalink:"/docs/framework/react18/\u7ec4\u4ef6\u4f20\u503c"}},a={},l=[{value:"\u4e8b\u4ef6\u7ed1\u5b9a",id:"\u4e8b\u4ef6\u7ed1\u5b9a",level:2},{value:"this \u6307\u5411",id:"this-\u6307\u5411",level:2},{value:"\u4e3a\u4ec0\u4e48 this \u4f1a\u4e22\u5931",id:"\u4e3a\u4ec0\u4e48-this-\u4f1a\u4e22\u5931",level:3},{value:"\u89e3\u51b3 this \u6307\u5411\u95ee\u9898",id:"\u89e3\u51b3-this-\u6307\u5411\u95ee\u9898",level:3},{value:"\u53c2\u6570\u7684\u4f20\u9012",id:"\u53c2\u6570\u7684\u4f20\u9012",level:2}];function d(n){const e={code:"code",h2:"h2",h3:"h3",p:"p",pre:"pre",...(0,s.R)(),...n.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(e.h2,{id:"\u4e8b\u4ef6\u7ed1\u5b9a",children:"\u4e8b\u4ef6\u7ed1\u5b9a"}),"\n",(0,r.jsx)(e.pre,{children:(0,r.jsx)(e.code,{className:"language-jsx",children:"class Welecome extends React.Component {\r\n  fn() {\r\n    alert(1)\r\n  }\r\n  render() {\r\n    return <button onClick={this.fn}>\u6309\u94ae</button>\r\n  }\r\n}\n"})}),"\n",(0,r.jsx)(e.h2,{id:"this-\u6307\u5411",children:"this \u6307\u5411"}),"\n",(0,r.jsx)(e.h3,{id:"\u4e3a\u4ec0\u4e48-this-\u4f1a\u4e22\u5931",children:"\u4e3a\u4ec0\u4e48 this \u4f1a\u4e22\u5931"}),"\n",(0,r.jsx)(e.p,{children:"React \u4e2d\u7684\u4e8b\u4ef6\uff0c\u662f\u5408\u6210\uff08\u81ea\u5b9a\u4e49\uff09\u4e8b\u4ef6\uff0c\u4e2d\u95f4\u7ecf\u5386\u8fc7\u4e00\u6b21\u8d4b\u503c\uff0c\u6240\u4ee5 this \u4f1a\u4e22\u5931\u3002"}),"\n",(0,r.jsx)(e.pre,{children:(0,r.jsx)(e.code,{className:"language-js",metastring:'title="\u793a\u4f8b"',children:'"use strict"\r\n\r\nlet obj = {\r\n  display: function() {\r\n    console.log(this)\r\n  }\r\n}\r\n\r\nfunction fn(cb) {\r\n  cb()\r\n}\r\n\r\nfn(obj.display)\n'})}),"\n",(0,r.jsx)(e.h3,{id:"\u89e3\u51b3-this-\u6307\u5411\u95ee\u9898",children:"\u89e3\u51b3 this \u6307\u5411\u95ee\u9898"}),"\n",(0,r.jsx)(e.pre,{children:(0,r.jsx)(e.code,{className:"language-jsx",metastring:'title="1. \u4f7f\u7528\u7bad\u5934\u51fd\u6570\uff08\u63a8\u8350\uff09"',children:"class Welecome extends React.Component {\r\n  state = {\r\n    num: 1\r\n  }\r\n\r\n  fn = () => {\r\n    this.setState({\r\n      num: this.state.num + 1\r\n    })\r\n  }\r\n\r\n  render() {\r\n    return <button onClick={this.fn}>\u6309\u94ae</button>\r\n  }\r\n}\n"})}),"\n",(0,r.jsx)(e.pre,{children:(0,r.jsx)(e.code,{className:"language-jsx",metastring:'title="2. \u4f7f\u7528 bind \u65b9\u6cd5"',children:"class Welecome extends React.Component {\r\n  constructor() {\r\n    super()\r\n    this.fn = this.fn.bind(this) // 2.1 \u5728\u6784\u9020\u5668\u4e2d bind this\r\n  }\r\n\r\n  state = {\r\n    num: 1\r\n  }\r\n\r\n  fn() {\r\n    this.setState({\r\n      num: this.state.num + 1\r\n    })\r\n  }\r\n\r\n  render() {\r\n    return <button onClick={this.fn}>\u6309\u94ae</button>\r\n  }\r\n}\r\n\r\n// 2.2 \u5728\u8c03\u7528\u65f6 bind this\r\n<button onClick={this.fn.bind(this)}>\u6309\u94ae</button>\n"})}),"\n",(0,r.jsx)(e.h2,{id:"\u53c2\u6570\u7684\u4f20\u9012",children:"\u53c2\u6570\u7684\u4f20\u9012"}),"\n",(0,r.jsx)(e.pre,{children:(0,r.jsx)(e.code,{className:"language-jsx",metastring:'title="1. \u4f20\u5165\u533f\u540d\u51fd\u6570\u7684\u5f62\u5f0f"',children:"class Welecome extends React.Component {\r\n  fn(a, b) {\r\n    console.log(a, b)\r\n  }\r\n\r\n  render() {\r\n    return <button onClick={() => this.fn(1, 2)}>\u6309\u94ae</button>\r\n  }\r\n}\n"})}),"\n",(0,r.jsx)(e.pre,{children:(0,r.jsx)(e.code,{className:"language-jsx",metastring:'title="2. bind \u7684\u65b9\u6cd5"',children:"class Welecome extends React.Component {\r\n  fn(a) {\r\n    console.log(a)\r\n  }\r\n\r\n  render() {\r\n    return <button onClick={this.fn.bind(this, 5)}>\u6309\u94ae</button>\r\n  }\r\n}\n"})})]})}function u(n={}){const{wrapper:e}={...(0,s.R)(),...n.components};return e?(0,r.jsx)(e,{...n,children:(0,r.jsx)(d,{...n})}):d(n)}},8453:(n,e,t)=>{t.d(e,{R:()=>o,x:()=>c});var r=t(6540);const s={},i=r.createContext(s);function o(n){const e=r.useContext(i);return r.useMemo((function(){return"function"==typeof n?n(e):{...e,...n}}),[e,n])}function c(n){let e;return e=n.disableParentContext?"function"==typeof n.components?n.components(s):n.components||s:o(n.components),r.createElement(i.Provider,{value:e},n.children)}}}]);