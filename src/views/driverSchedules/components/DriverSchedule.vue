<template>
    <div class="driverSchedules">
      <div class="orders"
           v-for="(driverTravelListItem,driverTravelListIndex) in driverTravelList"
           :key="driverTravelListIndex"
           :driverTravelListItem="driverTravelListItem">
        <!--拼车信息-->
        <ScheduleInfo
          :orderState="driverTravelListItem.travel.travelStatus==='idle'?'撤销':'完成'"
          :isConfirm="driverTravelListItem.travel.travelStatus!=='idle'"
          :scheduleInfo="driverTravelListItem.travel"
          :driverTravelListIndex="driverTravelListIndex"
          @cancelSchedule="cancelSchedule"
          @completeSchedule="completeSchedule"
          @refreshSchedule="refreshSchedule"
        />
        <!--乘客拼车信息-->
        <div  v-for="(passengerInfoItem,passengerInfoIndex) in driverTravelListItem.links" :key="passengerInfoIndex">
          <MyLineOne class="myLine"/>
          <DriverScheduleOrderCard
            :isConfirm="driverTravelListItem.travel.travelStatus!=='idle'"
            :passengerInfoItem="passengerInfoItem"
            @refreshScheduleList="refreshScheduleList"
          />
        </div>
        <MyLineOne v-show="driverTravelListItem.travel.travelStatus==='idle' && driverTravelListItem.travel.seats!==0"/>
        <!--微信分享-->
        <ShareScheduleInfo v-show="driverTravelListItem.travel.travelStatus==='idle' && driverTravelListItem.travel.seats!==0" @click.native="shareInWeChat(driverTravelListItem.travel.id)"/>
      </div>
      <!--拓展位置元素-->
      <div class="empty-content"></div>
      <!--发布行程-->
      <div class="releaseSchedule">
        <ReleaseScheduleButton @click.native="publishSchedule"/>
      </div>
      <!--司机撤销行程-->
      <ConfirmPop
        :showConfirmPop="showConfirmPop"
        @closeConfirmPop="showConfirmPop=false"
        @confirmAction="driverCancelTravel">
        <div class="content-title-warning-text">
          <div class="img-container">
            <van-image :src="warning" class="warning-icon"/>
          </div>
          <span class="text">如果已经有乘客预约，撤销行程将会被系统差评，影响以后的行程发布！</span>
        </div>
      </ConfirmPop>
      <!--评价乘客弹窗-->
      <EvaluatePassenger :showEvaluateConfirmPop="showEvaluateConfirmPop" :evaluateTravelList="evaluateTravelList" @refreshScheduleList="refreshScheduleList" @closeEvaluatePassengerPop="showEvaluateConfirmPop=false"/>
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import { Image } from 'vant';
import MyLineOne from '@views/components/MyLineOne.vue';
import ConfirmPop from '@component/ConfirmPop.vue';
import ReleaseScheduleButton from '@views/components/ReleaseScheduleButton.vue';
import DriverScheduleOrderCard from './DriverScheduleOrderCard.vue';
import ScheduleInfo from './ScheduleInfo.vue';
import ShareScheduleInfo from './ShareScheduleInfo.vue';
import EvaluatePassenger from './EvaluatePassenger.vue';
import warning from '../images/warning.png';

export default {
  name: 'DriverSchedules',
  data() {
    return {
      showConfirmPop: false, // 取消行程弹窗
      showEvaluateConfirmPop: false, // 评价弹窗
      travelId: '',
      travelStatus: '',
      warning,
      evaluateTravelList: {},
      completedIndex: null,
      shareDataIndex: null, // 微信分享内容
    };
  },
  props: {
    driverTravelList: {
      type: Array,
      default: () => [],
    },
  },
  components: {
    'van-image': Image,
    DriverScheduleOrderCard,
    ScheduleInfo,
    MyLineOne,
    ShareScheduleInfo,
    ReleaseScheduleButton,
    ConfirmPop,
    EvaluatePassenger,
  },
  computed: {
    ...mapState('driver', ['shareData']),
  },
  methods: {
    ...mapActions('driver', ['destroyTravel', 'overTravel', 'shareSchedule']),
    /*
    接口方法
    */

    // 司机完成行程
    async driverCompleteTravel(params) {
      try {
        this.showLoadingToast();
        await this.overTravel(params);
        this.clearLoadingToast();
      } catch (e) {
        this.clearLoadingToast();
        this.showToast(e);
      }
    },

    // 司机撤销行程
    async driverCancelTravel() {
      try {
        this.showConfirmPop = false;
        this.showLoadingToast();
        await this.destroyTravel(this.travelId);
        this.showToast('撤销成功');
        this.clearLoadingToast();
        // 刷新数据
        this.$emit('refreshTravelList');
      } catch (e) {
        this.clearLoadingToast();
        this.showToast(e);
      }
    },

    // 司机刷新行程(单个行程)
    refreshSchedule(params) {
      this.$emit('refreshSchedule', params);
    },

    // 发布行程
    publishSchedule() {
      this.$router.push('/driverReleaseSchedule');
    },

    // 司机取消行程
    cancelSchedule(value) {
      this.travelId = value;
      this.showConfirmPop = true;
    },

    // 司机完成行程
    completeSchedule(value) {
      this.completedIndex = JSON.parse(value).index;
      this.evaluateTravelList = this.driverTravelList[this.completedIndex];
      this.showEvaluateConfirmPop = true;// 评价弹窗
    },

    // 刷新行程
    refreshScheduleList() {
      this.$emit('refreshTravelList');
    },

    // 点击微信分享(录入页面数据)
    async shareInWeChat(travelId) {
      this.$router.push({
        name: 'ShareSchedule',
        query: {
          travelId,
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.driverSchedules{
  position: relative;
  width: 100%;
  background: #F4F4F4;
  overflow: visible;
  .myLine{
    width: 327px;
  }
  .orders{
    width: 355px;
    margin: 20px auto 0;
    background: #FFFFFF;
    border-radius: 10px;
  }
  .empty-content{
    height: 100px;
    width: 100%;
  }
  .releaseSchedule{
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 80px;
    display: flex;
    align-items: center;
    background: #FFFFFF;
    box-shadow: 0 0 6px 0 rgba(162,162,162,0.40);
  }
  .content-title-warning-text{
    margin: 32px 36px 20px 36px;
    display: flex;
    .img-container{
      width: 20px;
      height: 24px;
      display: flex;
      align-items: center;
      .warning-icon{
        width: 16px;
        height: 16px;
      }
    }
    .text{
      width:228px;
      line-height: 24px;
    }
  }
}
</style>
