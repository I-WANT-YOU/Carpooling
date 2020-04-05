<template>
    <div class="driverBindingPhone">
      <!--头部-->
      <BindingPhoneContent user-type="user" class="phoneContentClass"/>
    </div>
</template>

<script>
import { getWeiXinCode, resetUrl } from '@utils/tools';
import BindingPhoneContent from './components/BindingPhoneContent.vue';

export default {
  name: 'DriverBindingPhone',
  components: {
    BindingPhoneContent,
  },
  async created() {
    const openId = window.localStorage.getItem('openId');
    if (openId === null || openId === '') {
      window.localStorage.setItem('openId', 'currentOpenId');
      resetUrl();
    }
  },
  async mounted() {
    const openId = window.localStorage.getItem('openId');
    if (openId === null || openId === '' || openId === 'currentOpenId') {
      await getWeiXinCode();
    }
  },
};
</script>

<style lang="scss" scoped>
  .driverBindingPhone{
    width: 100vw;
    height: 100vh;
    background: #EDEDED;
    overflow: hidden;
    .phoneContentClass{
      width: 355px;
      height: 268px;
      margin: 20px auto 0;
      background: #FFFFFF;
      border-radius: 12px;
    }
  }
</style>
