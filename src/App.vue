<template>
  <div id="app">
      <router-view/>
  </div>
</template>
<script>

export default {
  name: 'app',
  data() {
    return {
      scrollState: true,
    };
  },
};
</script>
<style lang="scss">
  #id{
    font-family: PingFangSC-Regular sans-serif;
  }
</style>
