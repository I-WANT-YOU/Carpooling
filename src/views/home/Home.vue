<template>
    <div class="home" :style="{fontFamily: $t('auth.textFontFamily')}">
      <router-link to="/passengerCarpooling">乘客</router-link>
      <router-link to="/bar">司机</router-link>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import FirstScreen from '@views/home/components/first-screen/FirstScreen.vue';
import CustomizedProduct from '@views/customized-product/CustomizedProduct.vue';
import News from './components/news/News.vue';
import Advantage from './components/advantage/Advantage.vue';
import Service from './components/services/Service.vue';
import Compliance from './components/compliance/Compliance.vue';
import Cooperation from './components/cooperation/Cooperation.vue';
import CommonTitle from './components/commonTitle/index.vue';

export default {
  name: 'Home',
  data() {
    return {
      currentImagesList: [],
      currentNewsTextList: [],
    };
  },
  components: {
    FirstScreen,
    Advantage,
    Service,
    News,
    Compliance,
    Cooperation,
    CommonTitle,
    CustomizedProduct,
  },
  created() {
    this.openLoading();
  },
  methods: {
    ...mapActions('home', ['getHomeNewsList']),
  },
  computed: {
    ...mapState('home', ['newsList']),
  },
  async mounted() {
    try {
      await this.getHomeNewsList();
    } catch (e) {
      throw e;
    }

    this.closeLoading();
  },
};
</script>

<style>
  .home{
    height: 100%;
  }
</style>
