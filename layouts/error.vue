<template>
  <div class="error-page-container">
    <div class="isometric-container">
        <span class="txt number" :data-text="error.statusCode">{{error.statusCode}}</span>
        <h1 :data-text="computeErrorMessage" class="txt">
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
    data: () => {
        return {

        }
    },
    mounted() {
        if (process.client) {
            const elements = document.querySelectorAll('.txt')
            for (const ele of elements) {
                console.log((ele as HTMLElement).style.fontSize)
                let shadow = ''
                for(let i = 0; i < 30; i++) {
                    shadow += (shadow ? ',' : '') + `${-i * 1}px ${i * 1}px 0 #e1e1e1`
                }
                (ele as HTMLElement).style.textShadow = shadow
            }
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
                return 'エラーが発生しました'
            }
            return ''
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
                color: rgba(0, 0, 0, 0.25);
                text-shadow: none;
                filter: blur(12px);
                z-index: -1;
            }
        }
    }
}
</style>
