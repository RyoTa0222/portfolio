<template>
    <span class="tooltip-container" :data-tooltip="text" :class="computePosition">
        <slot name="content" />
    </span>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
    props: ['top', 'left', 'right', 'bottom', 'text'],
    computed: {
        computePosition() {
            if (this.top !== undefined) {
                return 'top'
            } else if (this.left !== undefined) {
                return 'left'
            } else if (this.right !== undefined) {
                return 'right'
            } else if (this.bottom !== undefined) {
                return 'bottom'
            } else {
                return 'bottom'
            }
        }
    }
})
</script>

<style lang="scss" scoped>
.tooltip-container {
    position: relative;
    & > div, > span, > ul, > li, > ol, > p, > h1, > h2, > h3, > h4, > h5, > h6 {
        position: absolute;
    }
    &::after {
        -webkit-transition: all 0.2s;
        opacity: 0;
        position: absolute;
        transition: all 0.2s;
        visibility: hidden;
        z-index: 11;
        background: #5f6368;
        border-radius: 3px;
        max-width: 100px;
        word-break: break-all;
        color: #fff;
        content: attr(data-tooltip); /* ここでdata-tooltipの内容を呼び出しているよ */
        display: block;
        font-size: 11px;
        font-weight: 600;
        padding: 5px 10px;
        white-space: nowrap;
    }
    &.bottom {
        &::after {
            left: 50%;
            top: calc(100% + 5px);
            transform: translateX(-50%) scale(0);
        }
        &:hover {
            &::after {
                opacity: 1;
                transform: translateX(-50%) scale(1);
                visibility: visible;
            }
        }
    }
    &.top {
        &::after {
            left: 50%;
            top: calc(-100% + 5px);
            transform: translateX(-50%) scale(0);
        }
        &:hover {
            &::after {
                opacity: 1;
                transform: translateX(-50%) scale(1);
                visibility: visible;
            }
        }
    }
    &.left {
        &::after {
            left: calc(-100% - 10px);
            top: 50%;
            transform: translateY(-50%) scale(0);
        }
        &:hover {
            &::after {
                opacity: 1;
                transform: translateY(-50%) scale(1);
                visibility: visible;
            }
        }
    }
    &.right {
        &::after {
            left: calc(100% + 10px);
            top: 50%;
            transform: translateY(-50%) scale(0);
        }
        &:hover {
            &::after {
                opacity: 1;
                transform: translateY(-50%) scale(1);
                visibility: visible;
            }
        }
    }
}
</style>
