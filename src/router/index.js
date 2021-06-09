import Vue from 'vue'
import VueRouter from 'vue-router'
import ThatMusic from '../views/main/ThatMusic.vue'
import RecomMend from '../views/main/recommend'

Vue.use(VueRouter)
// const originalPush = VueRouter.prototype.push
// VueRouter.prototype.push = function push (location) {
//   return originalPush.call(this, location).catch(err => err)
// }

const routes = [
  // {
  //   path: '/home',
  //   name: 'home',
  //   component: Home
  // },
  // {
  //   path: '/*',
  //   redirect: '/home'
  // }
  {
    name: 'ThatMusic',
    path: '/thatmusic',
    component: ThatMusic,
    beforeEnter: (to, from, next) => {
      if (to.path === '/thatmusic') {
        // console.log('路由跳转', to.path)
        next({ name: 'RecomMend' })
      } else {
        // console.log('路由放行')
        next()
      }
    },
    children: [
      {
        name: 'RecomMend',
        path: 'recommend',

        components: {
          Routerthatmusic: RecomMend
        }
      },
      {
        name: 'songlist',
        path: 'songlist',
        components: {
          Routerthatmusic: () => import('../views/main/songlist')
        }
      },
      {
        name: 'rankinglist',
        path: 'rankinglist',
        components: {
          Routerthatmusic: () => import('../views/main/rankinglist')
        }
      },
      {
        name: 'singer',
        path: 'singer',
        components: {
          Routerthatmusic: () => import('../views/main/singer')
        }
      },
      {
        name: 'newmusic',
        path: 'newmusic',
        components: {
          Routerthatmusic: () => import('../views/main/newmusic')
        }
      },
      {
        name: 'mv',
        path: 'mv',
        components: {
          Routerthatmusic: () => import('../views/main/mv')
        }
      }
    ]
  },
  // // 重定向首页到个性推荐
  {
    name: 'search',
    path: '/search/:word',
    component: () => import('@/views/main/searchView'),
    beforeRouteUpdate: (to, from, next) => {
      console.log(
        'beforeRouteUpdate被调用：在当前路由改变，但是该组件被复用时调用'
      )

      next()
    }
  },
  {
    name: 'playmv',
    path: '/playmv',
    component: () => import('@/views/main/mv/playmv')
  },

  {
    name: 'musiclist',
    path: '/musiclist',
    component: () => import('@/components/musiclist')
  },
  {
    path: '/',
    redirect: { name: 'RecomMend' }
  }
]

const router = new VueRouter({
  routes,
  mode: 'history'
  // linkActiveClass: 'myactive'
})

export default router
