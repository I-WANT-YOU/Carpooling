<template>
    <footer class="footer">
      <div class="text-wrap">
        <div class="contact">
          <span class="left">{{$t('footer.contact')}}</span>
          <span class="right">info@bgain.com</span>
        </div>
        <div class="copyright">Copyright © 2019 Bgain Digital</div>
        <div class="copyright"><a style="color: #919191" href="http://beian.miit.gov.cn">京ICP备19049662号</a></div>
      </div>
      <div class="lang">
        <langs-dropdown-menu />
      </div>
    </footer>
</template>

<script>
import LangsDropdownMenu from './LangsDropdownMenu.vue';

export default {
  name: 'BgainFooter',
  components: {
    LangsDropdownMenu,
  },
};
</script>

<style lang="scss" scoped>
  .footer{
    width: 100%;
    height: 63px;
    margin-top: -63px;
    background: #1C2129;
    box-sizing: border-box;
    padding: 0 38px 0 42px;
    display: flex;
    justify-content: space-between;

    .text-wrap{
      height: 100%;
      font-size: 9px;
      line-height: 9px;
      color: #D9D9D9;

      .contact{
        margin: 13px 0 7px;
      }
      .contact,
      .address{
        .right{
          margin-left: 10px;
        }
      }

      .copyright{
        margin-top: 10px;
        color: #919191;
        font-size:8px;
      }
    }
  }

</style>
