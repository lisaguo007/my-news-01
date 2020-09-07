import Vue from 'vue'
import App from './App.vue'
import router from './router'

import 'amfe-flexible'

// 全局注册组件
import './utils/global'

// 全局配置axios请求
import './utils/request'

// 全局导入Vant
import './utils/vant'

// 全局注册过滤器
import './utils/filters'

// 导入通用样式
import './styles/base.less'
import './styles/iconfont.css'

import VueRouter from 'vue-router'

Vue.config.productionTip = false
Vue.use(VueRouter)

// 创建一个bus
const bus = new Vue()
// 把bus挂载到vue原型上
Vue.prototype.$bus = bus
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
