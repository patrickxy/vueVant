import Vue from "vue";
import axios from "./plugins/axios";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "amfe-flexible";
// import { Button } from "vant";
// Vue.use(Button);

import Vant from "vant";
import "vant/lib/index.css";

Vue.use(Vant);
Vue.prototype.$axios = axios;
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
