<template>
    <button class="carpoolingButton">{{buttonText}}</button>
</template>

<script>
export default {
  name: 'CarpoolingButton',
  props: {
    buttonText: {
      type: String,
      default: '',
    },
  },
};
</script>

<style lang="scss" scoped>
  .carpoolingButton{
    display: block;
    margin: auto;
    width: 327px;
    height: 40px;
    background: #309CF1;
    border-radius: 8px;
    border: none;
    font-size: 17px;
    color: #FFFFFF;
    letter-spacing: 1px;
    text-align: center;
    line-height: 40px;
  }
</style>
