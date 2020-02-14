import Vue from 'vue';
import Vuex from 'vuex';
import home from './modules/home';
import app from './modules/app';
import news from './modules/news';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    home,
    app,
    news,
  },
});
