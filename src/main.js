import vueWechatTitle from 'vue-wechat-title';
import Vue from 'vue';
import App from '@/App.vue';
import router from '@/router';
import store from '@/store';
import '@/mixins';


import 'amfe-flexible';
import 'normalize.css';
import './style/style.scss';

import './icons';

Vue.use(vueWechatTitle);

Vue.config.productionTip = false;
Vue.config.devtools = true;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
