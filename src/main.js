import Vue from 'vue';
import App from '@/App.vue';
import router from '@/router';
import store from '@/store';
import i18n from '@/i18n';
import Local from '@/i18n/lang';
import '@/mixins';

import 'amfe-flexible';
import 'normalize.css';
import './style/style.scss';

import './icons';

Vue.config.productionTip = false;
Vue.prototype.$Local = Local;

new Vue({
  router,
  store,
  i18n,
  render: h => h(App),
}).$mount('#app');
