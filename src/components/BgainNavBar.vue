<template>
  <div  class="mask-wrap" @click="$emit('close')"  @touchmove.prevent>
    <div class="nav-wrap"  v-if="showNav==='showNav'" ></div>
     <ul class="nav" :class="{show:showNav==='showNav',hidden:showNav==='hiddenNav'}"  @click.stop="()=>{}">
         <li v-for="(nav, key) in navList" :key="key"
             :class="{'nav-item':navItemActive===nav.path}"
             @click="goPage(nav.path)">{{nav.title}}</li>
     </ul>
  </div>
</template>

<script>
export default {
  name: 'BgainNavBar',
  props: {
    showNav: {
      type: String,
      default: 'initNav',
    },
  },
  data() {
    return {
      navItemActive: '/',
    };
  },
  computed: {
    navList() {
      return [
        {
          title: this.$t('breadCrumbs.Home'),
          path: '/',
        },
        {
          title: this.$t('breadCrumbs.AssetManagementService'),
          path: '/asset-management-service',
        },
        {
          title: this.$t('breadCrumbs.TransactionService'),
          path: '/transaction-service',
        },
        {
          title: this.$t('breadCrumbs.RelatedReports'),
          path: '/related-reports',
        },
        {
          title: this.$t('breadCrumbs.AboutUs'),
          path: '/about',
        },
      ];
    },
  },
  methods: {
    goPage(path) {
      this.$router.push(path);
      this.$emit('close');
    },
  },
  watch: {
    $route(to) {
      if (to.path.indexOf('/about') > -1) {
        this.navItemActive = '/about';
      } else {
        this.navItemActive = to.path;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
  .mask-wrap{
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 3000;
    .nav-wrap{
      width: 100vw;
      height: 100%;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.72);
    }
    .nav {
      background: #373F4E;
      /*width: 213px;*/
      width: 0;
      color: #2CC3A8;
      font-size: 15px;
      padding-top: 22px;
      box-sizing: border-box;
      text-align: center;
      position: absolute;
      right: 0;
      top: 0;
      bottom: 0;
      opacity: 0;
      z-index: 3000;
      /*transform-origin: right center;*/
      /*transform: scaleX(0);*/
      /*transition: all 0.6s;*/

      &.show {
        /*transform: scaleX(1);*/
        animation: show 0.6s forwards;
      }

      &.hidden {
        /*transform: scaleX(0);*/
        animation: hidden 0.6s forwards;
      }

      @keyframes show {
        0%{
          width: 0;
          opacity: 0;
        }
        100%{
          width: 213px;
          opacity: 1;
        }
      }

      @keyframes hidden {
        0%{
          width: 213px;
          opacity: 1;
        }
        100%{
          width: 0;
          opacity: 0;
        }
      }

      > li {
        height: 62px;
        line-height: 62px;
        margin-bottom: 40px;
      }
      .nav-item{
        background:rgba(64,74,91,1);
      }
    }
  }
</style>
