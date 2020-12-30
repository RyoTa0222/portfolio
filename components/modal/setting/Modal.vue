<template>
    <modal @event="emitEvent" class="confirm">
        <!-- コンテンツ部分 -->
        <template v-slot:contents>
            <template>
                <div>
                    <p class="modal-title">設定</p>
                    <div class="content-box">
                        <p class="content-title">テーマ</p>
                        <div class="flex items-center justify-between sm:flex-col">
                            <theme-component
                            mode="light"
                            @check="checked('light')"
                            :currentTheme="theme" />
                            <theme-component
                            mode="dark"
                            @check="checked('dark')"
                            :currentTheme="theme"
                            />
                        </div>
                    </div>
                    <hr class="border-gray-400 dark:border-gray-50 my-2" />
                    <p class="text-back dark:text-white text-xs">今後もユーザビリティ向上のため、設定項目を増やしていきます。改善の提案等ございましたらTwitterまでご連絡ください！</p>
                    <div class="twitter-link-container mt-2">
                        <a
                        class="twitter"
                        href="https://twitter.com/RyoTa___0222"
                        target="_blank"
                        rel="noopener noreferrer">
                            <svg-container name="twitter" class="fill-current" />
                            <span>@RyoTa___0222</span>
                        </a>
                    </div>
                </div>
            </template>
        </template>
    </modal>
</template>

<script lang="ts">
import Vue from 'vue'
import Modal from '~/components/modal/Common.vue'
import ThemeComponent from '~/components/modal/setting/Theme.vue'
import Mixin from '~/mixins/modal'
import {Theme} from 'types/type'

export default Vue.extend({
    mixins: [Mixin],
    components: {
        Modal,
        ThemeComponent,
    },
    data: () => {
        return {
            theme: 'light' as Theme,
        }
    },
    mounted() {
        if (process.client) {
            this.theme = (this as any).$theme.getTheme()
        }
    },
    methods: {
        /**
         * テーマを選択
         */
        checked(theme: Theme) {
            const response: boolean = (this as any).$theme.setTheme(theme)
            if (response) {
                this.theme = theme
            }
        }
    }
})
</script>

<style lang="scss">
.bg {
    .modal {
        z-index: 99999999;
        .content-box {
            margin-top: 10px;
            .content-title {
                @apply relative pl-2 dark:text-white mb-2;
                &::after {
                    content: '';
                    @apply absolute inline-block;
                    top: 10px;
                    left: -5px;
                    width: 6px;
                    height: 6px;
                    background: linear-gradient(135deg, #38e459, #4d9cff);
                }
            }
        }
    }
}
.twitter-link-container {
    display: block;
    text-align: center;
    .twitter {
        @apply flex justify-center items-center;
        svg {
            width: 15px;
            height: 15px;
            @apply dark:text-blue-300 text-blue-400;
        }
        span {
            @apply dark:text-blue-300 text-blue-400 text-xs ml-1;
        }
    }
}
</style>
