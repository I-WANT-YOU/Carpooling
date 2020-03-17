<template>
    <div class="shareSchedule">
      <CarpoolingHeader title="司机的行程"/>
      <div class="contentContainer">
        <div class="tipInfo">司机已在“拼车”平台发布行程，可以预约哦</div>
        <div class="infoContainer">
          <CarOrderCard
            :showDataItem="shareData.travel"
            :passengerStatus="shareData.travel"
            buttonText=''/>
          <div class="sites">
            <div class="sites-title">途径站点：</div>
            <div class="sites-info">
              <div class="info-text">
                <van-image :src="siteIcon" class="site-icon"/>
                <span class="site-text">朝拜结缘一起</span>
              </div>
              <button class="info-button">拼车</button>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import { Image } from 'vant';
import CarpoolingHeader from '@component/CarpoolingHeader.vue';
import siteIcon from '../../components/images/toSite.png';
import CarOrderCard from '../../components/CarOrderCard.vue';

export default {
  name: 'ShareSchedule',
  data() {
    return {
      siteIcon,
    };
  },
  components: {
    CarpoolingHeader,
    CarOrderCard,
    'van-image': Image,
  },
  props: {
    shareData: {
      type: Object,
      default: () => {},
    },
  },
};
</script>

<style lang="scss" scoped>
  .shareSchedule{
    width: 100vw;
    height: 100vh;
    .contentContainer{
      .tipInfo{
        height: 44px;
        font-size: 16px;
        color: #333333;
        letter-spacing: 0;
        line-height: 44px;
      }
      .infoContainer{
        width: 355px;
        margin: auto;
        background: #FFFFFF;
        border-radius: 10px;
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
  }

</style>
