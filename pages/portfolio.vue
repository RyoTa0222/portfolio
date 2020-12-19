<template>
    <div class="flex portrait-container">
        <!-- テキスト部分 -->
        <div class="text-container w-1/2">
            <div class="wrapper">
                <p>2020年から社会人のフロントエンドエンジニア</p>
                <p>といいつつ、デザインやアニメーション、機械学習にも興味があり、インプット中</p>
                <p>将来は、フロントを軸足に、様々なソリューションを提供できる人材になりたいです</p>
                <p>最近意識してる言葉： 「世界観」、「UX」</p>
            </div>
        </div>
        <!-- 画像部分 -->
        <div class="img-container w-1/2 h-full flex items-center">
            <img :src="require(`~/assets/images/${computeImageName}`)" alt="RyoTa" class="w-full">
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import {Mode} from '~/types/type'

export default Vue.extend({
    computed: {
        computeImageName() {
            const mode = this.getScreenMode()
            if (mode === 'light') {
                return 'light-portrait.png'
            } else if (mode === 'dark') {
                return 'dark-portrait.png'
            }
        }
    },
    methods: {
        /**
         * 画面がダークモードかライトモードか確認する
         * @return {Mode} 現在のモードを返す
         */
        getScreenMode(): Mode {
            let mode: Mode = 'light'
            // ブラウザでダークモードかを確認
            if (process.client) {
                if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
                    mode = 'dark'
                    // ローカルストレージに設定されているか確認
                    const local_mode = localStorage.getItem('mode')
                    if (local_mode && ['light', 'dark'].includes(local_mode)) {
                        mode = local_mode as Mode
                    }
                }
            }
            return mode
        }
    }
})
</script>

<style lang="scss" scoped>
.portrait-container {
    @apply h-screen;
    max-width: 1280px;
    margin: auto;
    .text-container {
        @apply flex items-center;
        .wrapper {
            max-width: 450px;
            @apply m-auto;
            p {
                @apply mb-2;
            }
        }
    }
}
</style>
