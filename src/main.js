import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Vant from 'vant'
import 'vant/lib/index.css'
import 'amfe-flexible'
// import {
//   Button
// } from 'vant'

// 导入通用样式
import './styles/base.less'
import './styles/iconfont.css'

Vue.use(Vant)
// Vue.use(Button)

function fn() {
  console.log(111111)
}
fn()
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
