import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import router from './router/index.js'
import Http from './config/axios';
import store from './store/store';
import VueSession from 'vue-session'
import notaic from './server/notaic';
import install from './server/install';
import VueCookies from 'vue-cookies';
import axiosInerceptors from './config/axios-interceptors';
import wx from './wx/config';
import 'vue2-animate/dist/vue2-animate.min.css'


// css
import './css/base.css';

Vue.config.productionTip = false;
Vue.prototype.Http = Http;
Vue.prototype.log = window.console.log;
Vue.prototype.$alert = notaic;
Vue.prototype.wxMyReady = wx.MyReady;



Vue.use(VueRouter);
Vue.use(install);
Vue.use(VueSession);
Vue.use(VueCookies);
// Vue.use(animate)
Vue.use(require('vue-moment'));


new Vue({
  render: h => h(App),
  router: router,
  store
}).$mount('#app')