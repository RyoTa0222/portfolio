<template>
    <div v-if="mode === 'vertical'" class="scroll-container vertical">
        <span class="font-futura italic text">scroll</span>
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
</style>
