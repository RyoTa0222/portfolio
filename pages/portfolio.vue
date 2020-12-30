<template>
    <div class="flex portrait-container">
        <!-- テキスト部分 -->
        <div class="text-container w-1/2 sm:w-full sm:h-auto sm:p-8">
            <div class="wrapper">
                <p>2020年から社会人のフロントエンドエンジニア</p>
                <p>といいつつ、デザインやアニメーション、機械学習にも興味があり、インプット中</p>
                <p>将来は、フロントを軸に、様々なソリューションを提供できる人材になりたいです</p>
                <p>最近意識してる言葉： 「世界観」、「マイクロインタラクション」</p>
            </div>
        </div>
        <!-- 画像部分 -->
        <div class="img-container w-1/2 h-full flex items-center sm:w-full sm:h-auto sm:p-8 sm:mt-4">
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

export default Vue.extend({
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
    @apply h-screen sm:flex-col-reverse sm:justify-end;
    max-width: 1280px;
    margin: auto;
    .text-container {
        @apply flex items-center;
        .wrapper {
            max-width: 450px;
            @apply m-auto;
            p {
                @apply mb-4 dark:text-white;
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
