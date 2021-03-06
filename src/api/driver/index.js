import request from '@utils/request';
import { handlerResponse } from '@utils/auth';

class driverService {
  // 获取单价
  static async getPrices() {
    try {
      const requestOptions = {
        url: '/lc/travel/getPrices',
        method: 'get',
      };
      const response = await request(requestOptions);
      return handlerResponse(response);
    } catch (error) {
      throw new Error(error);
    }
  }

  // 司机查询行程
  static async getTravelList(options) {
    try {
      const requestOptions = {
        url: '/lc/travel/getTravelList',
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

  // 司机查询最后一条行程
  static async getLastTravel() {
    try {
      const requestOptions = {
        url: '/lc/travel/getLastTravel',
        method: 'get',
      };
      const response = await request(requestOptions);
      return handlerResponse(response);
    } catch (error) {
      throw new Error(error);
    }
  }

  // 司机刷新行程
  static async refreshTravel(options) {
    try {
      const requestOptions = {
        url: '/lc/travel/refreshTravel',
        method: 'get',
        params: {
          travelId: options, // 出发地
        },
      };
      const response = await request(requestOptions);
      return handlerResponse(response);
    } catch (error) {
      throw new Error(error);
    }
  }

  // 司机发布行程
  static async publishTravel(options) {
    try {
      const requestOptions = {
        url: '/lc/travel/publishTravel',
        method: 'post',
        params: {
          fromStation: options.fromAddress, // 出发地
          toStation: options.toAddress, // 目的地
          startTime: options.departureTime, // 出发时间
          fee: options.unitPrice, // 单价
          stations: options.allSites, // 途径站点
        },
      };
      const response = await request(requestOptions);
      return handlerResponse(response);
    } catch (error) {
      throw new Error(error);
    }
  }


  // 司机撤销行程
  static async destroyTravel(options) {
    try {
      const requestOptions = {
        url: '/lc/travel/destroyTravel',
        method: 'post',
        params: {
          travelId: options,
        },
      };
      const response = await request(requestOptions);
      return handlerResponse(response);
    } catch (error) {
      throw new Error(error);
    }
  }

  // 司机完成行程
  static async overTravel(options) {
    try {
      const requestOptions = {
        url: '/lc/travel/overTravel',
        method: 'post',
        params: {
          travelId: options,
        },
      };
      const response = await request(requestOptions);
      return handlerResponse(response);
    } catch (error) {
      throw new Error(error);
    }
  }

  // 录入车辆信息
  static async saveCarInfo(options) {
    try {
      const requestOptions = {
        url: '/lc/user/saveCarInfo',
        method: 'post',
        params: {
          carPic: options.fileList, // 车辆图片连接
          carNumber: options.carNumber, // 车牌号
          carColor: options.selectedCaColorRadio, // 车辆颜色
          carCapacity: options.selectedPassengerNumberRadio, // 载客人数
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

  // 司机拒绝预定
  static async rejectLink(options) {
    try {
      const requestOptions = {
        url: '/lc/link/rejectLink',
        method: 'post',
        params: {
          linkId: options,
        },
      };
      const response = await request(requestOptions);
      return handlerResponse(response);
    } catch (error) {
      throw new Error(error);
    }
  }

  // 司机确认预定
  static async confirmLink(options) {
    try {
      const requestOptions = {
        url: '/lc/link/confirmLink',
        method: 'post',
        params: {
          linkId: options,
        },
      };
      const response = await request(requestOptions);
      return handlerResponse(response);
    } catch (error) {
      throw new Error(error);
    }
  }

  // 司机分享行程
  static async shareSchedule(options) {
    try {
      const requestOptions = {
        url: '/wx/signature.do',
        method: 'get',
        params: {
          url: options,
        },
      };
      const response = await request(requestOptions);
      return handlerResponse(response);
    } catch (error) {
      throw new Error(error);
    }
  }

  // 获取司机分享详情页面信心
  static async getShareScheduleInfo(options) {
    try {
      const requestOptions = {
        url: '/lc/travel/getSharedTravel',
        method: 'get',
        params: {
          travelId: options,
        },
      };
      const response = await request(requestOptions);
      return handlerResponse(response);
    } catch (error) {
      throw new Error(error);
    }
  }

  // 获取图片上传的临时密匙
  static async getUploadInfo() {
    try {
      const requestOptions = {
        url: '/cos/getCredentials.do',
        method: 'get',
      };
      const response = await request(requestOptions);
      return handlerResponse(response);
    } catch (error) {
      throw new Error(error);
    }
  }
}

export default driverService;
