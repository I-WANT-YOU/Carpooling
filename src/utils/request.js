import axios from 'axios';
import baseUrl from '../config/baseUrl';
import { getOpenId } from './auth';

const request = axios.create({
  timeout: 20000,
  baseURL: baseUrl,
});

request.interceptors.request.use(
  (config) => {
    const requestConfig = config;
    const openId = getOpenId();
    if (openId) {
      requestConfig.headers.openid = openId;
    }
    // requestConfig.headers.openid = 'owyTewkhEHeiBrN7-mZ25qWYmn40';
    requestConfig.headers.language = 'ZH_CN';
    return requestConfig;
  },
  error => Promise.reject(error),
);

request.interceptors.response.use(
  response => response,
  (error) => {
    let errorMessage = '';
    if (error) {
      errorMessage = '网络错误';
    }
    Promise.reject(errorMessage);
  },
);

export default request;
