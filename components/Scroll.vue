<template>
    <div v-if="mode === 'vertical'" class="scroll-container vertical">
        <div class="wrapper">
            <span class="font-futura italic text">scroll</span>
            <svg-container name="loading-circle" class="circle" />
            <svg-container name="long-arrow-bottom" class="arrow" />
        </div>
    </div>
    <div v-else-if="mode === 'side'" class="scroll-container side">
        <span class="font-futura italic text">scroll</span>
        <span class="scroll-icon-wrapper">
            <svg-container name="arrow-right" class="icon" />
            <svg-container name="arrow-right" class="icon" />
            <svg-container name="arrow-right" class="icon" />
        </span>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import SvgContainer from '~/components/SvgContainer.vue'

type Mode = 'vertical' | 'side'

export default Vue.extend({
    props: {
        mode: {
            type: String,
            default: 'vertical' as Mode
        }
    },
    components: {
        SvgContainer
    }
})
</script>

<style lang="scss" scoped>
.scroll-container {
    display: flex;
    align-items: center;
    .text {
        color: #8D8D8D;
        display: inline-block;
        margin-right: 10px;
        // animation: Blink 2s ease-in-out infinite;
        transform-origin: 0 100%;
    }
    .scroll-icon-wrapper {
        display: flex;
        margin-bottom: 2px;
        .icon {
            animation: Blink 2s infinite;
            &:nth-child(2) {
                animation-delay: 0.1s;
            }
            &:nth-child(3) {
                animation-delay: 0.2s;
            }
        }
    }
    &.vertical {
        .wrapper {
            width: 60px;
            height: 200px;
            position: relative;
            .text {
                @apply dark:text-white text-black;
                transform: rotate(-90deg);
                position: absolute;
                top: 40px;
                left: 30px;
            }
            svg {
                @apply stroke-current text-black dark:text-white;
            }
            svg.circle {
                fill: none;
                stroke-width: 1;
                stroke-linecap: round;
                stroke-dasharray: 128 128;
                animation: Loader 5s infinite cubic-bezier(.4,0,.3,1), Loading 1.2s infinite linear;
                vertical-align: middle;
                position: absolute;
                bottom: 0;
                left: 0;
            }
            .arrow {
                position: absolute;
                bottom: 25px;
                right: 28px;
                height: 150px;
            }
        }
    }
}
</style>

<style>
@keyframes Blink {
    0%, 15% {
        opacity: 1;
    }
    25%, 100% {
        opacity: 0;
    }
}
@keyframes Fade {
    50% { opacity: 0; }
}
@keyframes Loader {
	0% { stroke-dashoffset: 128; }
	15%, 85% { stroke-dashoffset: 0; }
	100% { stroke-dashoffset: -128; }
}
@keyframes Loading {
	from { transform: none; }
	to { transform: rotate(360deg); }
}
</style>
