import request from '@utils/request';
import { handlerResponse } from '@utils/auth';

class AppService {
  static async saveUserInfo({
    entrance, group, name, contact,
  }) {
    try {
      const requestOptions = {
        url: '/homepage/client/save',
        method: 'post',
        data: {
          entrance,
          group,
          name,
          contact,
        },
      };
      const response = await request(requestOptions);
      return handlerResponse(response);
    } catch (error) {
      throw new Error(error);
    }
  }
}

export default AppService;
