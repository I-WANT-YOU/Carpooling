<template>
  <div class="driverScheduleOrderCardContainer">
    <div class="driverScheduleOrderCard">
      <div class="left-info">
        <a :href="'tel:'+passengerInfoItem.phone"><van-image :src="phone" class="phone-icon"/></a>
        <div class="rideInfo">
          <span class="passengerInfo">{{passengerInfoItem.fromStation}} {{passengerInfoItem.peopleNumber+'人'}}</span>
          <div class="evaluateInfo">
            <div>
              <van-image :src="good" class="evaluate-icon"/>
              <span class="evaluate-text">{{passengerInfoItem.appraiseUp}}</span>
            </div>
            <div>
              <van-image :src="bad" class="evaluate-icon"/>
              <span class="evaluate-text">{{passengerInfoItem.appraiseDown}}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="right-info">
        <div v-if="passengerInfoItem.status==='confirmed'||passengerInfoItem.status==='over'" class="confirm-text">已确定</div>
        <div v-else-if="passengerInfoItem.status==='order'" class="confirm-buttons">
          <button class="refuse-button" @click="showConfirmPop=true">拒绝</button>
          <button class="confirm-button" @click="confirmPassenger">确定</button>
        </div>
      </div>
    </div>
    <!--拒绝乘客-->
    <ConfirmPop buttonTextTwo="拒绝" :showConfirmPop="showConfirmPop" popType="refusePassenger" @closeConfirmPop="showConfirmPop=false" @confirmAction="refusePassenger">
      <div class="confirmPop-text">确定拒绝乘客吗？</div>
    </ConfirmPop>
  </div>
</template>

<script>
import { Image } from 'vant';
import ConfirmPop from '@component/ConfirmPop.vue';
import { mapActions } from 'vuex';
import phone from '../images/phone.png';
import good from '../images/good.png';
import bad from '../images/bad.png';
import evaluateBad from '../images/evaluateBad.png';
import evaluateGood from '../images/evaluateGood.png';

export default {
  name: 'DriverScheduleOrderCard',
  data() {
    return {
      phone,
      good,
      bad,
      evaluateBad,
      evaluateGood,
      showConfirmPop: false,
    };
  },
  props: {
    isConfirm: {
      type: Boolean,
      default: false,
    },
    passengerInfoItem: {
      type: Object,
      default: () => {},
    },
  },
  components: {
    'van-image': Image,
    ConfirmPop,
  },
  methods: {
    ...mapActions('driver', ['confirmLink', 'rejectLink']),

    // 司机确认预定
    async  driverConfirmLink(params) {
      try {
        this.showLoadingToast();
        await this.confirmLink(params);
        this.clearLoadingToast();
        this.showToast('接受预订成功');
        this.$emit('refreshSchedule');
      } catch (e) {
        this.clearLoadingToast();
        this.showToast(e);
      }
    },

    // 司机拒绝预定
    async  driverRejectLink(params) {
      try {
        this.showLoadingToast();
        await this.rejectLink(params); // linkId
        this.clearLoadingToast();
        this.showToast('接受预订成功');
        this.$emit('refreshSchedule');
      } catch (e) {
        this.clearLoadingToast();
        this.showToast(e);
      }
    },

    // 拒绝乘客预定
    refusePassenger() {
      this.driverRejectLink(this.passengerInfoItem.id);
    },
    // 确认乘客
    confirmPassenger() {
      this.driverConfirmLink(this.passengerInfoItem.id);
    },
  },
};
</script>

<style lang="scss" scoped>
  .driverScheduleOrderCardContainer{
    height: 55px;
    margin: auto;
    padding: 0 14px 0 14px;
    .driverScheduleOrderCard{
      display: flex;
      justify-content: space-between;
      align-items: center;
      .left-info{
        display: flex;
        align-items: center;
        margin-top: 5px;
        .phone-icon{
          width: 30px;
          height: 30px;
          margin-right: 13.7px;
        }
        .rideInfo{
          .passengerInfo{
            display: block;
            height: 24px;
            font-size: 17px;
            color: #333333;
            letter-spacing: 0;
          }
          .evaluateInfo{
            display: flex;
            height: 15px;
            margin-top: 2px;
            >div{
              display: flex;
              .evaluate-icon{
                width: 12px;
                height: 12px;
                margin-right: 3px;
              }
              .evaluate-text{
                margin-right: 9px;
                font-size: 11px;
                color: #999999;
                letter-spacing: 0;
                line-height: 11px;
              }
            }
          }
        }
      }
      .right-info{
        height: 55px;
        display: flex;
        align-items: center;
        .confirm-text{
          font-size: 16px;
          color: #333333;
          letter-spacing: 0;
          line-height: 24px;
        }
        .confirm-buttons{
          >button{
            width: 56px;
            height: 30px;
            border-radius: 8px;
            font-size: 14px;
            letter-spacing: 0;
            text-align: center;
            background: #FFFFFF;
          }
          .refuse-button{
            color: #FFC05E;
            border: 1px solid #FFC05E;
          }
          .confirm-button{
            margin-left: 13px;
            color: #309CF1;
            border: 1px solid #309CF1;
          }
        }
      }
    }
    /*拒绝弹窗*/
    .confirmPop-text{
      margin: 40px auto;
      text-align: center;
    }
  }

</style>
