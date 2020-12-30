<template>
    <div class="theme-wrapper">
        <div class="theme-container" :class="mode">
            <div class="title-container">
                <span class="icon-container">
                    <template v-if="mode === 'dark'">
                        <svg-container name="moon" id="moon" />
                    </template>
                    <template v-else-if="mode === 'light'">
                        <svg-container name="sun" id="sun" />
                    </template>
                </span>
                <span class="mode-title">
                    <template v-if="mode === 'light'">ライトモード</template>
                    <template v-else-if="mode === 'dark'">ダークモード</template>
                </span>
            </div>
            <p class="description">こちらは{{mode === 'light' ? 'ライト' : 'ダーク'}}モードです。画面のイメージをお確かめください。</p>
            <div class="btn-container">
                <span class="dammy-btn text-black bg-gray-100">ダミーボタン</span>
                <span class="dammy-btn text-white bg-green-400">ダミーボタン</span>
            </div>
        </div>
        <span class="checkbox" :class="{'checked': mode === currentTheme}" @click="check">
            <svg-container name="checked" v-if="mode === currentTheme" class="checked-icon" />
        </span>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import SvgContainer from '~/components/SvgContainer.vue'
import {Theme} from 'types/type'

export default Vue.extend({
    components: { SvgContainer },
    props: {
        mode: {
            type: String,
            default: 'light'
        },
        currentTheme: {
            type: String,
            default: 'light'
        }
    },
    computed: {
        switchModeIcon() {
            switch(this.mode as Theme) {
                case 'light':
                    return 'sun'
                case 'dark':
                    return 'moon'
                default:
                    return 'sun'
            }
        }
    },
    methods: {
        /**
         * テーマを選択
         */
        check() {
            this.$emit('check')
        }
    }    
})
</script>

<style lang="scss" scoped>
.theme-wrapper {
    @apply flex flex-col justify-center items-center;
    .checkbox {
        @apply inline-block mt-1 relative rounded-full inline-flex justify-center items-center;
        width: 30px;
        height: 30px;
        .checked-icon {
            z-index: 1;
            width: 10px;
        }
        &:hover {
            @apply bg-gray-100 dark:bg-gray-600;
        }
        &::before {
            content: '';
            @apply absolute rounded-full border-gray-300 border;
            width: 15px;
            height: 15px;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
        }
        &.checked {
            &::before {
                @apply bg-blue-400 border-0;
            }
            &::after {

            }
        }
    }
}
.theme-container {
    width: 230px;
    @apply rounded-2xl p-4 box-border;
    .title-container {
        @apply flex items-center;
    }
    .mode-title {
        @apply text-sm font-black inline-block;
        margin-top: 1px;
    }
    .description {
        @apply text-xs mb-2;
    }
    .icon-container {
        width: 25px;
        height: 25px;
        @apply rounded-full inline-flex justify-center items-center mr-1;
    }
    .btn-container {
        @apply flex items-center justify-center;
        .dammy-btn {
            width: 100px;
            height: 30px;
            text-align: center;
            padding: 6px 0;
            @apply rounded-sm inline-block text-xs ml-1 mr-1;
        }
    }
    &.light {
        @apply bg-white text-black;
        box-shadow: -2px -2px 5px rgba(255,255,255,1),
                  3px 3px 5px rgba(0,0,0,.07);
        .title-container {
            .icon-container {
                box-shadow: -2px -2px 5px rgba(255,255,255,1),
                  3px 3px 5px rgba(0,0,0,.07);
            }
        }
    }
    &.dark {
        @apply text-white;
        background: $DARK;
        box-shadow: -2px -2px 5px rgba(255,255,255,1),
                  3px 3px 5px rgba(0,0,0,.07);
        .title-container {
            .icon-container {
                background: $DARK;
                box-shadow: inset -2px -2px 5px rgba(0,0,0,0.5),
                     inset 3px 3px 5px rgba(255,255,255,.07);
            }
        }
    }
}
</style>
<style lang="scss">
html.dark {
    .theme-container {
        &.light {
            box-shadow: 2px 2px 6px #6b6b6b, 
             -2px -2px 6px #aeaeae;
        }
        &.dark {
            box-shadow: 2px 2px 5px #2e2e2e, 
             -2px -2px 5px #3e3e3e;
        }
    }
}
</style>
