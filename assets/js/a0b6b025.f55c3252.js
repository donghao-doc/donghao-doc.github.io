"use strict";(self.webpackChunkdonghao_doc_github_io=self.webpackChunkdonghao_doc_github_io||[]).push([[7561],{9134:(n,s,e)=>{e.r(s),e.d(s,{assets:()=>i,contentTitle:()=>o,default:()=>h,frontMatter:()=>t,metadata:()=>l,toc:()=>r});var c=e(4848),a=e(8453);const t={},o="Class",l={id:"basic/javascript/class",title:"Class",description:"\u521b\u5efa\u7c7b\u548c\u7c7b\u7684\u5b9e\u4f8b\u5bf9\u8c61",source:"@site/docs/basic/javascript/class.md",sourceDirName:"basic/javascript",slug:"/basic/javascript/class",permalink:"/docs/basic/javascript/class",draft:!1,unlisted:!1,editUrl:"https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/docs/basic/javascript/class.md",tags:[],version:"current",frontMatter:{},sidebar:"basic",previous:{title:"JavaScript",permalink:"/docs/category/javascript"}},i={},r=[{value:"\u521b\u5efa\u7c7b\u548c\u7c7b\u7684\u5b9e\u4f8b\u5bf9\u8c61",id:"\u521b\u5efa\u7c7b\u548c\u7c7b\u7684\u5b9e\u4f8b\u5bf9\u8c61",level:2},{value:"\u6784\u9020\u5668\u65b9\u6cd5\uff08constructor\uff09",id:"\u6784\u9020\u5668\u65b9\u6cd5constructor",level:2},{value:"\u4e00\u822c\u65b9\u6cd5",id:"\u4e00\u822c\u65b9\u6cd5",level:2},{value:"\u7c7b\u4e2d\u7684\u65b9\u6cd5\u4e2d\u7684 this \u6307\u5411",id:"\u7c7b\u4e2d\u7684\u65b9\u6cd5\u4e2d\u7684-this-\u6307\u5411",level:2},{value:"\u7ee7\u627f",id:"\u7ee7\u627f",level:2},{value:"\u6784\u9020\u5668\u4e2d\u7684 super",id:"\u6784\u9020\u5668\u4e2d\u7684-super",level:2},{value:"\u91cd\u5199\uff08\u8986\u76d6\uff09\u7236\u7c7b\u7684\u65b9\u6cd5",id:"\u91cd\u5199\u8986\u76d6\u7236\u7c7b\u7684\u65b9\u6cd5",level:2},{value:"\u5728\u5b9e\u4f8b\u81ea\u8eab\u76f4\u63a5\u5b9a\u4e49\u5c5e\u6027\u548c\u65b9\u6cd5",id:"\u5728\u5b9e\u4f8b\u81ea\u8eab\u76f4\u63a5\u5b9a\u4e49\u5c5e\u6027\u548c\u65b9\u6cd5",level:2},{value:"\u5728\u7c7b\u81ea\u8eab\u5b9a\u4e49\u5c5e\u6027\u548c\u65b9\u6cd5\uff08static\uff09",id:"\u5728\u7c7b\u81ea\u8eab\u5b9a\u4e49\u5c5e\u6027\u548c\u65b9\u6cd5static",level:2},{value:"\u603b\u7ed3",id:"\u603b\u7ed3",level:2}];function d(n){const s={code:"code",h1:"h1",h2:"h2",header:"header",img:"img",li:"li",p:"p",pre:"pre",ul:"ul",...(0,a.R)(),...n.components};return(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(s.header,{children:(0,c.jsx)(s.h1,{id:"class",children:"Class"})}),"\n",(0,c.jsx)(s.h2,{id:"\u521b\u5efa\u7c7b\u548c\u7c7b\u7684\u5b9e\u4f8b\u5bf9\u8c61",children:"\u521b\u5efa\u7c7b\u548c\u7c7b\u7684\u5b9e\u4f8b\u5bf9\u8c61"}),"\n",(0,c.jsx)(s.pre,{children:(0,c.jsx)(s.code,{className:"language-js",children:"// \u5b9a\u4e49\u4e00\u4e2a Person \u7c7b\nclass Person {}\n\n// \u521b\u5efa Person \u7c7b\u7684\u5b9e\u4f8b\u5bf9\u8c61\nconst p1 = new Person()\nconsole.log(p1)\n"})}),"\n",(0,c.jsx)(s.p,{children:(0,c.jsx)(s.img,{alt:"class",src:e(2988).A+"",width:"495",height:"48"})}),"\n",(0,c.jsx)(s.h2,{id:"\u6784\u9020\u5668\u65b9\u6cd5constructor",children:"\u6784\u9020\u5668\u65b9\u6cd5\uff08constructor\uff09"}),"\n",(0,c.jsx)(s.p,{children:"\u7c7b\u672c\u8eab\u53ea\u662f\u4e00\u4e2a\u7279\u6b8a\u7684\u51fd\u6570\uff0c\u800c\u6784\u9020\u5668\u51fd\u6570\u5219\u662f\u7528\u6765\u521b\u5efa\u7c7b\u7684\u5b9e\u4f8b\u5bf9\u8c61\u7684\u3002"}),"\n",(0,c.jsx)(s.pre,{children:(0,c.jsx)(s.code,{className:"language-js",children:"class Person {\n  // \u6784\u9020\u5668\u65b9\u6cd5\u5728\u7c7b\u7684\u539f\u578b\u5bf9\u8c61\u4e0a\n  // \u6784\u9020\u5668\u65b9\u6cd5\u4e2d\u7684\u5c5e\u6027\u5728\u7c7b\u7684\u5b9e\u4f8b\u5bf9\u8c61\u8eab\u4e0a\n  constructor(name, age) {\n    // \u6784\u9020\u5668\u4e2d\u7684 this \u6307\u5411\u7684\u662f\u7c7b\u7684\u5b9e\u4f8b\u5bf9\u8c61\n    this.name = name\n    this.age = age\n  }\n}\n\nconst p1 = new Person('\u5f20\u4e09', 18)\nconst p2 = new Person('\u674e\u56db', 19)\nconsole.log(p1)\nconsole.log(p2)\n"})}),"\n",(0,c.jsx)(s.p,{children:(0,c.jsx)(s.img,{alt:"class_constructor",src:e(4537).A+"",width:"498",height:"317"})}),"\n",(0,c.jsx)(s.h2,{id:"\u4e00\u822c\u65b9\u6cd5",children:"\u4e00\u822c\u65b9\u6cd5"}),"\n",(0,c.jsx)(s.pre,{children:(0,c.jsx)(s.code,{className:"language-js",children:"class Person {\n  constructor(name, age) {\n    this.name = name\n    this.age = age\n  }\n  // \u4e00\u822c\u65b9\u6cd5\u5728\u7c7b\u7684\u539f\u578b\u5bf9\u8c61\u4e0a\uff0c\u4f9b\u5b9e\u4f8b\u5bf9\u8c61\u4f7f\u7528\n  sayHi() {\n    // \u901a\u8fc7 Person \u7684\u5b9e\u4f8b\u5bf9\u8c61\u8c03\u7528\u65b9\u6cd5\u65f6\uff0c\u65b9\u6cd5\u4e2d\u7684 this \u5c31\u662f\u7c7b\u7684\u5b9e\u4f8b\u5bf9\u8c61\n    console.log(`\u6211\u53eb${this.name}\uff0c\u4eca\u5e74${this.age}\u5c81`)\n  }\n}\n\nconst p1 = new Person('\u5f20\u4e09', 18)\nconsole.log(p1)\np1.sayHi()\n\nconst p2 = new Person('\u674e\u56db', 19)\nconsole.log(p2)\np2.sayHi()\n\nconst p3 = new Person('\u738b\u4e94', 20)\nconsole.log(p3)\n\n// \u901a\u8fc7 call \u65b9\u6cd5\u6539\u53d8\u4e86 this \u6307\u5411\uff0csayHi \u65b9\u6cd5\u4e2d\u7684 this \u4e0d\u518d\u6307\u5411\u5b9e\u4f8b\u5bf9\u8c61\np3.sayHi.call({ a: '1', b: '2' })\n"})}),"\n",(0,c.jsx)(s.p,{children:(0,c.jsx)(s.img,{alt:"class_function",src:e(5141).A+"",width:"497",height:"601"})}),"\n",(0,c.jsx)(s.h2,{id:"\u7c7b\u4e2d\u7684\u65b9\u6cd5\u4e2d\u7684-this-\u6307\u5411",children:"\u7c7b\u4e2d\u7684\u65b9\u6cd5\u4e2d\u7684 this \u6307\u5411"}),"\n",(0,c.jsxs)(s.p,{children:["\u51fd\u6570\u5b58\u5728\u4e8e\u5806\u5185\u5b58\u4e2d\uff0c\u51fd\u6570\u4e2d\u7684 ",(0,c.jsx)(s.code,{children:"this"})," \u5177\u4f53\u6307\u5411\u4ec0\u4e48\uff0c\u5c31\u8981\u770b\u51fd\u6570\u662f\u600e\u4e48\u8c03\u7528\u7684\u3002"]}),"\n",(0,c.jsx)(s.pre,{children:(0,c.jsx)(s.code,{className:"language-js",children:"class Person {\n  constructor(name, age) {\n    this.name = name\n    this.age = age\n  }\n  sayHi() {\n    console.log('this:', this)\n  }\n}\n\nconst p1 = new Person('\u5f20\u4e09', 18)\np1.sayHi()  // \u901a\u8fc7\u5b9e\u4f8b\u8c03\u7528\n\n// p1.sayHi \u662f\u4e00\u4e2a\u51fd\u6570\uff0c\u5b58\u5728\u4e8e\u5806\u5185\u5b58\u4e2d\uff0c\u53ef\u4ee5\u628a\u8fd9\u4e2a\u51fd\u6570\u8d4b\u503c\u7ed9\u5176\u4ed6\u53d8\u91cf\nconst x = p1.sayHi\nx()         // \u76f4\u63a5\u8c03\u7528\n// \u76f8\u5f53\u4e8e window.x.call(window)\uff0cthis \u6307\u5411 window\n// \u4f46\u7531\u4e8e\u7c7b\u4e2d\u5b9a\u4e49\u7684\u65b9\u6cd5\u9ed8\u8ba4\u5f00\u542f\u4e86\u4e25\u683c\u6a21\u5f0f\uff0c\u6240\u4ee5 this \u5c31\u6210\u4e86 undefined\n"})}),"\n",(0,c.jsx)(s.p,{children:(0,c.jsx)(s.img,{alt:"class_this",src:e(7697).A+"",width:"537",height:"94"})}),"\n",(0,c.jsx)(s.h2,{id:"\u7ee7\u627f",children:"\u7ee7\u627f"}),"\n",(0,c.jsx)(s.pre,{children:(0,c.jsx)(s.code,{className:"language-js",children:"class Person {\n  constructor(name, age) {\n    this.name = name\n    this.age = age\n  }\n  sayHi() {\n    console.log(`\u6211\u53eb${this.name}\uff0c\u4eca\u5e74${this.age}\u5c81`)\n  }\n}\n\n// \u521b\u5efa Student \u7c7b\uff0cStudent \u7c7b\u7ee7\u627f Person \u7c7b\nclass Student extends Person {\n  // Student \u7c7b\u4e2d\u53ef\u4ee5\u4e0d\u5199\u6784\u9020\u5668\uff0c\u56e0\u4e3a\u5b83\u7ee7\u627f\u4e86 Person \u7684\u6784\u9020\u5668\u53ca\u65b9\u6cd5\n  // Person \u7c7b\u7684\u6784\u9020\u5668\u4e2d\u7684\u5c5e\u6027\u4f1a\u51fa\u73b0\u5728 Student \u7c7b\u7684\u5b9e\u4f8b\u5bf9\u8c61\u8eab\u4e0a\n  // Person \u7c7b\u7684\u65b9\u6cd5\u8fd8\u662f\u5728 Person \u7c7b\u7684\u539f\u578b\u5bf9\u8c61\u4e0a\n  // \u6240\u4ee5\u4f7f\u7528 Student \u7c7b\u65f6\uff0c\u53ef\u4ee5\u6b63\u5e38\u4f7f\u7528 Person \u7c7b\u4e2d\u7684\u5c5e\u6027\u548c\u65b9\u6cd5\n}\n\nconst s1 = new Student('\u5f20\u4e09', 18)\nconsole.log(s1)\n"})}),"\n",(0,c.jsx)(s.p,{children:(0,c.jsx)(s.img,{alt:"class_extends",src:e(8354).A+"",width:"497",height:"255"})}),"\n",(0,c.jsx)(s.h2,{id:"\u6784\u9020\u5668\u4e2d\u7684-super",children:"\u6784\u9020\u5668\u4e2d\u7684 super"}),"\n",(0,c.jsx)(s.p,{children:"\u5982\u679c\u4e00\u4e2a\u7c7b\u4e0e\u5b83\u7684\u7236\u7c7b\u63a5\u6536\u7684\u5c5e\u6027\u4e0d\u4e00\u6837\uff0c\u90a3\u4e48\u8fd9\u4e2a\u7c7b\u4e2d\u5c31\u8981\u5199\u81ea\u5df1\u7684\u6784\u9020\u5668\u3002"}),"\n",(0,c.jsxs)(s.p,{children:["\u5b50\u7c7b\u4e2d\u5982\u679c\u5199\u4e86\u6784\u9020\u5668\uff0c\u5c31\u5fc5\u987b\u5728\u6784\u9020\u5668\u4e2d\u8c03\u7528 ",(0,c.jsx)(s.code,{children:"super"})," \u65b9\u6cd5\uff0c\u4ee5\u6b64\u6765\u7ee7\u627f\u7236\u7c7b\u4e2d\u7684\u5c5e\u6027\u3002"]}),"\n",(0,c.jsx)(s.pre,{children:(0,c.jsx)(s.code,{className:"language-js",children:"class Person {\n  constructor(name, age) {\n    this.name = name\n    this.age = age\n  }\n  sayHi() {\n    console.log(`\u6211\u53eb${this.name}\uff0c\u4eca\u5e74${this.age}\u5c81`)\n  }\n}\n\nclass Student extends Person {\n  constructor(name, age, grade) {\n    // super \u4f1a\u5e2e\u4f60\u8c03\u7528\u7236\u7c7b\u7684\u6784\u9020\u5668\u65b9\u6cd5\uff0c\u62ff\u5230\u7236\u7c7b\u6784\u9020\u5668\u65b9\u6cd5\u4e2d\u7684\u5c5e\u6027\uff0c\u653e\u5728 Student \u7c7b\u7684\u5b9e\u4f8b\u5bf9\u8c61\u8eab\u4e0a\n    // super \u5fc5\u987b\u5728\u6700\u5f00\u59cb\u8c03\u7528\n    super(name, age)\n    this.grade = grade\n  }\n}\n\nconst s1 = new Student('\u5f20\u4e09', 18, '\u9ad8\u4e09')\nconsole.log(s1)\n"})}),"\n",(0,c.jsx)(s.p,{children:(0,c.jsx)(s.img,{alt:"class_super",src:e(7044).A+"",width:"497",height:"278"})}),"\n",(0,c.jsx)(s.h2,{id:"\u91cd\u5199\u8986\u76d6\u7236\u7c7b\u7684\u65b9\u6cd5",children:"\u91cd\u5199\uff08\u8986\u76d6\uff09\u7236\u7c7b\u7684\u65b9\u6cd5"}),"\n",(0,c.jsx)(s.p,{children:"\u5b50\u7c7b\u7ee7\u627f\u4e86\u7236\u7c7b\uff0c\u5c31\u53ef\u4ee5\u8c03\u7528\u7236\u7c7b\u539f\u578b\u4e0a\u7684\u65b9\u6cd5\u3002"}),"\n",(0,c.jsx)(s.p,{children:"\u5b50\u7c7b\u4e5f\u53ef\u4ee5\u91cd\u5199\u4e00\u4e2a\u4e0e\u7236\u7c7b\u539f\u578b\u4e0a\u76f8\u540c\u7684\u65b9\u6cd5\uff0c\u4ee5\u6b64\u6765\u8986\u76d6\u8be5\u65b9\u6cd5\u3002"}),"\n",(0,c.jsx)(s.pre,{children:(0,c.jsx)(s.code,{className:"language-js",children:"class Person {\n  constructor(name, age) {\n    this.name = name\n    this.age = age\n  }\n  sayHi() {\n    console.log(`\u6211\u53eb${this.name}\uff0c\u4eca\u5e74${this.age}\u5c81`)\n  }\n}\n\nclass Student extends Person {\n  constructor(name, age, grade) {\n    super(name, age)\n    this.grade = grade\n  }\n  // \u91cd\u5199\uff08\u8986\u76d6\uff09\u4ece\u7236\u7c7b\u7ee7\u627f\u7684\u65b9\u6cd5\n  sayHi() {\n    console.log(`\u6211\u53eb${this.name}\uff0c\u4eca\u5e74${this.age}\u5c81\uff0c\u4e0a${this.grade}\u5566`)\n  }\n}\n\nconst s1 = new Student('\u5f20\u4e09', 18, '\u9ad8\u4e09')\nconsole.log(s1)\ns1.sayHi()\n"})}),"\n",(0,c.jsx)(s.p,{children:(0,c.jsx)(s.img,{alt:"class_function_overwrite",src:e(7863).A+"",width:"497",height:"297"})}),"\n",(0,c.jsx)(s.h2,{id:"\u5728\u5b9e\u4f8b\u81ea\u8eab\u76f4\u63a5\u5b9a\u4e49\u5c5e\u6027\u548c\u65b9\u6cd5",children:"\u5728\u5b9e\u4f8b\u81ea\u8eab\u76f4\u63a5\u5b9a\u4e49\u5c5e\u6027\u548c\u65b9\u6cd5"}),"\n",(0,c.jsx)(s.p,{children:"\u7c7b\u4e2d\u53ef\u4ee5\u5199\u8d4b\u503c\u8bed\u53e5\uff0c\u4ee5\u8fd9\u79cd\u65b9\u5f0f\u5b9a\u4e49\u7684\u5c5e\u6027\u548c\u65b9\u6cd5\uff0c\u4f1a\u51fa\u73b0\u5728\u5b9e\u4f8b\u5bf9\u8c61\u81ea\u8eab\u3002"}),"\n",(0,c.jsx)(s.pre,{children:(0,c.jsx)(s.code,{className:"language-js",children:"class Car {\n  // wheel \u4f1a\u51fa\u73b0\u5728\u5b9e\u4f8b\u5bf9\u8c61\u81ea\u8eab\uff0c\u7b49\u540c\u4e8e\u5728\u6784\u9020\u5668\u4e2d\u5199 this.wheel = 4\n  wheel = 4\n\n  // \u5982\u679c\u5c5e\u6027\u662f\u4f20\u8fdb\u6765\u7684\uff0c\u90a3\u4e48\u5c31\u8981\u7528 constructor \u63a5\u6536\n  constructor(name, price) {\n    this.name = name\n    this.price = price\n    // this.wheel = 4\n  }\n\n  // \u8fd9\u79cd\u5199\u6cd5\uff0c\u65b9\u6cd5\u4f1a\u51fa\u73b0\u5728\u7c7b\u7684\u539f\u578b\u4e0a\n  run1() {}\n  // \u8fd9\u79cd\u8d4b\u503c\u5199\u6cd5\uff0c\u65b9\u6cd5\u4f1a\u51fa\u73b0\u5728\u5b9e\u4f8b\u5bf9\u8c61\u81ea\u8eab\uff0c\u76f8\u5f53\u4e8e\u4e0a\u9762\u7684 wheel = 4\n  run2 = () => {}\n}\n\n// \u5982\u679c\u6709\u5b50\u7c7b\u7ee7\u627f Car \u7c7b\uff0c\u90a3\u4e48 Car \u7c7b\u4e2d\u7684 wheel \u5c5e\u6027\u3001run2 \u65b9\u6cd5\u4e5f\u4f1a\u88ab\u7ee7\u627f\n\nconst c1 = new Car('\u5954\u9a70', 199)\nconst c2 = new Car('\u5b9d\u9a6c', 299)\nconsole.log(c1)\nconsole.log(c2)\n"})}),"\n",(0,c.jsx)(s.p,{children:(0,c.jsx)(s.img,{alt:"class_instance",src:e(2016).A+"",width:"497",height:"466"})}),"\n",(0,c.jsx)(s.h2,{id:"\u5728\u7c7b\u81ea\u8eab\u5b9a\u4e49\u5c5e\u6027\u548c\u65b9\u6cd5static",children:"\u5728\u7c7b\u81ea\u8eab\u5b9a\u4e49\u5c5e\u6027\u548c\u65b9\u6cd5\uff08static\uff09"}),"\n",(0,c.jsxs)(s.p,{children:["\u4f7f\u7528 ",(0,c.jsx)(s.code,{children:"static"})," \u5173\u952e\u5b57\u5b9a\u4e49\u7684\u5c5e\u6027\u548c\u65b9\u6cd5\uff0c\u4f1a\u51fa\u73b0\u5728\u7c7b\u7684\u81ea\u8eab\uff0c\u800c\u4e0d\u662f\u5b9e\u4f8b\u5bf9\u8c61\u8eab\u4e0a\uff0c\u6240\u4ee5\u9700\u8981\u901a\u8fc7\u7c7b\u6765\u8c03\u7528\u8fd9\u4e9b\u5c5e\u6027\u548c\u65b9\u6cd5\uff0c\u8fd9\u4e9b\u5c5e\u6027\u548c\u65b9\u6cd5\u4e5f\u88ab\u79f0\u4e3a\u201c\u9759\u6001\u5c5e\u6027\u201d\u548c\u201c\u9759\u6001\u65b9\u6cd5\u201d\u3002"]}),"\n",(0,c.jsx)(s.pre,{children:(0,c.jsx)(s.code,{className:"language-js",children:"class Car {\n  // wheel \u4f1a\u51fa\u73b0\u5728\u5b9e\u4f8b\u5bf9\u8c61\u81ea\u8eab\n  wheel = 4\n  // demo \u4f1a\u51fa\u73b0\u5728\u7c7b\u7684\u81ea\u8eab\uff0c\u901a\u8fc7\u5b9e\u4f8b\u5bf9\u8c61\u65e0\u6cd5\u8bbf\u95ee\u8be5\u5c5e\u6027\n  static demo = 100\n  static fn = () => {\n    console.log('\u6211\u662f\u9759\u6001\u65b9\u6cd5')\n    // \u9759\u6001\u65b9\u6cd5\u4e2d\u7684 this \u6307\u5411\u7684\u4e0d\u662f\u5b9e\u4f8b\u5bf9\u8c61\uff0c\u56e0\u4e3a\u65e0\u6cd5\u901a\u8fc7\u5b9e\u4f8b\u5bf9\u8c61\u6765\u8c03\u7528\n    // \u9759\u6001\u65b9\u6cd5\u4e2d\u7684 this \u6307\u5411\u7684\u7c7b\u672c\u8eab\uff0c\u5373 Car \u7c7b\n  }\n  constructor(name, price) {\n    this.name = name\n    this.price = price\n  }\n}\n\n// \u5982\u679c\u6709\u5b50\u7c7b\u7ee7\u627f\u4e86 Car \u7c7b\uff0c\u90a3\u4e48 Car \u7c7b\u4e2d\u7684 demo \u5c5e\u6027\u4e5f\u4f1a\u88ab\u7ee7\u627f\n\nconst c1 = new Car('\u5954\u9a70', 199)\n\nconsole.log(c1)\nconsole.log(c1.demo)    // undefined\n// console.log(c1.fn())    // \u62a5\u9519\uff1ac1.fn is not a function\n\nconsole.log(Car.demo)   // 100\nconsole.log(Car.fn())   // \u6211\u662f\u9759\u6001\u65b9\u6cd5\n"})}),"\n",(0,c.jsx)(s.p,{children:(0,c.jsx)(s.img,{alt:"class_static",src:e(3143).A+"",width:"562",height:"566"})}),"\n",(0,c.jsx)(s.h2,{id:"\u603b\u7ed3",children:"\u603b\u7ed3"}),"\n",(0,c.jsxs)(s.ul,{children:["\n",(0,c.jsx)(s.li,{children:"\u7c7b\u4e2d\u7684\u6784\u9020\u5668\u4e0d\u662f\u5fc5\u987b\u7684\uff0c\u8981\u5bf9\u5b9e\u4f8b\u8fdb\u884c\u4e00\u4e9b\u521d\u59cb\u5316\u7684\u64cd\u4f5c\uff08\u5982\u6dfb\u52a0\u6307\u5b9a\u5c5e\u6027\uff09\u65f6\u624d\u5199\u3002"}),"\n",(0,c.jsxs)(s.li,{children:["\u5982\u679c A \u7c7b\u7ee7\u627f\u4e86 B \u7c7b\uff0c\u4e14 A \u7c7b\u4e2d\u5199\u4e86\u6784\u9020\u5668\uff0c\u90a3\u4e48 A \u7c7b\u6784\u9020\u5668\u4e2d\u7684 ",(0,c.jsx)(s.code,{children:"super"})," \u5fc5\u987b\u8c03\u7528\u3002"]}),"\n",(0,c.jsx)(s.li,{children:"\u7c7b\u4e2d\u5b9a\u4e49\u7684\u65b9\u6cd5\uff0c\u90fd\u662f\u653e\u5728\u4e86\u7c7b\u7684\u539f\u578b\u5bf9\u8c61\u4e0a\uff0c\u4f9b\u5b9e\u4f8b\u5bf9\u8c61\u4f7f\u7528\u3002"}),"\n"]})]})}function h(n={}){const{wrapper:s}={...(0,a.R)(),...n.components};return s?(0,c.jsx)(s,{...n,children:(0,c.jsx)(d,{...n})}):d(n)}},2988:(n,s,e)=>{e.d(s,{A:()=>c});const c="data:image/png;base64,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"},4537:(n,s,e)=>{e.d(s,{A:()=>c});const c=e.p+"assets/images/class_constructor-7396328322d3ab940cc7c02470a05d25.png"},8354:(n,s,e)=>{e.d(s,{A:()=>c});const c=e.p+"assets/images/class_extends-1696f435528445d3940cc938ea272b27.png"},5141:(n,s,e)=>{e.d(s,{A:()=>c});const c=e.p+"assets/images/class_function-53096f4450f5ee084401fb3e4e0b9959.png"},7863:(n,s,e)=>{e.d(s,{A:()=>c});const c=e.p+"assets/images/class_function_overwrite-1203db478906a0bcb7b17a15ad5614f7.png"},2016:(n,s,e)=>{e.d(s,{A:()=>c});const c=e.p+"assets/images/class_instance-3517d237a96e653c28231d98c355f6ad.png"},3143:(n,s,e)=>{e.d(s,{A:()=>c});const c=e.p+"assets/images/class_static-44c7a7eb484cc743fa9fc45af111ad97.png"},7044:(n,s,e)=>{e.d(s,{A:()=>c});const c=e.p+"assets/images/class_super-a497534701adc36b6ecb0429137a336d.png"},7697:(n,s,e)=>{e.d(s,{A:()=>c});const c="data:image/png;base64,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"},8453:(n,s,e)=>{e.d(s,{R:()=>o,x:()=>l});var c=e(6540);const a={},t=c.createContext(a);function o(n){const s=c.useContext(t);return c.useMemo((function(){return"function"==typeof n?n(s):{...s,...n}}),[s,n])}function l(n){let s;return s=n.disableParentContext?"function"==typeof n.components?n.components(a):n.components||a:o(n.components),c.createElement(t.Provider,{value:s},n.children)}}}]);