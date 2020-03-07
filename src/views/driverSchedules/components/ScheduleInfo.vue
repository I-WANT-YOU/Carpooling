<template>
    <div class="scheduleInfo">
      <div class="info">
        <!--撤销或者完成按钮-->
        <CarpoolingShortButton :buttonText="orderState" @click.native="confirmAction"/>
        <div class="date-info">
          <van-image :src="date" class="date-icon"/>
          <span class="date-text">{{scheduleInfo.startTime}}</span>
        </div>
        <div class="address-info">
          <span class="address-text">{{scheduleInfo.fromStation}}</span>
          <van-image :src="rightArrow" class="arrow-icon"/>
          <span class="address-text">{{scheduleInfo.toStation}}</span>
        </div>
      </div>
      <!--刷新行程-->
      <van-image v-if="!isConfirm" :src="refreshButton" class="refresh" @click="refreshSchedule"></van-image>
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
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
  computed: {
    ...mapState('driver', ['refreshTravelList']),
  },
  methods: {
    ...mapActions('driver', ['refreshTravel']),
    /*
     接口方法
    */
    // 司机刷新行程
    async refreshDriverSchedule(params) {
      try {
        await this.refreshTravel(params);
        this.showToast('刷新成功');
      } catch (e) {
        this.showToast(e);
      }
    },
    // 刷新行程
    async refreshSchedule() {
      await this.refreshDriverSchedule(this.scheduleInfo.id);
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
  width: 327px;
  height: 68px;
  line-height: 68px;
  padding: 0 14px;
  margin: auto;
  .info{
    display: flex;
    align-items: center;
    flex-grow: 1;
    .date-info{
       margin-left: 20px;
      .date-icon{
        width: 16px;
        height: 16px;
        margin-right: 6px;
      }
      .date-text{
        font-size: 17px;
        color: #333333;
        letter-spacing: 0;
      }
    }
    .address-info{
       margin-left: 15px;
      .arrow-icon{
        width: 16px;
        height: 16px;
        margin: 0 6px;
      }
      .address-text{
        font-size: 17px;
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
