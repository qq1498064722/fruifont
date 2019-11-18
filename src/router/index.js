import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store/index'
Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'index',
    component: () => import('../views/content/index.vue'),
    meta:{title:'甜果APP'}
  },
  {
    path: '/list',
    name: 'list',
    component: () => import('../views/content/List.vue'),
    meta:{title:'商品列表'}
  },
  {
    path: '/classes',
    name: 'classes',
    component: () => import('../views/content/class.vue'),
    meta:{title:'分类'}
  },
  {
    path: '/shop',
    name: 'shop',
    component: () => import('../views/content/shop.vue'),
    meta:{title:'购物车'}
  },
  {
    path: '/my',
    name: 'my',
    component: () => import('../views/content/my.vue'),
    meta:{title:'个人中心',auth:true}
  },
  {
    path: '/goodsdetail',
    name: 'goodsdetail',
    component: () => import('../views/content/goodsDetail.vue'),
    meta:{title:'商品详情'}
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/login/Login.vue'),
    meta:{title:'登录'}
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../views/login/Register.vue'),
    meta:{title:'注册'}
  },
  {
    path: '/orders',
    name: 'orders',
    component: () => import('../views/content/Orders.vue'),
    meta:{title:'订单详情'}
  },
  {
    path: '/pay',
    name: 'pay',
    component: () => import('../views/content/Pay.vue'),
    meta:{title:'支付'}
  },
  {
    path: '/demo1',
    name: 'demo1',
    component: () => import('../views/demo/Demo1'),

  },
  {
    path: '/demo2',
    name: 'demo2',
    component: () => import('../views/demo/Demo2'),

  },
];
const router = new VueRouter({
  routes
});
router.beforeEach((to,from,next)=>{
  document.title = to.meta.title || '甜果生鲜';
  if(to.meta.auth){
    if(store.state.token.trim()){
      next()
    }else {
      next({name:'login',query:{redirect:to.name}});
    }
  }else {
    next()
  }
});

export default router
