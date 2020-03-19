<template>
    <div class="driverBindingPhone">
      <!--头部-->
      <CarpoolingHeader title="绑定手机号" class="header"/>
      <BindingPhoneContent user-type="user" class="phoneContentClass"/>
    </div>
</template>

<script>
import CarpoolingHeader from '@component/CarpoolingHeader.vue';
import BindingPhoneContent from './components/BindingPhoneContent.vue';

export default {
  name: 'DriverBindingPhone',

  components: {
    CarpoolingHeader,
    BindingPhoneContent,
  },
};
</script>

<style lang="scss" scoped>
  .driverBindingPhone{
    width: 100%;
    height: 100%;
    background: #EDEDED;
    .phoneContentClass{
      width: 355px;
      height: 258px;
      margin: 20px auto 0;
      background: #FFFFFF;
      border-radius: 12px;
      overflow: hidden;
    }
  }
</style>
