<template>
  <div class="first-screen-wrap">
    <div class="title" :style="{fontFamily:$t('auth.titleFontFamily')}">{{$t('screen')}}</div>
    <div v-for="(item,index) in $t('introduce')"
         :key="index"
         class="text"
         :class="[$t('signal')==='en'? '': 'zh-text', 'text-justify']"
         :style="{'textIndent':$t('signal')!=='en' && $t('signal')==='zh'?'2em':null}"
    >{{item}}</div>
  </div>
</template>

<script>
export default {
  name: 'FirstScreen',
};
</script>

<style lang="scss" scoped>
.first-screen-wrap{
  height: 476px;
  margin: -49px 0 35px;
  background: url('./images/bg-first-screen.png') no-repeat top center / 100% 476px;
  color: #ffffff;
  box-sizing: border-box;
  padding-top: 49px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;

  .title{
    padding: 0 30px;
    font-size: 25px;
    line-height: 45px;
    margin-top: -10%;
    margin-bottom: 10%;
  }

  .text{
    width: 305px;
    margin: 0 auto;
    font-size:12px;
    line-height: 24px;
  }
  .zh-text{
    width: 300px;
  }
}
</style>
