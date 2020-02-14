<template>
  <div class="bg-header-wrap">
    <sticky @scroll="onScroll">
      <header :class="['header', opacity ? 'header-opacity' : '',  headerClass]">
        <div @click="$router.push('/')">
          <svg-icon icon-class="logo" class="logo"/>
        </div>
        <div>
          <span @click="show='showNav'">
             <icon name="wap-nav" class="nav-style" />
          </span>
        </div>
      </header>
    </sticky>
    <bgain-nav-bar :showNav="show" @close="show = 'hiddenNav'"/>
  </div>
</template>

<script>
import { Sticky, Icon } from 'vant';
import { setLanguage } from '@utils/auth';
import BgainNavBar from '@component/BgainNavBar.vue';
import { langs } from '@/i18n/lang';

export default {
  name: 'BgainHeader',
  components: {
    Sticky,
    Icon,
    BgainNavBar,
  },
  props: {
    opacity: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      langs,
      headerClass: '',
      show: 'initNav',
    };
  },
  methods: {
    onScroll({ isFixed }) {
      this.headerClass = isFixed ? 'header-scroll' : '';
    },
    changeLangs(lang) {
      this.$i18n.locale = lang;
      setLanguage(lang);
    },
  },
};
</script>

<style lang="scss">
.bg-header-wrap{
  .header{
    height: 49px;
    /*background: rgba(56, 62, 146, 0.36);*/
    background:linear-gradient(-78deg,rgba(3,12,143,1),rgba(2,145,110,1));
    display: flex;
    padding: 0 41px;
    justify-content: space-between;

    > div {
      height: 100%;
      position: relative;

      .logo{
        width: 65px;
        height: 18px;
        position: absolute;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
      }

      .nav-style{
        width: 22px;
        height: 18px;
        color: #ffffff;
        font-size: 18px;
        position: absolute;
        right: 0;
        top: 50%;
        transform: translateY(-50%);
      }
    }

    &.header-opacity {
      background:linear-gradient(-78deg,rgba(3,12,143,0.36),rgba(2,145,110,0.36));
    }

    &.header-scroll {
      background: #354155;
      opacity: 1;
    }
  }
}
</style>
