<template>
  <div :class="['wrap', background === '' ? 'line' : '']"
       :style="{
          background
       }"
  >
    <div>
      <svg-icon :icon-class="iconClass" :class="['icon', iconClass]" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'IconWrap',
  props: {
    background: {
      type: String,
      default: '',
    },
    iconClass: {
      type: String,
      default: 'logo',
    },
  },
};
</script>

<style lang="scss" scoped>
  .wrap{
    width: 85px;
    height: 26px;
    position: relative;

    &.line{
      border: 0.5px solid #c2c2c2;
    }

    .icon{
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);

      &.fangda{
        width: 78px;
        height: 17px;
      }

      &.huobi{
        width: 70px;
        height: 10px;
      }

      &.okex{
        width: 44px;
        height: 16px;
      }

      &.bitfinex {
        width: 78px;
        height: 9px;
      }

      &.binance {
        width: 69px;
        height: 14px;
      }

      &.bitmex {
        width: 50px;
        height: 8px;
      }

      &.bitmax {
        width: 50px;
        height: 10px;
      }

      &.bibox {
        width: 46px;
        height: 15px;
      }

      &.deribit {
        width: 40px;
        height: 12px;
      }

      &.btse {
        width: 34px;
        height: 10px;
      }

      &.cobo {
        width: 41px;
        height: 13px;
      }

      &.xapo {
        width: 47px;
        height: 14px;
      }

      &.invault {
        width: 50px;
        height: 13px;
      }

      &.oncapital {
        width: 69px;
        height: 8px;
      }

      &.matrixport {
        width: 60px;
        height: 11px;
      }

      &.lyvc {
        width: 19px;
        height: 19px;
      }

      &.jinsecaijing {
        width: 57px;
        height: 11px;
      }

      &.babite {
        width: 47px;
        height: 12px;
      }
    }
  }
  [class*=van-hairline]::after {
    border-color: #c2c2c2;
  }
</style>
