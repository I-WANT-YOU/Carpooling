<template>
  <div class="advantage" :class="$t('signal')==='en'? '': 'zh-advantage'">
    <div class="advantage-item" v-for="(item,index) in advantage" :key="index">
      <svg-icon :icon-class="item.image" class="img-item" />
      <div class="advantage-content">
        <div class="advantage-item-title">{{item.title}}</div>
        <ul class="advantage-item-text">
          <li v-for="(itemText,itemIndex) in item.text" :key="itemIndex">{{itemText}}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Advantage',
  computed: {
    advantage() {
      const ImgList = ['about-two', 'about-three', 'about-one'];
      return ImgList.map((item, index) => ({ ...this.$t('aboutUs')[index], image: item }));
    },
  },

};
</script>

<style lang="scss" scoped>

.advantage{
  margin:25px 0 27px 27px;
  .advantage-item{
    margin-bottom: 35px;
    display: flex;
    .img-item{
      width: 121px;
      height: 76px;
    }
    .advantage-content{
      margin-left: 20px;
      flex: 1;
      .advantage-item-title{
        margin-bottom: 3px;
        padding-left: 45px;
        font-size:12px;
        font-weight:bold;
        color:rgba(102,102,102,1);
        text-align: left;
      }
      .advantage-item-text{
        /*display: flex;*/
        /*flex-direction: column;*/
        padding-left: 18px;
        list-style: disc;
        font-size:12px;
        font-weight:normal;
        color:rgba(102,102,102,1);
        line-height:20px;
        /*text-align: center;*/
      }
    }
  }
}

.zh-advantage{
  margin:25px 20px 27px 55px;
}

</style>
