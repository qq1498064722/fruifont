import Vue from 'vue'
import App from './App.vue'
import router from './router'
import 'u-reset.css';
import ElementUi from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import Vant from 'vant';
import 'vant/lib/index.css';
// import filter from "./filter/index";
import { PullRefresh,Lazyload,List,TreeSelect,Field ,Sticky} from 'vant';
import store from './store'
Vue.config.productionTip = false;
Vue.use(ElementUi);
Vue.use(Vant);
Vue.use(PullRefresh);
Vue.use(Lazyload);
Vue.use(List);
Vue.use(TreeSelect);
Vue.use(Field);
Vue.use(Sticky);




new Vue({
  router,store,
  render: h => h(App)
}).$mount('#app');
