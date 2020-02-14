<template>
    <div class="passengerCarpooling">
      <!--头部-->
      <CarpoolingHeader/>
      <!--乘车信息-->
      <RideDetailCard userType="passenger" @showAddress="showAddress" @showDate="showDate" :confirmFromAddress="confirmFromAddress" :confirmToAddress="confirmToAddress" :confirmDate="confirmDate"/>
      <!--地址选择列表-->
      <AddressSelect :showAddressPop="showAddressPop" :addressSelectValue="addressSelectValue" @closeAddressPop="showAddressPop=false" @getConfirmAddress="getConfirmAddress"/>
      <!--时间选择列表-->
      <DateSelect :showDatePop="showDatePop" @closeDatePop="showDatePop=false" @getSelectedDate="getSelectedDate"/>
    </div>
</template>

<script>
import CarpoolingHeader from '@component/CarpoolingHeader.vue';
import RideDetailCard from '../components/RideDetailCard.vue';
import AddressSelect from '../components/AddressSelect.vue';
import DateSelect from '../components/DateSelect.vue';

export default {
  name: 'PassengerCarpooling',
  data() {
    return {
      showAddressPop: false, // 地址弹窗
      addressSelectValue: false, // 地址
      showDatePop: false, // 时间弹窗
      confirmFromAddress: '', // 出发地
      confirmToAddress: '', // 目的地
      addressType: '', // 区分是出发还是目的地
      confirmDate: '', // 出发时间
    };
  },
  components: {
    CarpoolingHeader,
    RideDetailCard,
    AddressSelect,
    DateSelect,
  },
  methods: {
    // 展示地点
    showAddress(value) {
      this.showAddressPop = true;
      this.addressType = value;
      this.addressSelectValue = true;
    },
    showDate() {
      this.showDatePop = true;
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
      this.confirmDate = `${value}出发`;
    },
  },
};
</script>

<style lang="scss" scoped>
  .passengerCarpooling{
    width: 100%;
    height: 100%;
    background:url("./images/bg.png") no-repeat;
    background-size: 100vw 100vh;
  }

</style>
