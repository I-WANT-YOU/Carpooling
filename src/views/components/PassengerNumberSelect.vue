<template>
  <!--遮罩层-->
  <div class="passengerPopContainer">
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
          <span class="text-one">请选择您的乘车人数</span>
          <div class="text-two">
            <span>人数不同，乘车价格也会有所变化</span>
          </div>
        </div>
        <van-radio-group v-model="selectedPassengerNumberValue" class="radio-group">
          <van-radio name="1" :icon-size="17">
            1人
            <img
              class="radio-image"
              slot="icon"
              slot-scope="props"
              :src="props.checked ? icon.activeIcon : icon.inactiveIcon"
            >
          </van-radio>
          <van-radio name="2" :icon-size="17">
            2人
            <img
              class="radio-image"
              slot="icon"
              slot-scope="props"
              :src="props.checked ? icon.activeIcon : icon.inactiveIcon"
            >
          </van-radio>
          <van-radio name="3" :icon-size="17">
            3人
            <img
              class="radio-image"
              slot="icon"
              slot-scope="props"
              :src="props.checked ? icon.activeIcon : icon.inactiveIcon"
            >
          </van-radio>
          <van-radio name="4" :icon-size="17">
            4人
            <img
              class="radio-image"
              slot="icon"
              slot-scope="props"
              :src="props.checked ? icon.activeIcon : icon.inactiveIcon"
            >
          </van-radio>
        </van-radio-group>
        <!--乘客人数取人按钮-->
        <CarpoolingButton class="confirmButton" buttonText="确认拼车" @click.native="confirmSelectedPassengerNumber"/>
      </div>
    </van-popup>
  </div>
</template>

<script>
import { Radio, Popup, RadioGroup } from 'vant';
import CarpoolingButton from '@component/CarpoolingButton.vue';
import inactiveIcon from './images/normal.png';
import activeIcon from './images/active.png';


export default {
  name: 'PassengerNumberSelect',
  data() {
    return {
      icon: {
        inactiveIcon,
        activeIcon,
      },
      showPop: false,
      selectedPassengerNumberValue: '1',
    };
  },
  props: {
    showPassengerNumberPop: {
      type: Boolean,
      default: false,
    },
  },
  watch: {
    showPassengerNumberPop() {
      this.showPop = this.showPassengerNumberPop;
    },
  },
  components: {
    'van-popup': Popup,
    CarpoolingButton,
    'van-radio-group': RadioGroup,
    'van-radio': Radio,
  },
  methods: {
    /* 非接口方法 */
    close() {
      this.$emit('closeDatePop', false);
    },
    // 确认乘车人数
    confirmSelectedPassengerNumber() {
      this.$emit('getSelectedPassengerNumber', this.selectedPassengerNumberValue);
      this.close();
    },
  },
};
</script>

<style lang="scss" scoped>
  .passengerPopContainer{
    .contentSelect{
      height: 237px;
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
      /*单选框组样式*/
      .radio-group{
        height: 40px;
        margin: 0 20px;
        display: flex;
        justify-content: space-around;
        align-items: center;
        font-size: 17px;
        color: #333333;
        letter-spacing: 0;
        .radio-image{
          width: 17px;
          height: 17px;
        }
      }
      /*横线样式*/
      .line{
        opacity: 0.1;
        margin: auto;
        width: 327px;
        border-color: #000000;
      }
      .confirmButton{
        margin: 22px auto 0;
      }
    }
  }
</style>
