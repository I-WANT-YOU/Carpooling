<template>
  <div class="rideDetailCard">
    <!--乘车地点和出发地-->
    <div class="from-to">
      <div class="destinationContainer">
        <div class="from destination">
          <van-image  :src="from" class="front-icon"/>
          <van-field v-model="fromAddress" class="input-class" :placeholder="userType==='driver'?'您要从哪发车':'您要从哪儿上车'" readonly @click="showAddress('fromAddress')"/>
        </div>
        <div class="line line-one"></div>
        <div class="to destination">
          <van-image  :src="from" class="front-icon"/>
          <van-field v-model="toAddress" placeholder="您要去哪儿" class="input-class" readonly  @click="showAddress('toAddress')"/>
        </div>
        <div class=" line line-two"></div>
      </div>
      <div class="change-from-and-to" @click="changeAddress">
        <van-image :src="changeButton" class="button-icon"/>
      </div>
    </div>
    <!--出发时间和乘车人数-->
    <div class="when-how">
      <div class="whenContainer">
        <van-image  :src="when" class="front-icon"/>
        <van-field v-model="departureTime" class="input-class" placeholder="何时出发" readonly @click="showDate"/>
      </div>
      <div v-if="userType==='passenger'" class="howContainer">
        <van-image  :src="people" class="front-icon"/>
        <van-field v-model="passengerNumber" class="input-class" placeholder="几人乘车" readonly  @click="showPassengerNumber"/>
      </div>
      <div v-else class="howContainer">
        <van-image  :src="money" class="front-icon"/>
        <van-field v-model="unitPrice" class="input-class" placeholder="每人单价" readonly  @click="showUnitPrice"/>
      </div>
    </div>
    <div class=" line line-two" v-show="userType"></div>
    <!--途径多个站点-->
    <div class="sites" v-show="userType==='driver'">
      <van-image  :src="sites" class="front-icon site-icon"/>
      <van-field type="textarea" :autosize="{minHeight: 50 }" v-model="allSites" class="input-class text-area-class" placeholder="途经多个站点" readonly  @click="showAllSites"/>
    </div>
    <!--button-->
    <button class="button-class" @click="confirmCarpooling">{{userType==='driver'?'发布':'预约拼车'}}</button>
  </div>
</template>

<script>
import formatDate from 'dayjs';
import { Field, Image } from 'vant';
import { mapActions, mapState, mapGetters } from 'vuex';
import from from './images/from.png';
import when from './images/when.png';
import people from './images/people.png';
import sites from './images/sites.png';
import money from './images/money.png';
import changeButton from './images/changeButton.png';

