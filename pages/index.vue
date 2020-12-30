<template>
  <div class="home-container" :style="`height: ${screenHeight}px;`">
    <div class="preparing-container">
      <img src="~/assets/images/home/lr.png" alt="ただ今、準備中です" />
      <div class="text-container">
        <p>現在トップ画面のUIの制作が<br/>間に合っていません...</p>
        <p>準備でき次第、公開します！！</p>
        <p>今しばらくお待ちください...</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import screenHeight from '~/mixins/screenHeight'

export default Vue.extend({
  // screenWidth, screenHeight
  mixins: [screenHeight]
})
</script>

<style lang="scss" scoped>
.home-container {
  @apply w-screen flex justify-center items-center;
  .preparing-container {
    @apply flex justify-start items-center;
    width: 600px;
    height: 350px;
    background: url("~assets/images/home/bg.png");
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    img {
      height: 280px;
    }
    .text-container {
      margin-left: 10px;
      p {
        line-height: 30px;
        margin-bottom: 20px;
      }
    }
  }
  @screen sm {
    .preparing-container {
      width: 90%;
      img {
        height: 130px;
      }
      .text-container {
        margin-left: 0px;
        p {
          font-size: 12px;
          line-height: 20px;
          margin-bottom: 10px;
        }
      }
    }
  }
}
</style>
