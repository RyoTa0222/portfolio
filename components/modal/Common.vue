<template>
    <div class="bg" @click.self="closeEvent">
        <div class="modal">
            <!-- コンテンツ部分 -->
            <slot name="contents" />
            <span class="close-btn cursor-pointer" @click="closeEvent">
                <svg-container name="cross" class="fill-current dark:text-white text-black" />
            </span>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import SvgContainer from '~/components/SvgContainer.vue'

export default Vue.extend({
    components: {
        SvgContainer
    },
    mounted() {
        // prevent scroll (SP)
        document.addEventListener('touchmove', this.noScroll, {passive: false})
        // prevent scroll (PC)
        document.addEventListener('mousewheel', this.noScroll, {passive: false})
    },
    methods: {
        /**
         * 親要素にイベントを伝播する
        */
        closeEvent() {
            this.$emit('event', 'close')
        },
        /**
         * スクロールを禁止する
        */
        noScroll(event: Event) {
            event.preventDefault()
        },
    },
    beforeDestroy() {
        // permit scroll (SP)
        document.removeEventListener('touchmove', this.noScroll)
        // permit scroll (PC)
        document.removeEventListener('mousewheel', this.noScroll)
    }
})
</script>

<style lang="scss" scoped>
.bg {
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    background: #00000040;
    backdrop-filter: blur(2px);
    position: absolute;
    left: 0;
    top: 0;
    z-index: 9999999;
    display: flex;
    justify-content: center;
    align-items: center;
    animation: fadeInBg .5s;
    .modal {
        width: 80vw;
        max-width: 600px;
        box-sizing: border-box;
        padding: 20px;
        border-radius: 10px;
        box-shadow: 0 0 20px #00000040;
        position: relative;
        transform: translateY(80vh);
        animation: fadeInModal .5s;
        animation-fill-mode: forwards;
        -webkit-animation-fill-mode: forwards;
        @apply bg-white dark:bg-dark;
        .close-btn {
            position: absolute;
            right: 0;
            top: 0;
            width: 30px;
            height: 30px;
            display: flex;
            justify-content: center;
            align-items: center;
            transition: all 0.2s;
            &:active {
                transform: scale(0.8);
            }
            svg {
                @apply dark:text-white text-gray-600;
            }
        }
        .modal-title {
            font-size: 1.2rem;
            text-align: center;
            @apply dark:text-white;
        }
        .modal-description {
            font-size: 1rem;
            font-weight: bold;
        }
    }
    &.delete {
        animation: fadeOutBg .3s;
        animation-delay: 0.4s;
        animation-fill-mode: forwards;
        -webkit-animation-fill-mode: forwards;
        .modal {
            animation: fadeOutModal .6s;
            animation-delay: 0.2s;
            animation-fill-mode: both;
            -webkit-animation-fill-mode: both;
        }
    }
}
</style>

<style>
@keyframes fadeInBg {
    0% {
        background: #00000000;
        backdrop-filter: blur(0px);
    }
    100% {
        background: #00000040;
        backdrop-filter: blur(2px);
    }
}
@keyframes fadeOutBg {
    0% {
        background: #00000040;
        backdrop-filter: blur(2px);
    }
    100% {
        background: #00000000;
        backdrop-filter: blur(0px);
    }
}
@keyframes fadeInModal {
    100% {
        transform: translateY(0);
    }
}
@keyframes fadeOutModal {
    0% {
        transform: translateY(0);
    }
    100% {
        transform: translateY(100vh);
    }
}
</style>
