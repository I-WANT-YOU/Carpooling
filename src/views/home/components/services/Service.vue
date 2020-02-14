<template>
  <div class="service">
    <div class="service-item"  v-for="(item,index) in services" :key="index" :class="index>3?'service-item-margin':''">
      <div class="img-container">
        <svg-icon :icon-class="item.img" :class="getIconClass(item.img)"></svg-icon>
      </div>
      <p class="service-title">{{item.title}}</p>
      <div class="service-text" :class="$t('signal')==='en'? '': 'zh-service-text'" v-show="$t('signal')==='zh'">
        <div v-for="(textItem,index) in item.text1" :key="index"
             :style="{'textAlign':index===item.text1.length-1?null:'justify'}"
             class="service-text-item"
        >{{textItem}}</div>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable max-len */
export default {
  name: 'Service',
  computed: {
    services() {
      let array = [];
      if (this.$t('signal') === 'zh') {
        array = ['icon_one', 'icon_two', 'icon_three', 'icon_four', 'icon_five', 'icon_six', 'icon_seven', 'icon_eight'];
      } else {
        array = ['icon_one', 'icon_two', 'icon_seven', 'icon_four', 'icon_five', 'icon_six', 'icon_three', 'icon_eight'];
      }
      const currentServices = [];
      array.map((item, index) => {
        currentServices[index] = { ...this.$t('services')[index], img: item };
        return true;
      });
      return currentServices;
    },
  },
  methods: {
    /* 返回类名 */
    getIconClass(index) {
      switch (index) {
        case 'icon_one':
          return 'icon-one';
        case 'icon_two':
          return 'icon-two';
        case 'icon_three':
          return 'icon-three';
        case 'icon_four':
          return 'icon-four';
        case 'icon_five':
          return 'icon-five';
        case 'icon_six':
          return 'icon-six';
        case 'icon_seven':
          return 'icon-seven';
        case 'icon_eight':
          return 'icon-eight';
        default:
          return false;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
  .service{
    margin: 25px 25px 0 ;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    .service-item{
      width: 50%;
      margin-bottom: 27px;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: center;
      .img-container{
        width: 39px;
        height: 39px;
        margin-bottom: 10px;
        display: flex;
        justify-content: center;
        align-items: center;
        .icon-one{
          width: 39px;
          height: 38px;
        }
        .icon-two{
          width: 38px;
          height: 27px;
        }
        .icon-three{
          width: 39px;
          height: 28px;
        }
        .icon-four{
          width: 38px;
          height: 36px;
        }
        .icon-five{
          width: 37px;
          height: 31px;
        }
        .icon-six{
          width: 32px;
          height: 34px;
        }
        .icon-seven{
          width: 27px;
          height: 39px;
        }
        .icon-eight{
          width: 38px;
          height: 36px;
        }
      }
      .service-title{
        margin: 0 0 3px 0;
        line-height: 2;
        font-size:12px;
        font-weight:bold;
        color:rgba(102,102,102,1);
      }
      .service-text{
        width: 130px;
        font-size:12px;
        font-weight: normal;
        color:rgba(102,102,102,1);
        /*text-align: left;*/
        /*text-align-last: justify;*/
        .service-text-item{
          line-height:10px;
          &:after{
            content: '';
            width: 100%;
            display: inline-block;
            height: 0;
          }
        }
      }
      .zh-service-text{
        width: 138px;
      }
    }
  }
</style>
