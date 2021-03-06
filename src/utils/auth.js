
const OPENID = 'openId';
export const getOpenId = () => window.localStorage.getItem(OPENID);
export const removeOpenId = () => window.localStorage.removeItem(OPENID);
export const setOpenId = openId => window.localStorage.setItem('openId', openId);


export const handlerResponse = (response) => {
  const data = response && response.data;
  if (data) {
    if (response.status !== 200) {
      //  const error = (data && data.error) || response.statusText;
      const error = '网络错误';
      return Promise.reject(error);
    }
    return Promise.resolve(data);
  }
  const error = '网络错误';
  return Promise.reject(error);
};

export const handlerSuccessResponse = (response, type) => {
  if (!response || !(response.code === 1)) {
    if (type) {
      return Promise.reject(response);
    }
    return Promise.reject(response.msg);
  }
  return Promise.resolve(response.data);
};
