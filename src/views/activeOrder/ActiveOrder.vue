<template>
  <div class="activeOrder">
    <!--今天明天切换tabs-->
    <div class="tabs">
      <MyLine class="line"/>
      <div class="dateTabs">
        <span class="tab" :class="activeDate==='today'?'activeTab':''" @click="changeDate('today')">今天</span>
        <span class="tab" :class="activeDate==='tomorrow'?'activeTab':''"  @click="changeDate('tomorrow')">明天</span>
      </div>
    </div>
    <EmptySchedule v-if="orderTravelList.length===0" class="content-schedule" user-type="passenger"/>
    <!--信息详情-->
    <div  v-else class="info-container">
      <div v-for="(showDataItem,showDataIndex) in passengerOrderTravelList"   :key="showDataIndex" >
        <TipInfo :passengerStatus="showDataItem.link.status" :startTime = "showDataItem.link.startTime" @refreshSchedule="refreshSchedule"/>
        <CarOrderCard
          v-show="orderTravelList.length!==0"
          :showDataItem="showDataItem.travel"
          :passengerStatus="showDataItem.travel"
          :buttonText="currentFormatDate()-currentFormatDate(showDataItem.link.startTime)>0?'完成':'撤销'"
          @passengerCancelSchedule="passengerCancelSchedule(showDataItem.link.status,showDataItem.link.id)"
          @passengerCompleteSchedule="passengerCompleteSchedule(showDataItem.link.travelId)"
          @toShowEvaluatePop="showEvaluatePop=true"/>
      </div>
      <div class="position-empty"></div>
      <div class="position-class">
        <CarpoolingButton buttonText="预约拼车"  @click.native="goToCarpooling"/>
      </div>
    </div>
    <!--普通撤销-->
    <ConfirmPop :showConfirmPop="showNormalConfirmPop" @closeConfirmPop="showNormalConfirmPop=false" @confirmAction=passengerCancelLink>
      <div class="content-title-text">
        确定撤销行程吗？
      </div>
    </ConfirmPop>
    <!--撤销行程弹窗-->
    <ConfirmPop :showConfirmPop="showActiveConfirmPop" @closeConfirmPop="showActiveConfirmPop=false" @confirmAction=passengerCancelLink>
      <div class="content-title-warning-text">
        <div class="img-container">
          <van-image :src="warning" class="warning-icon"/>
        </div>
        <span class="text">司机已接单，20分钟内撤销行程 将降低您的信用评级</span>
      </div>
    </ConfirmPop>
    <!--评价弹窗-->
    <EvaluatePop :showEvaluatePop="showEvaluatePop" @closeEvaluatePop="closeEvaluatePop" :travelId=travelId />
  </div>
</template>

<script>
import { getWeiXinCode, callApi, resetUrl } from '@utils/tools';
import formatDate from 'dayjs';
import { mapActions, mapState, mapGetters } from 'vuex';
import { Image } from 'vant';
import CarpoolingButton from '@component/CarpoolingButton.vue';
import ConfirmPop from '@component/ConfirmPop.vue';
import MyLine from '../components/MyLine.vue';
import TipInfo from '../components/TipInfo.vue';
import CarOrderCard from '../components/CarOrderCard.vue';
import EvaluatePop from '../components/EvaluatePop.vue';
import refreshButton from './images/refreshButton.png';
import warning from './images/warning.png';
import EmptySchedule from '../driverSchedules/components/EmptySchedule.vue';

