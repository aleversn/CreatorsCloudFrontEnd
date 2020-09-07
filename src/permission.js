import router from './router'
import store from './store'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css'// Progress 进度条样式
import { Message } from 'element-ui'
import { getToken } from '@/utils/auth' // 验权
import { constantRouterMap } from './router/index'
import nProgress from 'nprogress'


const whiteList = ['/login'] // 不重定向白名单
const whiteListActiveList = ['/', '/dashboard', '/404', '/401'] //名单
const allList = []  //所有名单
const activeList = [] //用户权限名单
router.beforeEach((to, from, next) => {
    nProgress.start()
    next()
    // //1.如果刚开始未初始化,则先初始化
    // if (allList.length === 0) {
    //   for (var a = 0; a < constantRouterMap.length; a++) {
    //     if (constantRouterMap[a].children) {
    //       var childrenList = constantRouterMap[a].children
    //       for (var b = 0; b < childrenList.length; b++) {
    //         allList.push(childrenList[b].path)
    //       }
    //     } else {
    //       allList.push(constantRouterMap[a].path)
    //     }
    //   }
    // }

    // //2.向白名单中添加内容
    // if(activeList.length===0){
    //     if (store.getters.menu.sonList) {
    //         const sonList = store.getters.menu.sonList
    //         for (var c = 0; c < sonList.length; c++) {
    //           activeList.push(sonList[c].url)
    //         }
    //         console.log("done---")
    //     }        
    // }

    // activeList.forEach((item,index)=>{
    //     console.log(item)
    // })
  
    // NProgress.start()

    // if (getToken()) {
    //   if (to.path === '/login') {
    //     next()
    //     NProgress.done() // if current page is dashboard will not trigger	afterEach hook, so manually handle it
    //   } else {

    //       if (whiteListActiveList.indexOf(to.path) !== -1) {
    //         next()
    //       } else if (activeList.indexOf(to.path) !== -1) {
    //         next()
    //       } else {
    //         if (allList.indexOf(to.path) !== -1) {
    //           Message.warning("您无权限访问此页面")  
    //           next({ path: '/401' })
    //         } else {
    //           Message.warning("您要访问的页面不存在")  
    //           next({ path: '/404' })
    //         }
    //       }

    //   }
    // } else {
    //   if (whiteList.indexOf(to.path) !== -1) {
    //     next()
    //   } else {
    //     Message.warning("请先登录")  
    //     next(`/login?redirect=${to.path}`) // 否则全部重定向到登录页
    //     NProgress.done()
    //   }
    // }
  })
  
  router.afterEach(() => {
    NProgress.done() // 结束Progress
  })
  