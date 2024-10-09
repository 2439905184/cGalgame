import Vue from 'vue'
import VueRouter from 'vue-router'

let pageInit = false;

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    meta: {
      title: "首页"
    },
    component: () => import('@/pages/index/index.vue')
  },
  {
    path: '/test',
    meta: {
      title: "测试"
    },
    component: () => import('@/pages/index/test.vue')
  },
  {
    path: '/play',
    meta: {
      title: "游戏中"
    },
    component: () => import('@/pages/play/play.vue')
  },
  {
    path: '/rolePortrait',
    meta: {
      title: "立绘"
    },
    component: () => import('@/pages/rolePortrait/rolePortrait.vue')
  }
]

const router = new VueRouter({
  // mode: 'history',
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta && to.meta.title) {
    //网页标题，游戏名称
    document.title = "交错的端口预言 - " + to.meta.title;
  }

  //刷新页面后自动返回主界面
  if(!pageInit) {
    pageInit = true;
    next('./');
  }
  
  next()
})

export default router