<template>
  <div class="shareScheduleContainer">
    <div class="shareSchedule">
      <CarpoolingHeader title="司机的行程"/>
      <div class="contentContainer">
        <div class="tipInfo">
          <!--<span>司机已在“拼车”平台发布行程，可以预约哦</span>-->
          <!--<van-image :src="refreshButton" class="refresh-icon"/>-->
          <van-image :src="share" class="share"/>
        </div>
        <div class="infoContainer">
          <CarOrderCard
            :showDataItem="driverShareScheduleInfo"
            buttonText=''/>
          <div class="sites">
            <div class="sites-title">途径站点：</div>
            <div class="sites-info" v-show="stations.length!==0" v-for="(stationItem,stationIndex) in stations" :key="stationIndex">
              <div class="info-text">
                <van-image :src="siteIcon" class="site-icon"/>
                <span class="site-text">{{stationItem}}</span>
              </div>
              <button class="info-button" @click="confirm">拼车</button>
            </div>
          </div>
        </div>
      </div>
      <van-image :src="ewm" class="ewm"/>
    </div>
  </div>

</template>

<script>
import wx from 'weixin-js-sdk';
import { mapActions, mapState, mapGetters } from 'vuex';
import { Image } from 'vant';
import CarpoolingHeader from '@component/CarpoolingHeader.vue';
import share from '@assets/share_icon.png';
import ewm from '@assets/share_ewm.png';
import siteIcon from '../components/images/toSite.png';
import refreshButton from '../components/images/refreshButton.png';
import CarOrderCard from '../components/CarOrderCard.vue';

export default {
  name: 'ShareSchedule',
  data() {
    return {
      siteIcon,
      refreshButton,
      share,
      ewm,
      travelId: '',
    };
  },
  components: {
    CarpoolingHeader,
    CarOrderCard,
    'van-image': Image,
  },
  computed: {
    ...mapState('driver', ['shareData']),
    ...mapGetters('driver', ['driverShareScheduleInfo']),
    stations() {
      if (this.driverShareScheduleInfo.stations && this.driverShareScheduleInfo.stations !== '') {
        return this.driverShareScheduleInfo.stations.split(',');
      }
      return [];
    },
  },
  methods: {
    ...mapActions('driver', ['getShareScheduleInfo', 'shareSchedule']),
    ...mapActions('passenger', ['orderLink']),
    /*
    接口方法
    */
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
    confirm() {
      const currentParams = {
        travelId: this.travelId,
        fromAddress: this.driverShareScheduleInfo.fromStation,
        toAddress: this.driverShareScheduleInfo.toStation,
        departureTime: this.driverShareScheduleInfo.departureTime,
        passengerNumber: '1',
      };
      this.passengerOrderLink(currentParams);
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
          title: `${this.driverShareScheduleInfo.startTime}  ${this.driverShareScheduleInfo.fromStation}--${this.driverShareScheduleInfo.toStation}  ${this.driverShareScheduleInfo.fee}元/每人`, // 分享标题
          desc: `途径：${this.driverShareScheduleInfo.stations}`, // 分享描述
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
  async mounted() {
    if (this.$route.query.travelId) {
      this.travelId = this.$route.query.travelId;
      await this.driverGetShareScheduleInfo(this.$route.query.travelId);
    }
    this.getConfigInfo();
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
    background: url("../../assets/bgImage.png") no-repeat fixed center bottom;
    background-size: 375px 354px;
    .contentContainer{
      .tipInfo{
        /*display: flex;*/
        /*justify-content: center;*/
        /*align-items: center;*/
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
        width: 375px;
        margin: auto;
        background: #FFFFFF;
        border-radius: 10px;
        .sites{
          padding: 0 10px 0 14px;
          max-height: 230px;
          overflow-y: scroll;
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
    .ewm {
      position: fixed;
      width: 378px;
      bottom: 0;
      margin-left: -2px;
    }
  }

</style>
