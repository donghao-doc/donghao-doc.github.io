"use strict";(self.webpackChunkdonghao_doc_github_io=self.webpackChunkdonghao_doc_github_io||[]).push([[4838],{8154:(e,n,s)=>{s.r(n),s.d(n,{assets:()=>o,contentTitle:()=>d,default:()=>a,frontMatter:()=>c,metadata:()=>i,toc:()=>h});var t=s(4848),r=s(8453);const c={sidebar_position:2},d="React \u7ec4\u4ef6",i={id:"framework/react/react\u7ec4\u4ef6",title:"React \u7ec4\u4ef6",description:"\u5b89\u88c5\u63d2\u4ef6\uff1aReact Developer Tools\u3002",source:"@site/docs/framework/react/02-react\u7ec4\u4ef6.md",sourceDirName:"framework/react",slug:"/framework/react/react\u7ec4\u4ef6",permalink:"/docs/framework/react/react\u7ec4\u4ef6",draft:!1,unlisted:!1,editUrl:"https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/docs/framework/react/02-react\u7ec4\u4ef6.md",tags:[],version:"current",sidebarPosition:2,frontMatter:{sidebar_position:2},sidebar:"framework",previous:{title:"React \u5165\u95e8",permalink:"/docs/framework/react/react\u5165\u95e8"},next:{title:"\u5c0f\u7a0b\u5e8f",permalink:"/docs/category/\u5c0f\u7a0b\u5e8f"}},o={},h=[{value:"\u57fa\u672c\u7406\u89e3\u548c\u4f7f\u7528",id:"\u57fa\u672c\u7406\u89e3\u548c\u4f7f\u7528",level:2},{value:"\u51fd\u6570\u7ec4\u4ef6",id:"\u51fd\u6570\u7ec4\u4ef6",level:3},{value:"\u7c7b\u7ec4\u4ef6",id:"\u7c7b\u7ec4\u4ef6",level:3},{value:"\u7ec4\u4ef6\u4e09\u5927\u6838\u5fc3\u5c5e\u6027\uff1astate",id:"\u7ec4\u4ef6\u4e09\u5927\u6838\u5fc3\u5c5e\u6027state",level:2},{value:"\u57fa\u672c\u4f7f\u7528",id:"\u57fa\u672c\u4f7f\u7528",level:3},{value:"this \u6307\u5411\u95ee\u9898",id:"this-\u6307\u5411\u95ee\u9898",level:3},{value:"\u89e3\u51b3 this \u6307\u5411\u95ee\u9898",id:"\u89e3\u51b3-this-\u6307\u5411\u95ee\u9898",level:3},{value:"setState",id:"setstate",level:3},{value:"\u7b80\u5199\u5f62\u5f0f",id:"\u7b80\u5199\u5f62\u5f0f",level:3},{value:"\u6784\u9020\u5668\u4e0e render \u65b9\u6cd5\u4f1a\u88ab\u8c03\u7528\u51e0\u6b21",id:"\u6784\u9020\u5668\u4e0e-render-\u65b9\u6cd5\u4f1a\u88ab\u8c03\u7528\u51e0\u6b21",level:3},{value:"\u7ec4\u4ef6\u4e09\u5927\u6838\u5fc3\u5c5e\u6027\uff1aprops",id:"\u7ec4\u4ef6\u4e09\u5927\u6838\u5fc3\u5c5e\u6027props",level:2},{value:"\u7ec4\u4ef6\u4e09\u5927\u6838\u5fc3\u5c5e\u6027\uff1arefs \u4e0e \u4e8b\u4ef6",id:"\u7ec4\u4ef6\u4e09\u5927\u6838\u5fc3\u5c5e\u6027refs-\u4e0e-\u4e8b\u4ef6",level:2},{value:"\u6536\u96c6\u8868\u5355\u6570\u636e",id:"\u6536\u96c6\u8868\u5355\u6570\u636e",level:2},{value:"\u7ec4\u4ef6\u751f\u547d\u5468\u671f",id:"\u7ec4\u4ef6\u751f\u547d\u5468\u671f",level:2}];function l(e){const n={admonition:"admonition",code:"code",h1:"h1",h2:"h2",h3:"h3",header:"header",img:"img",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,r.R)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(n.header,{children:(0,t.jsx)(n.h1,{id:"react-\u7ec4\u4ef6",children:"React \u7ec4\u4ef6"})}),"\n",(0,t.jsx)(n.p,{children:"\u5b89\u88c5\u63d2\u4ef6\uff1aReact Developer Tools\u3002"}),"\n",(0,t.jsx)(n.h2,{id:"\u57fa\u672c\u7406\u89e3\u548c\u4f7f\u7528",children:"\u57fa\u672c\u7406\u89e3\u548c\u4f7f\u7528"}),"\n",(0,t.jsx)(n.h3,{id:"\u51fd\u6570\u7ec4\u4ef6",children:"\u51fd\u6570\u7ec4\u4ef6"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-jsx",children:"// \u521b\u5efa\u51fd\u6570\u5f0f\u7ec4\u4ef6\nfunction MyComponent() {\n  console.log(this)   // undefined\n  return <h1>\u7528\u51fd\u6570\u5b9a\u4e49\u7684\u7ec4\u4ef6</h1>\n}\n\n// \u6e32\u67d3\u7ec4\u4ef6\u5230\u9875\u9762\nReactDOM.render(<MyComponent />, document.getElementById('app'))\n"})}),"\n",(0,t.jsx)(n.admonition,{type:"caution",children:(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"\u51fd\u6570\uff08\u7ec4\u4ef6\uff09\u540d\u9996\u5b57\u6bcd\u8981\u5927\u5199\uff0c\u4e14\u51fd\u6570\u5fc5\u987b\u8981\u6709\u8fd4\u56de\u503c\u3002"}),"\n",(0,t.jsx)(n.li,{children:"\u6e32\u67d3\u7ec4\u4ef6\u65f6\u5fc5\u987b\u5199\u7ec4\u4ef6\u6807\u7b7e\u4e14\u5fc5\u987b\u95ed\u5408\uff0c\u4e0d\u80fd\u53ea\u5199\u7ec4\u4ef6\uff08\u51fd\u6570\uff09\u7684\u540d\u5b57\u3002"}),"\n"]})}),"\n",(0,t.jsx)(n.p,{children:(0,t.jsx)(n.strong,{children:"\u51fd\u6570\u7ec4\u4ef6\u4e2d\u7684 this"})}),"\n",(0,t.jsxs)(n.p,{children:["\u51fd\u6570\u5f0f\u7ec4\u4ef6\u4e2d\u7684 ",(0,t.jsx)(n.code,{children:"this"})," \u672c\u6765\u6307\u5411 ",(0,t.jsx)(n.code,{children:"window"}),"\uff0c\u4f46\u4ee3\u7801\u7ecf\u8fc7 Babel \u7f16\u8bd1\u540e\uff0c\u5f00\u542f\u4e86\u4e25\u683c\u6a21\u5f0f\uff0c\u6240\u4ee5 ",(0,t.jsx)(n.code,{children:"this"})," \u5c31\u4e0d\u518d\u6307\u5411 ",(0,t.jsx)(n.code,{children:"window"}),"\uff0c\u800c\u662f ",(0,t.jsx)(n.code,{children:"undefined"}),"\u3002"]}),"\n",(0,t.jsx)(n.p,{children:(0,t.jsx)(n.strong,{children:"React \u505a\u4e86\u4ec0\u4e48"})}),"\n",(0,t.jsxs)(n.p,{children:["\u6267\u884c ",(0,t.jsx)(n.code,{children:"ReactDOM.render(<MyComponent />, document.getElementById('app'))"})," \u65f6\uff1a"]}),"\n",(0,t.jsxs)(n.ol,{children:["\n",(0,t.jsx)(n.li,{children:"React \u89e3\u6790\u7ec4\u4ef6\u6807\u7b7e\uff0c\u627e\u5230 MyComponent \u7ec4\u4ef6\u3002"}),"\n",(0,t.jsx)(n.li,{children:"\u53d1\u73b0\u7ec4\u4ef6\u662f\u7528\u51fd\u6570\u5b9a\u4e49\u7684\uff0c\u5c31\u8c03\u7528\u8be5\u51fd\u6570\uff0c\u5c06\u8fd4\u56de\u7684\u865a\u62df DOM \u8f6c\u4e3a\u771f\u5b9e DOM\uff0c\u6e32\u67d3\u5230\u9875\u9762\u4e2d\u3002"}),"\n"]}),"\n",(0,t.jsx)(n.h3,{id:"\u7c7b\u7ec4\u4ef6",children:"\u7c7b\u7ec4\u4ef6"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-jsx",children:"// \u521b\u5efa\u7c7b\u5f0f\u7ec4\u4ef6\n// 1. \u5fc5\u987b\u7ee7\u627f React.Component\nclass MyComponent extends React.Component {\n  // 2. render \u662f\u5fc5\u987b\u5199\u7684\n  //    render \u51fd\u6570\u5728 MyComponent \u7684\u539f\u578b\u5bf9\u8c61\u4e0a\uff0c\u4f9b\u5b9e\u4f8b\u5bf9\u8c61\u4f7f\u7528\n  render() {\n    console.log(this)   // render \u4e2d\u7684 this \u6307\u5411 MyComponent \u5b9e\u4f8b\u5bf9\u8c61\uff08\u7ec4\u4ef6\u5b9e\u4f8b\u5bf9\u8c61\uff09\n    // 3. render \u51fd\u6570\u4e2d\u7684 return \u662f\u5fc5\u987b\u7684\n    return <h1>\u7528\u7c7b\u5b9a\u4e49\u7684\u7ec4\u4ef6</h1>\n  }\n}\n\nconsole.log(MyComponent.prototype)\n\n// \u6e32\u67d3\u7ec4\u4ef6\u5230\u9875\u9762\nReactDOM.render(<MyComponent />, document.getElementById('app'))\n"})}),"\n",(0,t.jsx)(n.p,{children:(0,t.jsx)(n.strong,{children:"console.log(this)"})}),"\n",(0,t.jsxs)(n.p,{children:["MyComponent \u7ec4\u4ef6\u6ca1\u6709\u5199 ",(0,t.jsx)(n.code,{children:"constructor"})," \u6784\u9020\u5668\uff0c\u7ec4\u4ef6\u5b9e\u4f8b\u5bf9\u8c61\u8eab\u4e0a\u7684 ",(0,t.jsx)(n.code,{children:"context"}),"\u3001",(0,t.jsx)(n.code,{children:"props"}),"\u3001",(0,t.jsx)(n.code,{children:"refs"}),"\u3001",(0,t.jsx)(n.code,{children:"state"})," \u7b49\u5c5e\u6027\uff0c\u90fd\u662f\u4ece ",(0,t.jsx)(n.code,{children:"React.Component"})," \u7ee7\u627f\u8fc7\u6765\u7684\u3002"]}),"\n",(0,t.jsx)(n.p,{children:(0,t.jsx)(n.img,{alt:"class_component_this",src:s(6415).A+"",width:"497",height:"388"})}),"\n",(0,t.jsx)(n.p,{children:(0,t.jsx)(n.strong,{children:"console.log(MyComponent.prototype)"})}),"\n",(0,t.jsxs)(n.p,{children:[(0,t.jsx)(n.code,{children:"render"})," \u51fd\u6570\u5728\u7ec4\u4ef6\u7684\u539f\u578b\u5bf9\u8c61\u4e0a\uff0c\u4f9b\u5b9e\u4f8b\u5bf9\u8c61\u4f7f\u7528\u3002"]}),"\n",(0,t.jsx)(n.p,{children:(0,t.jsx)(n.img,{alt:"class_component_render",src:s(3075).A+"",width:"498",height:"141"})}),"\n",(0,t.jsx)(n.p,{children:(0,t.jsx)(n.strong,{children:"React \u505a\u4e86\u4ec0\u4e48"})}),"\n",(0,t.jsxs)(n.p,{children:["\u6267\u884c ",(0,t.jsx)(n.code,{children:"ReactDOM.render(<MyComponent />, document.getElementById('app'))"})," \u65f6\uff1a"]}),"\n",(0,t.jsxs)(n.ol,{children:["\n",(0,t.jsx)(n.li,{children:"React \u89e3\u6790\u7ec4\u4ef6\u6807\u7b7e\uff0c\u627e\u5230 MyComponent \u7ec4\u4ef6\u3002"}),"\n",(0,t.jsxs)(n.li,{children:["\u53d1\u73b0\u7ec4\u4ef6\u662f\u4f7f\u7528\u7c7b\u5b9a\u4e49\u7684\uff0c\u5c31 new \u51fa\u6765\u8be5\u7c7b\u7684\u5b9e\u4f8b\uff08\u5b9e\u4f8b\u662f\u901a\u8fc7\u6267\u884c\u7c7b\u5185\u90e8\u7684 ",(0,t.jsx)(n.code,{children:"constructor"})," \u5f97\u5230\u7684\uff09\uff0c\u5e76\u901a\u8fc7\u5b9e\u4f8b\u5bf9\u8c61\u8c03\u7528\u539f\u578b\u4e0a\u7684 ",(0,t.jsx)(n.code,{children:"render"})," \u65b9\u6cd5\u3002"]}),"\n",(0,t.jsxs)(n.li,{children:["\u5c06 ",(0,t.jsx)(n.code,{children:"render"})," \u65b9\u6cd5\u8fd4\u56de\u7684\u865a\u62df DOM \u8f6c\u4e3a\u771f\u5b9e DOM\uff0c\u6e32\u67d3\u5728\u9875\u9762\u4e0a\u3002"]}),"\n"]}),"\n",(0,t.jsx)(n.h2,{id:"\u7ec4\u4ef6\u4e09\u5927\u6838\u5fc3\u5c5e\u6027state",children:"\u7ec4\u4ef6\u4e09\u5927\u6838\u5fc3\u5c5e\u6027\uff1astate"}),"\n",(0,t.jsx)(n.h3,{id:"\u57fa\u672c\u4f7f\u7528",children:"\u57fa\u672c\u4f7f\u7528"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-jsx",children:"class Weather extends React.Component {\n  constructor(props) {\n    super(props)\n    this.state = { isHot: true }\n  }\n\n  // demo \u65b9\u6cd5\u5728 Weather \u7c7b\u7684\u539f\u578b\u5bf9\u8c61\u4e0a\uff0c\u4f9b\u5b9e\u4f8b\u4f7f\u7528\n  // \u901a\u8fc7 Weather \u5b9e\u4f8b\u5bf9\u8c61\u8c03\u7528 demo \u65f6\uff0cdemo \u4e2d\u7684 this \u5c31\u662f Weather \u7684\u5b9e\u4f8b\u5bf9\u8c61\n  demo() {\n    console.log('111111')\n  }\n\n  render() {\n    const { isHot } = this.state\n    // \u7ed9\u5143\u7d20\u6dfb\u52a0 onClick \u5c5e\u6027\uff0c\u7ed1\u5b9a\u4e8b\u4ef6\n    // this.demo \u540e\u9762\u5982\u679c\u76f4\u63a5\u52a0\u4e0a ()\uff0c\u4f1a\u76f4\u63a5\u8c03\u7528 demo \u51fd\u6570\n    return <h1 onClick={this.demo}>\u4eca\u5929\u5929\u6c14\u5f88{isHot ? '\u708e\u70ed' : '\u51c9\u723d'}</h1>\n  }\n}\n"})}),"\n",(0,t.jsx)(n.h3,{id:"this-\u6307\u5411\u95ee\u9898",children:"this \u6307\u5411\u95ee\u9898"}),"\n",(0,t.jsxs)(n.p,{children:["\u7ec4\u4ef6\u4e2d\u7684 ",(0,t.jsx)(n.code,{children:"constructor"})," \u548c ",(0,t.jsx)(n.code,{children:"render"})," \u65b9\u6cd5\u4e2d\u7684 ",(0,t.jsx)(n.code,{children:"this"}),"\uff0c\u6307\u5411\u7684\u90fd\u662f\u7ec4\u4ef6\u5b9e\u4f8b\u5bf9\u8c61\u3002"]}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.code,{children:"constructor"})," \u4e2d\u7684 ",(0,t.jsx)(n.code,{children:"this"})," \u6307\u5411\u7684\u4e00\u5b9a\u662f\u5b9e\u4f8b\u5bf9\u8c61\u3002"]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.code,{children:"render"})," \u4e2d\u7684 ",(0,t.jsx)(n.code,{children:"this"})," \u6307\u5411\u7ec4\u4ef6\u5b9e\u4f8b\u5bf9\u8c61\u662f\u56e0\u4e3a React \u53d1\u73b0\u7ec4\u4ef6\u662f\u7528\u7c7b\u5b9a\u4e49\u7684\uff0c\u5c31\u5e2e\u6211\u4eec new \u4e86\u8be5\u7c7b\uff0c\u5f97\u5230\u4e86\u8be5\u7c7b\u7684\u5b9e\u4f8b\u5bf9\u8c61\u3002"]}),"\n"]}),"\n",(0,t.jsxs)(n.p,{children:["\u4f46\u7ec4\u4ef6\u4e2d\u7684\u81ea\u5b9a\u4e49\u65b9\u6cd5\u4e2d\u7684 ",(0,t.jsx)(n.code,{children:"this"}),"\uff0c\u6307\u5411\u7684\u4e0d\u662f\u7ec4\u4ef6\u7684\u5b9e\u4f8b\u5bf9\u8c61\uff0c\u800c\u662f ",(0,t.jsx)(n.code,{children:"undefined"}),"\u3002"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-jsx",children:"class Weather extends React.Component {\n  constructor(props) {\n    super(props)\n    this.state = { isHot: true }\n  }\n\n  // changeWeather \u65b9\u6cd5\u5728 Weather \u7c7b\u7684\u539f\u578b\u5bf9\u8c61\u4e0a\uff0c\u4f9b\u5b9e\u4f8b\u4f7f\u7528\n  // \u901a\u8fc7 Weather \u5b9e\u4f8b\u5bf9\u8c61\u8c03\u7528 changeWeather \u65f6\uff0cchangeWeather \u4e2d\u7684 this \u5c31\u662f Weather \u5b9e\u4f8b\u5bf9\u8c61\n  // \u4f46\u662f\u6b64\u5904\uff0cchangeWeather \u662f\u4f5c\u4e3a onClick \u7684\u56de\u8c03\u76f4\u63a5\u8c03\u7528\u7684\uff0c\u800c\u4e0d\u662f\u901a\u8fc7\u5b9e\u4f8b\u8c03\u7528\u7684\n  // \u76f8\u5f53\u4e8e changeWeather()\uff0c\u5373\uff1achangeWeather.call(undefined)\n  // \u6240\u4ee5\u5728\u6d4f\u89c8\u5668\u4e2d\uff0cthis \u6307\u5411 window\n  // \u53c8\u56e0\u4e3a\u7c7b\u4e2d\u7684\u65b9\u6cd5\u9ed8\u8ba4\u5f00\u542f\u4e86\u5c40\u90e8\u7684\u4e25\u683c\u6a21\u5f0f\uff0c\u6240\u4ee5 this \u5c31\u6210\u4e86 undefined\uff08\u4e0e Babel \u65e0\u5173\uff09\n  changeWeather() {\n    console.log(this)   // undefined\n  }\n\n  render() {\n    const { isHot } = this.state\n    return <h1 onClick={this.changeWeather}>\u4eca\u5929\u5929\u6c14\u5f88{isHot ? '\u708e\u70ed' : '\u51c9\u723d'}</h1>\n  }\n}\n"})}),"\n",(0,t.jsx)(n.h3,{id:"\u89e3\u51b3-this-\u6307\u5411\u95ee\u9898",children:"\u89e3\u51b3 this \u6307\u5411\u95ee\u9898"}),"\n",(0,t.jsxs)(n.p,{children:["\u901a\u8fc7\u5728 ",(0,t.jsx)(n.code,{children:"constructor"})," \u4e2d\u624b\u52a8\u5730\u7ed9\u81ea\u5b9a\u4e49\u65b9\u6cd5\u7ed1\u5b9a ",(0,t.jsx)(n.code,{children:"this"}),"\uff0c\u5c31\u53ef\u4ee5\u5c06\u81ea\u5b9a\u4e49\u65b9\u6cd5\u4e2d\u7684 ",(0,t.jsx)(n.code,{children:"this"})," \u5f3a\u5236\u6307\u5b9a\u4e3a\u7c7b\u7684\u5b9e\u4f8b\u5bf9\u8c61\u3002"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-jsx",children:"class Weather extends React.Component {\n  constructor(props) {\n    super(props)\n    this.state = { isHot: true }\n    // \u901a\u8fc7 bind \u65b9\u6cd5\u624b\u52a8\u7ed9 changeWeather \u65b9\u6cd5\u7ed1\u5b9a this\n    // bind \u4f1a\u8fd4\u56de\u65b0\u7684\u51fd\u6570\uff0c\u5e76\u4e14\u6307\u5b9a this\n    // \u6240\u4ee5 this.changeWeather \u5c31\u662f\u4e00\u4e2a\u65b0\u7684\u51fd\u6570\uff0c\u5e76\u4e14\u8be5\u51fd\u6570\u7684 this \u662f\u7ec4\u4ef6\u5b9e\u4f8b\u5bf9\u8c61\n    // \u4ee5\u6b64\u89e3\u51b3\u81ea\u5b9a\u4e49\u51fd\u6570\u4e2d\u7684 this \u6307\u5411\u95ee\u9898\n    this.changeWeather = this.changeWeather.bind(this)\n  }\n\n  changeWeather() {\n    console.log(this)   // Weather \u5b9e\u4f8b\u5bf9\u8c61\n  }\n\n  render() {\n    const { isHot } = this.state\n    return <h1 onClick={this.changeWeather}>\u4eca\u5929\u5929\u6c14\u5f88{isHot ? '\u708e\u70ed' : '\u51c9\u723d'}</h1>\n  }\n}\n"})}),"\n",(0,t.jsxs)(n.p,{children:["\u4ee5\u4e0a\u4ee3\u7801\uff0c\u4f1a\u751f\u6210\u4e24\u4e2a ",(0,t.jsx)(n.code,{children:"changeWeather"})," \u65b9\u6cd5\uff0c\u5176\u4e2d\u81ea\u5b9a\u4e49\u7684 ",(0,t.jsx)(n.code,{children:"changeWeather"})," \u65b9\u6cd5\u5728\u7c7b\u7684\u539f\u578b\u5bf9\u8c61\u4e0a\uff0c",(0,t.jsx)(n.code,{children:"constructor"})," \u4e2d\u901a\u8fc7 ",(0,t.jsx)(n.code,{children:"bind"})," \u65b0\u751f\u6210\u7684 ",(0,t.jsx)(n.code,{children:"changeWeather"})," \u65b9\u6cd5\u5728\u7c7b\u7684\u5b9e\u4f8b\u5bf9\u8c61\u4e0a\u3002"]}),"\n",(0,t.jsx)(n.p,{children:(0,t.jsx)(n.img,{alt:"changeWeather_bind",src:s(7194).A+"",width:"497",height:"399"})}),"\n",(0,t.jsxs)(n.admonition,{title:"\u603b\u7ed3",type:"tip",children:[(0,t.jsxs)(n.p,{children:["\u81ea\u5b9a\u4e49\u65b9\u6cd5\u5728\u7c7b\u7684\u539f\u578b\u5bf9\u8c61\u4e0a\uff0c\u53ea\u6709 new \u8fd9\u4e2a\u7c7b\uff0c\u901a\u8fc7\u7c7b\u7684\u5b9e\u4f8b\u5bf9\u8c61\u53bb\u8c03\u7528\u539f\u578b\u5bf9\u8c61\u4e0a\u7684\u81ea\u5b9a\u4e49\u65b9\u6cd5\uff0c\u81ea\u5b9a\u4e49\u65b9\u6cd5\u4e2d\u7684 ",(0,t.jsx)(n.code,{children:"this"})," \u624d\u662f\u7c7b\u7684\u5b9e\u4f8b\u5bf9\u8c61\u3002"]}),(0,t.jsxs)(n.p,{children:["\u4f46\u901a\u5e38\uff0c\u6211\u4eec\u8c03\u7528\u81ea\u5b9a\u4e49\u65b9\u6cd5\u4e0d\u662f\u901a\u8fc7\u5b9e\u4f8b\u5bf9\u8c61\u8c03\u7528\u7684\uff0c\u800c\u662f\u4f5c\u4e3a\u4e8b\u4ef6\u7684\u56de\u8c03\u51fd\u6570\u8c03\u7528\uff0c\u6240\u4ee5\u4f1a\u5bfc\u81f4\u81ea\u5b9a\u4e49\u65b9\u6cd5\u4e2d\u7684 ",(0,t.jsx)(n.code,{children:"this"})," \u6307\u5411 ",(0,t.jsx)(n.code,{children:"undefined"})," \u7684\u95ee\u9898\u3002"]}),(0,t.jsx)(n.p,{children:"\u89e3\u51b3\u65b9\u6cd5\uff1a"}),(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:["\u5728 ",(0,t.jsx)(n.code,{children:"constructor"})," \u4e2d\u901a\u8fc7\u51fd\u6570\u5bf9\u8c61\u7684 ",(0,t.jsx)(n.code,{children:"bind"})," \u65b9\u6cd5\u5f3a\u5236\u7ed1\u5b9a ",(0,t.jsx)(n.code,{children:"this"}),"\u3002"]}),"\n",(0,t.jsx)(n.li,{children:"\u4f7f\u7528\u201c\u8d4b\u503c\u8bed\u53e5 + \u7bad\u5934\u51fd\u6570\u201d\u7684\u5f62\u5f0f\u3002"}),"\n"]})]}),"\n",(0,t.jsx)(n.h3,{id:"setstate",children:"setState"}),"\n",(0,t.jsxs)(n.p,{children:["\u72b6\u6001\u4e0d\u53ef\u76f4\u63a5\u66f4\u6539\uff0c\u76f4\u63a5\u4fee\u6539 ",(0,t.jsx)(n.code,{children:"state"})," \u4e2d\u7684\u6570\u636e\uff0c\u6570\u636e\u53ea\u4f1a\u5728\u5185\u5b58\u4e2d\u53d1\u751f\u53d8\u5316\uff0c\u800c\u4e0d\u4f1a\u89e6\u53d1\u7ec4\u4ef6\u7684\u91cd\u65b0\u6e32\u67d3\u3002"]}),"\n",(0,t.jsxs)(n.p,{children:[(0,t.jsx)(n.code,{children:"React.Component"})," \u7c7b\u7684\u539f\u578b\u4e0a\u6709\u4e2a ",(0,t.jsx)(n.code,{children:"setState"})," \u65b9\u6cd5\uff0c\u7528\u4e8e\u4fee\u6539 ",(0,t.jsx)(n.code,{children:"state"})," \u4e2d\u7684\u6570\u636e\u3002"]}),"\n",(0,t.jsxs)(n.p,{children:[(0,t.jsx)(n.code,{children:"setState"})," \u65b9\u6cd5\u4fee\u6539\u6570\u636e\u540e\uff0c\u4f1a\u5f15\u8d77\u7ec4\u4ef6\u7684\u91cd\u65b0\u6e32\u67d3\u3002"]}),"\n",(0,t.jsxs)(n.p,{children:[(0,t.jsx)(n.code,{children:"setState"})," \u65b9\u6cd5\u8981\u6c42\u4f20\u5165\u4e00\u4e2a\u5bf9\u8c61\uff0cReact \u4f1a\u62ff\u7740\u8fd9\u4e2a\u5bf9\u8c61\u53bb\u4e0e ",(0,t.jsx)(n.code,{children:"state"})," \u5bf9\u8c61\u505a\u5408\u5e76\uff0c\u800c\u4e0d\u662f\u76f4\u63a5\u66ff\u6362 ",(0,t.jsx)(n.code,{children:"state"})," \u5bf9\u8c61\u3002"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-jsx",children:"class Weather extends React.Component {\n  constructor(props) {\n    super(props)\n    this.state = { isHot: true }\n    this.changeWeather = this.changeWeather.bind(this)\n  }\n\n  changeWeather() {\n    const { isHot } = this.state\n    // \u6b63\u786e\u505a\u6cd5\uff1a\u901a\u8fc7\u4ece React.Component \u7ee7\u627f\u6765\u7684 setState \u65b9\u6cd5\u4fee\u6539 state\n    this.setState({ isHot: !isHot })\n\n    // \u9519\u8bef\u505a\u6cd5\uff1a\u76f4\u63a5\u4fee\u6539 state \u4e2d\u7684\u6570\u636e\n    // this.state.isHot = !isHot\n  }\n\n  render() {\n    const { isHot } = this.state\n    return <h1 onClick={this.changeWeather}>\u4eca\u5929\u5929\u6c14\u5f88{isHot ? '\u708e\u70ed' : '\u51c9\u723d'}</h1>\n  }\n}\n"})}),"\n",(0,t.jsx)(n.h3,{id:"\u7b80\u5199\u5f62\u5f0f",children:"\u7b80\u5199\u5f62\u5f0f"}),"\n",(0,t.jsx)(n.p,{children:"\u7c7b\u4e2d\u53ef\u4ee5\u5199\u8d4b\u503c\u8bed\u53e5\uff0c\u53ef\u4ee5\u5c06\u5c5e\u6027\u6216\u65b9\u6cd5\u76f4\u63a5\u5b9a\u4e49\u5728\u5b9e\u4f8b\u5bf9\u8c61\u81ea\u8eab\u3002"}),"\n",(0,t.jsxs)(n.p,{children:["\u8fd9\u4e48\u505a\u7684\u597d\u5904\u662f\uff0c\u53ef\u4ee5\u7701\u53bb\u6784\u9020\u5668\u4e2d\u7684 ",(0,t.jsx)(n.code,{children:"this"})," \u7684\u7ed1\u5b9a\uff0c\u76f4\u63a5\u8c03\u7528\u5b9e\u4f8b\u5bf9\u8c61\u4e0a\u7684\u65b9\u6cd5\u3002"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-jsx",children:"class Weather extends React.Component {\n  // state \u4f1a\u51fa\u73b0\u5728\u5b9e\u4f8b\u5bf9\u8c61\u81ea\u8eab\n  state = { isHot: true }\n  \n  // changeWeather \u4e5f\u4f1a\u5728\u5b9e\u4f8b\u5bf9\u8c61\u81ea\u8eab\uff0c\u800c\u4e0d\u5728\u7c7b\u7684\u539f\u578b\u4e0a\n  // \u6ce8\u610f\uff0c\u8fd9\u91cc\u5fc5\u987b\u662f\u7bad\u5934\u51fd\u6570\uff0c\u4e0d\u80fd\u662f\u666e\u901a\u51fd\u6570\uff0c\u5426\u5219 this \u4f1a\u4e22\u5931\n  changeWeather = () => {\n    console.log(this)   // Weather \u5b9e\u4f8b\u5bf9\u8c61\n    const { isHot } = this.state\n    this.setState({ isHot: !isHot })\n  }\n  \n  render() {\n    const { isHot } = this.state\n    return (\n      <h1 onClick={this.changeWeather}>\n        \u4eca\u5929\u5929\u6c14\u5f88{isHot ? '\u708e\u70ed' : '\u51c9\u723d'}\n      </h1>\n    )\n  }\n}\n"})}),"\n",(0,t.jsx)(n.h3,{id:"\u6784\u9020\u5668\u4e0e-render-\u65b9\u6cd5\u4f1a\u88ab\u8c03\u7528\u51e0\u6b21",children:"\u6784\u9020\u5668\u4e0e render \u65b9\u6cd5\u4f1a\u88ab\u8c03\u7528\u51e0\u6b21"}),"\n",(0,t.jsxs)(n.p,{children:[(0,t.jsx)(n.code,{children:"constructor"})," \u8c03\u7528 1 \u6b21\uff0c",(0,t.jsx)(n.code,{children:"render"})," \u8c03\u7528 1 + n \u6b21\u3002"]}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:["React \u5728 new \u7ec4\u4ef6\u7c7b\u65f6\uff0c\u901a\u8fc7\u8c03\u7528 ",(0,t.jsx)(n.code,{children:"constructor"}),"\uff0c\u751f\u6210\u7ec4\u4ef6\u5b9e\u4f8b\u5bf9\u8c61\uff0c\u6240\u4ee5 ",(0,t.jsx)(n.code,{children:"constructor"})," \u4f1a\u5728\u521d\u59cb\u5316\u65f6\u8c03\u7528 1 \u6b21\u3002"]}),"\n",(0,t.jsxs)(n.li,{children:["React \u521d\u6b21\u6e32\u67d3\u9875\u9762\u65f6\uff0c\u901a\u8fc7\u7ec4\u4ef6\u5b9e\u4f8b\u5bf9\u8c61\u8c03\u7528 ",(0,t.jsx)(n.code,{children:"render"})," \u65b9\u6cd5\uff0c\u6240\u4ee5 ",(0,t.jsx)(n.code,{children:"render"})," \u4f1a\u5728\u521d\u59cb\u5316\u65f6\u8c03\u7528 1 \u6b21\uff1b\u5f53\u7ec4\u4ef6\u72b6\u6001\u66f4\u65b0\u65f6\u4f1a\u518d\u6b21\u8c03\u7528 ",(0,t.jsx)(n.code,{children:"render"}),"\uff0c\u91cd\u65b0\u6e32\u67d3\u9875\u9762\uff08\u53ea\u8981\u72b6\u6001\u53d1\u751f\u53d8\u5316\uff0c",(0,t.jsx)(n.code,{children:"render"})," \u5c31\u4f1a\u91cd\u65b0\u8c03\u7528\uff0c\u4ece\u800c\u66f4\u65b0\u9875\u9762\uff09\u3002"]}),"\n"]}),"\n",(0,t.jsx)(n.h2,{id:"\u7ec4\u4ef6\u4e09\u5927\u6838\u5fc3\u5c5e\u6027props",children:"\u7ec4\u4ef6\u4e09\u5927\u6838\u5fc3\u5c5e\u6027\uff1aprops"}),"\n",(0,t.jsx)(n.h2,{id:"\u7ec4\u4ef6\u4e09\u5927\u6838\u5fc3\u5c5e\u6027refs-\u4e0e-\u4e8b\u4ef6",children:"\u7ec4\u4ef6\u4e09\u5927\u6838\u5fc3\u5c5e\u6027\uff1arefs \u4e0e \u4e8b\u4ef6"}),"\n",(0,t.jsx)(n.h2,{id:"\u6536\u96c6\u8868\u5355\u6570\u636e",children:"\u6536\u96c6\u8868\u5355\u6570\u636e"}),"\n",(0,t.jsx)(n.h2,{id:"\u7ec4\u4ef6\u751f\u547d\u5468\u671f",children:"\u7ec4\u4ef6\u751f\u547d\u5468\u671f"})]})}function a(e={}){const{wrapper:n}={...(0,r.R)(),...e.components};return n?(0,t.jsx)(n,{...e,children:(0,t.jsx)(l,{...e})}):l(e)}},7194:(e,n,s)=>{s.d(n,{A:()=>t});const t=s.p+"assets/images/changeWeather_bind-4dccab135ac712ebd432ae983a7f138f.png"},3075:(e,n,s)=>{s.d(n,{A:()=>t});const t="data:image/png;base64,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"},6415:(e,n,s)=>{s.d(n,{A:()=>t});const t=s.p+"assets/images/class_component_this-3f77c0ec8847bd7dd086a7039e25df54.png"},8453:(e,n,s)=>{s.d(n,{R:()=>d,x:()=>i});var t=s(6540);const r={},c=t.createContext(r);function d(e){const n=t.useContext(c);return t.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function i(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:d(e.components),t.createElement(c.Provider,{value:n},e.children)}}}]);