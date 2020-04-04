<template>
    <div class="scheduleInfo">
      <div class="info">
        <!--撤销或者完成按钮-->
        <CarpoolingShortButton :buttonText="orderState" @click.native="confirmAction"/>
        <!--时间-->
        <div class="date-info">
          <van-image :src="date" class="date-icon"/>
          <span class="date-text">{{scheduleInfo.startTime}}</span>
        </div>
        <!--地址-->
        <div class="address-info">
          <span class="address-text">{{scheduleInfo.fromStation}}</span>
          <van-image :src="rightArrow" class="arrow-icon"/>
          <span class="address-text">{{scheduleInfo.toStation}}</span>
        </div>
        <!--刷新行程-->
        <van-image v-if="!isConfirm" :src="refreshButton" class="refresh" @click="refreshSchedule"></van-image>
      </div>
    </div>
</template>

<script>
import { Image } from 'vant';
import CarpoolingShortButton from '@component/CarpoolingShortButton.vue';
import rightArrow from '@views/components/images/rightArrow.png';
import date from '../images/date.png';
import refreshButton from '../images/refreshButton.png';

export default {
  name: 'ScheduleInfo',
  data() {
    return {
      date,
      rightArrow,
      refreshButton,
    };
  },
  props: {
    isConfirm: {
      type: Boolean,
      default: true,
    },
    orderState: {
      type: String,
      default: '',
    },
    scheduleInfo: {
      type: Object,
      default: () => {},
    },
    driverTravelListIndex: {
      type: Number,
      default: 0,
    },
  },
  components: {
    CarpoolingShortButton,
    'van-image': Image,
  },
  methods: {

    // 刷新行程
    refreshSchedule() {
      this.$emit('refreshSchedule', this.scheduleInfo.id);
    },
    // 司机撤销行程或者完成行程
    confirmAction() {
      if (this.orderState === '撤销') {
        this.$emit('cancelSchedule', this.scheduleInfo.id);
      } else if (this.orderState === '完成') {
        const currentData = {
          id: this.scheduleInfo.id,
          index: this.driverTravelListIndex,
        };
        this.$emit('completeSchedule', JSON.stringify(currentData));
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.scheduleInfo{
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 335px;
  height: 68px;
  line-height: 68px;
  margin: auto;
  .info{
    display: flex;
    align-items: center;
    flex-grow: 1;
    justify-content: space-between;
    .date-info{
      /* margin-left: 10px;*/
      .date-icon{
        width: 16px;
        height: 16px;
        margin-right: 6px;
      }
      .date-text{
        font-size: 15px;
        color: #333333;
        letter-spacing: 0;
      }
    }
    .address-info{
      /* margin-left: 15px;*/
      .arrow-icon{
        width: 14px;
        height: 14px;
        margin: 0 5px;
      }
      .address-text{
        font-size: 15px;
        color: #333333;
        letter-spacing: 0;
      }
    }
  }
  .refresh{
    width: 16px;
    height: 16px;
  }
}
</style>
