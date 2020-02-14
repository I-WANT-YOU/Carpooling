<template>
  <div class="rideDetailCard">
    <!--乘车地点和出发地-->
    <div class="from-to">
      <div class="destinationContainer">
        <div class="from destination">
          <van-image  :src="from" class="front-icon"/>
          <van-field v-model="fromAddress" class="input-class" placeholder="您要从哪儿上车" readonly @click="showAddress('fromAddress')"/>
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
      <div class="howContainer">
        <van-image  :src="people" class="front-icon"/>
        <van-field v-model="passengerNumbers" class="input-class" placeholder="几人乘车" readonly/>
      </div>
    </div>
    <div class=" line line-two" v-show="userType==='driver'"></div>
    <!--途径多个站点-->
    <div class="sites" v-show="userType==='driver'">
      <van-image  :src="sites" class="front-icon"/>
      <van-field v-model="siteNumbers" class="input-class" placeholder="途经多个站点" />
    </div>
    <!--button-->
    <button class="button-class">
      预约拼车
    </button>
  </div>
</template>

<script>
import { Field, Image } from 'vant';
import from from './images/from.png';
import when from './images/when.png';
import people from './images/people.png';
import sites from './images/sites.png';
import changeButton from './images/button.jpg';

export default {
  name: 'RideDetailCard',
  data() {
    return {
      from,
      when,
      people,
      sites,
      changeButton,
      formDestination: '',
      toDestination: '',
      fromAddress: '', // 出发地
      toAddress: '', // 目的地
      departureTime: '', // 出发时间
      passengerNumbers: '', // 几人乘车
      siteNumbers: '', // 途径多个站点
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
    confirmDate() {
      this.departureTime = this.confirmDate;
    },
  },
  methods: {
    // 地址弹窗
    showAddress(value) {
      this.$emit('showAddress', value);
    },
    // 时间弹窗
    showDate() {
      this.$emit('showDate');
    },
    // 切换出发地和目的地
    changeAddress() {
      const tempAddress = this.fromAddress;
      this.fromAddress = this.toAddress;
      this.toAddress = tempAddress;
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
    height: 55px;
    display: flex;
    align-items: center;
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
