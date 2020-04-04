import axios from 'axios';
import baseUrl from '../config/baseUrl';
import { getOpenId } from './auth';

const request = axios.create({
  timeout: 5000,
  baseURL: baseUrl,
});

request.interceptors.request.use(
  (config) => {
    const requestConfig = config;
    const openId = getOpenId();
    if (openId) {
      requestConfig.headers.openid = 'passengerOpenId';
    }
    // requestConfig.headers.openid = 'owyTewkhEHeiBrN7-mZ25qWYmn40';
    requestConfig.headers.language = 'ZH_CN';
    return requestConfig;
  },
  error => Promise.reject(error),
);

request.interceptors.response.use(
  response => response,
  error => Promise.reject(error),
);

export default request;
