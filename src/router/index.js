import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/home/Home.vue'),
    meta: { title: '小潞拼车-首页' },
  },
  // 乘客预约
  {
    path: '/passengerCarpooling',
    name: 'PassengerCarpooling',
    component: () => import('../views/passengerCarpooling/PassengerCarpooling.vue'),
    meta: { title: '小潞拼车-预定行程' },
  },
  // 拼车订单列表
  {
    path: '/activeOrderList',
    name: 'ActiveOrderList',
    component: () => import('../views/activeOrderList/ActiveOrderList.vue'),
    meta: { title: '小潞拼车-我是乘客' },
  },
  // 乘客拼车订单
  {
    path: '/activeOrder',
    name: 'ActiveOrder',
    component: () => import('../views/activeOrder/ActiveOrder.vue'),
    meta: { title: '小潞拼车-我是乘客' },
  },
  // 司机发布行程
  {
    path: '/driverSchedules',
    name: 'DriverSchedules',
    component: () => import('../views/driverSchedules/DriverSchedules.vue'),
    meta: { title: '小潞拼车-我是司机' },
  },
  // 司机发布行程详情
  {
    path: '/driverReleaseSchedule',
    name: 'DriverReleaseSchedule',
    component: () => import('../views/driverReleaseSchedule/DriverReleaseSchedule.vue'),
    meta: {
      keepAlive: true,
      title: '小潞拼车-发布行程',
    },
  },
  // 司机绑定手机号码
  {
    path: '/driverBindingPhone',
    name: 'DriverBindingPhone',
    component: () => import('../views/DriverBindingPhone.vue'),
    meta: { title: '小潞拼车-绑定手机号' },
  },
  // 司机设置站点
  {
    path: '/setSites',
    name: 'SetSites',
    component: () => import('../views/SetSites.vue'),
  },
  // 司机录入车辆信息
  {
    path: '/inputCarInfo',
    name: 'InputCarInfo',
    component: () => import('../views/inputCarInfo/InputCarInfo.vue'),
    meta: { title: '小潞拼车-编辑车辆' },
  },
  // 司机分享页面详情
  {
    path: '/shareSchedule',
    name: 'ShareSchedule',
    component: () => import('../views/shareSchedule/ShareSchedule.vue'),
    meta: { title: '小潞拼车-预定行程' },
  },

  {
    path: '*',
    redirect: '/',
  },
];

const router = new VueRouter({
  routes,
});

const originalPush = VueRouter.prototype.push;

VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err);
};

router.beforeEach((to, from, next) => {
  window.scrollTo(0, 0);
  next();
});


export default router;
