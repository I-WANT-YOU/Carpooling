<template>
  <div class="confirmPop">
    <van-popup
      v-model="showPop"
      :close-on-click-overlay="false"
      :style="{ background: 'rgba(0,0,0,0.6)'}">
      <div class="content">
        <div class="content-title">
          <slot></slot>
        </div>
        <div class="content-buttons">
          <button class="cancel" @click="cancel">取消</button>
          <button class="confirm" @click="confirm">{{buttonTextTwo}}</button>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
import { Popup } from 'vant';

export default {
  name: 'ConfirmPop',
  data() {
    return {
      showPop: false,
    };
  },
  props: {
    showConfirmPop: {
      type: Boolean,
      default: false,
    },
    popType: {
      type: String,
      default: '',
    },
    buttonTextTwo: {
      type: String,
      default: '撤销',
    },
  },
  watch: {
    showConfirmPop: {
      immediate: true,
      handler(val) {
        this.showPop = val;
      },
    },
  },
  components: {
    'van-popup': Popup,
  },
  methods: {
    cancel() {
      this.$emit('closeConfirmPop');
    },
    confirm() {
      this.$emit('confirmAction');
      this.cancel();
    },
  },
};
</script>

<style lang="scss" scoped>
  .confirmPop{
    .content{
      width: 325px;
      min-height: 160px;
      background: #FFFFFF;
      border-radius: 12px;
      display: flex;
      flex-direction: column;
      align-items: center;
      .content-title{
        width: 100%;
        font-size: 16px;
        color: #333333;
        letter-spacing: 0;
      }
      .content-buttons{
        width: 260px;
        display: flex;
        justify-content: space-between;
        >button{
          border-radius: 10px;
          width: 120px;
          height: 40px;
          margin-bottom: 28px;
          border: none;
          font-size: 17px;
          letter-spacing: 1px;
          text-align: center;
          line-height: 23.8px;
        }
        .cancel{
          background: #309CF1;
          color: #FFFFFF;
        }
        .confirm{
          background: rgba(0,0,0,0.05);
          color: #192848;
        }
      }
    }
  }

</style>
