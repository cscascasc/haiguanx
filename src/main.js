import 'babel-polyfill'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import JsEncrypt from 'jsencrypt'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import { decryptlong, encrypt } from "@/utils/jsencrypt";
Vue.prototype.$jsEncrypt = JsEncrypt//解密
Vue.config.productionTip = false
import './premission'

// router.beforeEach((to, from, next) => {
//   console.log(store.state.userinfo.token)
//   const hasToken = store.state.userinfo.token
//   // store.dispatch("user").then((data) => {
//   //   // next()
//   // })
//   // next()
// })
Vue.use(ElementUI),
  new Vue({
    store,
    router,
    render: h => h(App)
  }).$mount('#app')
