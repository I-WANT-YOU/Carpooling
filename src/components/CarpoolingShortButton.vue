<template>
    <button class="carpoolingShortButton">{{buttonText}}</button>
</template>

<script>
export default {
  name: 'CarpoolingShortButton',
  props: {
    buttonText: {
      type: String,
      default: '',
    },
  },
};
</script>

<style lang="scss" scoped>
  .carpoolingShortButton{
    display: block;
    margin: 0;
    width: 56px;
    height: 30px;
    background: #309CF1;
    border-radius: 8px;
    border: none;
    font-size: 17px;
    color: #FFFFFF;
    letter-spacing: 1px;
    text-align: center;
  }
</style>
