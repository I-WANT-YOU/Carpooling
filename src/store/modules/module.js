import { handlerSuccessResponse } from '@/utils/auth';
import * as types from '../mutationTypes';
import service from '@api';

const state = {
  teamHoldInfo: {},
};

const getters = {

};

const mutations = {
  [types.GET_TEAM_HOLD_INFO](state, payload) {
    state.teamHoldInfo = payload;
  },
};

const actions = {
  async editTeamWarning(content, options) {
    try {
      const response = await service.editTeamWarning(options);
      return await handlerSuccessResponse(response);
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
