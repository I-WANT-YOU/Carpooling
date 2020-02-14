<template>
    <div class="commonTitle" :style="{fontFamily: $t('auth.titleFontFamily')}">{{title}}</div>
</template>

<script>
export default {
  name: 'CommonTitle',
  props: {
    title: {
      type: String,
      default: '',
    },
  },
};
</script>

<style lang="scss" scoped>
  .commonTitle{
    width: 100%;
    height: 63px;
    /*background-color: #F4F7FD;*/
    font-size:18px;
    font-weight:200;
    color:rgba(51,51,51,1);
    line-height:63px;
    text-align: center;
    font-family:Source Han Sans CN sans-serif;
  }

</style>
