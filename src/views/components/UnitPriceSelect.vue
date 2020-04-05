<template>
  <!--遮罩层-->
  <div class="datePopContainer">
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
          <span class="text-one">请选择每个乘客乘车需付的单价</span>
          <div class="text-two">
            <span>如果站点的乘客人数不同，价格也会有所变化</span>
          </div>
        </div>
        <!--选择列表-->
        <div class="sitesContainer">
          <van-radio-group v-model="selectedUnitPriceValue" class="radio-group">
            <MyRadio v-for="(priceItem,index) in priceList" :key="index" :price-value="priceItem" otherText="元/人" class="radioClass"/>
          </van-radio-group>
        </div>
        <!--行程确认按钮-->
        <CarpoolingButton class="confirmButton" :buttonText="buttonText" @click.native="confirmSelectedDate"/>
      </div>
    </van-popup>
  </div>
</template>

<script>
import { Popup, RadioGroup } from 'vant';
import CarpoolingButton from '@component/CarpoolingButton.vue';
import MyRadio from './MyRadio.vue';


export default {
  name: 'UnitPriceSelect',
  data() {
    return {
      showPop: false,
      buttonText: '确认站点的单价',
      selectedUnitPriceValue: 0,
      // priceList: ['7', '8', '10', '18', '33', '99'],
    };
  },
  props: {
    showUnitPricePop: {
      type: Boolean,
      default: false,
    },
    priceList: {
      type: Array,
      default: () => [],
    },
  },
  watch: {
    showUnitPricePop() {
      this.showPop = this.showUnitPricePop;
    },
  },
  components: {
    'van-popup': Popup,
    'van-radio-group': RadioGroup,
    MyRadio,
    CarpoolingButton,
  },
  methods: {

    close() {
      this.$emit('closePricePop', false);
    },
    // 确认选中的时间
    confirmSelectedDate() {
      this.$emit('getSelectedPrice', this.selectedUnitPriceValue);
      this.close();
    },
  },
};
</script>

<style lang="scss" scoped>
  .datePopContainer{
    .contentSelect{
      height: 287px;
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
        padding: 10px 0 0 24px;
        .radio-group{
          display: flex;
          flex-wrap: wrap;
          .radioClass{
            width: 30%;
            margin-bottom: 20px;
          }
        }
      }
      .confirmButton{
        margin: 22px auto 0;
      }
    }
  }
</style>
