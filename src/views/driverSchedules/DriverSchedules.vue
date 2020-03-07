<template>
  <div class="driverReleaseSchedule">
    <!--头部-->
    <CarpoolingHeader title="我是司机" class="header"/>
    <div class="tabs">
        <MyLine class="line"/>
        <div class="dateTabs">
          <span class="tab" :class="activeDate==='today'?'activeTab':''" @click="changeDate('today')">今天</span>
          <span class="tab" :class="activeDate==='tomorrow'?'activeTab':''"  @click="changeDate('tomorrow')">明天</span>
        </div>
      </div>
    <EmptySchedule v-if="scheduleIsEmpty" class="content-schedule"/>
    <DriverSchedule class="content-schedule" v-else :driverTravelList="driverTravelList" @refreshTravelList="refreshTravelList"/>
  </div>

</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import CarpoolingHeader from '@component/CarpoolingHeader.vue';
import MyLine from '../components/MyLine.vue';
import EmptySchedule from './components/EmptySchedule.vue';
import DriverSchedule from './components/DriverSchedule.vue';

export default {
  name: 'DriverReleaseSchedule',
  data() {
    return {
      activeDate: 'today',
      scheduleIsEmpty: false,
      driverTravelList: [],
    };
  },
  components: {
    CarpoolingHeader,
    MyLine,
    EmptySchedule,
    DriverSchedule,
  },
  computed: {
    ...mapGetters('driver', ['todayDriverTravelList', 'tomorrowDriverTravelList', 'refreshDriverTravelList']),
  },
  watch: {
    activeDate(value) {
      if (value === 'today') {
        if (this.todayDriverTravelList.length === 0) {
          this.scheduleIsEmpty = true;
        } else {
          this.scheduleIsEmpty = false;
          this.driverTravelList = this.todayDriverTravelList;
        }
      } else if (value === 'tomorrow') {
        if (this.tomorrowDriverTravelList.length === 0) {
          this.scheduleIsEmpty = true;
        } else {
          this.scheduleIsEmpty = false;
          this.driverTravelList = this.tomorrowDriverTravelList;
        }
      }
    },
    refreshDriverTravelList(value) {
      let travelId = '';
      if (value.travel.id) {
        travelId = value.travel.id;
      }
      if (this.activeDate === 'today') {
        this.todayDriverTravelList.map((item) => {
          if (item.travel.id === travelId) {
            item = value;
          }
          return item;
        });
      } else {
        this.tomorrowDriverTravelList.map((item) => {
          if (item.travel.id === travelId) {
            item = value;
          }
          return item;
        });
      }
    },
  },
  methods: {
    ...mapActions('driver', ['getTodayTravelList', 'getTomorrowTravelList']),
    /*
    接口方法
     */
    // 获取司机行程
    async getDriverTravelList() {
      try {
        this.showLoadingToast();
        await this.getTodayTravelList('1');
        await this.getTomorrowTravelList('2');
        this.clearLoadingToast();
      } catch (e) {
        this.clearLoadingToast();
      }
    },
    changeDate(value) {
      this.activeDate = value;
    },
    // 刷新列表
    async refreshTravelList() {
      await this.getDriverTravelList();
      if (this.activeDate === 'today') {
        if (this.todayDriverTravelList.length === 0) {
          this.scheduleIsEmpty = true;
        } else {
          this.scheduleIsEmpty = false;
          this.driverTravelList = this.todayDriverTravelList;
        }
      } else if (this.tomorrowDriverTravelList.length === 0) {
        this.scheduleIsEmpty = true;
      } else {
        this.scheduleIsEmpty = false;
        this.driverTravelList = this.tomorrowDriverTravelList;
      }
    },
  },
  async mounted() {
    await this.getDriverTravelList();
    if (this.activeDate === 'today') {
      if (this.todayDriverTravelList.length === 0) {
        this.scheduleIsEmpty = true;
      } else {
        this.scheduleIsEmpty = false;
        this.driverTravelList = this.todayDriverTravelList;
      }
    } else if (this.tomorrowDriverTravelList.length === 0) {
      this.scheduleIsEmpty = true;
    } else {
      this.scheduleIsEmpty = false;
      this.driverTravelList = this.tomorrowDriverTravelList;
    }
  },
};
</script>

<style lang="scss" scoped>
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
</style>
