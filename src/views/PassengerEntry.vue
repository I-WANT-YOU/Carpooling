<template>
  <PassengerCarpooling v-if="hasUsrInfo==='hasUserInfo'"/>
  <ActiveOrder v-else/>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import PassengerCarpooling from './passengerCarpooling/PassengerCarpooling.vue';
import ActiveOrder from './activeOrder/ActiveOrder.vue';

export default {
  name: 'PassengerEntry',
  data() {
    return {
      hasUsrInfo: '',
    };
  },
  components: {
    PassengerCarpooling,
    ActiveOrder,
  },
  computed: {
    ...mapState('passenger', ['orderTravelList']),
  },
  methods: {
    ...mapActions('passenger', ['getTravel']),
    // 乘客获取行程
    async passengerGetTravel(params) {
      try {
        this.showLoadingToast();
        await this.getTravel(params);
        this.clearLoadingToast();
        if (this.orderTravelList.length === 0) {
          this.hasUserInfo = 'hasUserInfo';
        }
      } catch (e) {
        this.clearLoadingToast();
        if (e === '请先绑定手机号') {
          this.hasUserInfo = 'hasUserInfo';
        } else {
          this.showToast(e);
        }
      }
    },
  },

  mounted() {

  },
};
</script>

<style lang="scss" scoped>

</style>
