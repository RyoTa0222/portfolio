<template>
  <div class="home-container" :style="`min-height: ${screenHeight}px !important;`">
    <!-- テキスト部分 -->
    <div class="text-container w-1/2 sm:w-full sm:h-auto sm:p-8 sm:pb-24">
        <div class="wrapper">
          <client-only>
            <img
            :src="require(`~/assets/images/home/ryota.png`)"
            alt="RyoTa"
            class="w-full light" />
            <img
            :src="require(`~/assets/images/home/dark-ryota.png`)"
            alt="RyoTa"
            class="w-full dark" />
        </client-only>
          <p>1998年2月22日生まれ。神戸大学卒業後、2020年4月よりフロントエンドエンジニアとしてSI企業に入社。</p>
          <p>デザインの分野にも興味があり、Webデザインやグラフィックデザイン、アニメーションや３Dモデリングなどを手掛けている。</p>
          <p>また、フロントエンドのみならず、バックエンドもできる人材になるため日々活動中。</p>
          <p>将来は、フロントを軸に、様々なソリューションを提供できる人材になりたい。</p>
          <p>最近意識してる言葉は <span class="font-bold">「<span class="gradient-text">クリエイティブの世界観</span>」</span>、<span class="font-bold">「<span class="gradient-text">マイクロインタラクション</span>」</span></p>
        </div>
    </div>
    <!-- 画像部分 -->
    <div class="img-container w-1/2 h-auto flex items-center sm:w-full sm:h-auto sm:p-8 sm:mt-4">
        <img src="~/assets/images/home/portrait.png" alt="RyoTa" />
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
  @apply w-screen flex justify-center items-center sm:flex-col-reverse sm:justify-end;
  max-width: 1280px;
  margin: auto;
  .text-container {
    @apply flex items-center;
    .wrapper {
      max-width: 450px;
      img {
        width: 200px;
        margin: 0 auto 30px;
        &.dark {
          @apply hidden dark:block;
        }
        &.light {
          @apply block dark:hidden;
        }
      }
      @apply m-auto;
      p {
        @apply mb-4 dark:text-white sm:text-sm;
      }
    }
  }
  .img-container {
    img {
      max-width: 600px;
      margin: auto;
    }
  }
  @screen sm {
    .img-container {
      @apply pb-0;
      img {
        width: 100%;
      }
    }
    .text-container {
      .wrapper {
        img {
          width: 150px;
        }
      }
    }
  }
}
.gradient-text {
  color: #FF8C00;
  background: -webkit-linear-gradient(0deg, #40E0D0, #FF8C00, #FF0080);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: GradientText 10s infinite;
}
</style>

<style>
@keyframes GradientText {
  0% {
    filter: hue-rotate(0deg);
  }
  100% {
    filter: hue-rotate(360deg);
  }
}
</style>
