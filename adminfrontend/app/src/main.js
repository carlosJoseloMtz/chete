// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import Vuelidate from 'vuelidate'
import { store } from './store/index'
import VueFetch from 'vue-fetch'
import ImageMagick from 'imagemagick'

Vue.use(VueMaterial)
Vue.use(Vuelidate)
Vue.use(VueFetch, {
  polyfill: true
})

Vue.config.productionTip = false;

(() => new Vue({
  el: '#app',
  router,
  fetch: VueFetch,
  store: store,
  im: ImageMagick,
  components: { App },
  template: '<App/>'
}))()
