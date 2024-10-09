import Vue from 'vue'
import App from './App.vue'
import router from './router'
import common from '@/plugins/common'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import store from './store'

Vue.use(ElementUI);

Vue.config.productionTip = false
Vue.config.silent = true;
Vue.prototype.$state = store.state;

const vm = new Vue({
  router,
  render: h => h(App),
}).$mount('#app')

//常用变量，方法插件
Vue.use(common,vm);