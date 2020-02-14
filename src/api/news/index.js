import { isNaN } from 'lodash';
import request from '@utils/request';
import { handlerResponse } from '@utils/auth';

class NewsService {
  // 获取新闻列表
  static async getNewsList(options) {
    try {
      const requestOptions = {
        url: '/homepage/news',
        method: 'post',
        data: {
          page_num: options.pageNum,
          page_size: options.pageSize,
          year: isNaN(options.year * 1) ? null : options.year,
        },
      };
      const response = await request(requestOptions);
      return handlerResponse(response);
    } catch (error) {
      throw new Error(error);
    }
  }

  // 获取新闻详情
  static async getNewsDetail(id) {
    try {
      const requestOptions = {
        url: `/homepage/news/${id}`,
        method: 'get',
      };
      const response = await request(requestOptions);
      return handlerResponse(response);
    } catch (error) {
      throw new Error(error);
    }
  }
}

export default NewsService;
