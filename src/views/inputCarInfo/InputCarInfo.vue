<template>
    <div class="inputCarInfo">
      <!--提示信息-->
      <div class="warning-text">
        * 司机必须录入车辆信息才能发布行程，乘客不必
      </div>
      <div class="contentContainer">
        <div class="upLoadImage">
          <van-uploader preview-size="120"  :max-count="1" :after-read="afterRead"  v-model="fileList"/>
          <div class="image-text">请上传带车牌照的车辆照片</div>
        </div>
        <MyLine class="line"/>
        <div class="carNumber">
          <van-field
            v-model="carNumber"
            class="input-class"
            placeholder="请输入车牌号"
            label="车牌号："
            label-width="90px"
            label-align="right"/>
        </div>
        <MyLine class="line"/>
        <div class="carColor">
          <div class="label-class">颜色：</div>
          <div class="color-container">
            <CarRadio
              v-for="(carRadioItem,carRadioIndex) in radioList"
              :key="carRadioIndex"
              :carRadioItem="carRadioItem"
              class="radioItem"
              :carRadioIndex="carRadioIndex"
              @toggleCarRadio="toggleCarRadio"/>
          </div>
        </div>
        <MyLine class="line"/>
        <div class="passengerNumber">
          <div class="label-class">载客人数：</div>
          <div class="color-container">
            <PassengerNumberRadio
              v-for="(passengerNumberItem,passengerNumberIndex) in passengerNumberList"
              :key="passengerNumberIndex"
              :passengerNumberItem="passengerNumberItem"
              :passengerNumberIndex="passengerNumberIndex"
              @togglePassengerNumber="togglePassengerNumber"
              class="passengerRadioItem"/>
          </div>
        </div>
        <CarpoolingButton buttonText="保存" class="confirm-button" @click.native="saveDriverCarInfo"/>
      </div>
    </div>
</template>

<script>
import COS from 'cos-js-sdk-v5';
import { getWeiXinCode, resetUrl } from '@utils/tools';
import { mapActions, mapState } from 'vuex';
import { Uploader, Field } from 'vant';
import CarpoolingButton from '@component/CarpoolingButton.vue';
import MyLine from '../components/MyLine.vue';
import CarRadio from './components/CarRadio.vue';
import PassengerNumberRadio from './components/PassengerNumberRadio.vue';

