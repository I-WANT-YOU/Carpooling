<template>
  <div class="shareScheduleContainer">
    <div class="shareSchedule">
      <div class="contentContainer">
        <div class="tipInfo">
          <div class="text">点击右上角“...”分享到微信群</div>
          <van-image :src="touch" class="touch-icon"/>
        </div>
        <!--原有行程-->
        <div class="infoContainer">
          <!--失效-->
          <div class="hideFail" :class="{fail:travelFail}" >
            <van-image :src="fail" class="fail-icon"/>
          </div>
          <CarOrderCard userType="share" :showDataItem="driverShareScheduleInfo" buttonText=''/>
          <div class="sites" v-show="!travelFail">
            <div class="sites-title">途径站点：</div>
            <div class="sites-info" v-show="stations.length!==0" v-for="(stationItem,stationIndex) in stations" :key="stationIndex">
              <div class="info-text">
                <van-image :src="siteIcon" class="site-icon"/>
                <span class="site-text">{{stationItem}}</span>
              </div>
              <van-button class="info-button" @click="confirm" :disabled="driverShareScheduleInfo.seats===0||driverShareScheduleInfo.travelStatus!=='idle'" >拼车</van-button>
            </div>
          </div>
        </div>
        <!--推荐行程-->
        <div class="infoContainer" v-show="JSON.stringify(shareScheduleInfo.recommendTravel)!=='{}'&&shareScheduleInfo.recommendTravel">
          <div class="recommendText">以下行程你可能会感兴趣</div>
          <CarOrderCard userType="share" :showDataItem="driverRecommendShareScheduleInfo" buttonText=''/>
          <div class="sites">
            <div class="sites-title">途径站点：</div>
            <div class="sites-info" v-show="recommendStations.length!==0" v-for="(stationItem,stationIndex) in recommendStations" :key="stationIndex">
              <div class="info-text">
                <van-image :src="siteIcon" class="site-icon"/>
                <span class="site-text">{{stationItem}}</span>
              </div>
              <button class="info-button" @click="confirm('recommend')">拼车</button>
            </div>
          </div>
        </div>
      </div>
      <div class="shareImage">
        <van-image :src="share" class="share"/>
      </div>
    </div>
    <!--绑定手机-->
    <binding-phone :showBindingPhonePop="showBindingPhonePop" @closeBindingPhonePop="showBindingPhonePop=false"  />
  </div>

</template>

<script>
import { getWeiXinCode, resetUrl } from '@utils/tools';
import wx from 'weixin-js-sdk';
import { mapActions, mapState, mapGetters } from 'vuex';
import { Image, Button } from 'vant';
import share from '@assets/share.png';
import fail from '@assets/fail-icon.png';
import touch from './touch-gif.gif';
import siteIcon from '../components/images/toSite.png';
import refreshButton from '../components/images/refreshButton.png';
import CarOrderCard from '../components/CarOrderCard.vue';
import BindingPhone from '../components/BindingPhone.vue';

