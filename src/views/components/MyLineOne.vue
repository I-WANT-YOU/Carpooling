<template>
  <van-divider class="line-class" />
</template>

<script>
import { Divider } from 'vant';

export default {
  name: 'MyLine',
  components: {
    'van-divider': Divider,
  },
};
</script>

<style lang="scss" scoped>
  .line-class{
    height: 1px;
    margin: 0 auto;
    background: rgba(0,0,0,0.15);
  }
</style>
