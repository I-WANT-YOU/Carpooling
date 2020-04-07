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
        v-for="(driverTravelListItem,driverTravelListIndex) in evaluateTravelList.links"
        :driverTravelListItem="driverTravelListItem"
        :driverTravelListIndex="driverTravelListIndex"
        @getSignal="getSignal"
        :key="driverTravelListIndex"/>
      <div class="content-buttons">
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
      type: Object,
      default: () => {},
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

    // 获取司机好评
    getSignal(data) {
      const currentData = JSON.parse(data);
      if (currentData.signal === 'good') {
        this.$set(this.evaluateList, currentData.index, '1');
      } else if (currentData.signal === 'bad') {
        this.$set(this.evaluateList, currentData.index, '-1');
      }
    },

    // 提交司机评价
    async confirmDriverEvaluate() {
      let values = '';
      for (let index = 0; index < this.evaluateTravelList.links.length; index += 1) {
        if (this.evaluateList[index] !== null) {
          if (index === this.evaluateList.length - 1) {
            values += this.evaluateList[index];
          } else {
            values += `${this.evaluateList[index]},`;
          }
        } else if (index === this.evaluateList.length - 1) {
          values += 0;
        } else {
          values += '0,';
        }
      }
      if (this.evaluateTravelList.links.length === 0) {
        values = '0';
      }
      const currentParams = { travelId: this.evaluateTravelList.travel.id, value: values, type: '1' };
      await callApi(this.appraiseUser, '评价成功', currentParams);
      this.$emit('refreshScheduleList')
      this.$emit('closeEvaluatePassengerPop');
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
    justify-content: center;
    >button{
      border-radius: 10px;
      width: 320px;
      height: 40px;
      margin-bottom: 28px;
      border: none;
      font-size: 17px;
      letter-spacing: 1px;
      text-align: center;
      line-height: 23.8px;
    }
    .confirm{
      background: #309CF1;
      color: #FFFFFF;
    }
  }
}
</style>
