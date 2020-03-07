import { isNaN } from 'lodash';
import request from '@utils/request';
import { handlerResponse } from '@utils/auth';

class NewsService {
  // 获取用户信息（乘客司机通用）
  static async getUserInfo() {
    try {
      const requestOptions = {
        url: '/lc/user/getUserInfo',
        method: 'get',
      };
      const response = await request(requestOptions);
      return handlerResponse(response);
    } catch (error) {
      throw new Error(error);
    }
  }

  // 获取站点
  static async getStations(options) {
    try {
      const requestOptions = {
        url: '/lc/travel/getStations',
        method: 'get',
        params: {
          type: options,
        },
      };
      const response = await request(requestOptions);
      return handlerResponse(response);
    } catch (error) {
      throw new Error(error);
    }
  }

  // 用户搜索行程
  static async searchTravel(options) {
    try {
      const requestOptions = {
        url: '/lc/travel/searchTravel',
        method: 'get',
        params: {
          fromStation: options.fromAddress,
          toStation: options.toAddress,
          startTime: options.departureTime,
          peopleNumber: options.passengerNumber,
        },
      };
      const response = await request(requestOptions);
      return handlerResponse(response);
    } catch (error) {
      throw new Error(error);
    }
  }

  // 获取手机验证码
  static async getSmsCode(options) {
    try {
      const requestOptions = {
        url: '/lc/user/getSmsCode',
        method: 'get',
        params: {
          phone: options,
        },
      };
      const response = await request(requestOptions);
      return handlerResponse(response);
    } catch (error) {
      throw new Error(error);
    }
  }

  // 绑定手机号码
  static async bindPhoneNumber(options) {
    try {
      const params = {
        phone: options.phoneNumber,
        smsCode: options.verificationCode,
      };
      const requestOptions = {
        url: '/lc/user/bindPhone',
        method: 'post',
        params,
      };
      const response = await request(requestOptions);
      return handlerResponse(response);
    } catch (error) {
      throw new Error(error);
    }
  }

  // 乘客预约行程
  static async orderLink(options) {
    try {
      const params = {
        travelId: options.travelId,
        fromStation: options.fromAddress,
        toStation: options.toAddress,
        startTime: options.departureTime,
        peopleNumber: options.passengerNumber,
      };
      const requestOptions = {
        url: '/lc/link/orderLink',
        method: 'post',
        params,
      };
      const response = await request(requestOptions);
      return handlerResponse(response);
    } catch (error) {
      throw new Error(error);
    }
  }

  // 乘客取消行程
  static async cancelLink(options) {
    try {
      const params = {
        linkId: options,
      };
      const requestOptions = {
        url: '/lc/link/cancelLink',
        method: 'post',
        params,
      };
      const response = await request(requestOptions);
      return handlerResponse(response);
    } catch (error) {
      throw new Error(error);
    }
  }

  // 乘客完成行程
  static async overLink(options) {
    try {
      const params = {
        linkId: options,
      };
      const requestOptions = {
        url: '/lc/link/overLink',
        method: 'post',
        params,
      };
      const response = await request(requestOptions);
      return handlerResponse(response);
    } catch (error) {
      throw new Error(error);
    }
  }

  // 用户搜索行程(发起预定的行程)
  static async getTravel(options) {
    try {
      const requestOptions = {
        url: '/lc/travel/getTravel',
        method: 'get',
        params: {
          type: options,
        },
      };
      const response = await request(requestOptions);
      return handlerResponse(response);
    } catch (error) {
      throw new Error(error);
    }
  }

  // 乘客评价司机
  static async appraiseUser(options) {
    try {
      const params = {
        userId: options.userId,
        type: options.type,
      };
      const requestOptions = {
        url: '/lc/user/appraiseUser',
        method: 'post',
        params,
      };
      const response = await request(requestOptions);
      return handlerResponse(response);
    } catch (error) {
      throw new Error(error);
    }
  }
}

export default NewsService;
