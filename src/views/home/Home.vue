<template>
    <div class="home" >
      <router-link to="/passengerCarpooling">乘客发布</router-link><br/><br/>
      <router-link to="/activeOrder">乘客拼车订单（入口）</router-link><br/><br/>
      <router-link to="/driverReleaseSchedule">司机发布</router-link><br/><br/>
      <router-link to="/driverSchedules">司机已有行程(入口)</router-link><br/><br/>
      <router-link to="/driverBindingPhone">绑定手机号(入口)</router-link><br/><br/>
      <router-link to="/inputCarInfo">车辆信息(入口)</router-link><br/><br/>
    </div>
</template>

<script>


export default {
  name: 'Home',
};
</script>

<style>
  .home{
    height: 100%;
  }
</style>
