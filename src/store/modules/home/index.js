import homeService from '@api/home';
import { get } from 'lodash';
import { handlerSuccessResponse } from '@/utils/auth';
import * as types from '../../mutationTypes';

const state = {
  newsList: [],
};

const getters = {
  imagesList: state => state.newsList.map(item => ({
    imgUrl: get(item, 'img_url', 1),
    id: get(item, 'id', 1),
    url: item.url,
  })),

  newsTextList: state => state.newsList.map(item => ({
    date: item.date,
    id: item.id,
    title: item.title,
    title_en: item.title_en,
    url: item.url,
  })),
};

const mutations = {
  [types.GET_NEWS_LIST](state, payload) {
    state.newsList = payload;
  },
};

const actions = {
  async getHomeNewsList({ commit }, options) {
    try {
      const response = await homeService.getHomeNewsList(options);
      const data = await handlerSuccessResponse(response);
      commit(types.GET_NEWS_LIST, data);
    } catch (error) {
      throw error;
    }
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
