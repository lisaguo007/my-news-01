// 用于全局注册组件
import Vue from 'vue'
import MyHeader from '../components/MyHeader.vue'
import MyLogo from '../components/MyLogo.vue'
import MyNavitem from '../components/MyNavitem.vue'
import MyPost from '../components/MyPost.vue'

// 全局注册组件
Vue.component('my-header', MyHeader)
Vue.component('my-logo', MyLogo)
Vue.component('my-navitem', MyNavitem)
Vue.component('my-post', MyPost)
