<template>
    <div class="carRadio"
         :style="{background: carRadioItem.bgColor,color:carRadioItem.textColor}" :class="carRadioItem.text==='白'?'white-class':''"
         @click="toggleCarRadio">
      <span class="radio-text">{{carRadioItem.text}}</span>
      <van-image v-show="showCarRadio" :src="carRadioImage" class="carRadio-icon" />
    </div>
</template>

<script>
import { Image } from 'vant';
import carRadioImage from '../images/carRadioImage.png';


export default {
  name: 'CarRadio',
  data() {
    return {
      carRadioImage,
      showCarRadio: false,
    };
  },
  components: {
    'van-image': Image,
  },
  props: {
    carRadioItem: {
      type: Object,
      default: () => ({
        bgColor: '',
        text: '',
        textColor: '#000000',
        show: false,
      }),
    },
    carRadioIndex: {
      type: Number,
      default: 10000,
    },
  },
  watch: {
    'carRadioItem.show': {
      deep: true,
      handler(newValue) {
        this.showCarRadio = newValue;
      },
    },
  },

  methods: {
    toggleCarRadio() {
      const currentData = JSON.stringify({ index: this.carRadioIndex, show: !this.showCarRadio });
      this.$emit('toggleCarRadio', currentData);
    },
  },
};
</script>

<style lang="scss" scoped>
.carRadio{
  position: relative;
  width: 40px;
  height: 30px;
  border-radius: 8px;
  font-size: 14px;
  color: #333333;
  letter-spacing: 0;
  .radio-text{
    display: inline-block;
    width: 100%;
    height: 30px;
    line-height: 30px;
    text-align: center;
  }
  .carRadio-icon{
    position: absolute;
    width: 16px;
    height: 16px;
    top: -6px;
    left: 28px;
  }
}
.white-class{
    width: 38px;
    height: 28px;
    border: 1px solid #F2F2F2;
  }
</style>
