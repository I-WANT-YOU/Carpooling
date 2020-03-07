<template>
  <div class="confirmPop">
    <van-popup
      v-model="showPop"
      :close-on-click-overlay="false"
      :style="{ background: 'rgba(0,0,0,0.6)'}">
      <div class="content">
        <div class="content-title">
          给师傅一个好评吧
        </div>
        <div class="content-Evaluate">
         <div class="good evaluate-content" @click="evaluateClick('1')">
           <van-image :src="good" class="icon-class"/>
           <span class="text-class">好评</span>
         </div>
          <div class="good evaluate-content" @click="evaluateClick('2')">
            <van-image :src="bad" class="icon-class"/>
            <span class="text-class">差评</span>
          </div>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import { Popup, Image } from 'vant';
import { callApi } from '../../utils/tools';
import good from './images/good.png';
import bad from './images/bad.png';

export default {
  name: 'EvaluatePop',
  data() {
    return {
      good,
      bad,
      showPop: false,
    };
  },
  props: {
    showEvaluatePop: {
      type: Boolean,
      default: false,
    },
    userId: {
      type: String,
      default: '',
    },
  },
  watch: {
    showEvaluatePop(val) {
      this.showPop = val;
    },
  },
  components: {
    'van-popup': Popup,
    'van-image': Image,
  },
  methods: {
    ...mapActions('passenger', ['appraiseUser']),
    evaluateClick(type) {
      const currentParams = { userId: this.userId, type };
      callApi(this.appraiseUser, '评价成功', currentParams);
      this.$emit('closeEvaluatePop');
    },
  },
};
</script>

<style lang="scss" scoped>
  .confirmPop{
    .content{
      width: 320px;
      height: 168px;
      background: #FFFFFF;
      border-radius: 12px;
      display: flex;
      flex-direction: column;
      align-items: center;
      .content-title{
        padding: 40px 0 45px;
        font-size: 16px;
        color: #333333;
        letter-spacing: 0;
        line-height: 24px;
      }
      .content-Evaluate{
        width: 140px;
        display: flex;
        justify-content: space-between;
        .evaluate-content{
          display: flex;
          align-items: center;
         .icon-class{
           width: 20px;
           height: 20px;
           margin-right: 5px;
         }
          .text-class{
            font-size: 14px;
            color: #999999;
            letter-spacing: 0;
            line-height: 18px;
          }
        }
        .cancel{
          background: #309CF1;
          color: #FFFFFF;
        }
        .confirm{
          background: rgba(0,0,0,0.05);
          color: #192848;
        }
      }
    }
  }

</style>
