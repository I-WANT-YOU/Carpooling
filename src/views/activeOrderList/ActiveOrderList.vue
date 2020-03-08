<template>
    <div class="activeOrderList">
      <!--头部-->
      <CarpoolingHeader/>
      <div class="filterInfo">
        <div class="info">
          <span>{{passengerShowData.showDate?passengerShowData.showDate.replace('出发','  ')+' ':''}}</span>
          <span>{{passengerShowData.fromAddress}}-{{passengerShowData.toAddress+' '}}</span>
          <span>{{' '+passengerShowData.passengerNumber}}位</span>
        </div>
        <div class="button" @click="filterAgain">
          <van-image :src="filterButton" class="filterButton"/>
        </div>
      </div>
      <CarOrderCard
        v-for="(showDataItem,showDataIndex) in showData"
        :key="showDataIndex"
        :showDataItem="showDataItem"
        :passengerShowData="passengerShowData"
        buttonText="拼车"
      />
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { Image } from 'vant';
import CarpoolingHeader from '@component/CarpoolingHeader.vue';
import CarOrderCard from '../components/CarOrderCard.vue';
import filterButton from './images/filterButton.png';

export default {
  name: 'ActiveOrderList',
  data() {
    return {
      filterButton,
      showData: [],
      passengerShowData: {},
    };
  },
  components: {
    'van-image': Image,
    CarpoolingHeader,
    CarOrderCard,
  },
  computed: {
    ...mapGetters('passenger', ['passengerTravelList']),
  },
  methods: {
    ...mapActions('passenger', ['orderLink', 'searchTravel']),
    /*
    接口方法
    */

    // 乘客获取行程
    async passengerSearchTravel(currentParams) {
      try {
        this.showLoadingToast();
        await this.searchTravel(currentParams);
        this.clearLoadingToast();
      } catch (error) {
        this.clearLoadingToast();
        if (error === '请先绑定手机号') {
          this.$emit('showBindingPhone');
        } else {
          this.showToast(error);
        }
      }
    },

    // 乘客预定行程
    async passengerOrderLink(params) {
      try {
        this.showLoadingToast();
        await this.orderLink(params);
        console.log('预定成功');
        this.clearLoadingToast();
        this.showToast('预定成功');
        this.$router.push('/activeOrder');
      } catch (e) {
        this.clearLoadingToast();
        this.showToast(e);
      }
    },
    /*
    非接口方法
    */
    passengerOrderSchedule() {
      this.passengerOrderLink(this.passengerShowData);
    },

    // 重新筛选订单
    filterAgain() {
      this.$router.push('/passengerCarpooling');
    },
  },
  async mounted() {
    // 传递的查询参数
    await this.passengerSearchTravel(JSON.parse(this.$route.query.data)); // 列表信息
    this.passengerShowData = JSON.parse(this.$route.query.data); // info 显示信息
    this.showData = this.passengerTravelList;
  },
};
</script>

<style lang="scss" scoped>
.activeOrderList{
  .filterInfo{
    height: 44px;
    padding: 0 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: #F4F4F4;
    font-size: 14px;
    line-height: 44px;
    color: #333333;
    letter-spacing: 0;
    .button{
      width: 78px;
      height: 30px;
      .filterButton{
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>
