import Vue from 'vue';
import { Toast } from 'vant';

Vue.mixin({
  methods: {
    showToast(message) {
      Toast(message);
    },
  },
});
