<template>
    <div class="passengerNumberRadio" @click="togglePassengerNumber" :class="showSelectedPassengerNumber?'radioColor':''">
      {{passengerNumberItem.text}}
    </div>
</template>

<script>
export default {
  name: 'PassengerNumberRadio',
  data() {
    return {
      showSelectedPassengerNumber: false,
    };
  },
  props: {
    passengerNumberItem: {
      type: Object,
      default: () => ({
        text: '',
        show: false,
      }),
    },
    passengerNumberIndex: {
      type: Number,
      default: 1000,
    },
  },
  watch: {
    'passengerNumberItem.show': {
      deep: true,
      handler(newValue) {
        this.showSelectedPassengerNumber = newValue;
      },
    },
  },
  methods: {
    togglePassengerNumber() {
      const currentData = JSON.stringify({ index: this.passengerNumberIndex, show: !this.showSelectedPassengerNumber });
      this.$emit('togglePassengerNumber', currentData);
    },
  },
};
</script>

<style lang="scss" scoped>
.passengerNumberRadio{
  width: 28px;
  height: 28px;
  line-height: 28px;
  text-align: center;
  border: 1px solid #FFC05E;
  box-shadow: inset 0 0 2px 0 rgba(131,131,131,0.50);
  border-radius: 15px;
  font-size: 17px;
  color: #333333;
  letter-spacing: 0;
}
  .radioColor{
    background: #FFC05E;
  }
</style>
