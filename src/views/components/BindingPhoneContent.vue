<template>
  <div class="phoneContainer">
    <!--文字描述-->
    <div class="text-describe">
      <span class="text-one">{{userType==='driver'?showTextOne:showTextTwo}}</span>
      <div class="text-two">
        <span>绑定即表明同意 </span>
        <a href="#" style="color:#309CF1;">法律声明及隐私政策</a>
      </div>
    </div>
    <div class="phoneInfo">
      <div class="phoneNumber row-info">
        <div class="areaCode">+86</div>
        <div class="iphone-num"><van-field v-model="phoneNumber" type="tel" class="input-class" placeholder="请输入手机号" /></div>
        <Button class="getCode" @click="getVerificationCode">{{verificationCodeButtonText}}</Button>
      </div>
      <MyLine class="line"/>
      <div class="verificationCode row-info">
        <van-field v-model="verificationCode" class="input-class" placeholder="请输入验证码"/>
      </div>
      <MyLine class="line"/>
    </div>
    <!--乘客人数取人按钮-->
    <div class="button-group" v-show="userType==='passenger'">
      <van-button type="primary" class="passengerCancelButton" @click.native="cancel">取消</van-button>
      <van-button type="primary" class="passengerConfirmButton" @click="confirm">完成</van-button>
    </div>
    <div class="button-group button-group-two" v-show="userType==='driver'||userType==='user'">
      <van-button type="primary" class="driverConfirmButton" @click="confirm">保存</van-button>
    </div>
  </div>
</template>

<script>
import { Button, Field } from 'vant';
import { mapActions } from 'vuex';
import MyLine from './MyLine.vue';


export default {
  name: 'BindingPhoneContent',
  data() {
    return {
      verificationCode: '', // 验证码
      phoneNumber: '', // 手机号码
      verificationCodeButtonText: '获取验证码', // 按钮
      countTime: 60,
      clickAble: true,
      showTextOne: '绑定手机号码，方便与司机联系',
      showTextTwo: '绑定手机号码，方便联系',
    };
  },
  props: {
    userType: {
      type: String,
      default: '',
    },
  },
  watch: {
    phoneNumber(val) {
      const lastStr = val.charAt(val.length - 1);
      // 只能是数字
      if (!(/^[0-9]*$/.test(lastStr))) {
        this.phoneNumber = this.phoneNumber.substring(0, val.length - 1);
      }
    },
  },
  components: {
    'van-button': Button,
    'van-field': Field,
    MyLine,
  },
  methods: {
    ...mapActions('passenger', ['getSmsCode', 'bindPhoneNumber']),
    /*
      接口方法
    */
    // 获取手机验证码
    async getPhoneCode(phone) {
      try {
        this.showLoadingToastWithoutOverlay();
        await this.getSmsCode(phone);
        this.clearLoadingToast();
        this.showToast('验证码发送成功');
      } catch (error) {
        this.clearLoadingToast();
        this.showToast(error);
      }
    },

    // 提交手机号
    async postPhoneNumber(phoneData) {
      try {
        this.showLoadingToastWithoutOverlay();
        await this.bindPhoneNumber(phoneData);
        this.clearLoadingToast();
        this.showToast('绑定成功');
      } catch (error) {
        this.clearLoadingToast();
        this.showToast(error);
      }
    },

    /*
     非接口方法
     */

    // 校验手机号
    checkPhoneNumber(phoneNumber) {
      if (phoneNumber === '') {
        this.showToast('手机号码不能为空');
        return false;
      }
      if (!(/^1[3456789]\d{9}$/.test(phoneNumber))) {
        this.showToast('手机号码有误，请重填');
        return false;
      }
      return true;
    },

    // 校验验证码
    checkCode(phoneCode) {
      if (phoneCode === '') {
        this.showToast('请填写验证码');
        return false;
      }
      if (phoneCode.length !== 6) {
        this.showToast('验证码格式错误');
      }
      return true;
    },
    close() {
      this.$emit('closeDatePop', false);
    },

    // 倒计时
    countDown() {
      const that = this;
      this.timer = setInterval(() => {
        // 当num等于100时清除定时器
        if (that.countTime === 0) {
          clearInterval(that.timer);
          this.clickAble = true;
          that.verificationCodeButtonText = '重新发送';
          this.countTime = 60;
        } else {
          that.verificationCodeButtonText = `${that.countTime}s`;
          that.countTime -= 1;
        }
      }, 1000);
    },

    // 获取验证码
    getVerificationCode() {
      if (this.clickAble) {
        if (this.countTime === 60) {
          if (this.checkPhoneNumber(this.phoneNumber)) {
            this.clickAble = false;
            this.getPhoneCode(this.phoneNumber);
            this.countDown();
          }
        }
      }
    },

    // 取消
    cancel() {
      this.$emit('closeBindingPhonePop');
    },

    // 确定 提交手机号和验证码
    async confirm() {
      if (this.checkPhoneNumber(this.phoneNumber)) {
        if (this.checkCode(this.verificationCode)) {
          const currentParams = {
            verificationCode: this.verificationCode, // 验证码
            phoneNumber: this.phoneNumber, // 手机号码
          };
          await this.postPhoneNumber(currentParams);
          if (this.userType === 'driver') {
            await this.$router.push('/driverSchedules');
          } else {
            this.cancel();
          }
        }
      }
    },
  },
  beforeDestroy() {
    clearInterval(this.timer);
  },
};
</script>

<style lang="scss" >
  .phoneContainer{
      position: relative;
      width: 320px;
      height: 288px;
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
      /*横线样式*/
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
            margin: 0 10px 0 24px;
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
          margin: 0 24px;
        }
      }
      .button-group{
        position: absolute;
        width: 280px;
        bottom: 10px;
        display: flex;
        justify-content: space-between;
        padding: 20px 20px;
        .passengerCancelButton{
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
        .passengerConfirmButton{
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
        .driverConfirmButton{
          width: 327px;
          height: 40px;
          margin: auto;
          background: #309CF1;
          border-radius: 8px;
        }
      }
    .button-group-two{
      width: 315px;
    }

    }
</style>
