<template>
    <div class="dateSelectList">
      <van-datetime-picker
        v-model="currentDate"
        type="time"
        :show-toolbar="false"
        :visible-item-count="3"
        :filter="filter"
        :formatter="formatter"
        @change="changeDate"/>
    </div>
</template>

<script>
import { DatetimePicker } from 'vant';

export default {
  name: 'dateSelectList',
  data() {
    return {
      currentDate: '00:00',
    };
  },
  props: {
    initDateSelectList: {
      type: Number,
      default: 0,
    },
  },
  watch: {
    initDateSelectList() {
      this.currentDate = '00:00';
    },
  },
  components: {
    'van-datetime-picker': DatetimePicker,
  },
  methods: {
    // 时间过滤 （自定义时间间隔）
    filter(type, options) {
      if (type === 'minute') {
        return options.filter(option => option % 5 === 0);
      }
      return options;
    },
    // 时间格式化 （自定义显示内容）
    formatter(type, value) {
      if (type === 'hour') {
        return `${value}点`;
      } if (type === 'minute') {
        return `${value}分`;
      }
      return value;
    },
    // 滚动 改变选择时间值
    changeDate(instance) {
      const currentHours = instance.getColumnValue(0).replace('点', ':');
      const currentMinute = instance.getColumnValue(1).replace('分', '');
      this.$emit('getCurrentDateValue', currentHours + currentMinute);
    },
  },

};
</script>

<style lang="scss" >
  .dateSelectList{
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
