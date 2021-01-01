<template>
    <div class="flex portrait-container" :style="`min-height: ${screenHeight}px !important;`">
        <!-- テキスト部分 -->
        <div class="text-container w-1/2 sm:w-full sm:h-auto sm:p-8 sm:pb-24">
            <div class="wrapper">
                <p>1998年2月22日生まれ。神戸大学卒業後、2020年4月よりフロントエンドエンジニアとしてSI企業に入社。</p>
                <p>デザインの分野にも興味があり、Webデザインやグラフィックデザイン、アニメーションや３Dモデリングなども手掛けている。</p>
                <p>また、フロントエンドのみならず、バックエンドもできる人材になるため日々活動中。</p>
                <p>将来は、フロントを軸に、様々なソリューションを提供できる人材になりたい。</p>
                <p>最近意識してる言葉は <span class="font-bold">「クリエイティブの世界観」</span>、<span class="font-bold">「マイクロインタラクション」</span></p>
            </div>
        </div>
        <!-- 画像部分 -->
        <div class="img-container w-1/2 h-auto flex items-center sm:w-full sm:h-auto sm:p-8 sm:mt-4">
            <client-only>
                <img
                :src="require(`~/assets/images/light-portrait.png`)"
                alt="RyoTa"
                class="w-full light" />
                <img
                :src="require(`~/assets/images/dark-portrait.png`)"
                alt="RyoTa"
                class="w-full dark" />
            </client-only>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import {Theme} from '~/types/type'
import screenHeight from '~/mixins/screenHeight'

export default Vue.extend({
    // screenWidth, screenHeight
    mixins: [screenHeight],
    head() {
        return {
            title: ' | ポートフォリオ',
            meta: [
                { hid: 'og:title', property: 'og:title', content: 'RyoTa. | portfolio' },
            ]
        }
    }
})
</script>

<style lang="scss" scoped>
.portrait-container {
    @apply sm:flex-col-reverse sm:justify-end;
    max-width: 1280px;
    margin: auto;
    .text-container {
        @apply flex items-center;
        .wrapper {
            max-width: 450px;
            @apply m-auto;
            p {
                @apply mb-4 dark:text-white sm:text-sm;
            }
        }
    }
    .img-container {
        img {
            &.dark {
                @apply hidden dark:block;
            }
            &.light {
                @apply block dark:hidden;
            }
        }
    }
}
</style>
