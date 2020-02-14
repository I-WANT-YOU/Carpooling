import request from '@utils/request';
import { handlerResponse } from '@utils/auth';

class HomeService {
  static async getHomeNewsList() {
    try {
      const requestOptions = {
        // url: '/homepage/fetch-news',
        url: '/homepage/news/visible',
        method: 'get',
      };
      const response = await request(requestOptions);
      return handlerResponse(response);
    } catch (error) {
      throw new Error(error);
    }
  }
}

export default HomeService;
