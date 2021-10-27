import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import * as VueGoogleMaps from 'vue2-google-maps'
import VueGeolocation from 'vue-browser-geolocation';
import axios from "axios";
import VueAxios from "vue-axios";
import VueSwal from 'vue-swal';
import "./assets/tailwind.css";
import VueMoment from 'vue-moment';
 

// import 'bootstrap'
// import 'bootstrap/dist/css/bootstrap.min.css'
Vue.use(VueMoment, {});
Vue.use(VueSwal)
Vue.use(VueAxios, axios);
Vue.use(VueGeolocation);
Vue.use(VueGoogleMaps, {
  load: {
    key: process.env.VUE_APP_VARIABLE,
  }
})

Vue.config.productionTip = false


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
