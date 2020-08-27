import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Vant from 'vant'
import 'vant/lib/index.css'
import 'amfe-flexible'
import axios from 'axios'

// 导入通用样式
import './styles/base.less'
import './styles/iconfont.css'

// 导入全局组件
import MyHeader from './components/MyHeader.vue'
import MyLogo from './components/MyLogo.vue'
Vue.use(Vant)
Vue.prototype.$axios = axios
axios.defaults.baseURL = 'http://localhost:3000'

Vue.component('my-header', MyHeader)
Vue.component('my-logo', MyLogo)
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
