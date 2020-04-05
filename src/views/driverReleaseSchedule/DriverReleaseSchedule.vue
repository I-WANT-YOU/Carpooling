<template>
  <div class="passengerCarpoolingContainer">
    <div class="passengerCarpooling">
      <!--头部-->
      <CarpoolingHeader/>
      <div class="content-text">
        <span>发布行程即可接单</span>
        <span>时间灵活，多劳多得</span>
      </div>
      <!--乘车信息-->
      <RideDetailCard
        userType="driver"
        @showAddress="showAddress"
        @showDate="showDate"
        @showPassengerNumber="showPassengerNumber"
        @showBindingPhone="showBindingPhonePop=true"
        @showAllSites="showSitesPop=true"
        @showUnitPrice="showUnitPricePop=true"
        :confirmFromAddress="confirmFromAddress"
        :confirmToAddress="confirmToAddress"
        :confirmDate="confirmDate"
        :confirmPassengerNumber="confirmPassengerNumber"
        :confirmUnitPrice="confirmUnitPrice"
        :confirmSites="confirmSites"
      />
      <!--地址选择列表-->
      <AddressSelect userType="driver" :stationType="stationType" :showAddressPop="showAddressPop" :addressSelectValue="addressSelectValue" @closeAddressPop="showAddressPop=false" @getConfirmAddress="getConfirmAddress"/>
      <!--时间选择列表-->
      <DateSelect userType="driver" :showDatePop="showDatePop" @closeDatePop="showDatePop=false" @getSelectedDate="getSelectedDate"/>
      <!--乘客人数-->
      <PassengerNumberSelect :showPassengerNumberPop="showPassengerNumberPop" @closeDatePop="showPassengerNumberPop=false"  @getSelectedPassengerNumber="getSelectedPassengerNumber"/>
      <!--绑定手机-->
      <binding-phone :showBindingPhonePop="showBindingPhonePop" @closeBindingPhonePop="showBindingPhonePop=false"  />
      <!--单价选择列表-->
      <UnitPriceSelect :showUnitPricePop="showUnitPricePop" :priceList="prices" @closePricePop="showUnitPricePop=false" @getSelectedPrice="getSelectedPrice"/>
      <!--站点选择列表-->
      <AllSitesSelect :showSitesPop="showSitesPop" @closeAllSitesPop="showSitesPop=false" @getSelectedSites="getSelectedSites" :allStations="allStations"/>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import CarpoolingHeader from '@component/CarpoolingHeader.vue';
import RideDetailCard from '../components/RideDetailCard.vue';
import AddressSelect from '../components/AddressSelect.vue';
import DateSelect from '../components/DateSelect.vue';
import PassengerNumberSelect from '../components/PassengerNumberSelect.vue';
import BindingPhone from '../components/BindingPhone.vue';
import UnitPriceSelect from '../components/UnitPriceSelect.vue';
import AllSitesSelect from '../components/AllSitesSelect.vue';

export default {
  name: 'PassengerCarpooling',
  data() {
    return {
      showAddressPop: false, // 地址弹窗
      addressSelectValue: false, // 地址
      showDatePop: false, // 时间弹窗
      showPassengerNumberPop: false, // 人数弹窗
      showBindingPhonePop: false, // 绑定手机号弹窗
      showUnitPricePop: false, // 单价弹窗
      showSitesPop: false, // 站点弹窗
      confirmFromAddress: '', // 出发地
      confirmToAddress: '', // 目的地
      addressType: '', // 区分是出发还是目的地
      confirmDate: '', // 出发时间
      confirmPassengerNumber: '', // 乘车人数
      confirmUnitPrice: '', // 乘车单价
      confirmSites: '',
      stationType: '', // 区分目的地和出发地
    };
  },
  components: {
    CarpoolingHeader,
    RideDetailCard,
    AddressSelect,
    DateSelect,
    PassengerNumberSelect,
    BindingPhone,
    UnitPriceSelect,
    AllSitesSelect,
  },
  computed: {
    ...mapState('passenger', ['subwayStations', 'villageStations']),
    ...mapState('driver', ['prices', 'lastTravelList']),
    allStations() {
      return this.villageStations;
    },
  },
  methods: {
    ...mapActions('passenger', ['getSubwayStations', 'getVillageStations']),
    ...mapActions('driver', ['getPrices', 'getLastTravel']),
    /*
     接口方法
     */
    // 获取站点列表和单价
    async getAllSites() {
      try {
        this.showLoadingToastWithoutOverlay();
        await this.getVillageStations('1');
        await this.getSubwayStations('2');
        await this.getPrices();
        await this.getLastTravel();
        this.clearLoadingToast();
      } catch (e) {
        this.clearLoadingToast();
        this.showToast(e);
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
    // 获取单价
    getSelectedPrice(value) {
      this.confirmUnitPrice = value;
    },
    // 获取站点
    getSelectedSites(value) {
      this.confirmSites = JSON.stringify(value);
    },
  },
  mounted() {
    this.getAllSites();
  },
  beforeRouteLeave(to, from, next) {
    // 设置下一个路由的 meta
    if (to.path !== '/inputCarInfo') {
      from.meta.keepAlive = false; // 让 A 不缓存，即刷新
    }
    next();
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
      height: inherit;
      background:url("../../assets/bgImage.png") no-repeat fixed center bottom;
      .content-text{
        height: 56px;
        padding: 0 24px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        >span:nth-child(1){
          font-size: 16px;
          color: #333333;
          letter-spacing: 0;
          line-height: 16px;
        }
        >span:nth-child(2){
          font-size: 12px;
          color: #999999;
          letter-spacing: 0;
          line-height: 12px;
        }
      }
    }
  }


</style>
