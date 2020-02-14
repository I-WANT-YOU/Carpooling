<template>
  <div class="cooperation-wrap">
      <div class="list">
        <icon-wrap
          class="icon-item"
          v-for="(icon,key) in list"
          :key="key"
          :icon-class="icon.icon"
          :background="icon.background"
        />
      </div>
  </div>
</template>

<script>
import IconWrap from './components/IconWrap.vue';

export default {
  name: 'Cooperation',
  components: { IconWrap },
  data() {
    return {
      list: [
        {
          icon: 'fangda',
        },
        {
          icon: 'huobi',
        },
        {
          icon: 'okex',
        },
        {
          icon: 'bitfinex',
          background: '#000000',
        },
        {
          icon: 'binance',
        },
        {
          icon: 'bitmex',
        },
        {
          icon: 'bitmax',
        },
        {
          icon: 'bibox',
        },
        {
          icon: 'deribit',
          background: '#000000',
        },
        {
          icon: 'btse',
        },
        {
          icon: 'cobo',
        },
        {
          icon: 'xapo',
        },
        {
          icon: 'invault',
        },
        {
          icon: 'oncapital',
        },
        {
          icon: 'matrixport',
          background: '#000000',
        },
        {
          icon: 'lyvc',
        },
        {
          icon: 'jinsecaijing',
        },
        {
          icon: 'babite',
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
.cooperation-wrap {
  margin-bottom: 50px;

  .list {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;

    .icon-item{
      margin: 10px 8px;
    }
  }
}
</style>
