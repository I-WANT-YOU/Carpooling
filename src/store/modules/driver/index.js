/* eslint-disable no-unused-vars */
import { Toast } from 'vant';
import driverService from '@api/driver';
import formatDate from 'dayjs';
import { last, get } from 'lodash';
import { handlerSuccessResponse } from '@/utils/auth';
import * as types from '../../mutationTypes';

const state = {
  prices: [], // 单价
  phoneCode: '', // 手机验证码
  travelList: [], // 司机行程
  refreshTravelList: {}, // 刷新后的行程
  lastTravelList: {}, // 司机最后一条行程
  shareData: {},
  shareScheduleInfo: {}, // 分享页面详情信息
  uploadInfo: {}, // 获取临时密匙的信息
};

const getters = {
  driverTravelList: state => state.travelList.map((item) => {
    item.travel.startTime = formatDate(item.travel.startTime).format('HH:mm');
    return item;
  }),

  refreshDriverTravelList: (state) => {
    if (state.refreshTravelList.travel) {
      state.refreshTravelList.travel.startTime = formatDate(state.refreshTravelList.travel.startTime).format('HH:mm');
    }
    return state.refreshTravelList;
  },
  // 分享页面详情信息
  driverShareScheduleInfo: (state) => {
    const detailInfo = {
      ...state.shareScheduleInfo.travel,
      ...state.shareScheduleInfo.user,
    };
    if (detailInfo.startTime) {
      detailInfo.departureTime = detailInfo.startTime + (10 * 60 * 1000);
      if (new Date().getDate() === new Date(detailInfo.startTime).getDate()) {
        detailInfo.startTime = `今天${formatDate(detailInfo.startTime).format('HH:mm')}`;
      } else {
        detailInfo.startTime = `明天${formatDate(detailInfo.startTime).format('HH:mm')}`;
      }
    }
    return detailInfo;
  },
};

const mutations = {
  [types.GET_PRICE](state, payload) { // 单价
    state.prices = payload;
  },
  [types.GET_DRIVER_TRAVEL_LIST](state, payload) { // 司机行程
    state.travelList = payload;
  },
  [types.GET_DRIVER_LAST_TRAVEL](state, payload) { // 司机最后一条行程
    state.lastTravelList = payload;
  },
  [types.GET_REFRESH_TRAVEL_LIST](state, payload) { // 司机刷新后的行程
    state.refreshTravelList = payload;
  },
  [types.GET_SHARE_SCHEDULE](state, payload) { // 司机分享行程
    state.shareData = payload;
  },
  [types.GET_SHARE_SCHEDULE_INFO](state, payload) { // 获取司机分享页面详情
    state.shareScheduleInfo = payload;
  },
  [types.GET_UPLOAD_INFO](state, payload) { // 临时密匙信息
    state.uploadInfo = payload;
  },
};

const actions = {
  // 获取单价
  async getPrices({ commit }) {
    try {
      const response = await driverService.getPrices();
      const data = await handlerSuccessResponse(response);
      commit(types.GET_PRICE, data);
      return true;
    } catch (errorMessage) {
      return Promise.reject(errorMessage);
    }
  },
  // 司机查询行程
  async getTravelList({ commit }, options) {
    try {
      const response = await driverService.getTravelList(options);
      const data = await handlerSuccessResponse(response);
      commit(types.GET_DRIVER_TRAVEL_LIST, data);
      return true;
    } catch (errorMessage) {
      return Promise.reject(errorMessage);
    }
  },

  // 司机查询最后一条行程
  async getLastTravel({ commit }) {
    try {
      const response = await driverService.getLastTravel();
      const data = await handlerSuccessResponse(response);
      commit(types.GET_DRIVER_LAST_TRAVEL, data);
      return true;
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
  // 司机分享行程
  async shareSchedule({ commit }, options) {
    try {
      const response = await driverService.shareSchedule(options);
      const data = await handlerSuccessResponse(response);
      commit(types.GET_SHARE_SCHEDULE, data);
      return true;
    } catch (errorMessage) {
      return Promise.reject(errorMessage);
    }
  },

  // 获取司机分享详情页面信心
  async getShareScheduleInfo({ commit }, options) {
    try {
      const response = await driverService.getShareScheduleInfo(options);
      const data = await handlerSuccessResponse(response);
      commit(types.GET_SHARE_SCHEDULE_INFO, data);
      return true;
    } catch (errorMessage) {
      return Promise.reject(errorMessage);
    }
  },

  // 司机获取上传图片的临时密匙
  async getUploadInfo({ commit }, options) {
    try {
      const response = await driverService.getUploadInfo(options);
      const data = await handlerSuccessResponse(response);
      commit(types.GET_UPLOAD_INFO, data);
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
