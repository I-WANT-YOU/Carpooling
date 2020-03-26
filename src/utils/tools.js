import { Toast } from 'vant';
import store from '@/store';

// 调用接口的通用化格式化
export const callApi = async (fun, message, params = null) => {
  try {
    Toast.loading({
      message: '加载中...',
      forbidClick: true,
      duration: 0,
      overlay: true,
    });
    await fun(params);
    Toast.clear();
    if (message && message !== '') {
      Toast(message);
    }
    return true;
  } catch (e) {
    Toast.clear();
    Toast(e);
    return false;
  }
};

/* 获取路径参数 */
export const getUrlParams = (name) => {
  const reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`);
  const r = window.location.search.substr(1).match(reg);
  if (r !== null) return unescape(r[2]);
  return null;
};

/* 判断是否微信浏览器 */
export const isWeiXin = () => {
  const ua = window.navigator.userAgent.toLowerCase();
  return ua.match(/MicroMessenger/i) === 'micromessenger';
};

/* 微信授权 */
export const getWeiXinAuth = () => {
  // 在微信中打开
  Toast('2');
  // if (isWeiXin()) {
  //
  // }
  const banklink = encodeURIComponent(window.location.href);// 提交时，网页中
  const link = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx66054f01909d36b2&redirect_uri=${banklink}&response_type=code&scope=snsapi_base&state=lcstate#wechat_redirect`;// 测试
  window.location.href = link;
};

/* 获取code */
export const getWeiXinCode = async () => {
  Toast(window.location.href);
  const code = getUrlParams('code');
  // let state = getUrlParams('state');
  if (code !== null || code !== '') { // （如果有这个code则执行下面的）
    Toast(`1${window.location.href}`);
    return 'code不是空';
  }
  getWeiXinAuth();
  Toast(`2${window.location.href}`);
  return 'code时空';
  // code = getUrlParams('code');

  // state = getUrlParams('state');
  // 获取openid
  // await store.dispatch('getOpenId', {
  //   code,
  //   state,
  // });
};
