<template>
  <div class="passengerCarpoolingContainer">
    <div class="passengerCarpooling">
      <!--头部-->
      <CarpoolingHeader/>
      <!--乘车信息-->
      <div class="title-info">预约即可拼车</div>
      <RideDetailCard
        userType="passenger"
        @showAddress="showAddress"
        @showDate="showDate"
        @showPassengerNumber="showPassengerNumber"
        @showBindingPhone="showBindingPhonePop=true"
        :confirmFromAddress="confirmFromAddress"
        :confirmToAddress="confirmToAddress"
        :confirmDate="confirmDate"
        :confirmPassengerNumber="confirmPassengerNumber"/>
      <!--地址选择列表-->
      <AddressSelect
        userType="passenger" :stationType="stationType"
        :showAddressPop="showAddressPop"
        :addressSelectValue="addressSelectValue"
        @closeAddressPop="showAddressPop=false"
        @getConfirmAddress="getConfirmAddress"/>
      <!--时间选择列表-->
      <DateSelect userType="passenger" :showDatePop="showDatePop" @closeDatePop="showDatePop=false" @getSelectedDate="getSelectedDate"/>
      <!--乘客人数-->
      <PassengerNumberSelect :showPassengerNumberPop="showPassengerNumberPop" @closeDatePop="showPassengerNumberPop=false"  @getSelectedPassengerNumber="getSelectedPassengerNumber"/>
      <!--绑定手机-->
      <binding-phone :showBindingPhonePop="showBindingPhonePop" @closeBindingPhonePop="showBindingPhonePop=false"  />
    </div>
  </div>

</template>

<script>
import CarpoolingHeader from '@component/CarpoolingHeader.vue';
import { mapActions } from 'vuex';
import RideDetailCard from '../components/RideDetailCard.vue';
import AddressSelect from '../components/AddressSelect.vue';
import DateSelect from '../components/DateSelect.vue';
import PassengerNumberSelect from '../components/PassengerNumberSelect.vue';
import BindingPhone from '../components/BindingPhone.vue';

export default {
  name: 'PassengerCarpooling',
  data() {
    return {
      showAddressPop: false, // 地址弹窗
      addressSelectValue: false, // 地址
      showDatePop: false, // 时间弹窗
      showPassengerNumberPop: false, // 人数弹窗
      showBindingPhonePop: false, // 绑定手机号弹窗
      confirmFromAddress: '', // 出发地
      confirmToAddress: '', // 目的地
      addressType: '', // 区分是出发还是目的地
      confirmDate: '', // 出发时间
      confirmPassengerNumber: '', // 乘车人数
      stationType: '', // 区分目的地还是出发地
    };
  },
  components: {
    CarpoolingHeader,
    RideDetailCard,
    AddressSelect,
    DateSelect,
    PassengerNumberSelect,
    BindingPhone,
  },
  methods: {
    ...mapActions('passenger', ['getSubwayStations', 'getVillageStations', 'getUserInfo']),
    /*
     接口方法
    */
    // 获取站点列表
    async getAllSites() {
      try {
        this.showLoadingToastWithoutOverlay();
        await this.getVillageStations('1');
        await this.getSubwayStations('2');
        await this.getUserInfo();
        this.clearLoadingToast();
      } catch (e) {
        if (e && e.code && e.code === -1) {
          this.clearLoadingToast();
        } else {
          this.clearLoadingToast();
          this.showToast(e);
        }
      }
    },
    // 展示地点pop
    showAddress(value) {
      this.showAddressPop = true;
      this.addressType = value;
      this.addressSelectValue = true;
      this.stationType = value;
    },
    // 展示时间pop
    showDate() {
      this.showDatePop = true;
    },
    // 展示人数pop
    showPassengerNumber() {
      this.showPassengerNumberPop = true;
    },
    // 获取行程地点
    getConfirmAddress(value) {
      if (this.addressType === 'fromAddress') {
        this.confirmFromAddress = value;
      } else {
        this.confirmToAddress = value;
      }
    },
    // 获取出发时间
    getSelectedDate(value) {
      this.confirmDate = value;
    },
    // 获取乘车人数
    getSelectedPassengerNumber(value) {
      this.confirmPassengerNumber = value;
    },
  },
  async mounted() {
    await this.getAllSites(); // 获取多有站点
  },
};
</script>

<style lang="scss" scoped>
  .passengerCarpoolingContainer{
    width: 100%;
    height: 100%;
    background-image: linear-gradient(1deg, #FFFFFF 20%, #DCEBF4 86%);
    .passengerCarpooling{
      width: 100%;
      height: 100%;
      background: url("../../assets/bgImage.png") no-repeat fixed center bottom;
      .title-info{
        height: 56px;
        margin-left: 24px;
        font-size: 16px;
        color: #333333;
        letter-spacing: 0;
        line-height: 56px;
      }
    }
  }
</style>
