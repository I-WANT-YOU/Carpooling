<template>
  <div class="scheduleContainer">
    <div v-show="true" class="driverReleaseSchedule">
      <!--头部-->
      <CarpoolingHeader title="我是司机" class="header"/>
      <div class="tabs">
        <MyLine class="line"/>
        <div class="dateTabs">
          <span class="tab" :class="activeDate==='today'?'activeTab':''" @click="changeDate('today')">今天</span>
          <span class="tab" :class="activeDate==='tomorrow'?'activeTab':''"  @click="changeDate('tomorrow')">明天</span>
        </div>
      </div>
      <EmptySchedule v-if="travelList.length===0" class="content-schedule"/>
      <DriverSchedule
        v-else
        class="content-schedule"
        :driverTravelList="driverTravelList"
        @refreshTravelList="refreshTravelList"
        @refreshSchedule="refreshSchedule"
        @getDriverTravelListIndex="getDriverTravelListIndex"/>
    </div>
   <!-- <ShareSchedule v-if="false" :shareData="shareData"/>-->
  </div>

</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex';
import CarpoolingHeader from '@component/CarpoolingHeader.vue';
import MyLine from '../components/MyLine.vue';
import EmptySchedule from './components/EmptySchedule.vue';
import DriverSchedule from './components/DriverSchedule.vue';
import ShareSchedule from './components/ShareSchedule.vue';

export default {
  name: 'DriverReleaseSchedule',
  data() {
    return {
      activeDate: 'today',
      scheduleIsEmpty: false,
      shareData: {}, // 分享的内容
    };
  },
  components: {
    CarpoolingHeader,
    MyLine,
    EmptySchedule,
    DriverSchedule,
    ShareSchedule,
  },
  computed: {
    ...mapGetters('driver', ['refreshDriverTravelList', 'driverTravelList']),
    ...mapState('driver', ['travelList']),
  },
  watch: {
    refreshDriverTravelList(value) {
      let travelId = '';
      if (value.travel.id) {
        travelId = value.travel.id;
      }
      this.driverTravelList.map((item) => {
        if (item.travel.id === travelId) {
          item = value;
        }
        return item;
      });
    },
  },
  methods: {
    ...mapActions('driver', ['getTravelList', 'refreshTravel']),
    /*
    接口方法
     */

    // 获取司机行程
    async getDriverTravelList(params) {
      try {
        this.showLoadingToast();
        await this.getTravelList(params);
        this.clearLoadingToast();
      } catch (e) {
        this.clearLoadingToast();
        this.showToast(e);
      }
    },

    // 司机单个刷新行程
    async refreshSchedule() {
      try {
        if (this.activeDate === 'today') {
          this.getDriverTravelList('1');
          this.showToast('刷新成功');
        } else {
          this.getDriverTravelList('2');
          this.showToast('刷新成功');
        }
      } catch (e) {
        this.showToast(e);
      }
    },

    // 改变时间
    changeDate(value) {
      this.activeDate = value;
      if (value === 'today') {
        this.getDriverTravelList('1');
      } else {
        this.getDriverTravelList('2');
      }
    },

    // 刷新列表(司机撤销之后刷新整体数据)
    async refreshTravelList() {
      if (this.activeDate === 'today') {
        this.getDriverTravelList('1');
      } else {
        this.getDriverTravelList('2');
      }
    },

    // 获取分享内容的index
    getDriverTravelListIndex(value) {
      this.shareData = this.driverTravelList[value];
    },
  },

  async mounted() {
    await this.getDriverTravelList('1');
  },
};
</script>

<style lang="scss" scoped>
  .scheduleContainer{
    width: 100%;
    height: 100%;
    /*行程*/
    .driverReleaseSchedule{
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      .header{
        background: #FFFFFF;
      }
      .tabs{
        background: #FFFFFF;
        .line{
          margin: 0 auto;
        }
        .dateTabs {
          display: flex;
          justify-content: center;
          .tab {
            display: block;
            width: 80px;
            height: 38px;
            margin: 0 15px;
            text-align: center;
            font-size: 14px;
            color: #999999;
            letter-spacing: 0;
            line-height: 40px;
            border-bottom: 2px solid #FFFFFF;
          }
          .activeTab {
            border-bottom: 2px solid #309CF1;
            color: #333333;
          }
        }
      }
      .content-schedule{
        flex-grow: 1;
      }
    }
    /*分享*/
  }
</style>
