import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '../src/assets/css/reset.css'
import '../src/plugins/element'
import 'swiper/swiper-bundle.min.css'
import './assets/icon/iconfont.js'
import './assets/icon/iconfont.css'
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
