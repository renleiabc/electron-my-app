(function(e){function t(t){for(var n,s,l=t[0],i=t[1],u=t[2],c=0,v=[];c<l.length;c++)s=l[c],Object.prototype.hasOwnProperty.call(o,s)&&o[s]&&v.push(o[s][0]),o[s]=0;for(n in i)Object.prototype.hasOwnProperty.call(i,n)&&(e[n]=i[n]);p&&p(t);while(v.length)v.shift()();return a.push.apply(a,u||[]),r()}function r(){for(var e,t=0;t<a.length;t++){for(var r=a[t],n=!0,s=1;s<r.length;s++){var i=r[s];0!==o[i]&&(n=!1)}n&&(a.splice(t--,1),e=l(l.s=r[0]))}return e}var n={},o={app:0},a=[];function s(e){return l.p+"js/"+({about:"about"}[e]||e)+"."+{about:"7a53a62b"}[e]+".js"}function l(t){if(n[t])return n[t].exports;var r=n[t]={i:t,l:!1,exports:{}};return e[t].call(r.exports,r,r.exports,l),r.l=!0,r.exports}l.e=function(e){var t=[],r=o[e];if(0!==r)if(r)t.push(r[2]);else{var n=new Promise((function(t,n){r=o[e]=[t,n]}));t.push(r[2]=n);var a,i=document.createElement("script");i.charset="utf-8",i.timeout=120,l.nc&&i.setAttribute("nonce",l.nc),i.src=s(e);var u=new Error;a=function(t){i.onerror=i.onload=null,clearTimeout(c);var r=o[e];if(0!==r){if(r){var n=t&&("load"===t.type?"missing":t.type),a=t&&t.target&&t.target.src;u.message="Loading chunk "+e+" failed.\n("+n+": "+a+")",u.name="ChunkLoadError",u.type=n,u.request=a,r[1](u)}o[e]=void 0}};var c=setTimeout((function(){a({type:"timeout",target:i})}),12e4);i.onerror=i.onload=a,document.head.appendChild(i)}return Promise.all(t)},l.m=e,l.c=n,l.d=function(e,t,r){l.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},l.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},l.t=function(e,t){if(1&t&&(e=l(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(l.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)l.d(r,n,function(t){return e[t]}.bind(null,n));return r},l.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return l.d(t,"a",t),t},l.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},l.p="app://./",l.oe=function(e){throw console.error(e),e};var i=window["webpackJsonp"]=window["webpackJsonp"]||[],u=i.push.bind(i);i.push=t,i=i.slice();for(var c=0;c<i.length;c++)t(i[c]);var p=u;a.push([0,"chunk-vendors"]),r()})({0:function(e,t,r){e.exports=r("56d7")},1499:function(e,t,r){},"56d7":function(e,t,r){"use strict";r.r(t);r("e117");var n=r("c0a4"),o=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{attrs:{id:"app"}},[r("div",{attrs:{id:"nav"}},[r("router-link",{attrs:{to:"/"}},[e._v("Home")]),e._v(" | "),r("router-link",{attrs:{to:"/about"}},[e._v("About")])],1),r("router-view"),r("el-dialog",{attrs:{title:"正在更新版本,请稍后 ···",visible:e.dialogVisible,width:"60%","close-on-click-modal":e.closeOnClickModal,"close-on-press-escape":e.closeOnPressEscape,"show-close":e.showClose,center:""},on:{"update:visible":function(t){e.dialogVisible=t}}},[r("div",{staticStyle:{width:"100%",height:"5vh","line-height":"5vh","text-align":"center"}},[r("el-progress",{attrs:{status:"success","text-inside":!0,"stroke-width":20,percentage:e.percentage,width:e.strokeWidth,"show-text":!0}})],1)])],1)},a=[],s=r("0d54"),l=r.n(s),i={name:"globalquickseek",data(){return{dialogVisible:!1,closeOnClickModal:!1,closeOnPressEscape:!1,showClose:!1,percentage:0,strokeWidth:200}},mounted(){let e=this;console.log("开始渲染"),l()()&&(console.log("electron环境"),e.ipcRenderer=window.ipcRenderer,console.log(e.ipcRenderer),e.ipcRenderer.on("message",(e,t)=>{console.log("message",t)}),e.ipcRenderer.on("downloadProgress",(e,t)=>{console.log("downloadProgress",t)}),e.ipcRenderer.on("isUpdateNow",(t,r)=>{e.$confirm("检测到新版本"+r.version+",是否立即升级？","提示",{confirmButtonText:"确定",cancelButtonText:"取消",center:!0}).then(()=>{e.ipcRenderer.send("updateNow")}).catch(()=>{e.$message({type:"info",message:"已取消更新！"})})}),e.autoUpdate())},destroyed(){l()()&&this.ipcRenderer.removeAllListeners()},methods:{autoUpdate(){this.ipcRenderer.send("checkForUpdate")}}},u=i,c=(r("5c0b"),r("9ca4")),p=Object(c["a"])(u,o,a,!1,null,null,null),v=p.exports,h=r("6f50"),d=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"home"},[n("img",{attrs:{alt:"Vue logo",src:r("cf05")}}),n("HelloWorld",{attrs:{msg:"Welcome to Your Vue.js App"}})],1)},f=[],g=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"hello"},[r("h1",[e._v(e._s(e.msg))]),e._m(0),r("h3",[e._v("Installed CLI Plugins")]),e._m(1),r("h3",[e._v("Essential Links")]),e._m(2),r("h3",[e._v("Ecosystem")]),e._m(3)])},m=[function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("p",[e._v(" For a guide and recipes on how to configure / customize this project,"),r("br"),e._v(" check out the "),r("a",{attrs:{href:"https://cli.vuejs.org",target:"_blank",rel:"noopener"}},[e._v("vue-cli documentation")]),e._v(". ")])},function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("ul",[r("li",[r("a",{attrs:{href:"https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-babel",target:"_blank",rel:"noopener"}},[e._v("babel")])]),r("li",[r("a",{attrs:{href:"https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-pwa",target:"_blank",rel:"noopener"}},[e._v("pwa")])]),r("li",[r("a",{attrs:{href:"https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-router",target:"_blank",rel:"noopener"}},[e._v("router")])]),r("li",[r("a",{attrs:{href:"https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-vuex",target:"_blank",rel:"noopener"}},[e._v("vuex")])]),r("li",[r("a",{attrs:{href:"https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-eslint",target:"_blank",rel:"noopener"}},[e._v("eslint")])]),r("li",[r("a",{attrs:{href:"https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-unit-jest",target:"_blank",rel:"noopener"}},[e._v("unit-jest")])]),r("li",[r("a",{attrs:{href:"https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-e2e-cypress",target:"_blank",rel:"noopener"}},[e._v("e2e-cypress")])])])},function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("ul",[r("li",[r("a",{attrs:{href:"https://vuejs.org",target:"_blank",rel:"noopener"}},[e._v("Core Docs")])]),r("li",[r("a",{attrs:{href:"https://forum.vuejs.org",target:"_blank",rel:"noopener"}},[e._v("Forum")])]),r("li",[r("a",{attrs:{href:"https://chat.vuejs.org",target:"_blank",rel:"noopener"}},[e._v("Community Chat")])]),r("li",[r("a",{attrs:{href:"https://twitter.com/vuejs",target:"_blank",rel:"noopener"}},[e._v("Twitter")])]),r("li",[r("a",{attrs:{href:"https://news.vuejs.org",target:"_blank",rel:"noopener"}},[e._v("News")])])])},function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("ul",[r("li",[r("a",{attrs:{href:"https://router.vuejs.org",target:"_blank",rel:"noopener"}},[e._v("vue-router")])]),r("li",[r("a",{attrs:{href:"https://vuex.vuejs.org",target:"_blank",rel:"noopener"}},[e._v("vuex")])]),r("li",[r("a",{attrs:{href:"https://github.com/vuejs/vue-devtools#vue-devtools",target:"_blank",rel:"noopener"}},[e._v("vue-devtools")])]),r("li",[r("a",{attrs:{href:"https://vue-loader.vuejs.org",target:"_blank",rel:"noopener"}},[e._v("vue-loader")])]),r("li",[r("a",{attrs:{href:"https://github.com/vuejs/awesome-vue",target:"_blank",rel:"noopener"}},[e._v("awesome-vue")])])])}],b={name:"HelloWorld",props:{msg:String}},_=b,k=(r("dacb"),Object(c["a"])(_,g,m,!1,null,"d9147f02",null)),w=k.exports,j={name:"Home",components:{HelloWorld:w}},y=j,x=Object(c["a"])(y,d,f,!1,null,null,null),O=x.exports;n["default"].use(h["a"]);const E=[{path:"/",name:"Home",component:O},{path:"/about",name:"About",component:()=>r.e("about").then(r.bind(null,"f820"))}],P=new h["a"]({mode:"hash",base:"app://./",routes:E});var C=P,$=r("9f3a");n["default"].use($["a"]);var R=new $["a"].Store({state:{},mutations:{},actions:{},modules:{}}),S=r("b705"),T=r.n(S);r("3880");n["default"].config.productionTip=!1,n["default"].use(T.a),new n["default"]({router:C,store:R,render:e=>e(v)}).$mount("#app")},"5c0b":function(e,t,r){"use strict";var n=r("1499"),o=r.n(n);o.a},"73a8":function(e,t,r){},cf05:function(e,t,r){e.exports=r.p+"img/logo.82b9c7a5.png"},dacb:function(e,t,r){"use strict";var n=r("73a8"),o=r.n(n);o.a}});
//# sourceMappingURL=app.7d95a5e9.js.map