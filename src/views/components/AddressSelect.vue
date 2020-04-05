<template>
  <div class="addressPopContainer">
    <van-popup
      v-model="showPop"
      :close-on-click-overlay="false"
      position="bottom"
      :style="{ background: 'rgba(0,0,0,0.6)'}">
      <div class="contentSelect">
        <!--头部-->
        <div class="title" >
          <div style="display: inline-block" @click="close"> <svg-icon icon-class="close" class="icon-class"/></div>
        </div>
        <!--文字描述-->
        <div class="text-describe">
          <div>
            <span class="text-one" v-show="stationType==='fromAddress'">{{userType==='driver'?'您要从哪发车':'您要从哪儿上车'}}</span>
            <span class="text-one"  v-show="stationType==='toAddress'">您要去哪</span>
          </div>
          <div class="text-two">
            <span>目前只能选择从</span>
            <span class="text-three">  小区站点</span>
            <span> 往返 </span>
            <span class="text-three">  潞城地铁站  </span>
            <span>的拼车行程</span>
          </div>
        </div>
        <!--选择列表-->
        <van-divider class="line"></van-divider>
        <!--时间tab选择-->
        <div class="list-tabs"  v-if="showAddressPop">
          <button  :class="site?'active-class':'un-active-class'" @click="changeAddress('village')">小区站点</button>
          <button  :class="!site?'active-class':'un-active-class'" @click="changeAddress('subway')">潞城地铁站</button>
        </div>
        <!--地址列表-->
        <div class="address-list-container"  v-if="showAddressPop">
          <SelectList ref="village" :areaList="areaListOne" @getSelectedValue="getSelectedValueVillage" class="width-style"/>
          <SelectList ref='subway'  :areaList="areaListTwo"  @getSelectedValue="getSelectedValueSubway" class="width-style"/>
        </div>
        <!--行程确认按钮-->
        <CarpoolingButton class="confirmButton" :buttonText="buttonText"  @click.native="confirmAddress"/>
      </div>
    </van-popup>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { Divider, Popup } from 'vant';
import CarpoolingButton from '@component/CarpoolingButton.vue';
import SelectList from './AddressSelectList.vue';


export default {
  name: 'AddressSelect',
  data() {
    return {
      showPop: false, // 是否展示
      site: true,
      villageSite: '请选择出发地点',
      subwaySite: '请选择出发地点',
      buttonText: '请选择出发地点',
      confirmAddressValue: '',
      areaListOne: {},
      areaListTwo: {},
    };
  },
  props: {
    // 是否展示pop
    showAddressPop: {
      type: Boolean,
      default: false,
    },
    // 乘客 司机
    userType: {
      type: String,
      default: '',
    },
    // 出发地 目的地
    stationType: {
      type: String,
      default: '',
    },
  },
  components: {
    'van-divider': Divider,
    'van-popup': Popup,
    SelectList,
    CarpoolingButton,
  },
  watch: {
    showAddressPop() {
      this.showPop = this.showAddressPop;
    },
    // 格式化地址选项
    formatVillageStations(value) {
      this.$set(this.areaListOne, 'province_list', value);
    },
    formatSubwayStations(value) {
      this.$set(this.areaListTwo, 'province_list', value);
    },
    // 设置初始地点选择
    showPop() {
      this.site = true;
      this.areaListTwo = {};
      this.buttonText = `确认从${this.formatVillageStations[0]}出发`;
      this.confirmAddressValue = '';
      this.villageSite = `确认从${this.formatVillageStations[0]}出发`;
      this.subwaySite = `确认从${this.formatSubwayStations[0]}出发`;
      this.$set(this.areaListOne, 'province_list', this.formatVillageStations);
    },
  },
  computed: {
    ...mapState('passenger', ['villageStations', 'subwayStations']),
    formatVillageStations() {
      const currentStations = {};
      for (let index = 0; index < this.villageStations.length; index += 1) {
        currentStations[index] = this.villageStations[index];
      }
      return currentStations;
    },
    formatSubwayStations() {
      const currentStations = {};
      for (let i = 0; i < this.subwayStations.length; i += 1) {
        currentStations[i] = this.subwayStations[i];
      }
      return currentStations;
    },
  },
  methods: {
    /*
     非接口方法
     */

    // 改变选择地址列表
    changeAddress(site) {
      if (site === 'village') {
        this.site = true;
        this.$set(this.areaListOne, 'province_list', this.formatVillageStations);
        this.areaListTwo = {};
        this.buttonText = this.villageSite;
      } else {
        this.site = false;
        this.areaListOne = {};
        this.$set(this.areaListTwo, 'province_list', this.formatSubwayStations);
        this.buttonText = this.subwaySite;
      }
    },
    close() {
      this.$emit('closeAddressPop', false);
    },
    // 获取小区站点信息
    getSelectedValueVillage(value) {
      if (value === '请选择') {
        this.villageSite = '请选择出发地点';
        this.buttonText = this.villageSite;
      } else {
        this.villageSite = `确认${value}出发`;
        this.buttonText = this.villageSite;
        this.confirmAddressValue = value;
      }
    },
    // 获取地铁站点信息
    getSelectedValueSubway(value) {
      if (value === '请选择') {
        this.subwaySite = '请选择出发地点';
        this.buttonText = this.subwaySite;
      } else {
        this.subwaySite = `确认${value}出发`;
        this.buttonText = this.subwaySite;
        this.confirmAddressValue = value;
      }
    },
    // 确认行程
    confirmAddress() {
      this.$emit('getConfirmAddress', this.buttonText.substring(3, this.buttonText.length - 2));
      this.$emit('closeAddressPop', false);
    },
  },
};
</script>

<style lang="scss" scoped>
  .addressPopContainer{
    .contentSelect{
      height: 356px;
      background: #FFFFFF;
      .title{
        height: 54px;
        text-align: right;
        .icon-class{
          width: 15px;
          height: 15px;
          padding: 14px 14px;
        }
      }
      .text-describe{
        margin-left: 24px;
        .text-one{
          display: block;
          font-size: 16px;
          color: #333333;
          letter-spacing: 0;
          line-height: 16px;
        }
        .text-two{
          height: 12px;
          margin: 8px auto 17px;
          font-size: 12px;
          color: #999999;
          letter-spacing: 0;
          line-height: 12px
        }
        .text-three{
          color: #270000;
        }
      }
      /*横线样式*/
      .line{
        opacity: 0.1;
        margin: auto;
        width: 327px;
        border-color: #000000;
      }
      /*列表选择*/
      .list-tabs{
        height: 40px;
        line-height: 40px;
        display: flex;
        justify-content: center;
        align-items: center;
        .active-class{
          width: 40%;
          border: none;
          background: none;
          text-align: center;
          font-size: 17px;
          color: rgba(0,0,0,0.90);
          letter-spacing: 0;
        }
        .un-active-class{
          width: 40%;
          border: none;
          background: none;
          text-align: center;
          font-size: 14px;
          color: #999999;
          letter-spacing: 0;
          line-height: 18px;
        }
      }
      .address-list-container{
        display: flex;
        justify-content: center;
        .width-style{
          width: 40%;
        }
      }
      .confirmButton{
        margin: 22px auto 0;
      }
    }
  }
</style>
