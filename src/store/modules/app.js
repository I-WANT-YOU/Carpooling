import appService from '@api/app';
import { Toast } from 'vant';
// import { get } from 'lodash';
import { handlerSuccessResponse } from '@/utils/auth';
// import * as types from '../mutationTypes';

const state = {};

const getters = {};

const mutations = {};

const actions = {
  async saveUserInfo(context, options) {
    try {
      const response = await appService.saveUserInfo(options);
      await handlerSuccessResponse(response);
    } catch (error) {
      Toast.fail(error);
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
