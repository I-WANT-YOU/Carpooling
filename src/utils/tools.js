import { Toast } from 'vant';
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
