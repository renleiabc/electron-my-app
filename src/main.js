/*
 * @Author: abc
 * @Date: 2020-10-23 18:46:29
 * @LastEditors: abc
 * @LastEditTime: 2020-10-25 23:05:41
 * @Description:
 */
/* electron协议拦截是资源层面，跟你网页serviceworker工作不是一个内容。sw无法在非https和localhost下工作。看一下你代码，把这个功能移除。使用协议拦截，就没必要在用sw */
import Vue from "vue";
import App from "./App.vue";
// import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
Vue.config.productionTip = false;
Vue.use(ElementUI);
new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount("#app");
