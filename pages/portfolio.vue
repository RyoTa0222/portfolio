<template>
    <div class="flex portrait-container" :style="`min-height: ${screenHeight}px !important;`">
        <div class="preparing-container">
            <img src="~/assets/images/portfolio/lr.png" alt="ただ今、準備中です" />
            <div class="text-container">
                <p>現在ポートフォリオの制作が<br/>間に合っていません...</p>
                <p>準備でき次第、公開します！！</p>
                <p>今しばらくお待ちください...</p>
            </div>
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
            title: 'ポートフォリオ | RyoTa.',
            meta: [
                { hid: 'og:title', property: 'og:title', content: 'ポートフォリオ | RyoTa.' },
            ]
        }
    }
})
</script>

<style lang="scss" scoped>
.portrait-container {
    @apply flex justify-center items-center;
    .preparing-container {
        @apply flex justify-start items-center;
        width: 600px;
        height: 350px;
        background: url("~assets/images/portfolio/bg.png");
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
