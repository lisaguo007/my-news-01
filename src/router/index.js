import Vue from 'vue'
import VueRouter from 'vue-router'
// 导入user组件
const Login = () => import(/* webpackChunkName: "user" */'../views/user/Login.vue')
const Register = () => import(/* webpackChunkName: "user" */'../views/user/Register.vue')
const User = () => import(/* webpackChunkName: "user" */'../views/user/User.vue')
const UserEdit = () => import(/* webpackChunkName: "user" */'../views/user/UserEdit.vue')
const MyFollow = () => import(/* webpackChunkName: "user" */'../views/user/MyFollow.vue')
const MyComment = () => import(/* webpackChunkName: "user" */'../views/user/MyComment.vue')
const MyStar = () => import(/* webpackChunkName: "user" */'../views/user/MyStar.vue')
const EditTab = () => import(/* webpackChunkName: "news" */'../views/news/EditTab.vue')
const PostDetail = () => import(/* webpackChunkName: "news" */'../views/news/PostDetail.vue')
const Search = () => import(/* webpackChunkName: "news" */'../views/news/Search.vue')

// 导入news中的组件
const Index = () => import(/* webpackChunkName: "news" */'../views/news/Index.vue')
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
