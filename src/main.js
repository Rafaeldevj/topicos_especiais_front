import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Vuex from 'vuex'

import 'es6-promise/auto'

import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import VueSweetalert2 from 'vue-sweetalert2'
import 'jquery/dist/jquery'

import store from './store/index'

Vue.use(Vuex)
Vue.use(VueSweetalert2);
Vue.use(BootstrapVue);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
  BootstrapVue
}).$mount('#app')