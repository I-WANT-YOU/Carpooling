/* eslint-disable no-unused-vars */
import driverService from '@api/driver';
import formatDate from 'dayjs';
import { last, get } from 'lodash';
import { handlerSuccessResponse } from '@/utils/auth';
import * as types from '../../mutationTypes';

const state = {
  phoneCode: '', // 手机验证码
  todayTravelList: [], // 今天的行程
  tomorrowTravelList: [], // 明天的行程
  refreshTravelList: {}, // 刷新后的行程
};

const getters = {
  todayDriverTravelList: state => state.todayTravelList.map((item) => {
    item.travel.startTime = formatDate(item.travel.startTime).format('HH:mm');
    return item;
  }),
  tomorrowDriverTravelList: state => state.tomorrowTravelList.map((item) => {
    item.travel.startTime = formatDate(item.travel.startTime).format('HH:mm');
    return item;
  }),
  refreshDriverTravelList: (state) => {
    if (state.refreshTravelList.travel) {
      state.refreshTravelList.travel.startTime = formatDate(state.refreshTravelList.travel.startTime).format('HH:mm');
    }
    return state.refreshTravelList;
  },
  yearList: state => get(state.newsListData, 'year_list', []),
  recordsList: state => get(state.newsListData.news_data, 'records', []),
  recordsTotal: state => get(state.newsListData.news_data, 'pages', 1),
};

const mutations = {
  [types.GET_TODAY_TRAVEL_LIST](state, payload) { // 司机行程 今天
    state.todayTravelList = payload;
  },
  [types.GET_TOMORROW_TRAVEL_LIST](state, payload) { // 司机行程 明天
    state.tomorrowTravelList = payload;
  },
  [types.GET_REFRESH_TRAVEL_LIST](state, payload) { // 司机刷新后的行程
    state.refreshTravelList = payload;
  },
};

const actions = {
  // 司机查询行程
  async getTodayTravelList({ commit }, options) {
    try {
      const response = await driverService.getTravelList(options);
      const data = await handlerSuccessResponse(response);
      commit(types.GET_TODAY_TRAVEL_LIST, data);
      return true;
    } catch (errorMessage) {
      return Promise.reject(errorMessage);
    }
  },
  async getTomorrowTravelList({ commit }, options) {
    try {
      const response = await driverService.getTravelList(options);
      const data = await handlerSuccessResponse(response);
      commit(types.GET_TOMORROW_TRAVEL_LIST, data);
      return true;
    } catch (errorMessage) {
      return Promise.reject(errorMessage);
    }
  },
  // 司机发布行程
  async publishTravel({ commit }, options) {
    try {
      const response = await driverService.publishTravel(options);
      await handlerSuccessResponse(response);
      return Promise.resolve('发布成功');
    } catch (errorMessage) {
      return Promise.reject(errorMessage);
    }
  },
  // 司机刷新行程
  async refreshTravel({ commit }, options) {
    try {
      const response = await driverService.refreshTravel(options);
      const data = await handlerSuccessResponse(response);
      commit(types.GET_REFRESH_TRAVEL_LIST, data);
      return true;
    } catch (errorMessage) {
      return Promise.reject(errorMessage);
    }
  },
  // 司机撤销行程
  async destroyTravel({ commit }, options) {
    try {
      const response = await driverService.destroyTravel(options);
      await handlerSuccessResponse(response);
      return true;
    } catch (errorMessage) {
      return Promise.reject(errorMessage);
    }
  },
  // 司机完成行程
  async overTravel({ commit }, options) {
    try {
      const response = await driverService.overTravel(options);
      await handlerSuccessResponse(response);
      return true;
    } catch (errorMessage) {
      return Promise.reject(errorMessage);
    }
  },
  // 保存车辆信息 saveCarInfo
  async saveCarInfo({ commit }, options) {
    try {
      const response = await driverService.saveCarInfo(options);
      const data = await handlerSuccessResponse(response);
      return '';
    } catch (errorMessage) {
      return Promise.reject(errorMessage);
    }
  },
  // 司机拒绝预定
  async rejectLink({ commit }, options) {
    try {
      const response = await driverService.rejectLink(options);
      await handlerSuccessResponse(response);
      return true;
    } catch (errorMessage) {
      return Promise.reject(errorMessage);
    }
  },
  // 司机确认预定
  async confirmLink({ commit }, options) {
    try {
      const response = await driverService.confirmLink(options);
      await handlerSuccessResponse(response);
      return true;
    } catch (errorMessage) {
      return Promise.reject(errorMessage);
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
