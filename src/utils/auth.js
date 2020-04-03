
const OPENID = 'openId';
export const getOpenId = () => window.localStorage.getItem(OPENID);
export const removeOpenId = () => window.localStorage.removeItem(OPENID);
export const setOpenId = openId => window.localStorage.setItem('openId', openId);


export const handlerResponse = (response) => {
  const data = response && response.data;
  if (response.status !== 200) {
    const error = (data && data.error) || response.statusText;
    return Promise.reject(error);
  }
  return Promise.resolve(data);
};

export const handlerSuccessResponse = (response) => {
  if (!response || !(response.code === 1)) {
    return Promise.reject(response.msg);
  }
  return Promise.resolve(response.data);
};