export default {
  name: 'RideDetailCard',
  data() {
    return {
      from,
      when,
      people,
      sites,
      changeButton,
      money,
      formDestination: '',
      toDestination: '',
      fromAddress: '', // 出发地
      toAddress: '', // 目的地
      departureTime: '', // 出发时间
      passengerNumber: '', // 几人乘车
      unitPrice: '', // 单价
      allSites: '', // 站点
      buttonText: '', // 按钮文案
    };
  },
  props: {
    userType: {
      type: String,
      default: '',
    },
    confirmFromAddress: {
      type: String,
      default: '',
    },
    confirmToAddress: {
      type: String,
      default: '',
    },
    confirmDate: {
      type: String,
      default: '',
    },
    confirmPassengerNumber: {
      type: String,
      default: '',
    },
    confirmUnitPrice: {
      type: String,
      default: '',
    },
    confirmSites: {
      type: String,
      default: '',
    },
  },
  components: {
    'van-field': Field,
    'van-image': Image,
  },
  watch: {
    confirmToAddress() {
      this.toAddress = this.confirmToAddress;
    },
    confirmFromAddress() {
      this.fromAddress = this.confirmFromAddress;
    },
    confirmDate(value) {
      const currentDate = JSON.parse(value);
      if (currentDate.day === 'today') {
        this.departureTime = `今天 ${currentDate.time} 出发`;
      } else {
        this.departureTime = `明天 ${currentDate.time} 出发`;
      }
    },
    confirmPassengerNumber() {
      this.passengerNumber = `${this.confirmPassengerNumber}人乘车`;
    },
    confirmUnitPrice() {
      this.unitPrice = `${this.confirmUnitPrice}元/每人`;
    },
    confirmSites() {
      this.allSites = JSON.parse(this.confirmSites).join(',');
    },
    // 监听用户信息 初始化信息
    userInfo(value) {
      if (value.station) {
        this.fromAddress = value.station;
        this.toAddress = '潞城A口';
      }
    },
    // 监听用户信息 初始化信息
    lastTravelList(value) {
      if (value.fromStation && value.toStation) {
        this.fromAddress = value.fromStation;
        this.toAddress = value.toStation;
        this.allSites = value.stations;
        this.unitPrice = value.fee;
      }
    },
  },
  computed: {
    ...mapState('passenger', ['travelList', 'userInfo']),
    ...mapState('driver', ['lastTravelList']),
    ...mapGetters('passenger', ['passengerTravelList']),
  },
  methods: {
    ...mapActions('passenger', ['searchTravel']),
    ...mapActions('driver', ['publishTravel']),
    /*
      接口方法
    */

    // 乘客获取行程
    async passengerSearchTravel(currentParams) {
      try {
        this.showLoadingToast();
        await this.searchTravel(currentParams);
        this.clearLoadingToast();
        if (this.travelList.length === 0) {
          this.showToast('没有符合条件的行程,请重新筛选');
        }
      } catch (error) {
        this.clearLoadingToast();
        if (error === '请先绑定手机号') {
          this.$emit('showBindingPhone');
        } else {
          this.showToast('error');
        }
      }
    },
    // 司机发布行程
    async diverReleaseSchedule(currentParams) {
      try {
        this.showLoadingToast();
        await this.publishTravel(currentParams);
        this.clearLoadingToast();
        await this.$router.push('/driverSchedules');
      } catch (error) {
        this.clearLoadingToast();
        if (error === '请绑定手机号') {
          this.$emit('showBindingPhone');
        } else if (error === '车辆信息确实,请检查') {
          this.$router.push('/inputCarInfo');
        } else {
          this.showToast(error);
        }
      }
    },
    /*
    非接口方法
     */
    showAddress(value) {
      this.$emit('showAddress', value);
    },
    // 时间弹窗
    showDate() {
      this.$emit('showDate');
    },
    // 乘车人数弹窗
    showPassengerNumber() {
      this.$emit('showPassengerNumber');
    },
    // 站点弹窗
    showAllSites() {
      this.$emit('showAllSites');
    },
    // 价格弹窗
    showUnitPrice() {
      this.$emit('showUnitPrice');
    },
    // 切换出发地和目的地
    changeAddress() {
      if (this.fromAddress !== '' && this.toAddress !== '') {
        const tempAddress = this.fromAddress;
        this.fromAddress = this.toAddress;
        this.toAddress = tempAddress;
      }
    },
    // 预约拼车
    async confirmCarpooling() {
      if (this.fromAddress === '') {
        this.showToast('请填写上车地点');
        return false;
      }
      if (this.toAddress === '') {
        this.showToast('请填写目的地');
        return false;
      }
      if (this.departureTime === '') {
        this.showToast('请填写出发时间');
        return false;
      }
      if (this.userType === 'passenger') {
        if (this.passengerNumber === '') {
          this.showToast('请填写乘车人数');
          return false;
        }
      } else {
        if (this.unitPrice === '') {
          this.showToast('每人单价');
          return false;
        }
        if (this.allSites === '') {
          this.showToast('途径站点');
          return false;
        }
      }

      // 时间格式转换
      let currentDate = JSON.parse(this.confirmDate);
      const nowDate = `${formatDate().format('YYYY-MM-DD')} ${currentDate.time}`;
      if (currentDate.day === 'today') {
        currentDate = formatDate(nowDate).valueOf();
      } else {
        currentDate = formatDate(nowDate).valueOf() + 24 * 60 * 60 * 1000;
      }
      // 发送请求
      const currentParams = {
        fromAddress: this.fromAddress,
        toAddress: this.toAddress,
        departureTime: currentDate,
        showDate: this.departureTime,
      };
      if (this.userType === 'passenger') {
        currentParams.passengerNumber = this.confirmPassengerNumber;
      } else {
        currentParams.unitPrice = this.confirmUnitPrice;
        currentParams.allSites = this.allSites;
      }
      if (this.userType === 'passenger') {
        await this.passengerSearchTravel(currentParams);
        if (this.travelList.length !== 0) {
          /*    const currentData = {
            showData: this.passengerTravelList,
            passengerShowData: {
              fromAddress: this.fromAddress,
              toAddress: this.toAddress,
              departureTime: currentDate,
              showDate: this.departureTime,
              passengerNumber: this.confirmPassengerNumber,
            },
          }; */
          this.$router.push({
            name: 'ActiveOrderList',
            query: {
              data: JSON.stringify(currentParams),
            },
          });
        }
      } else {
        await this.diverReleaseSchedule(currentParams);
      }
      return true;
    },
  },
};
</script>

<style lang="scss" >
.rideDetailCard{
  width: 355px;
  margin: auto;
  background: #FFFFFF;
  border-radius: 10px;
  overflow: hidden;
  /*拓展input样式*/
  .van-field__control{
    height: 24px;
    font-size: 17px;
    letter-spacing: 0;
  }
  .van-image{
    >img{
      width: 16px;
      height: 16px;
    }
  }
  /*input 样式和icon样式*/
  .input-class{
    padding:0 10px;
  }
  .text-area-class{
    .van-field__control{
      height: 38px;
      line-height: 38px;
    }
  }
  .front-icon{
    width: 16px;
    height:16px;
    margin-left: 16px;
  }
  /*横线样式*/
  .line{
    border:#000000 0.25px solid ;
    height: 0.2px;
    opacity: 0.1;
    background: #000000;
  }
  .line-one{
    margin-left: 37px;
    width: 250px;
  }
  .line-two{
    margin-left: 14px;
    width: 327px;
  }
  /*出发地和目的地*/
  .from-to{
    display: flex;
    align-items: center;
    .destinationContainer{
      width: 290px;
      .destination{
        display: flex;
        align-items: center;
      }
      .from{
        height: 59px;
      }
      .to{
        height: 55px;
      }
    }
    .change-from-and-to{
      height: 52px;
      width: 50px;
      .van-image{
        >img{
          height: 52px;
          width: 50px;
        }
      }
    }
  }
  /*t途径多个站点*/
  .sites{
    padding-top: 10px;
    display: flex;
    align-items: flex-start;
    .site-icon{
      margin-top: 10px;
    }
  }
  /*出发时间和乘车人数*/
  .when-how{
    display: flex;
    height: 55px;
    .whenContainer{
      display: flex;
      align-items: center;
    }
    .howContainer{
      width:154px;
      display: flex;
      align-items: center;
    }
  }
  .button-class{
    display: block;
    margin: 11px auto 16px;
    width: 327px;
    height: 40px;
    background: #309CF1;
    border-radius: 8px;
    border: none;
    font-size: 17px;
    color: #FFFFFF;
    letter-spacing: 1px;
    text-align: center;
    line-height: 40px;
  }
}
</style>
