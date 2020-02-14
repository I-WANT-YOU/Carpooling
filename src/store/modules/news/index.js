import newsService from '@api/news';
import {
  nth, head, last, get,
} from 'lodash';
import { handlerSuccessResponse } from '@/utils/auth';
import * as types from '../../mutationTypes';

const state = {
  newsDetail: [
    {},
    {},
    {},
  ],
  newsListData: {},
};

const getters = {
  nowDetail: state => head(state.newsDetail),
  prevTitle: state => nth(state.newsDetail, 1),
  nextTitle: state => last(state.newsDetail),
  yearList: state => get(state.newsListData, 'year_list', []),
  recordsList: state => get(state.newsListData.news_data, 'records', []),
  recordsTotal: state => get(state.newsListData.news_data, 'pages', 1),
};

const mutations = {
  [types.GET_NEWS_DETAIL](state, payload) {
    state.newsDetail = payload;
  },
  [types.GET_NEWS_PAGE_LIST](state, payload) {
    state.newsListData = payload;
  },
};

const actions = {
  async getNewsList({ commit }, options) {
    try {
      const response = await newsService.getNewsList(options);
      const data = await handlerSuccessResponse(response);
      commit(types.GET_NEWS_PAGE_LIST, data);
    } catch (error) {
      throw error;
    }
  },

  async getNewsDetail({ commit }, id) {
    try {
      const response = await newsService.getNewsDetail(id);
      const data = await handlerSuccessResponse(response);
      commit(types.GET_NEWS_DETAIL, data);
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