export default {
  name: 'ActiveOrder',
  data() {
    return {
      refreshButton,
      warning,
      showNormalConfirmPop: false, // 行程未开始弹窗
      showActiveConfirmPop: false, // 行程开始弹窗
      showEvaluatePop: false, // 评价弹窗
      linkId: '', // 用于取消预定
      activeDate: 'today',
      travelId: '', // 评价使用
    };
  },
  components: {
    'van-image': Image,
    CarOrderCard,
    ConfirmPop,
    EvaluatePop,
    MyLine,
    TipInfo,
    CarpoolingButton,
    EmptySchedule,
  },
  computed: {
    ...mapState('passenger', ['orderTravelList']),
    ...mapGetters('passenger', ['passengerOrderTravelList']),
  },

  methods: {
    ...mapActions('passenger', ['cancelLink', 'getTravel', 'getUserInfo', 'overLink']),
    /* 通用方法 */
    currentFormatDate(params) {
      return formatDate(params);
    },
    /*
    接口方法
    */

    // 乘客获取行程
    async passengerGetTravel(params) {
      try {
        this.showLoadingToast();
        await this.getTravel(params);
        this.clearLoadingToast();
      } catch (e) {
        this.clearLoadingToast();
        if (e === '请先绑定手机号') {
          this.$router.push('/passengerCarpooling');
        } else {
          this.showToast(e);
        }
      }
    },

    // 乘客取消行程
    async passengerCancelLink() {
      try {
        this.showLoadingToast();
        await this.cancelLink(this.linkId);
        this.clearLoadingToast();
        this.showToast('取消成功');
        if (this.activeDate === 'today') {
          this.passengerGetTravel('1'); // 刷新数据
        } else {
          this.passengerGetTravel('2'); // 刷新数据
        }
      } catch (e) {
        this.clearLoadingToast();
        this.showToast(e);
      }
    },

    /*
    非接口方法
    */

    // 改变时间
    async changeDate(value) {
      this.activeDate = value;
      if (value === 'today') {
        await this.passengerGetTravel('1');
      } else {
        await this.passengerGetTravel('2');
      }
    },

    // 乘客取消行程
    passengerCancelSchedule(state, linkId) {
      this.linkId = linkId;
      if (state === 'order') { // 乘客已预定
        this.showNormalConfirmPop = true;
      } else if (state === 'confirmed') { // 司机已确认
        this.showActiveConfirmPop = true;
      }
    },


    // 乘客完成行程
    passengerCompleteSchedule(travelId) {
      this.travelId = travelId;
      this.showEvaluatePop = true;
    },

    // 刷新乘客列表
    refreshSchedule() {
      if (this.activeDate === 'today') {
        callApi(this.getTravel, '刷新成功', '1');
      } else {
        callApi(this.getTravel, '刷新成功', '2');
      }
    },

    // 关闭评价弹窗
    closeEvaluatePop(value) {
      this.showEvaluatePop = false;
      if (value === 'refresh') {
        if (this.activeDate === 'today') {
          this.passengerGetTravel('1');
        } else {
          this.passengerGetTravel('2');
        }
      }
    },

    // 跳转到拼车页面
    goToCarpooling() {
      this.$router.push('/passengerCarpooling');
    },
  },

  async created() {
    const openId = window.localStorage.getItem('openId');
    if (openId === null || openId === '') {
      window.localStorage.setItem('openId', 'currentOpenId');
      resetUrl();
    }
  },

  async mounted() {
    const openId = window.localStorage.getItem('openId');
    if (openId === null || openId === '' || openId === 'currentOpenId') {
      const data = await getWeiXinCode();
      if (data) {
        await this.passengerGetTravel('1');
      }
    } else {
      await this.passengerGetTravel('1');
    }
  },
  beforeDestroy() {
    this.clearLoadingToast();
  },
};
</script>

<style lang="scss" scoped>
.activeOrder{
  display: flex;
  flex-direction: column;
  height: 100%;
  /*空白背景*/
  .position-empty{
    width: 100%;
    height: 90px;
    background:white;
  }
  .position-class{
    position: fixed;
    width: 100%;
    height: 90px;
    background:white;
    bottom: 0;
  }
  .tabs{
    background: #FFFFFF;
    .line{
      margin: 0 auto;
    }
    .dateTabs {
      display: flex;
      justify-content: center;
      .tab {
        display: block;
        width: 80px;
        height: 38px;
        margin: 0 15px;
        text-align: center;
        font-size: 14px;
        color: #999999;
        letter-spacing: 0;
        line-height: 40px;
        border-bottom: 2px solid #FFFFFF;
      }
      .activeTab {
        border-bottom: 2px solid #309CF1;
        color: #333333;
      }
    }
  }
  /*弹窗内容*/
  .content-title-text{
    margin: 40px auto;
    text-align: center;
  }
  .content-title-warning-text{
    margin: 32px 36px;
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
  .content-schedule{
    flex-grow: 1;
  }
}
</style>
