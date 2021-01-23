<template>
    <div class="error-page-container">
        <div class="isometric-container">
            <span class="txt number" :data-text="error.statusCode">{{error.statusCode}}</span>
            <h1 :data-text="computeErrorMessage" class="txt title">
            {{ computeErrorMessage }}
            </h1>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
    layout: 'empty',
    props: {
        error: {
            type: Object,
            default: null
        }
    },
    mounted() {
        if (process.client) {       
            const container = document.getElementById('container')
            container?.addEventListener('changeTheme', this.setTextThickness)
            this.setTextThickness()
        }
    },
    beforeDestroy() {
        if (process.client) {
            const container = document.getElementById('container')
            container?.addEventListener('changeTheme', this.setTextThickness)
        }
    },
    computed: {
        /**
         * エラーメッセージを日本語にする
         * @return {string} エラーメッセージ
         */
        computeErrorMessage() {
            if (this.error) {
                const message: string = this.error.message
                if (message === 'This page could not be found') {
                    return 'ページが見つかりません'
                }
                if (message === 'Unauthorized') {
                    return '認証に失敗しました'
                }
                if (message === 'Network Error') {
                    return 'サーバーで問題が発生しました'
                }
                if (message === 'Blog not found') {
                    return '記事が見つかりません'
                }
                return 'エラーが発生しました'
            }
            return ''
        }
    },
    methods: {
        /**
         * 文字を立体的にする
         */
        setTextThickness() {
            const elements = document.querySelectorAll('.txt')
            const theme = (this as any).$theme.getTheme()
            const color = theme === 'dark' ? '#1F2937' : '#e1e1e1'
            for (const ele of elements) {
                let shadow = ''
                for(let i = 0; i < 30; i++) {
                    shadow += (shadow ? ',' : '') + `${-i * 1}px ${i * 1}px 0 ${color}`
                }
                (ele as HTMLElement).style.textShadow = shadow
            }
        }
    }
})
</script>

<style lang="scss" scoped>
.error-page-container {
    width: 100vw;
    height: 100vh;
    background: #f1f1f1;
    overflow: hidden;
    @apply dark:bg-dark;
    .isometric-container {
        .txt {
            display: block;
            font-size: 5rem;
            letter-spacing: 1rem;
            letter-spacing: 2px;
            color: #ffffff;
            transform: rotate(-28deg) skew(25deg);
            font-family: source-han-sans-japanese,sans-serif;
            font-weight: 900;
            font-style: normal;
            margin-left: 20px;
            @apply dark:text-gray-600;
            &.number {
                font-size: 13rem;
                font-family: odile, serif;
                font-weight: 900;
                font-style: normal;
                margin-bottom: 10px;
            }
            &::before {
                content: attr(data-text);
                position: absolute;
                top: 37px;
                left: -37px;
                color:rgba(0, 0, 0, 0.25);
                text-shadow: none;
                filter: blur(12px);
                z-index: -1;
                @apply dark:text-black;
            }
            @screen sm {
                transform: rotate(-28deg) skew(25deg) scale(0.3) translate(-750px, -500px);
                &.title {
                    width: 1000px;
                }
                &.number {
                    transform: rotate(-28deg) skew(25deg) scale(0.5) translate(-300px, 150px);
                    line-height: 200px;
                }
            }
        }
    }
}
</style>
