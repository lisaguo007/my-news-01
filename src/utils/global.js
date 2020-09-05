// 用于全局注册组件
import Vue from 'vue'
import MyHeader from '../components/MyHeader.vue'
import MyLogo from '../components/MyLogo.vue'
import MyNavitem from '../components/MyNavitem.vue'
import MyPost from '../components/MyPost.vue'
import MyComment from '../components/MyComment.vue'
import MyFloor from '../components/Myfloor.vue'

// 全局注册组件
Vue.component('my-header', MyHeader)
Vue.component('my-logo', MyLogo)
Vue.component('my-navitem', MyNavitem)
Vue.component('my-post', MyPost)
Vue.component('my-comment', MyComment)
Vue.component('my-floor', MyFloor)
