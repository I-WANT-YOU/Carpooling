<template>
    <div class="setSites">
      <CarpoolingHeader title="设置站点" class="header"/>
      <div class="contentContainer">
        <van-checkbox-group v-model="sitesCheckedValues" class="check-group">
          <MyCheck v-for="(siteItem,index) in allSitesList" :key="index" :siteItem="siteItem"  class="checkClass"/>
        </van-checkbox-group>
        <CarpoolingButton buttonText="保存"/>
      </div>
    </div>
</template>

<script>
import { CheckboxGroup } from 'vant';
import CarpoolingButton from '@component/CarpoolingButton.vue';
import CarpoolingHeader from '@component/CarpoolingHeader.vue';
import MyCheck from './components/MyCheck.vue';

export default {
  name: 'SetSites',
  data() {
    return {
      sitesCheckedValues: [],
      allSitesList: ['潮白家园1期', '潮白家园2期', '潮白家园3期', '潮白家园4期', '潮白家园5期', '潮白家园6期', '潮白家园7期', '潮白家园8期', '潮白家园9期', '潮白家园16期', '潮白家园34期', '潮白家园65期', '潮白家园66期', '潮白家园56期'],
    };
  },
  components: {
    'van-checkbox-group': CheckboxGroup,
    MyCheck,
    CarpoolingButton,
    CarpoolingHeader,
  },
};
</script>

<style lang="scss" scoped>
.setSites{
  width: 100%;
  height: 100%;
  background: #EDEDED;
  .contentContainer{
    width: 327px;
    margin: 20px auto 0;
    padding: 20px 14px;
    border-radius: 12px;
    background: #FFFFFF;
  }
  .check-group{
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 10px;
    .checkClass{
      width: 33%;
      margin:0 10px 10px 0;
    }
    .checkClass:nth-child(3n){
      margin-right: 0;
    }
  }
}
</style>
