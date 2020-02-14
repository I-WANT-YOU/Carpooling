<template>
  <div>
    <div  class="compliance-wrap">
      <div>{{$t('footer.tip')}}</div>
      <div>{{$t('compliance')}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Compliance',
};
</script>

<style lang="scss" scoped>
.compliance-wrap{
  box-sizing: border-box;
  font-size: 9px;
  color: #999999;
  line-height:18px;
  padding: 9px 35px 9px 42px;
  background: #373F4E;
}
</style>
