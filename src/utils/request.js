import axios from 'axios';
import baseUrl from '../config/baseUrl';

const request = axios.create({
  timeout: 5000,
  baseURL: baseUrl,
});

request.interceptors.request.use(
  (config) => {
    const requestConfig = config;

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
