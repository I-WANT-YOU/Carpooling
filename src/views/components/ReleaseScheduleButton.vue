<template>
  <div class="releaseScheduleButton">
    <button class="confirm-button">
      <svg-icon icon-class="plus" class="plus-icon"></svg-icon>
      <span class="plus-text">发布行程</span>
    </button>
  </div>
</template>

<script>
export default {
  name: 'ReleaseScheduleButton',
};
</script>

<style lang="scss" scoped>
.releaseScheduleButton{
  width: 100%;
  background: #FFFFFF;
  display: flex;
  justify-content: center;
  align-items: center;
  .confirm-button{
    width: 327px;
    height: 40px;
    margin: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #309CF1;
    border-radius: 8px;
    border: none;
    .plus-icon{
      width: 20px;
      height: 20px;
      color: #FFFFFF;
    }
    .plus-text{
      font-size: 17px;
      color: #FFFFFF;
      letter-spacing: 1px;
      text-align: center;
    }
  }
}
</style>
