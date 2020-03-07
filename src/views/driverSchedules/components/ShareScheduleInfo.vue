<template>
    <div class="shareScheduleInfo">
      <span class="share-text">
        分享行程，方便乘客直接约车
      </span>
      <van-image :src="share" class="share-image"/>
    </div>
</template>

<script>
import { Image } from 'vant';
import share from '../images/share.png';

export default {
  name: 'ShareScheduleInfo',
  data() {
    return {
      share,
    };
  },
  components: {
    'van-image': Image,
  },
};
</script>

<style lang="scss" scoped>
.shareScheduleInfo{
  width: 327px;
  height: 56px;
  margin: auto;
  background: #FFFFFF;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  .share-text{
    font-size: 12px;
    color: #999999;
    letter-spacing: 0;
    line-height: 12px;
  }
  .share-image{
    width: 125px;
    height: 30px;
    margin: 0 0 0 5px;
  }
}
</style>
