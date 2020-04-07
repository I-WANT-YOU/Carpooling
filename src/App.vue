<template>
  <div id="app" class="app-class">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive" v-wechat-title="$route.meta.title" />
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"  v-wechat-title="$route.meta.title"></router-view>
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
