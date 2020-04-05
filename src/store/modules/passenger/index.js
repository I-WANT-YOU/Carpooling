/* eslint-disable no-unused-vars */
import { Toast } from 'vant';
import passengerService from '@api/passenger';
import {
  nth, head, last, get,
} from 'lodash';
import formatDate from 'dayjs';
import { setOpenId, handlerSuccessResponse } from '../../../utils/auth';

import * as types from '../../mutationTypes';

const state = {
  userInfo: {}, // 用户信息
  phoneCode: '', // 手机验证码
  subwayStations: [], // 站点
  villageStations: [], // 站点
  travelList: [], // 获取的行程
  orderTravelList: [], // 行程（乘客已经预定）
};

const getters = {
  passengerTravelList: state => state.travelList.map((item) => {
    const currentDate = formatDate().format('YYYY-MM-DD');
    const showDate = formatDate(item.startTime).format('YYYY-MM-DD');
    const showDateTime = formatDate(item.startTime).format('HH:mm');
    if (currentDate === showDate) {
      item.startTime = `今天 ${showDateTime}`;
    } else {
      item.startTime = `明天 ${showDateTime}`;
    }
    return item;
  }),
  passengerOrderTravelList: state => state.orderTravelList.map((item) => {
    const currentDate = formatDate().format('YYYY-MM-DD');// 当前时间
    const showDate = formatDate(item.travel.startTime).format('YYYY-MM-DD');
    const showDateTime = formatDate(item.travel.startTime).format('HH:mm');
    if (currentDate === showDate) {
      item.travel.startTime = `今天 ${showDateTime}`;
    } else {
      item.travel.startTime = `明天 ${showDateTime}`;
    }
    return item;
  }),
  nowDetail: state => head(state.newsDetail),
  prevTitle: state => nth(state.newsDetail, 1),
  nextTitle: state => last(state.newsDetail),
  yearList: state => get(state.newsListData, 'year_list', []),
  recordsList: state => get(state.newsListData.news_data, 'records', []),
  recordsTotal: state => get(state.newsListData.news_data, 'pages', 1),
};

const mutations = {
  [types.GET_USER_INFO](state, payload) { // 用户信息
    state.userInfo = payload;
  },
  [types.GET_PHONE_CODE](state, payload) {
    state.phoneCode = payload;
  },
  [types.GET_TRAVEL_LIST](state, payload) { // 乘客查询行程
    state.travelList = payload;
  },
  [types.GET_SUBWAY_STATIONS](state, payload) { // 地铁站点
    state.subwayStations = payload;
  },
  [types.GET_VILLAGE_STATIONS](state, payload) { // 小区站点
    state.villageStations = payload;
  },
  [types.GET_ORDER_TRAVEL_LIST](state, payload) { // 小区站点
    state.orderTravelList = payload;
  },
};

const actions = {

  // 获取用户据的openId
  async getOpenId({ commit }, options) {
    try {
      const response = await passengerService.getOpenId(options);
      const data = await handlerSuccessResponse(response);
      if (data !== '') {
        setOpenId(data);
      }
      return true;
    } catch (errorMessage) {
      return Promise.reject(errorMessage);
    }
  },

  // 获取用户信息（乘客和司机通用）
  async getUserInfo({ commit }) {
    try {
      const response = await passengerService.getUserInfo();
      const data = await handlerSuccessResponse(response);
      commit(types.GET_USER_INFO, data);
      return true;
    } catch (errorMessage) {
      return Promise.reject(errorMessage);
    }
  },

  // 获取站点
  async getSubwayStations({ commit }, options) {
    try {
      const response = await passengerService.getStations(options);
      const data = await handlerSuccessResponse(response);
      commit(types.GET_SUBWAY_STATIONS, data);
      return true;
    } catch (errorMessage) {
      return Promise.reject(errorMessage);
    }
  },

  async getVillageStations({ commit }, options) {
    try {
      const response = await passengerService.getStations(options);
      const data = await handlerSuccessResponse(response);
      commit(types.GET_VILLAGE_STATIONS, data);
      return true;
    } catch (errorMessage) {
      return Promise.reject(errorMessage);
    }
  },

  // 乘客提交乘车信息 搜索行程信息
  async searchTravel({ commit }, options) {
    try {
      const response = await passengerService.searchTravel(options);
      const data = await handlerSuccessResponse(response);
      commit(types.GET_TRAVEL_LIST, data);
      return true;
    } catch (errorMessage) {
      return Promise.reject(errorMessage);
    }
  },

  // 获取验证码
  async getSmsCode({ commit }, options) {
    try {
      const response = await passengerService.getSmsCode(options);
      const data = await handlerSuccessResponse(response);
      commit(types.GET_PHONE_CODE, data);
      return '';
    } catch (errorMessage) {
      return Promise.reject(errorMessage);
    }
  },

  // 绑定手机号码
  async bindPhoneNumber({ commit }, options) {
    try {
      const response = await passengerService.bindPhoneNumber(options);
      await handlerSuccessResponse(response);
      return '';
    } catch (errorMessage) {
      return Promise.reject(errorMessage);
    }
  },

  // 乘客预约行程
  async orderLink({ commit }, options) {
    try {
      const response = await passengerService.orderLink(options);
      await handlerSuccessResponse(response);
      return '';
    } catch (errorMessage) {
      return Promise.reject(errorMessage);
    }
  },

  // 乘客取消行程
  async cancelLink({ commit }, options) {
    try {
      const response = await passengerService.cancelLink(options);
      await handlerSuccessResponse(response);
      return '';
    } catch (errorMessage) {
      return Promise.reject(errorMessage);
    }
  },

  // 乘客完成行程
  async overLink({ commit }, options) {
    try {
      const response = await passengerService.overLink(options);
      await handlerSuccessResponse(response);
      return '';
    } catch (errorMessage) {
      return Promise.reject(errorMessage);
    }
  },

  // 乘客查询已经预定的行程信息
  async getTravel({ commit }, options) {
    try {
      const response = await passengerService.getTravel(options);
      const data = await handlerSuccessResponse(response);
      commit(types.GET_ORDER_TRAVEL_LIST, data);
      return true;
    } catch (errorMessage) {
      return Promise.reject(errorMessage);
    }
  },

  // 乘客评价司机
  async appraiseUser({ commit }, options) {
    try {
      const response = await passengerService.appraiseUser(options);
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
