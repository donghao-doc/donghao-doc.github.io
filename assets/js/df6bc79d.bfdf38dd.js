"use strict";(self.webpackChunkdonghao_doc_github_io=self.webpackChunkdonghao_doc_github_io||[]).push([[6568],{6575:(n,e,r)=>{r.r(e),r.d(e,{assets:()=>l,contentTitle:()=>o,default:()=>h,frontMatter:()=>s,metadata:()=>c,toc:()=>a});var i=r(4848),t=r(8453);const s={sidebar_position:11},o="\u5f00\u653e\u80fd\u529b",c={id:"framework/miniprogram/\u5f00\u653e\u80fd\u529b",title:"\u5f00\u653e\u80fd\u529b",description:"\u83b7\u53d6\u7528\u6237\u5934\u50cf",source:"@site/docs/framework/miniprogram/11-\u5f00\u653e\u80fd\u529b.md",sourceDirName:"framework/miniprogram",slug:"/framework/miniprogram/\u5f00\u653e\u80fd\u529b",permalink:"/docs/framework/miniprogram/\u5f00\u653e\u80fd\u529b",draft:!1,unlisted:!1,editUrl:"https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/docs/framework/miniprogram/11-\u5f00\u653e\u80fd\u529b.md",tags:[],version:"current",sidebarPosition:11,frontMatter:{sidebar_position:11},sidebar:"framework",previous:{title:"\u5206\u5305\u52a0\u8f7d",permalink:"/docs/framework/miniprogram/\u5206\u5305\u52a0\u8f7d"},next:{title:"\u6570\u636e\u901a\u4fe1",permalink:"/docs/framework/miniprogram/\u6570\u636e\u901a\u4fe1"}},l={},a=[{value:"\u83b7\u53d6\u7528\u6237\u5934\u50cf",id:"\u83b7\u53d6\u7528\u6237\u5934\u50cf",level:2},{value:"\u83b7\u53d6\u7528\u6237\u6635\u79f0",id:"\u83b7\u53d6\u7528\u6237\u6635\u79f0",level:2},{value:"\u8f6c\u53d1\u529f\u80fd",id:"\u8f6c\u53d1\u529f\u80fd",level:2},{value:"\u5206\u4eab\u5230\u670b\u53cb\u5708",id:"\u5206\u4eab\u5230\u670b\u53cb\u5708",level:2},{value:"\u624b\u673a\u53f7\u9a8c\u8bc1\u7ec4\u4ef6",id:"\u624b\u673a\u53f7\u9a8c\u8bc1\u7ec4\u4ef6",level:2},{value:"\u5ba2\u670d\u80fd\u529b",id:"\u5ba2\u670d\u80fd\u529b",level:2}];function d(n){const e={admonition:"admonition",code:"code",h1:"h1",h2:"h2",header:"header",img:"img",li:"li",ol:"ol",p:"p",pre:"pre",ul:"ul",...(0,t.R)(),...n.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(e.header,{children:(0,i.jsx)(e.h1,{id:"\u5f00\u653e\u80fd\u529b",children:"\u5f00\u653e\u80fd\u529b"})}),"\n",(0,i.jsx)(e.h2,{id:"\u83b7\u53d6\u7528\u6237\u5934\u50cf",children:"\u83b7\u53d6\u7528\u6237\u5934\u50cf"}),"\n",(0,i.jsxs)(e.ol,{children:["\n",(0,i.jsxs)(e.li,{children:["\u5c06 ",(0,i.jsx)(e.code,{children:"button"})," \u7ec4\u4ef6\u7684 ",(0,i.jsx)(e.code,{children:"open-type"})," \u5c5e\u6027\u8bbe\u7f6e\u4e3a ",(0,i.jsx)(e.code,{children:"chooseAvatar"}),"\u3002"]}),"\n",(0,i.jsxs)(e.li,{children:["\u7528\u6237\u9009\u62e9\u5934\u50cf\u540e\uff0c\u53ef\u4ee5\u901a\u8fc7 ",(0,i.jsx)(e.code,{children:"bindchooseavatar"})," \u4e8b\u4ef6\u56de\u8c03\u83b7\u53d6\u5230\u5934\u50cf\u4fe1\u606f\u7684\u4e34\u65f6\u8def\u5f84\u3002"]}),"\n"]}),"\n",(0,i.jsx)(e.pre,{children:(0,i.jsx)(e.code,{className:"language-html",children:'<button open-type="chooseAvatar" bindchooseavatar="getAvatar">\u6309\u94ae</button>\n\n<script>\n  Page({\n    getAvatar(event) {\n      // \u83b7\u53d6\u7684\u5fae\u4fe1\u5934\u50cf\u662f\u4e34\u65f6\u8def\u5f84\uff0c\u4e34\u65f6\u8def\u5f84\u662f\u6709\u5931\u6548\u65f6\u95f4\u7684\n      // \u5b9e\u9645\u5f00\u53d1\u4e2d\uff0c\u9700\u8981\u5c06\u4e34\u65f6\u8def\u5f84\u4e0a\u4f20\u5230\u670d\u52a1\u5668\u4fdd\u5b58\n      const { avatarUrl } = event.detail\n      console.log(avatarUrl)\n    }\n  })\n<\/script>\n'})}),"\n",(0,i.jsx)(e.h2,{id:"\u83b7\u53d6\u7528\u6237\u6635\u79f0",children:"\u83b7\u53d6\u7528\u6237\u6635\u79f0"}),"\n",(0,i.jsxs)(e.ol,{children:["\n",(0,i.jsxs)(e.li,{children:["\u5728 ",(0,i.jsx)(e.code,{children:"form"})," \u7ec4\u4ef6\u4e2d\u4f7f\u7528 ",(0,i.jsx)(e.code,{children:"input"})," \u548c ",(0,i.jsx)(e.code,{children:"button"})," \u7ec4\u4ef6\u3002"]}),"\n",(0,i.jsxs)(e.li,{children:["\u4e3a ",(0,i.jsx)(e.code,{children:"input"})," \u7ec4\u4ef6\u8bbe\u7f6e ",(0,i.jsx)(e.code,{children:'type="nickname"'}),"\uff0c\u4e3a ",(0,i.jsx)(e.code,{children:"button"})," \u7ec4\u4ef6\u8bbe\u7f6e ",(0,i.jsx)(e.code,{children:'form-type="submit"'}),"\u3002"]}),"\n",(0,i.jsxs)(e.li,{children:["\u4e3a ",(0,i.jsx)(e.code,{children:"form"})," \u7ec4\u4ef6\u7ed1\u5b9a ",(0,i.jsx)(e.code,{children:"submit"})," \u4e8b\u4ef6\uff0c\u5728\u4e8b\u4ef6\u5904\u7406\u51fd\u6570\u4e2d\u901a\u8fc7\u4e8b\u4ef6\u5bf9\u8c61\u83b7\u53d6\u7528\u6237\u6635\u79f0\u3002"]}),"\n"]}),"\n",(0,i.jsx)(e.pre,{children:(0,i.jsx)(e.code,{className:"language-html",children:'<form bindsubmit="onSubmit">\n  \x3c!-- \u8bbe\u7f6e type="nickname" \u540e\uff0c\u5f53\u7528\u6237\u70b9\u51fb\u8f93\u5165\u6846\uff0c\u952e\u76d8\u4e0a\u65b9\u5c31\u4f1a\u663e\u793a\u5fae\u4fe1\u6635\u79f0 --\x3e\n  \x3c!-- \u5982\u679c\u6dfb\u52a0\u4e86 name \u5c5e\u6027\uff0cform \u7ec4\u4ef6\u5c31\u4f1a\u81ea\u52a8\u6536\u96c6\u5e26\u6709 name \u5c5e\u6027\u7684\u8868\u5355\u5143\u7d20\u7684\u503c --\x3e\n  <input type="nickname" name="nickname" placeholder="\u8bf7\u8f93\u5165\u6635\u79f0" />\n\n  \x3c!-- form-type="submit" \u5c06\u6309\u94ae\u53d8\u4e3a\u63d0\u4ea4\u6309\u94ae --\x3e\n  \x3c!-- \u5728\u70b9\u51fb\u63d0\u4ea4\u6309\u94ae\u65f6\uff0c\u4f1a\u89e6\u53d1\u8868\u5355\u7684 bindsubmit \u63d0\u4ea4\u4e8b\u4ef6 --\x3e\n  <button type="primary" plain form-type="submit">\u70b9\u51fb\u83b7\u53d6\u6635\u79f0</button>\n</form>\n\n<script>\n  Page({\n    onSubmit(event) {\n      const { nickname } = event.detail.value\n      console.log(nickname)\n    }\n  })\n<\/script>\n'})}),"\n",(0,i.jsx)(e.h2,{id:"\u8f6c\u53d1\u529f\u80fd",children:"\u8f6c\u53d1\u529f\u80fd"}),"\n",(0,i.jsxs)(e.p,{children:["\u5728 page.js \u4e2d\u58f0\u660e ",(0,i.jsx)(e.code,{children:"onShareAppMessage"})," \u4e8b\u4ef6\u76d1\u542c\u51fd\u6570\uff0c\u5e76\u81ea\u5b9a\u4e49\u8f6c\u53d1\u5185\u5bb9\u3002"]}),"\n",(0,i.jsx)(e.p,{children:"\u6b64\u65f6\u6709\u4e24\u79cd\u65b9\u5f0f\u53ef\u4ee5\u8fdb\u884c\u8f6c\u53d1\uff1a"}),"\n",(0,i.jsxs)(e.ul,{children:["\n",(0,i.jsx)(e.li,{children:"\u70b9\u51fb\u53f3\u4e0a\u89d2\u83dc\u5355\uff0c\u9009\u62e9\u5f39\u51fa\u6846\u4e2d\u7684\u201c\u8f6c\u53d1\u201d\u6309\u94ae\u3002"}),"\n",(0,i.jsxs)(e.li,{children:["\u7ed9 ",(0,i.jsx)(e.code,{children:"button"})," \u7ec4\u4ef6\u8bbe\u7f6e ",(0,i.jsx)(e.code,{children:'open-type="share"'}),"\uff0c\u7528\u6237\u70b9\u51fb\u6309\u94ae\u5c31\u4f1a\u89e6\u53d1 ",(0,i.jsx)(e.code,{children:"Page.onShareAppMessage"})," \u4e8b\u4ef6\u76d1\u542c\u51fd\u6570\u3002"]}),"\n"]}),"\n",(0,i.jsx)(e.pre,{children:(0,i.jsx)(e.code,{className:"language-html",children:"<button open-type=\"share\">\u8f6c\u53d1</button>\n\n<script>\n  Page({\n    // \u76d1\u542c\u9875\u9762\u6309\u94ae\u7684\u8f6c\u53d1 \u4ee5\u53ca \u53f3\u4e0a\u89d2\u7684\u8f6c\u53d1\u6309\u94ae\n    onShareAppMessage(obj) {\n      // \u5982\u679c\u662f\u70b9\u6309\u94ae\u8f6c\u53d1\uff0cobj.target \u6709\u503c\uff1b\u5982\u679c\u662f\u70b9\u53f3\u4e0a\u89d2\u83dc\u5355\u8f6c\u53d1\uff0cobj.target \u65e0\u503c\n      console.log(obj.target)\n      // \u81ea\u5b9a\u4e49\u8f6c\u53d1\u5185\u5bb9\n      return {\n        // \u8f6c\u53d1\u6807\u9898\n        title: '\u8fd9\u662f\u4e00\u4e2a\u975e\u5e38\u795e\u5947\u7684\u9875\u9762~~~',\n        // \u8f6c\u53d1\u7684\u9875\u9762\u8def\u5f84\uff0c\u8def\u5f84\u5fc5\u987b\u4ee5 / \u5f00\u5934\n        path: '/pages/cate/cate',\n        // \u81ea\u5b9a\u4e49\u56fe\u7247\u8def\u5f84\uff0c\u53ef\u4ee5\u662f\u672c\u5730\u6587\u4ef6\u8def\u5f84\u3001\u4ee3\u7801\u5305\u6587\u4ef6\u8def\u5f84\u6216\u8005\u7f51\u7edc\u56fe\u7247\u8def\u5f84\n        imageUrl: '../../assets/Jerry.png'\n      }\n    }\n  })\n<\/script>\n"})}),"\n",(0,i.jsx)(e.h2,{id:"\u5206\u4eab\u5230\u670b\u53cb\u5708",children:"\u5206\u4eab\u5230\u670b\u53cb\u5708"}),"\n",(0,i.jsx)(e.p,{children:"\u5c0f\u7a0b\u5e8f\u9875\u9762\u9ed8\u8ba4\u4e0d\u80fd\u88ab\u5206\u4eab\u5230\u670b\u53cb\u5708\uff0c\u9700\u8981\u8bbe\u7f6e\u201c\u5206\u4eab\u5230\u670b\u53cb\u5708\u201d\u624d\u53ef\u4ee5\u3002"}),"\n",(0,i.jsx)(e.p,{children:"\u201c\u5206\u4eab\u5230\u670b\u53cb\u5708\u201d\u8981\u6ee1\u8db3\u4e24\u4e2a\u6761\u4ef6\uff1a"}),"\n",(0,i.jsxs)(e.ol,{children:["\n",(0,i.jsxs)(e.li,{children:["\u9875\u9762\u5fc5\u987b\u8bbe\u7f6e\u5141\u8bb8\u201c\u53d1\u9001\u7ed9\u670b\u53cb\u201d\uff0c\u5373 page.js \u4e2d\u58f0\u660e ",(0,i.jsx)(e.code,{children:"onShareAppMessage"})," \u4e8b\u4ef6\u3002"]}),"\n",(0,i.jsxs)(e.li,{children:["\u9875\u9762\u5fc5\u987b\u8bbe\u7f6e\u5141\u8bb8\u201c\u5206\u4eab\u5230\u670b\u53cb\u5708\u201d\uff0c\u5373 page.js \u4e2d\u58f0\u660e ",(0,i.jsx)(e.code,{children:"onShareTimeline"})," \u4e8b\u4ef6\u3002"]}),"\n"]}),"\n",(0,i.jsx)(e.pre,{children:(0,i.jsx)(e.code,{className:"language-js",children:"Page({\n  // \u76d1\u542c\u53f3\u4e0a\u89d2 \u5206\u4eab\u5230\u670b\u53cb\u5708 \u6309\u94ae\n  onShareTimeline() {\n    return {\n      // \u81ea\u5b9a\u4e49\u6807\u9898\uff0c\u5373\u670b\u53cb\u5708\u5217\u8868\u9875\u4e0a\u663e\u793a\u7684\u6807\u9898\n      title: '\u5e2e\u6211\u780d\u4e00\u5200~~~',\n      // \u81ea\u5b9a\u4e49\u9875\u9762\u8def\u5f84\u4e2d\u643a\u5e26\u7684\u67e5\u8be2\u53c2\u6570\uff0c\u5982 path?a=1&b=2\n      query: 'id=1',\n      // \u81ea\u5b9a\u4e49\u56fe\u7247\u8def\u5f84\uff0c\u53ef\u4ee5\u662f\u672c\u5730\u56fe\u7247\u6216\u8005\u7f51\u7edc\u56fe\u7247\n      imageUrl: '../../assets/Jerry.png'\n    }\n  }\n})\n"})}),"\n",(0,i.jsx)(e.h2,{id:"\u624b\u673a\u53f7\u9a8c\u8bc1\u7ec4\u4ef6",children:"\u624b\u673a\u53f7\u9a8c\u8bc1\u7ec4\u4ef6"}),"\n",(0,i.jsx)(e.p,{children:"\u7528\u4e8e\u5411\u7528\u6237\u53d1\u8d77\u624b\u673a\u53f7\u7533\u8bf7\uff0c\u7528\u6237\u540c\u610f\u540e\uff0c\u624d\u80fd\u83b7\u5f97\u7531\u5e73\u53f0\u9a8c\u8bc1\u540e\u7684\u624b\u673a\u53f7\u3002"}),"\n",(0,i.jsx)(e.p,{children:"\u624b\u673a\u53f7\u9a8c\u8bc1\u7ec4\u4ef6\u53ef\u5206\u4e3a\u201c\u5feb\u901f\u9a8c\u8bc1\u201d\u548c\u201c\u5b9e\u65f6\u9a8c\u8bc1\u201d\u3002"}),"\n",(0,i.jsxs)(e.ul,{children:["\n",(0,i.jsx)(e.li,{children:"\u5feb\u901f\u9a8c\u8bc1\uff1a\u5e73\u53f0\u4f1a\u5bf9\u53f7\u7801\u8fdb\u884c\u9a8c\u8bc1\uff0c\u4f46\u4e0d\u4fdd\u8bc1\u662f\u5b9e\u65f6\u9a8c\u8bc1\u3002"}),"\n",(0,i.jsx)(e.li,{children:"\u5b9e\u65f6\u9a8c\u8bc1\uff1a\u5728\u6bcf\u6b21\u8bf7\u6c42\u65f6\uff0c\u5e73\u53f0\u5747\u4f1a\u5bf9\u7528\u6237\u9009\u62e9\u7684\u624b\u673a\u53f7\u8fdb\u884c\u5b9e\u65f6\u9a8c\u8bc1\u3002"}),"\n"]}),"\n",(0,i.jsx)(e.admonition,{type:"caution",children:(0,i.jsxs)(e.ul,{children:["\n",(0,i.jsx)(e.li,{children:"\u624b\u673a\u53f7\u9a8c\u8bc1\u7ec4\u4ef6\u76ee\u524d\u4ec5\u9488\u5bf9\u975e\u4e2a\u4eba\u5f00\u53d1\u8005\uff0c\u4e14\u5b8c\u6210\u4e86\u8ba4\u8bc1\u7684\u5c0f\u7a0b\u5e8f\u5f00\u653e\uff08\u4e0d\u5305\u542b\u6d77\u5916\u4e3b\u4f53\uff09\u3002"}),"\n",(0,i.jsx)(e.li,{children:"\u624b\u673a\u53f7\u9a8c\u8bc1\u7ec4\u4ef6\u9700\u8981\u4ed8\u8d39\u4f7f\u7528\uff0c\u6bcf\u4e2a\u5c0f\u7a0b\u5e8f\u8d26\u53f7\u6709 1000 \u6b21\u4f53\u9a8c\u989d\u5ea6\u3002"}),"\n"]})}),"\n",(0,i.jsx)(e.pre,{children:(0,i.jsx)(e.code,{className:"language-html",children:'<button\n  open-type="getPhoneNumber"\n  bindgetphonenumber="getphonenumber"\n>\u5feb\u901f\u9a8c\u8bc1\u7ec4\u4ef6</button>\n\n<button\n  open-type="getRealtimePhoneNumber"\n  bindgetrealtimephonenumber="getrealtimephonenumber"\n>\u5b9e\u65f6\u9a8c\u8bc1\u7ec4\u4ef6</button>\n\n<script>\n  Page({\n    getphonenumber(event) {\n      // \u5728 event.detail \u4e2d\u53ef\u4ee5\u83b7\u53d6\u5230 code\uff08\u52a8\u6001\u4ee4\u724c\uff09\uff0c\u53ef\u4ee5\u4f7f\u7528 code \u6362\u53d6\u624b\u673a\u53f7\n      // \u9700\u8981\u5c06 code \u53d1\u9001\u7ed9\u540e\u7aef\uff0c\u540e\u7aef\u5728\u63a5\u6536\u5230 code \u540e\uff0c\u9700\u8981\u8c03\u7528 API \u6362\u53d6\u771f\u6b63\u7684\u624b\u673a\u53f7\n      // \u5728\u6362\u53d6\u6210\u529f\u4ee5\u540e\uff0c\u5c06\u624b\u673a\u53f7\u8fd4\u56de\u7ed9\u524d\u7aef\n      console.log(event)\n    },\n    getrealtimephonenumber(event) {\n      console.log(event)\n    }\n  })\n<\/script>\n'})}),"\n",(0,i.jsx)(e.h2,{id:"\u5ba2\u670d\u80fd\u529b",children:"\u5ba2\u670d\u80fd\u529b"}),"\n",(0,i.jsx)(e.p,{children:"\u5c0f\u7a0b\u5e8f\u4e3a\u5f00\u53d1\u8005\u63d0\u4f9b\u4e86\u5ba2\u670d\u80fd\u529b\uff0c\u540c\u65f6\u4e3a\u5ba2\u670d\u4eba\u5458\u63d0\u4f9b\u79fb\u52a8\u7aef\u3001\u7f51\u9875\u7aef\u5ba2\u670d\u5de5\u4f5c\u53f0\u4fbf\u4e8e\u53ca\u65f6\u5904\u7406\u6d88\u606f\u3002"}),"\n",(0,i.jsx)(e.p,{children:(0,i.jsx)(e.img,{alt:"\u5ba2\u670d\u80fd\u529b",src:r(7700).A+"",width:"1023",height:"585"})}),"\n",(0,i.jsx)(e.p,{children:"\u4f7f\u7528\u65b9\u5f0f\uff1a"}),"\n",(0,i.jsxs)(e.ol,{children:["\n",(0,i.jsxs)(e.li,{children:["\n",(0,i.jsxs)(e.p,{children:["\u4e3a ",(0,i.jsx)(e.code,{children:"button"})," \u7ec4\u4ef6\u8bbe\u7f6e ",(0,i.jsx)(e.code,{children:'open-type="contact"'}),"\uff0c\u5f53\u7528\u6237\u70b9\u51fb\u540e\u5c31\u4f1a\u8fdb\u5165\u5ba2\u670d\u4f1a\u8bdd\u3002"]}),"\n",(0,i.jsx)(e.pre,{children:(0,i.jsx)(e.code,{className:"language-html",children:'<button type="warn" plain open-type="contact">\u8054\u7cfb\u5ba2\u670d</button>\n'})}),"\n"]}),"\n",(0,i.jsxs)(e.li,{children:["\n",(0,i.jsx)(e.p,{children:"\u5728\u5c0f\u7a0b\u5e8f\u7ba1\u7406\u540e\u53f0\uff0c\u7ed1\u5b9a\u540e\u7684\u5ba2\u670d\u8d26\u53f7\uff0c\u53ef\u4ee5\u767b\u5f55\u201c\u7f51\u9875\u7aef\u5ba2\u670d\u201d\u6216\u201c\u79fb\u52a8\u7aef\u5c0f\u7a0b\u5e8f\u201d\u5ba2\u670d\uff0c\u6765\u63a5\u6536\u6216\u53d1\u9001\u5ba2\u670d\u6d88\u606f\u3002"}),"\n",(0,i.jsx)(e.p,{children:(0,i.jsx)(e.img,{alt:"\u5ba2\u670d\u529f\u80fd",src:r(5972).A+"",width:"1579",height:"727"})}),"\n"]}),"\n"]})]})}function h(n={}){const{wrapper:e}={...(0,t.R)(),...n.components};return e?(0,i.jsx)(e,{...n,children:(0,i.jsx)(d,{...n})}):d(n)}},5972:(n,e,r)=>{r.d(e,{A:()=>i});const i=r.p+"assets/images/\u5ba2\u670d\u529f\u80fd-cb2429e3009bb11481e6b52a41bd210c.png"},7700:(n,e,r)=>{r.d(e,{A:()=>i});const i=r.p+"assets/images/\u5ba2\u670d\u80fd\u529b-16ea89950edf3c1657aea9e874070142.png"},8453:(n,e,r)=>{r.d(e,{R:()=>o,x:()=>c});var i=r(6540);const t={},s=i.createContext(t);function o(n){const e=i.useContext(s);return i.useMemo((function(){return"function"==typeof n?n(e):{...e,...n}}),[e,n])}function c(n){let e;return e=n.disableParentContext?"function"==typeof n.components?n.components(t):n.components||t:o(n.components),i.createElement(s.Provider,{value:e},n.children)}}}]);