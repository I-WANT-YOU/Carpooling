<template>
  <div class="driverScheduleEvaluateCard">
    <div class="left-info">
      <van-image :src="phone" class="phone-icon"/>
      <div class="rideInfo">
        <span class="passengerInfo">潮白家园1期 2人</span>
      </div>
    </div>
    <div class="right-info evaluatePassenger">
      <div class="evaluateItem">
        <van-image :src="evaluateGood" class="evaluate-color-icon"/>
        <span class="evaluate-color-text">好评</span>
      </div>
      <div class="evaluateItem">
        <van-image :src="evaluateBad" class="evaluate-color-icon"/>
        <span class="evaluate-color-text" :style="{margin:0 }">差评</span>
      </div>
    </div>
  </div>
</template>

<script>
import { Image } from 'vant';
import phone from '../images/phone.png';
import good from '../images/good.png';
import bad from '../images/bad.png';
import evaluateBad from '../images/evaluateBad.png';
import evaluateGood from '../images/evaluateGood.png';

export default {
  name: 'DriverScheduleEvaluateCard',
  data() {
    return {
      phone,
      good,
      bad,
      evaluateBad,
      evaluateGood,
      showConfirmPop: false,
    };
  },
  props: {
    isConfirm: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    'van-image': Image,
  },
  methods: {
    // 拒绝乘客
    refusePassenger() {
      this.showConfirmPop = true;
    },
  },
};
</script>

<style lang="scss" scoped>
  .driverScheduleEvaluateCard{
    height: 55px;
    margin: auto;
    padding: 0 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .left-info{
      display: flex;
      align-items: center;
      margin-top: 5px;
      .phone-icon{
        width: 30px;
        height: 30px;
        margin-right: 13.7px;
      }
      .rideInfo{
        .passengerInfo{
          display: block;
          height: 24px;
          font-size: 17px;
          color: #333333;
          letter-spacing: 0;
        }
      }
    }
    .evaluatePassenger{
      height: 55px;
      display: flex;
      justify-content: space-between;
      .evaluateItem{
        display: flex;
        align-items: center;
        .evaluate-color-icon{
          width: 20px;
          height: 20px;
          margin-right: 5px;
        }
        .evaluate-color-text{
          height: 20px;
          margin-right: 10px;
          line-height: 20px;
          font-size: 14px;
          color: #999999;
          letter-spacing: 0;
        }
      }
    }
    .confirmPop-text{
      margin-top: 40px;
    }
  }
</style>
