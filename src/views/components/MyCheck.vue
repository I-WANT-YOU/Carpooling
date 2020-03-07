<template>
  <van-checkbox  class="myCheck" :name="siteItem"  @click="toggleSelect"  :class="checkedState ? 'checkedClass' : 'unCheckedClass'">
    {{siteItem}}
    <img
      slot="icon"
      slot-scope="props"
      class="checkIconClass"
      :src="props.checked ? checkedIcon : unCheckedIcon"
    >
  </van-checkbox>
</template>

<script>
import { Checkbox } from 'vant';
import checkedIcon from './images/checked.png';
import unCheckedIcon from './images/unChecked.png';

export default {
  name: 'MyCheck',
  data() {
    return {
      checkedIcon,
      unCheckedIcon,
      checkedState: false,
    };
  },
  props: {
    siteItem: {
      type: String,
      default: '',
    },
  },
  components: {
    'van-checkbox': Checkbox,
  },
  methods: {
    toggleSelect() {
      this.checkedState = !this.checkedState;
    },
  },
};
</script>

<style lang="scss" >
  .myCheck{
    display: flex;
    align-items: center;
    background: #F4F4F4;
    border-radius: 8px;
    font-size: 12px;
    color: #999999;
    letter-spacing: 0;
    line-height: 30px;
    .checkIconClass{
      width: 16px;
      height: 16px;
    }
    .van-checkbox__icon{
      width: 16px;
      height: 16px;
      margin:0 4px;
    }
    .van-checkbox__label{
      display: block;
      margin:0;
    }
  }
  .checkedClass{
    width: 100px!important;
    height: 28px;
    background: #FFF2DD;
    border: 1px solid #FFC05E;
  }
  .unCheckedClass{
    width: 102px!important;
    height: 30px;
    border: none;
  }
</style>
