<template>
  <div class="content-evaluate">
    <div class="evaluate-item">
      <div class="info">
        <van-image :src="phone" class="phone-icon"/>
        <div>{{driverTravelListItem.fromStation+' '+driverTravelListItem.peopleNumber+'人'}}</div>
      </div>
      <div class="evaluate">
        <div @click="toggleGood">
          <van-image :src="goodSignal?selecteGood:good" class="evaluate-icon"/>
          <span class="with-margin">好评</span>
        </div>
        <div @click="toggleBad">
          <van-image :src="badSignal?selecteBad:bad" class="evaluate-icon"/>
          <span>差评</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Image } from 'vant';
import phone from '../images/phone.png';
import bad from '../images/bad.png';
import good from '../images/good.png';
import selecteBad from '../images/selecteBad.png';
import selecteGood from '../images/selecteGood.png';

export default {
  name: 'EvaluatePassenger',
  data() {
    return {
      phone,
      bad,
      good,
      selecteBad,
      selecteGood,
      badSignal: false,
      goodSignal: false,
    };
  },
  props: {
    driverTravelListItem: {
      type: Object,
      default: () => {},
    },
    driverTravelListIndex: {
      type: Number,
      default: 0,
    },
  },
  components: {
    'van-image': Image,
  },
  methods: {
    toggleGood() {
      if (this.goodSignal === false) {
        this.badSignal = false;
        this.goodSignal = true;
        const currentData = {
          index: this.driverTravelListIndex,
          signal: 'good',
        };
        this.$emit('getSignal', JSON.stringify(currentData));
      }
    },
    toggleBad() {
      if (this.badSignal === false) {
        this.goodSignal = false;
        this.badSignal = true;
        const currentData = {
          index: this.driverTravelListIndex,
          signal: 'bad',
        };
        this.$emit('getSignal', JSON.stringify(currentData));
      }
    },
  },
};
</script>

<style lang="scss" scoped>
  .content-evaluate{
    .evaluate-item{
      height: 56px;
      padding: 0 10px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .info{
        display: flex;
        font-size: 17px;
        color: #333333;
        letter-spacing: 0;
        align-items: center;
        .phone-icon{
          width: 30px;
          height: 30px;
          margin-right: 12px;
        }
      }
      .evaluate{
        display: flex;
        align-items: center;
        font-size: 14px;
        color: #999999;
        letter-spacing: 0;
        >div{
          display: flex;
          align-items: center;
        }
        .with-margin{
          margin-right: 10px;
        }
        .evaluate-icon{
          width: 20px;
          height: 20px;
          margin-right: 4px;
        }
      }
    }
  }
</style>
