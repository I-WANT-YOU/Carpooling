import Vue from 'vue';
import Vuex from 'vuex';
import app from './modules/app';
import passenger from './modules/passenger';
import driver from './modules/driver';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    app,
    passenger,
    driver,
  },
});
