<template>
    <div class="carOrderCard">
      <!--行程信息-->
      <div class="rideInfo">
        <!--车辆照片-->
        <van-image  :src="showDataItem.carPic+'/h5show'" class="carImage"/>
        <!--行程具体信息-->
        <div class="rideInfoDetail">
          <div class="row">
            <div class="column-big">{{showDataItem.startTime}}</div>
            <div class="column-small">{{showDataItem.carColor}} {{showDataItem.carNumber}}</div>
            <a :href="'tel:'+showDataItem.phone"><van-image :src="phone" class="phoneImage"/></a>
          </div>
          <div class="row">
            <div class="row-two">
              <span class="column-big">{{showDataItem.fromStation}}</span>
              <van-image :src="rightArrow" class="rightArrow"/>
              <span class="column-big">{{showDataItem.toStation}}</span>
            </div>
            <span class="column-small">余{{showDataItem.seats}}位/共{{showDataItem.carCapacity}}位</span>
          </div>
          <!--价格 评价-->
          <div class="price">
            <span class="price-text">{{showDataItem.fee}}元/人</span>
            <div class="evaluation">
              <van-image :src="good" class="evaluation-icon"/>
              <span class="evaluation-num">{{showDataItem.appraiseUp}}</span>
              <van-image :src="bad" class="evaluation-icon"/>
              <span class="evaluation-num">{{showDataItem.appraiseDown}}</span>
            </div>
            <!--乘客拼车按钮-->
            <button v-show="buttonText!==''" class="carPoolingButton" @click="confirmDoing">{{buttonText}}</button>
          </div>
        </div>
      </div>
      <!--途径站点信息-->
      <div class="siteInfo">
        <div class="site-title">途径：</div>
        <div class="site-content">{{showDataItem.stations}}</div>
      </div>
      <MyLine class="line"></MyLine>
    </div>
</template>

<script>
import { Image } from 'vant';
import { mapActions } from 'vuex';
import car from './images/car.jpg';
import phone from './images/phone.png';
import rightArrow from './images/rightArrow.png';
import good from './images/good.png';
import bad from './images/bad.png';
import MyLine from './MyLine.vue';

export default {
  name: 'CarOrderCard',
  data() {
    return {
      car,
      phone,
      rightArrow,
      good,
      bad,
    };
  },
  props: {
    buttonText: {
      type: String,
      default: '',
    },
    showDataItem: {
      type: Object,
      default: () => {},
    },
    passengerShowData: {
      type: Object,
      default: () => {},
    },
  },
  components: {
    'van-image': Image,
    MyLine,
  },
  methods: {
    ...mapActions('passenger', ['orderLink']),
    /*
    接口方法
    */
    // 乘客预定行程
    async passengerOrderLink(params) {
      try {
        this.showLoadingToast();
        await this.orderLink(params);
        this.clearLoadingToast();
        this.showToast('预定成功');
        // 跳转到已预定订单列表页面（
        this.$router.push('/activeOrder');
      } catch (e) {
        this.clearLoadingToast();
        this.showToast(e);
      }
    },
    /*
    非接口方法
    */
    // 点击按钮（拼车或者取消）
    confirmDoing() {
      if (this.buttonText === '拼车') {
        const currentParams = Object.assign(this.passengerShowData, { travelId: this.showDataItem.id });
        this.passengerOrderLink(currentParams);
      } else if (this.buttonText === '撤销') {
        this.$emit('passengerCancelSchedule');
      } else if (this.buttonText === '完成') {
        this.$emit('passengerCompleteSchedule');
      }
    },
  },
};
</script>

<style lang="scss" scoped>
  .carOrderCard{
    margin: auto;
    height: 151px;
    padding-top: 10px;
 /* <!--行程信息-->*/
    .rideInfo{
      padding:0 20px;
      display: flex;
      height: 90px;
      .carImage{
        width: 120px;
        height: 90px;
      }
      /*行程信息*/
      .rideInfoDetail{
        flex-grow: 1;
        margin-left: 8px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .row{
          height: 23px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          line-height: 23px;
          .row-two{
            display: flex;
            align-items: center;
          }
          .column-big{
            font-size: 14px;
            color: #333333;
            letter-spacing: 0;
          }
          .column-small{
            font-size: 11px;
            color: #999999;
            letter-spacing: 0;
          }
          .phoneImage{
            width: 13.2px;
            height: 16px;
          }
          .rightArrow{
            width: 15px;
            height: 15px;
          }
        }
        /*价格评价*/
        .price{
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          .price-text{
            font-size: 14px;
            color: #FF7228;
            letter-spacing: 0;
            line-height: 14px;
          }
          .evaluation{
            display: flex;
            align-items: center;
            .evaluation-icon{
              width: 16px;
              height: 16px;
              margin-right:5px;
            }
            .evaluation-num{
              margin-right:8px ;
              font-size: 11px;
              color: #999999;
              letter-spacing: 0;
              line-height: 11px;
            }
          }

          .carPoolingButton{
            width: 56px;
            height: 30px;
            background: #309CF1;
            border-radius: 8px;
            font-size: 14px;
            color: #FFFFFF;
            letter-spacing: 0;
            text-align: center;
            border: none;
          }
        }
      }
    }
    /*途径站点*/
    .siteInfo{
      display: flex;
      height: 32px;
      margin:8px 20px 0;
      .site-title{
        width: 50px;
        display: inline-block;
        font-size: 11px;
        color: #333333;
        letter-spacing: 0;
        line-height: 16px;
      }
      .site-content{
        display: inline-block;
        font-size: 11px;
        color: #999999;
        letter-spacing: 0;
        line-height: 16px;
      }
    }
    .line{
      width: 347px;
      margin:11px  auto 0;
    }
  }
</style>
