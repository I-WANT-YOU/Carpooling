<template>
  <div :class="['back-top']" v-show="backTopShow" @click="backToTop">
    <svg-icon icon-class="top" class="icon"/>
  </div>
</template>

<script>
let timer = null;
export default {
  name: 'BackTop',
  data() {
    return {
      showButton: 'none',
      // 是否显示回到顶部
      backTopShow: false,
      // 返回顶部所需时间
      backSeconds: 100,
      // 往下滑动多少显示返回顶部（单位：px）
      showPx: 300,
      backTopInterval: null,
    };
  },
  mounted() {
    window.addEventListener('scroll', this.backTopShowOperate, true);
  },
  computed: {
    scrollTop() {
      return document.documentElement.scrollTop || document.body.scrollTop;
    },
  },
  methods: {
    backTopShowOperate() {
      if (document.documentElement.scrollTop > this.showPx) {
        this.backTopShow = true;
      } else if (document.body.scrollTop > this.showPx) {
        this.backTopShow = true;
      } else {
        this.backTopShow = false;
      }
    },
    backToTop() {
      const step = this.scrollTop / this.backSeconds;
      const that = this;
      timer = setInterval(() => {
        if (document.documentElement.scrollTop > 0) {
          document.documentElement.scrollTop -= step;
          that.backTopShow = false;
        } else if (document.body.scrollTop > 0) {
          document.body.scrollTop -= step;
          that.backTopShow = false;
        } else {
          that.backTopAllow = true;
          clearInterval(timer);
        }
      }, 1);
    },
  },
  destroyed() {
    window.removeEventListener('scroll', this.backTopShowOperate);
  },
};
</script>

<style lang="scss" scoped>
.back-top{
  position: fixed;
  bottom: 45px;
  right: 20px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
  background: #94969b;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 1;

  .icon{
    width: 7px;
    height: 5px;
  }
}
</style>
