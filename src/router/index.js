import Vue from 'vue'
import VueRouter from 'vue-router'
// 导入user组件
import Login from '../views/user/Login.vue'
import Register from '../views/user/Register.vue'
import User from '../views/user/User.vue'
import UserEdit from '../views/user/UserEdit.vue'
import MyFollow from '../views/user/MyFollow.vue'
import MyComment from '../views/user/MyComment.vue'
import MyStar from '../views/user/MyStar.vue'
import EditTab from '../views/news/EditTab.vue'
import PostDetail from '../views/news/PostDetail.vue'
import Search from '../views/news/Search.vue'

// 导入news中的组件
import Index from '../views/news/Index.vue'
Vue.use(VueRouter)
// 全局的把push的异常给处理了
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

const routes = [
  { path: '/login', component: Login, name: 'login' },
  { path: '/register', component: Register, name: 'register' },
  { path: '/user', component: User, name: 'user' },
  { path: '/user-edit', component: UserEdit, name: 'user-edit' },
  { path: '/my-follow', component: MyFollow, name: 'my-follow' },
  { path: '/my-comment', component: MyComment, name: 'my-comment' },
  { path: '/my-star', component: MyStar, name: 'my-star' },
  { path: '/', component: Index, name: 'index' },
  { path: '/edit-tab', component: EditTab, name: 'edit-tab' },
  { path: '/post-detail/:id', component: PostDetail, name: 'post-detail' },
  { path: '/search', component: Search, name: 'search' }
]

const router = new VueRouter({
  routes
})
// 配置全局的导航守卫
// to: 到哪儿去
// from: 从哪儿来
// next: 函数，代表是否放行
// 判断 to的path 是否是/user 判断用户是否是去个人中心
// 1. 如果不是去个人中心  next() 放行
// 2. 如果是去个人中心 判断是否有token
//  如果有， 放行
//  如果没有， 跳转到登录去
router.beforeEach(function(to, from, next) {
  const token = localStorage.getItem('token')
  const authUrls = ['/user', '/user-edit', '/my-follow', '/my-comment', '/mystar']
  if (!authUrls.includes(to.path) || token) {
    next()
  } else {
    router.push('/login')
  }
})
export default router
