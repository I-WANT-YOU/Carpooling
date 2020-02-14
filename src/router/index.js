import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/home/Home.vue'),
    meta: {
      entrance: 'HOME_PAGE_M',
    },
  },
  // 乘客预约
  {
    path: '/passengerCarpooling',
    name: 'PassengerCarpooling',
    component: () => import('../views/passengerCarpooling/PassengerCarpooling.vue'),
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
