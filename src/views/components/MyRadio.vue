<template>
  <van-radio :name="priceValue" :icon-size="17" class="myRadio">
    {{priceValue+otherText}}
    <img
      class="radio-image"
      slot="icon"
      slot-scope="props"
      :src="props.checked ? icon.activeIcon : icon.inactiveIcon"
    >
  </van-radio>
</template>

<script>
import { Radio } from 'vant';
import inactiveIcon from './images/normal.png';
import activeIcon from './images/active.png';

export default {
  name: 'MyRadio',
  data() {
    return {
      icon: {
        inactiveIcon,
        activeIcon,
      },
    };
  },
  props: {
    priceValue: {
      type: Number,
      default: null,
    },
    otherText: {
      type: String,
      default: '',
    },
  },
  components: {
    'van-radio': Radio,
  },
};
</script>

<style lang="scss" >
  .myRadio{
    font-size: 17px;
    color: #333333;
    letter-spacing: 0;
    .van-radio__label{
      margin-left: 6px;
    }
    .radio-image{
      width: 17px;
      height: 17px;
    }
  }
</style>
