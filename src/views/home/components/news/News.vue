<template>
  <div class="news">
    <div class="swiper-container" v-if="currentNewsList.length > 0">
      <van-swipe  indicator-color="#007aff" class="my-swipe">
        <van-swipe-item class="my-swipe-item" v-for="(item,index) in currentNewsList" :key="index">
          <van-image class="img-swipe" :src="item.mimg1" alt="" @click="goToNews(item.id)"/>
          <div class="news-content" @click="goToNews(item.url)">
          <p class="item-date">{{formatDateOne(item.publish_date)}}</p>
          <span class="item-text">{{languageChange === 'zh' ? item.title : item.title_en}}</span>
          </div>
        </van-swipe-item>
      </van-swipe>
    </div>
  </div>
</template>

<script>
/* eslint-disable import/no-extraneous-dependencies */
import { formatDateOne } from '@utils/tools';
import { Swipe, SwipeItem, Image } from 'vant';

export default {
  name: 'News',
  props: {
    currentNewsList: {
      type: Array,
    },
  },
  components: {
    'van-swipe': Swipe,
    'van-swipe-item': SwipeItem,
    'van-image': Image,
  },
  computed: {
    // 监听中英文切换
    languageChange() {
      return this.$t('signal');
    },
  },
  methods: {
    goToNews(id) {
      this.$router.push(`/related-reports/${id}`);
    },
    // 格式化时间
    formatDateOne(date) {
      return formatDateOne(date);
    },
  },
};
</script>

<style lang="scss">
  .news{
    margin-top: 25px;
    .my-swipe{
      margin: auto;
      width: 295px;
      height: 265px;
      cursor: default !important;
      .my-swipe-item{
        width: 295px;
        height: 142px;
        margin: auto;
        .img-swipe{
          width: 296px;
          height: 142px;
        }
        .news-content{
          width:288px;
          min-height:76px;
          margin: auto;
          font-size:12px;
          font-weight:400;
          color:rgba(102,102,102,1);
          line-height:22px;
          >span{
            display: block;
          }
          .item-date{
            margin: 0;
          }
        }
      }
      .van-swipe__indicators{
        width: 80%;
        height: 15px;
        display: flex;
        justify-content: center;
        .van-swipe__indicator{
          width: 10px;
          height: 10px;
          background-color: darkgray;
        }
      }
    }
  }
</style>
