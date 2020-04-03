<template>
    <div class="carpoolingHeader">
      <div class="header-icon">
        <svg-icon icon-class="back" class="icon-class" @click.native="backToBefore"/>
      </div>
      <div class="header-name">{{title}}</div>
      <div class="header-extend"></div>
    </div>
</template>

<script>
export default {
  name: 'CarpoolingHeader',
  props: {
    title: {
      type: String,
      default: '拼车',
    },
    backIcon: {
      type: String,
      default: '',
    },
  },
  methods: {
    // 返回上一页
    backToBefore() {
      this.$router.go(-1);
    },
  },
};
</script>

<style lang="scss" scoped>
  .carpoolingHeader{
    font-family: PingFangSC-Medium sans-serif;
    width: 100%;
    height: 44px;
    display: flex;
    line-height: 44px;
    background: #FFFFFF;
    .header-icon , .header-extend{
      width: 100px;
      display: flex;
      align-items: center;
      .icon-class{
        width: 15px;
        height: 15px;
        padding: 14px 21px;
      }
    }
    .header-name{
      flex-grow: 1;
      opacity: 0.9;
      font-size: 17px;
      color: #000000;
      letter-spacing: 0;
      text-align: center;
    }
  }
</style>
