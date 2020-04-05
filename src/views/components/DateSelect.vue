<template>
  <!--遮罩层-->
  <div class="datePopContainer">
    <van-popup
      v-model="showPop"
      :close-on-click-overlay="false"
      position="bottom"
      :style="{ background: 'rgba(0,0,0,0.6)'}">
      <div class="contentSelect">
        <!--头部-->
        <div class="title" >
          <div style="display: inline-block" @click="close"> <svg-icon icon-class="close" class="icon-class"/></div>
        </div>
        <!--文字描述-->
        <div class="text-describe">
          <span class="text-one">{{userType==='driver'?'请选择出发时间，发布行程':'请选择出发时间，拼车出发'}}</span>
          <div class="text-two">
            <span>{{userType==='driver'?'在所选出发时间之后持续为你寻找乘客':'在所选出发时间内持续为你寻找车辆'}}</span>
          </div>
        </div>
        <!--选择列表-->
        <van-divider class="line"></van-divider>
        <div class="list-tabs">
          <button  :class="date==='today'?'active-class':'un-active-class'" @click="changeDate('today')">今天</button>
          <button  :class="date==='tomorrow'?'active-class':'un-active-class'" @click="changeDate('tomorrow')">明天</button>
        </div>
        <div class="address-list-container">
          <DateSelectList :initDateSelectList="initDateSelectList"  class="width-style" @getCurrentDateValue="getCurrentDateValue"/>
        </div>
        <!--行程确认按钮-->
        <CarpoolingButton class="confirmButton" :buttonText="buttonText" @click.native="confirmSelectedDate"/>
      </div>
    </van-popup>
  </div>
</template>

<script>
import { Divider, Popup } from 'vant';
import CarpoolingButton from '@component/CarpoolingButton.vue';
import DateSelectList from './DateSelectList.vue';


export default {
  name: 'DateSelect',
  data() {
    return {
      date: 'today', // 激活tabs
      showPop: false,
      buttonText: '确认00:00出发',
      initDateSelectList: 0, // 初始化时间选项的数值
      selectedDateValue: '00:00', // 确认出发时间
    };
  },
  props: {
    showDatePop: {
      type: Boolean,
      default: false,
    },
    userType: {
      type: String,
      default: '',
    },
  },

  watch: {
    showDatePop() {
      this.showPop = this.showDatePop;
    },
  },
  components: {
    'van-divider': Divider,
    'van-popup': Popup,
    DateSelectList,
    CarpoolingButton,
  },
  methods: {
    /*
     非接口方法
     */
    changeDate(date) {
      if (date === 'today') {
        this.date = 'today';
        this.initDateSelectList += 1;
        this.buttonText = '确认00:00出发';
      } else {
        this.date = 'tomorrow';
        this.initDateSelectList += 1;
        this.buttonText = '确认00:00出发';
      }
    },
    // 关闭弹窗 初始化数据
    close() {
      this.$emit('closeDatePop', false);
      this.buttonText = '确认00:00出发';
      this.initDateSelectList += 1;
      this.date = 'today';
    },
    // 获取选中时间
    getCurrentDateValue(value) {
      this.buttonText = ` 确认${value}出发`;
      this.selectedDateValue = value;
    },
    // 确认选中的时间
    confirmSelectedDate() {
      this.initDateSelectList += 1;
      const currentSelectedDataValue = JSON.stringify({ day: this.date, time: this.selectedDateValue });
      this.$emit('getSelectedDate', currentSelectedDataValue);
      this.close();
    },
  },
};
</script>

<style lang="scss" scoped>
  .datePopContainer{
    .contentSelect{
      height: 356px;
      background: #FFFFFF;
      .title{
        height: 54px;
        text-align: right;
        .icon-class{
          width: 15px;
          height: 15px;
          padding: 14px 14px;
        }
      }
      .text-describe{
        margin-left: 24px;
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
        opacity: 0.1;
        margin: auto;
        width: 327px;
        border-color: #000000;
      }
      /*列表选择*/
      .list-tabs{
        height: 40px;
        line-height: 40px;
        display: flex;
        justify-content: center;
        align-items: center;
        .active-class{
          width: 35%;
          border: none;
          background: none;
          text-align: center;
          font-size: 17px;
          color: rgba(0,0,0,0.90);
          letter-spacing: 0;
        }
        .un-active-class{
          width: 35%;
          border: none;
          background: none;
          text-align: center;
          font-size: 14px;
          color: #999999;
          letter-spacing: 0;
          line-height: 18px;
        }
      }
      .address-list-container{
        display: flex;
        justify-content: center;
        .width-style{
          width: 70%;
        }
      }
      .confirmButton{
        margin: 22px auto 0;
      }
    }
  }
</style>
