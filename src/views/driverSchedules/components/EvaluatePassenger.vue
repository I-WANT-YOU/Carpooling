<template>
  <van-popup
    v-model="showPop"
    :close-on-click-overlay="false"
    :style="{ background: 'rgba(0,0,0,0.6)'}">
    <div class="content">
      <div class="content-title">
        给个评价吧
      </div>
      <EvaluatePassengerContent
        v-for="(driverTravelListItem,driverTravelListIndex) in evaluateTravelList"
        :driverTravelListItem="driverTravelListItem"
        :driverTravelListIndex="driverTravelListIndex"
        @getSignal="getSignal"
        :key="driverTravelListIndex"/>
      <div class="content-buttons">
        <button class="cancel"  @click="closePop">取消</button>
        <button class="confirm" @click="confirmDriverEvaluate">确认</button>
      </div>
    </div>
  </van-popup>
</template>

<script>
import { mapActions } from 'vuex';
import { Popup } from 'vant';
import { callApi } from '@/utils/tools';
import EvaluatePassengerContent from './EvaluatePassengerContent.vue';

export default {
  name: 'EvaluatePassenger',
  data() {
    return {
      showPop: false,
      evaluateList: [], // 司机评价列表
    };
  },
  props: {
    showEvaluateConfirmPop: {
      type: Boolean,
      default: false,
    },
    evaluateTravelList: {
      type: Array,
      default: () => [],
    },
  },
  watch: {
    showEvaluateConfirmPop: {
      immediate: true,
      handler(value) {
        this.showPop = value;
      },
    },
  },
  components: {
    'van-popup': Popup,
    EvaluatePassengerContent,
  },
  methods: {
    ...mapActions('passenger', ['appraiseUser']),
    // 关闭弹窗
    closePop() {
      this.$emit('closeEvaluatePassengerPop');
    },
    // 获取司机好评
    getSignal(data) {
      const currentData = JSON.parse(data);
      const type = currentData.signal === 'good' ? 1 : 2;
      this.$set(this.evaluateList, currentData.index, type);
    },
    // 提交司机评价
    confirmDriverEvaluate() {
      for (let index = 0; index < this.evaluateList.length; index += 1) {
        if (this.evaluateList[index] !== null) {
          const currentParams = { userId: this.evaluateTravelList[index].userId, type: this.evaluateList[index] };
          callApi(this.appraiseUser, '', currentParams);
        }
      }
      this.closePop();
    },
  },
};
</script>

<style lang="scss" scoped>
.content{
  width: 320px;
  background: #FFFFFF;
  border-radius: 12px;
  .content-title{
    height: 76px;
    text-align: center;
    font-size: 16px;
    color: #333333;
    letter-spacing: 0;
    line-height: 76px;
  }
  .content-buttons{
    width: 260px;
    display: flex;
    margin: 20px auto 0;
    background: #FFFFFF;
    justify-content: space-between;
    >button{
      border-radius: 10px;
      width: 120px;
      height: 40px;
      margin-bottom: 28px;
      border: none;
      font-size: 17px;
      letter-spacing: 1px;
      text-align: center;
      line-height: 23.8px;
    }
    .cancel{
      background: rgba(0,0,0,0.05);

      color: #192848;
    }
    .confirm{
      background: #309CF1;
      color: #FFFFFF;
    }
  }
}
</style>
