import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Vant, { Toast } from 'vant'
import 'vant/lib/index.css'
import 'amfe-flexible'
import axios from 'axios'

// 导入通用样式
import './styles/base.less'
import './styles/iconfont.css'

// 导入全局组件
import MyHeader from './components/MyHeader.vue'
import MyLogo from './components/MyLogo.vue'
import MyNavitem from './components/MyNavitem.vue'
import VueRouter from 'vue-router'
import moment from 'moment'
Vue.use(Vant)
Vue.prototype.$axios = axios
axios.defaults.baseURL = 'http://localhost:3000'
// 给axios配置拦截器
axios.interceptors.request.use(function(config) {
  // config指的是请求的配置信息
  // console.log('拦截到了请求', config)
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = token
  }
  return config
})
axios.interceptors.response.use(function(response) {
  // console.log('拦截到了响应', response)
  const { statusCode, message } = response.data
  if (statusCode === 401 && message === '用户信息验证失败') {
    // 1. 跳转到登录页面
    router.push('/login')
    // 2. 清除失效的信息
    localStorage.removeItem('token')
    localStorage.removeItem('userId')
    // 3. 给提示 用户信息失效
    Toast.fail('登录信息失效')
  }
  return response
})
Vue.component('my-header', MyHeader)
Vue.component('my-logo', MyLogo)
Vue.component('my-navitem', MyNavitem)
Vue.config.productionTip = false
Vue.use(VueRouter)
Vue.filter('time', input => {
  return moment(input).format('YYYY-MM-DD')
})
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
