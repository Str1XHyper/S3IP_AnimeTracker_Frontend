import Vue from 'vue'
import store from '../store/index'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/EditAnime',
    name: 'Edit animes',
    component: () => import('../views/EditAnime.vue')
  },
  {
    path: '/EditUser',
    name: 'Edit users',
    component: () => import('../views/EditUser.vue'),
    beforeEnter: (to, from , next) =>{
      if(store.state.user.role != 'Owner' && store.state.user.role != 'Admin'){
        next('/')
      } else
      {
        next()
      }
    }
  },
  {
    path: '/MyList',
    name: 'My lists',
    component: () => import('../views/MyLists.vue'),
    // beforeEnter: (to, from , next) =>{
    //   if(store.state.loggedIn){
    //     next()
    //   } else
    //   {
    //     next('/')
    //   }
    // }
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})


export default router
