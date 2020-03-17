<template>
  <div class="emptyScheduleContainer">
    <div class="emptySchedule">
      <div class="text">
        <p>您还没有行程</p>
        <p>来发布行程吧！</p>
      </div>
       <div class="button">
         <button class="confirm-button" @click="releaseSchedules">
           <svg-icon icon-class="plus" class="plus-icon"></svg-icon>
           <span class="plus-text">发布行程</span>
         </button>
       </div>
    </div>
  </div>

</template>

<script>
export default {
  name: 'EmptySchedule',
  methods: {
    // 发布行程
    async releaseSchedules() {
      await this.$router.push('/driverReleaseSchedule');
    },
  },
};
</script>

<style  lang="scss" scoped>
  .emptyScheduleContainer{
    width: 100%;
    height: 100%;
    background-image: linear-gradient(1deg, #FFFFFF 20%, #DCEBF4 86%);
    .emptySchedule{
      width: 100%;
      height: 100%;
      background: url("../../../assets/bgImage.png") no-repeat fixed center center;
      .text{
        margin: 50px 0 0 88px ;

        color: #2C5EB8;
        letter-spacing: 0;
        line-height: 24px;
        >p{
          margin: 0;
        }
        >p:nth-child(1){
          font-size: 18px;
          margin-bottom: 11px;
        }
        >p:nth-child(2){
          font-size: 30px;
        }
      }
      .button{
        position: fixed;
        bottom: 0;
        width: 100%;
        height: 15vh;
        .confirm-button{
          width: 327px;
          height: 40px;
          margin: auto;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #309CF1;
          border-radius: 8px;
          border: none;
          .plus-icon{
            width: 20px;
            height: 20px;
            color: #FFFFFF;
          }
          .plus-text{
            font-size: 17px;
            color: #FFFFFF;
            letter-spacing: 1px;
            text-align: center;
          }
        }
      }
    }
  }

</style>
