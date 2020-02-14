const LANGUAGE_KEY = 'BGAIN_LANGUAGE';

export const getLanguage = () => window.localStorage.getItem(LANGUAGE_KEY) || 'zh-CN';

export const removeLanguage = () => window.localStorage.removeItem(LANGUAGE_KEY);

export const setLanguage = language => window.localStorage.setItem(LANGUAGE_KEY, language);

export const handlerResponse = (response) => {
  const data = response && response.data;
  if (response.status !== 200) {
    const error = (data && data.error) || response.statusText;
    return Promise.reject(error);
  }
  return Promise.resolve(data);
};

export const handlerSuccessResponse = (response) => {
  if (!response || !(response.code === 0)) {
    return Promise.reject(response.msg);
  }
  return Promise.resolve(response.data);
};
