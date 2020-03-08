<template>
    <div class="driverSchedules">
      <div class="orders"
           v-for="(driverTravelListItem,driverTravelListIndex) in driverTravelList"
           :key="driverTravelListIndex"
           :driverTravelListItem="driverTravelListItem">
        <ScheduleInfo
          :orderState="driverTravelListItem.travel.travelStatus==='idle'?'撤销':'完成'"
          :isConfirm="driverTravelListItem.travel.travelStatus!=='idle'"
          :scheduleInfo="driverTravelListItem.travel"
          :driverTravelListIndex="driverTravelListIndex"
          @cancelSchedule="cancelSchedule"
          @completeSchedule="completeSchedule"
        />
        <div  v-for="(passengerInfoItem,passengerInfoIndex) in driverTravelListItem.links" :key="passengerInfoIndex">
          <MyLineOne class="myLine"/>
          <DriverScheduleOrderCard
            :isConfirm="driverTravelListItem.travel.travelStatus!=='idle'"
            :passengerInfoItem="passengerInfoItem"
            @refreshSchedule="refreshSchedule"
          />
        </div>
        <!--微信分享-->
        <ShareScheduleInfo v-show="driverTravelListItem.travel.travelStatus==='idle' && driverTravelListItem.travel.seats!==0"/>
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
      <EvaluatePassenger :showEvaluateConfirmPop="showEvaluateConfirmPop" :evaluateTravelList="evaluateTravelList" @closeEvaluatePassengerPop="showEvaluateConfirmPop=false"/>
    </div>
</template>

<script>
import wx from 'weixin-js-sdk';
import { mapActions } from 'vuex';
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
      evaluateTravelList: [],
      completedIndex: null,
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
  methods: {
    ...mapActions('driver', ['destroyTravel', 'overTravel']),
    /*
    接口方法
    */
    // 司机完成行程
    async driverCompleteTravel(params) {
      try {
        this.showLoadingToast();
        await this.overTravel(params);
        this.clearLoadingToast();
        this.showEvaluateConfirmPop = true;// 评价弹窗
        this.evaluateTravelList = this.driverTravelList[this.completedIndex].links;
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
      this.travelId = JSON.parse(value).id;
      this.completedIndex = JSON.parse(value).index;
      this.driverCompleteTravel(this.travelId);
    },
    // 刷新行程
    refreshSchedule() {
      console.log('刷新');
      this.$emit('refreshTravelList');
    },
    // 微信分享行程
    shareSchedule() {
      wx.config({
        debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: '', // 必填，公众号的唯一标识
        timestamp: '', // 必填，生成签名的时间戳
        nonceStr: '', // 必填，生成签名的随机串
        signature: '', // 必填，签名，见附录1
        jsApiList: [], // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
      });
      // 分享到朋友圈
      wx.onMenuShareAppMessage({
        title: '', // 分享标题
        desc: '', // 分享描述
        link: '', // 分享链接
        imgUrl: '', // 分享图标
        type: '', // 分享类型,music、video或link，不填默认为link
        dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
        success() {
          // 用户确认分享后执行的回调函数
        },
        cancel() {
          // 用户取消分享后执行的回调函数
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
