<template>
  <!--遮罩层-->
  <div class="allSitesSelect">
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
          <span class="text-one">请选择途经的站点，可选多个</span>
          <div class="text-two">
            <span>每个站点，都可以接到乘客</span>
          </div>
        </div>
        <!--选择列表-->
        <div class="sitesContainer">
          <van-checkbox-group v-model="sitesCheckedValues" class="check-group">
            <MyCheck v-for="(siteItem,index) in allSitesList" :key="index" :siteItem="siteItem"  class="checkClass"/>
          </van-checkbox-group>
        </div>
        <!--行程确认按钮-->
        <CarpoolingButton class="confirmButton" :buttonText="buttonText" @click.native="confirmSelectedSites"/>
      </div>
    </van-popup>
  </div>
</template>

<script>
import { Popup, CheckboxGroup } from 'vant';
import CarpoolingButton from '@component/CarpoolingButton.vue';
import MyCheck from './MyCheck.vue';


export default {
  name: 'AllSitesSelect',
  data() {
    return {
      showPop: false,
      buttonText: '确认站点的单价',
      sitesCheckedValues: [],
      allSitesList: [],
    };
  },
  props: {
    showSitesPop: {
      type: Boolean,
      default: false,
    },
    allStations: {
      type: Array,
      default: () => [],
    },
  },
  watch: {
    showSitesPop() {
      this.showPop = this.showSitesPop;
    },
    allStations(value) {
      this.allSitesList = value;
    },
  },
  components: {
    'van-popup': Popup,
    'van-checkbox-group': CheckboxGroup,
    MyCheck,
    CarpoolingButton,
  },
  methods: {
    close() {
      this.$emit('closeAllSitesPop', false);
    },
    // 确认选中的时间
    confirmSelectedSites() {
      if (this.sitesCheckedValues.length === 0) {
        this.showToast('请选择站点');
      } else {
        this.$emit('getSelectedSites', this.sitesCheckedValues);
        this.close();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
  .allSitesSelect{
    .contentSelect{
      height: 390px;
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
      }
      /*站点样式*/
      .sitesContainer{
        height: 180px;
        overflow: scroll;
        padding: 10px 0 0 24px;
        .check-group{
          display: flex;
          flex-wrap: wrap;
          .checkClass{
            width: 33%;
            margin:0 10px 10px 0;
          }
          .checkClass:nth-child(3n){
            margin-right: 0;
          }
        }
      }
      .confirmButton{
        margin: 22px auto 22px;
      }
    }
  }
</style>