export default {
  name: 'InputCarInfo',
  data() {
    return {
      img: '', // 图片地址
      selectedCaColorRadio: '', // 车辆颜色
      selectedPassengerNumberRadio: '', // 乘车人数
      carNumber: '', // 车牌号
      fileList: [
        // { url: 'https://img.yzcdn.cn/vant/leaf.jpg' },
      ],
      radioList: [
        {
          bgColor: '#FFFFFF',
          text: '白色',
          show: false,
        },
        {
          bgColor: '#FFF43E',
          text: '黄色',
          show: false,
        },
        {
          bgColor: '#1C84FF',
          text: '蓝色',
          index: 0,
          show: false,
        },
        {
          bgColor: '#00C553',
          text: '绿色',
          show: false,
        },
        {
          bgColor: '#000000',
          text: '黑色',
          textColor: '#FFFFFF',
          show: false,
        },
        {
          bgColor: '#F43232',
          text: '红色',
          show: false,
        },
        {
          bgColor: '#FFAE31',
          text: '橙色',
          show: false,
        },
        {
          bgColor: '#D6D6D6',
          text: '银色',
          show: false,
        },
        {
          bgColor: '#A173F4',
          text: '紫色',
          show: false,
        },
        {
          bgColor: '#F3F3F3',
          text: '其他',
          show: false,
        },
      ],
      passengerNumberList: [
        {
          text: 1,
          show: false,
        },
        {
          text: 2,
          show: false,
        },
        {
          text: 3,
          show: false,
        },
        {
          text: 4,
          show: false,
        },
        {
          text: 5,
          show: false,
        },
        {
          text: 6,
          show: false,
        },
        {
          text: 7,
          show: false,
        },
        {
          text: 8,
          show: false,
        },
        {
          text: 9,
          show: false,
        },
        {
          text: 10,
          show: false,
        },
      ],
      cos: null,
    };
  },
  components: {
    'van-field': Field,
    'van-uploader': Uploader,
    CarpoolingButton,
    MyLine,
    CarRadio,
    PassengerNumberRadio,
  },
  computed: {
    ...mapState('driver', ['uploadInfo']),
    ...mapState('passenger', ['userInfo']),
  },
  watch: {
    carNumber(value) {
      if (value) {
        const currentValue = value.split('');
        for (let i = 0; i < currentValue.length; i += 1) {
          currentValue[i] = currentValue[i].toUpperCase();
        }
        this.carNumber = currentValue.join('');
      }
    },
    userInfo(value) {
      if (value.carColor && value.carNumber) {
        this.carNumber = value.carNumber || '';
      }
      if (value.carPic) {
        this.img = value.carPic;
        this.$set(this.fileList, '0', { url: value.carPic });
      }
      if (value.carCapacity) {
        this.selectedPassengerNumberRadio = value.carCapacity;
        this.formatData('number', value.carCapacity);
      }
      if (value.carColor) {
        this.selectedCaColorRadio = value.carColor;
        this.formatData('color', value.carColor);
      }
    },
  },
  methods: {
    ...mapActions('driver', ['saveCarInfo', 'getUploadInfo']),
    ...mapActions('passenger', ['getUserInfo']),
    /*
    接口方法
     */

    // 获取用户信息
    async driverGetUserInfo() {
      try {
        this.showLoadingToast();
        await this.getUserInfo();
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
    // 保存车辆信息
    async postDriverCarInfo(params) {
      try {
        this.showLoadingToast();
        await this.saveCarInfo(params);
        this.clearLoadingToast();
        this.$router.push('/driverReleaseSchedule');
      } catch (e) {
        this.clearLoadingToast();
        this.showToast(e);
      }
    },

    // 获取存储的临时密匙
    async driverGetUploadInfo() {
      try {
        this.showLoadingToast();
        await this.getUploadInfo();
        this.clearLoadingToast();
      } catch (e) {
        this.clearLoadingToast();
        this.showToast(e);
      }
    },

    /*
    非接口方法
     */
    // 初始化数据
    formatData(type, text) {
      if (type === 'number') { // 乘车人数
        for (let i = 0; i < this.passengerNumberList.length; i += 1) {
          if (text === this.passengerNumberList[i].text) {
            this.$set(this.passengerNumberList[i], 'show', true);
          }
        }
      } else {
        for (let i = 0; i < this.radioList.length; i += 1) {
          if (text === this.radioList[i].text) {
            this.$set(this.radioList[i], 'show', true);
          }
        }
      }
    },

    // 保存车辆信息
    async saveDriverCarInfo() {
      if (this.fileList === '') {
        this.showToast('车辆图片不能为空');
        return false;
      }
      if (this.carNumber === '') {
        this.showToast('车牌号不能为空');
        return false;
      }
      if (this.selectedCaColorRadio === '') {
        this.showToast('车辆颜色不能为空');
        return false;
      }
      if (this.selectedPassengerNumberRadio === '') {
        this.showToast('载客人数不能为空');
        return false;
      }
      // 参数
      const currentParams = {
        selectedCaColorRadio: this.selectedCaColorRadio, // 车辆颜色
        selectedPassengerNumberRadio: this.selectedPassengerNumberRadio, // 乘车人数
        carNumber: this.carNumber, // 车牌号
        fileList: this.img, // 图片地址
      };
      await this.postDriverCarInfo(currentParams);
      return true;
    },
    // 汽车颜色
    toggleCarRadio(value) {
      for (let i = 0; i < this.radioList.length; i += 1) {
        this.$set(this.radioList[i], 'show', false);
      }
      const currentValue = JSON.parse(value);
      this.$set(this.radioList[currentValue.index], 'show', currentValue.show);
      this.selectedCaColorRadio = '';
      if (currentValue.show === true) {
        this.selectedCaColorRadio = this.radioList[currentValue.index].text;
      }
    },
    // 乘车人数
    togglePassengerNumber(value) {
      for (let i = 0; i < this.passengerNumberList.length; i += 1) {
        this.$set(this.passengerNumberList[i], 'show', false);
      }
      const currentValue = JSON.parse(value);
      this.$set(this.passengerNumberList[currentValue.index], 'show', currentValue.show);
      this.selectedPassengerNumberRadio = '';
      if (currentValue.show === true) {
        this.selectedPassengerNumberRadio = this.passengerNumberList[currentValue.index].text;
      }
    },

    // 本地获取上传图片
    afterRead(file) {
      // 此时可以自行将文件上传至服务器
      this.getCOS();
      this.driverUploadImage(file);
    },

    // 初始化实例
    getCOS() {
      this.cos = new COS({
        SecretId: 'AKID0nkQcW5UHm0wd3d1h6rLSIr8I9jdOixI',
        SecretKey: 'ECuKSLccOt8ety4VeZDPoAIAoCJ9iz1l',
      });

      // const that = this;
      // this.cos = new COS({
      //   // 必选参数
      //   getAuthorization(options, callback) {
      //     // 服务端例子：https://github.com/tencentyun/qcloud-cos-sts-sdk/blob/master/scope.md
      //     callback({
      //       TmpSecretId: that.uploadInfo.credentials.tmpSecretId,
      //       TmpSecretKey: that.uploadInfo.credentials.tmpSecretKey,
      //       XCosSecurityToken: that.uploadInfo.credentials.sessionToken,
      //       // 建议返回服务器时间作为签名的开始时间，避免用户浏览器本地时间偏差过大导致签名错误
      //       StartTime: that.uploadInfo.startTime, // 时间戳，单位秒，如：1580000000
      //       ExpiredTime: that.uploadInfo.expiredTime, // 时间戳，单位秒，如：1580000900
      //     });
      //   },
      // });
    },
    // 上传图片
    driverUploadImage(fileObject) {
      const myDate = new Date().getTime();
      const name = fileObject.file.name.split('.');
      const keyName = `car_${this.openId}_${myDate}.${name[name.length - 1]}`;
      this.cos.putObject({
        Bucket: 'chuang-w-1301719218', /* 必须 */
        Region: 'ap-chengdu', /* 存储桶所在地域，必须字段 */
        Key: keyName, /* 必须 */
        StorageClass: 'STANDARD',
        Body: fileObject.file, // 上传文件对象
        onProgress(progressData) {
          console.log(JSON.stringify(progressData));
        },
      }, (err, data) => {
        console.log(err || data);
        if (data) {
          this.img = ` https://${data.Location}`;
        }
      });
    },
  },

  async created() {
    const openId = window.localStorage.getItem('openId');
    if (openId === null || openId === '') {
      window.localStorage.setItem('openId', 'currentOpenId');
      resetUrl();
    } else {
      this.openId = openId;
    }
  },
  async mounted() {
    const openId = window.localStorage.getItem('openId');
    if (openId === null || openId === '' || openId === 'currentOpenId') {
      await getWeiXinCode();
      this.openId = openId;
      await this.driverGetUserInfo();
    } else {
      await this.driverGetUserInfo();
    }
  },
};
</script>

<style lang="scss" >
.inputCarInfo{
  width: 100%;
  height: 100%;
  background: #EDEDED;
 /*提示信息*/
  .warning-text{
    height: 54px;
    margin-left: 24px;
    font-size: 14px;
    color: #FF7228;
    letter-spacing: 0;
    line-height: 54px;
  }
  .line{
    width: 327px;
    margin: 0 auto;
  }
  /*车辆信息*/
  .contentContainer{
    width: 327px;
    padding: 0 14px;
    margin: auto;
    overflow: hidden;
    background: #FFFFFF;
    /*上传图片*/
    .upLoadImage{
      margin: 14px auto;
      text-align: center;
      .image-text{
        font-size: 17px;
        color: #333333;
        letter-spacing: 0;
      }
    }
    /*车牌号*/
    .carNumber{
      height: 55px;
      .input-class{
        padding-left: 0;
        .van-field__label{
          padding-right:0
        }
        .van-field__control{
          height: 30px;
          padding-left: 10px;
          line-height: 30px;
          border: 1px solid #F2F2F2;
          border-radius: 8px;
        }
        font-size: 17px;
        .labelClass{
          font-size: 17px;
          color: #333333;
          letter-spacing: 0;
          text-align: right;
        }
      }
    }
    /*车辆颜色*/
    .carColor,
    .passengerNumber{
      display: flex;
      .label-class{
        width: 90px;
        flex-shrink: 0;
        font-size: 17px;
        color: #333333;
        letter-spacing: 0;
        text-align: right;
      }
      .color-container{
        display: flex;
        flex-grow: 1;
        flex-wrap: wrap;
        .radioItem,
        .passengerRadioItem{
          margin: 0 9px 10px 0;
        }
        .radioItem:nth-child(5n){
          margin-right: 0;
        }
        .passengerRadioItem:nth-child(6n){
          margin-right: 0;
        }
      }
    }
    .carColor{
      margin-top: 14px;
    }
    .passengerNumber{
      margin-top: 17px;
    }
    .confirm-button{
      margin: 24px 0 14px;
    }
  }
}
</style>