export default {
  name: 'ShareSchedule',
  data() {
    return {
      siteIcon,
      refreshButton,
      touch,
      share,
      fail,
      travelId: '',
      showBindingPhonePop: false, // 绑定手机号弹窗
      travelFail: false,
    };
  },
  components: {
    CarOrderCard,
    'van-image': Image,
    'van-button': Button,
    BindingPhone,
  },
  computed: {
    ...mapState('driver', ['shareData', 'shareScheduleInfo']),
    ...mapState('passenger', ['userInfo']),
    ...mapGetters('driver', ['driverShareScheduleInfo', 'driverRecommendShareScheduleInfo']),
    stations() {
      if (this.driverShareScheduleInfo.stations && this.driverShareScheduleInfo.stations !== '') {
        return this.driverShareScheduleInfo.stations.split(',');
      }
      return [];
    },
    recommendStations() {
      if (this.driverRecommendShareScheduleInfo.stations && this.driverRecommendShareScheduleInfo.stations !== '') {
        return this.driverRecommendShareScheduleInfo.stations.split(',');
      }
      return [];
    },
  },
  methods: {
    ...mapActions('driver', ['getShareScheduleInfo', 'shareSchedule']),
    ...mapActions('passenger', ['orderLink', 'getUserInfo']),
    /*
    接口方法
    */

    // 获取用户信息
    async passengerGetUserInfo() {
      try {
        this.showLoadingToast();
        await this.getUserInfo('userInfo');
        this.clearLoadingToast();
      } catch (e) {
        if (e.code === -1) {
          this.clearLoadingToast();
        } else {
          this.clearLoadingToast();
          this.showToast(e);
        }
      }
    },

    // 获取分享页面信息
    async driverGetShareScheduleInfo(travelId) {
      try {
        this.showLoadingToast();
        await this.getShareScheduleInfo(travelId);
        this.clearLoadingToast();
      } catch (e) {
        this.clearLoadingToast();
        this.showToast(e);
      }
    },

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

    // 乘客预定
    async confirm(params) {
      await this.passengerGetUserInfo(); // 获取用户信息
      if (this.userInfo && JSON.stringify(this.userInfo) !== '{}') { // 有userInfo信息
        if (this.userInfo.phone === '') {
          this.$emit('showBindingPhone'); // 显示手机号
          return false;
        }
      } else { // 没有userInfo
        this.showBindingPhonePop = true; // 显示手机号
        return false;
      }
      let currentParams = {};
      if (params === 'recommend') {
        currentParams = {
          travelId: this.driverRecommendShareScheduleInfo.id,
          fromAddress: this.driverShareScheduleInfo.fromStation,
          toAddress: this.driverShareScheduleInfo.toStation,
          departureTime: this.driverShareScheduleInfo.departureTime,
          passengerNumber: '1',
        };
      } else {
        currentParams = {
          travelId: this.travelId,
          fromAddress: this.driverShareScheduleInfo.fromStation,
          toAddress: this.driverShareScheduleInfo.toStation,
          departureTime: this.driverShareScheduleInfo.departureTime,
          passengerNumber: '1',
        };
      }
      this.passengerOrderLink(currentParams);
      return true;
    },

    async getConfigInfo() {
      try {
        await this.shareSchedule(window.location.href);
        this.setConfig();
        this.driverShareSchedule();
      } catch (e) {
        this.showToast(e);
      }
    },

    // 微信分享行程
    setConfig() {
      wx.config({
        debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: this.shareData.appId, // 必填，公众号的唯一标识
        timestamp: this.shareData.timestamp, // 必填，生成签名的时间戳
        nonceStr: this.shareData.nonceStr, // 必填，生成签名的随机串
        signature: this.shareData.sign, // 必填，签名，见附录1
        jsApiList: ['updateAppMessageShareData'], // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
      });
    },

    // 分享到朋友圈
    driverShareSchedule() {
      wx.ready(() => {
        wx.updateAppMessageShareData({
          title: `${this.driverShareScheduleInfo.startTime}  ${this.driverShareScheduleInfo.fromStation}--${this.driverShareScheduleInfo.toStation}  ${this.driverShareScheduleInfo.fee}/人`, // 分享标题
          desc: `途径：${this.driverShareScheduleInfo.stations}\n剩余座位： ${this.driverShareScheduleInfo.seats}`, // 分享描述
          link: window.location.href, // 分享链接
          imgUrl: 'https://lc-1301580412.cos.ap-beijing.myqcloud.com/logo_round.png', // 分享图标
          type: 'link', // 分享类型,music、video或link，不填默认为link
          dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
          success() {
            // 用户确认分享后执行的回调函数
          },
          cancel() {
            // 用户取消分享后执行的回调函数
          },
        });
      });
    },
  },
  async created() {
    const openId = window.localStorage.getItem('openId');
    if (openId === null || openId === '') {
      window.localStorage.setItem('openId', 'currentOpenId');
      window.localStorage.setItem('currentTravelId', this.$route.query.travelId);
      resetUrl();
    }
  },
  async mounted() {
    const openId = window.localStorage.getItem('openId');
    if (openId === null || openId === '' || openId === 'currentOpenId') {
      await getWeiXinCode();
      this.travelId = window.localStorage.getItem('currentTravelId');
      await this.driverGetShareScheduleInfo(this.$route.query.travelId);
      this.travelFail = this.driverShareScheduleInfo.seats === 0 || this.driverShareScheduleInfo.travelStatus !== 'idle';
      this.getConfigInfo(); // 设置分享
    } else {
      if (this.$route.query.travelId) {
        this.travelId = this.$route.query.travelId;
        await this.driverGetShareScheduleInfo(this.$route.query.travelId);
        this.travelFail = this.driverShareScheduleInfo.seats === 0 || this.driverShareScheduleInfo.travelStatus !== 'idle';
      }
      this.getConfigInfo(); // 设置分享
    }
  },
};
</script>

<style lang="scss" scoped>
  .shareScheduleContainer{
    width: 100%;
    height: 100%;
    background-image: linear-gradient(1deg, #FFFFFF 20%, #DCEBF4 86%);
  }
  .shareSchedule{
    width: 100%;
    height: 100%;
    .contentContainer{
      .tipInfo{
        display: flex;
        justify-content: center;
        align-items: center;
        height: 60px;
        padding-left: 30px;
        .text{
          color:#309CF1;
          font-size: 18px;
        }
        .touch-icon{
          width: 40px;
          height: 40px;
        }

        /*height: 44px;*/
        /*font-size: 16px;*/
        /*color: #333333;*/
        /*letter-spacing: 0;*/
        /*line-height: 44px;*/
        .share{
          width: 375px;
          height: 64px;
        }
      }
      .infoContainer{
        position: relative;
        width: 375px;
        margin: auto;
        background: #FFFFFF;
        border-radius: 10px;
        /*推荐行程*/
        .recommendText{
          height: 40px;
          padding: 20px 20px 0;
          font-size: 18px;
          color:#309CF1;
        }
        /*失效图片*/
        .hideFail{
          display: none;
        }
        .fail{
          display: block;
          position: absolute;
          top: 0;
          width: 375px;
          height: 120px;
          z-index: 100;
          .fail-icon{
            display:block;
            width: 120px;
            height:120px;
            margin: 0 auto;
          }
        }
        .sites{
          padding: 0 10px 0 14px;
          .sites-title{
            height: 35px;
            font-size: 14px;
            color: #333333;
            letter-spacing: 0;
            line-height: 35px;
          }
          .sites-info{
            height: 35px;
            line-height: 35px;
            padding-bottom: 5px;
            display: flex;
            justify-content: space-between;
            .info-text{
              display: flex;
              align-items: center;
              .site-icon{
                width: 16px;
                height: 16px;
                margin-right: 5px;
              }
              .site-text{
                font-size: 14px;
                color: #333333;
                letter-spacing: 0;
              }
            }
            .info-button{
              width: 56px;
              height: 30px;
              padding: 0;
              line-height: 30px;
              border: none;
              background: #309CF1;
              border-radius: 8px;
              color: #FFFFFF;
              font-size: 14px;
              letter-spacing: 0;
              text-align: center;
            }
          }
        }
      }
    }
    /*二维码图片*/
    .shareImage{
      width: 355px;
      margin:20px auto 0;
      display: flex;
      flex-direction: column;
      .text{
        height: 30px;
        line-height: 30px;
        color: red;
        font-size: 15px;
      }
      .share {
        width: 355px;
      }
    }
  }

</style>
