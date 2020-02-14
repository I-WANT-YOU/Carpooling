<template>
  <div class="menu-text-wrap">
    <div class="text" @click="changeLangs(activeLangs.value)">
      <svg-icon :icon-class="activeLangs.value" class="logo-icon"/>
      <span class="lang-text">{{activeLangs.name}}</span>
    </div>
    <div class="line"></div>
  </div>
</template>

<script>
import { setLanguage } from '@utils/auth';
import { langs } from '@/i18n/lang';

export default {
  name: 'LangsDropdownMenu',
  data() {
    return {
      langs,
      showMenu: false,
      once: false,
    };
  },
  computed: {
    activeLangs() {
      return langs.find(item => item.value === this.$i18n.locale);
    },
  },
  methods: {
    async changeLangs(activeLang) {
      const lang = [...langs];
      await this.setLangs(lang.filter(item => item.value !== activeLang)[0]);
      this.$nextTick(() => {
        window.scrollTo(0, document.body.offsetHeight);
      });
    },
    setLangs(lang) {
      setLanguage(lang.value);
      this.$Local(lang.value);
      this.$i18n.locale = lang.value;
    },
  },
};
</script>

<style lang="scss" scoped>
  .menu-text-wrap{
    width: 63px;
    font-size: 8px;
    line-height: 8px;
    color: #999999;
    margin-top: 24px;
    box-sizing: border-box;
    padding-left: 7px;
    position: relative;
    border: #c2c2c2 1px solid;
    border-radius: 100px;

    .text{
    /*  width: 100%;
      margin: 2px 0;
      padding: 0;
      box-sizing: border-box;*/
      padding:2px 0;
      display: flex;
      align-items: center;
        .logo-icon{
          width: 8px;
          height: 8px;
          margin-right: 5px;
      }
    }
  }
</style>
