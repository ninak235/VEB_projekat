import Vue from "vue";
import App from "./App.vue";
import VueRouter from "vue-router";
import Routes from "./router/routes";
//import VueGeolocation from 'vue-browser-geolocation';


Vue.use(VueRouter);
//Vue.use(VueGeolocation);

//import * as VueGoogleMaps from 'vue2-google-maps';


/*
Vue.use(VueGoogleMaps, {
  load: {
    key:'AIzaSyCN-3ulRIVt_iRpMTS-88oiWWzWeuAvYgU'
  },
  installComponents: false
});

Vue.component("google-map", VueGoogleMaps.Map);
*/
const router = new VueRouter({
  routes: Routes,
  mode: "history",
});

new Vue({
  router: router,
  el: "#app",
  render: (h) => h(App),
});
