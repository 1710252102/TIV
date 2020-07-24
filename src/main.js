import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import "./assets/css/global.css";
import axios from "axios";
import ElemetUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
// require('./mock');
// import 'lib-flexible/flexible.js'
// 配置请求的根路径
// axios.defaults.baseURL = "http://timemeetyou.com:8889/api/private/v1/";
// axios.defaults.baseURL = "/";
axios.interceptors.request.use(config => {
  console.log(config);
  config.headers.Authorization =
    "Bearer " + window.sessionStorage.getItem("token");
  return config;
});
Vue.config.productionTip = false;
Vue.prototype.$http = axios;
Vue.use(ElemetUI);
new Vue({
  router,
  ElemetUI,
  render: h => h(App)
}).$mount("#app");
