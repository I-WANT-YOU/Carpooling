import request from '@utils/request';
import { handlerResponse } from '@utils/auth';

class AssetsService {
  static async getTeamList({ pageNum, pageSize }) {
    try {
      const requestOptions = {
        url: `/risk-management/index/1?page_num=${pageNum}&page_size=${pageSize}`,
        method: 'get',
      };
      const response = await request(requestOptions);
      return handlerResponse(response);
    } catch (error) {
      throw new Error(error);
    }
  }
}

export default AssetsService;
