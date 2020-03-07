<template>
  <div class="info">
    <span class="info-text">{{tipInfo}}</span>
    <van-image v-show="showRefresh" :src="refreshButton" class="refreshButton" @click.native="$emit('refreshSchedule')"/>
  </div>
</template>

<script>
import formatDate from 'dayjs';
import { Image } from 'vant';
import refreshButton from './images/refreshButton.png';

export default {
  name: 'TipInfo',
  data() {
    return {
      refreshButton,
      tipInfo: '',
      showRefresh: false,
    };
  },
  props: {
    passengerStatus: {
      type: String,
      default: '',
    },
    startTime: {
      type: Number,
      default: 0,
    },
  },
  watch: {
    passengerStatus: {
      immediate: true,
      handler(value) {
        if (value === 'order') {
          this.tipInfo = '已通知司机，请等待确认';
          this.showRefresh = true;
        } else if (value === 'confirmed') {
          this.showRefresh = false;
          const currentDate = formatDate(); // 当前时间
          const showDate = formatDate(this.startTime);
          if (currentDate - showDate < 0) {
            this.tipInfo = '司机已接单，请准时到达上车地点';
          } else {
            this.tipInfo = '您的行程一开始';
          }
        }
      },
    },
  },
  components: {
    'van-image': Image,
  },
};
</script>

<style lang="scss" scoped>
  .info{
  height: 44px;
  padding: 0 20px 0 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .info-text{
    font-size: 16px;
    color: #333333;
    letter-spacing: 0;
    line-height: 16px;
  }
  .refreshButton{
    width: 16px;
    height: 16px;
  }
}
</style>
