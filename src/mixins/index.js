import Vue from 'vue';
import { Toast } from 'vant';

Vue.mixin({
  methods: {
    showToast(message) {
      Toast(message);
    },
    showLoadingToast() {
      Toast.loading({
        message: '加载中...',
        forbidClick: true,
        duration: 0,
        overlay: true,
      });
    },
    showLoadingToastWithoutOverlay() {
      Toast.loading({
        message: '加载中...',
        forbidClick: true,
        duration: 0,
        overlay: false,
      });
    },
    clearLoadingToast() {
      Toast.clear();
    },
  },
});
