<template>
    <div class="selectList">
      <van-area
        :area-list="areaList"
        value="0"
        :item-height="40"
        :visible-item-count="3"
        :columns-num="1"
        confirm-button-text=" "
        cancel-button-text=" "
        @change="changeSelectedValue"
      />
    </div>
</template>

<script>
import { Area } from 'vant';

export default {
  name: 'AddressSelectList',
  data() {
    return {
      selectedValue: '',
    };
  },
  props: {
    areaList: {
      type: Object,
      default: () => {},
    },
  },
  components: {
    'van-area': Area,
  },
  methods: {
    changeSelectedValue(picker) {
      const val = picker.getValues();
      this.selectedValue = val[0].name;
      this.$emit('getSelectedValue', this.selectedValue);
    },
  },
};
</script>

<style lang="scss" >
  .selectList{
    /*头部*/
    .van-picker__toolbar{
      height: 0;
    }
    /*选中效果*/
    .van-picker-column__item--selected{
      background: #EEF8FF;
    }
  }
</style>
