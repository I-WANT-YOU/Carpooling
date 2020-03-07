<template>
  <div id="app" class="app-class">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>
<script>

export default {
  name: 'app',
};
</script>
<style lang="scss">
  .app-class{
    font-family: PingFangSC-Regular sans-serif;
  }
</style>
