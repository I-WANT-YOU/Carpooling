<template>
  <!--遮罩层-->
  <div class="phonePopContainer">
    <van-popup
      v-model="showPop"
      :close-on-click-overlay="false"
      :style="{ background: 'rgba(0,0,0,0.6)'}">
      <BindingPhoneContent v-if="showPop" @closeBindingPhonePop="closeBindingPhonePop" user-type="passenger"/>
    </van-popup>
  </div>
</template>

<script>
import { Popup } from 'vant';
import BindingPhoneContent from './BindingPhoneContent.vue';


export default {
  name: 'BindingPhone',
  data() {
    return {
      showPop: false,
    };
  },
  props: {
    showBindingPhonePop: {
      type: Boolean,
      default: false,
    },
  },
  watch: {
    showBindingPhonePop() {
      this.showPop = this.showBindingPhonePop;
    },
  },
  components: {
    'van-popup': Popup,
    BindingPhoneContent,
  },
  methods: {
    closeBindingPhonePop() {
      this.$emit('closeBindingPhonePop');
    },
  },
};
</script>

<style lang="scss" >
/*  .phonePopContainer{
    .contentSelect{
      width: 320px;
      height: 258px;
      background: #FFFFFF;
      border-radius: 12px;
      overflow: hidden;
      .text-describe{
        margin:20px 0 10px 10px;
        .text-one{
          display: block;
          font-size: 16px;
          color: #333333;
          letter-spacing: 0;
          line-height: 16px;
        }
        .text-two{
          height: 12px;
          margin: 8px auto 17px;
          font-size: 12px;
          color: #999999;
          letter-spacing: 0;
          line-height: 12px
        }
      }
      !*横线样式*!
      .line{
        opacity: 0.3;
        margin: auto;
        width: 307px;
        border-color: #000000;
      }
      // 手机信息
      .phoneInfo{
        .row-info{
          height: 55px;
          display: flex;
          align-items: center;
          font-size: 17px;
          letter-spacing: 0;
          .van-field__control{
            height: 24px;
            font-size: 17px;
            letter-spacing: 0;
          }
          .input-class{
            width: 150px;
            padding:0 0;
            border: none!important;
          }
        }
        .phoneNumber{
          .areaCode{
            height: 24px;
            margin: 0 10px;
            align-items: center;
            font-size: 17px;
            line-height: 24px;
            color: rgba(0,0,0,0.90);
            letter-spacing: 0;
          }
          .iphone-num{
            flex-grow:1;
          }
          .getCode{
            width: 93px;
            height: 30px;
            margin-right: 11px;
            background: #FFFFFF;
            border: 1px solid #FFC05E;
            border-radius: 8px;
            font-size: 14px;
            color: #FFC05E;
            letter-spacing: 0;
            text-align: center;
          }
        }
        .verificationCode{
          margin: 0 10px;
        }
      }
      .button-group{
        display: flex;
        justify-content: space-around;
        padding: 20px 20px;
        .cancelButton{
          width: 120px;
          height: 40px;
          background: rgba(0,0,0,0.05);
          border-radius: 8px;
          font-size: 17px;
          color: #192848;
          letter-spacing: 1px;
          text-align: center;
          border: none;
        }
        .confirmButton{
          width: 120px;
          height: 40px;
          background: #309CF1;
          border-radius: 8px;
          font-size: 17px;
          color: #FFFFFF;
          letter-spacing: 1px;
          text-align: center;
          border: none;
        }
      }

    }
  }*/
</style>
