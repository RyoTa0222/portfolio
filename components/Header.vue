<template>
    <header
    class="header"
    :class="{'separate': computeIsTop, 'bg-white dark:bg-dark': $route.name === 'roadmap', 'error-page-header': $route.name === null}">
        <span class="logo-container" @click="$router.push('/')">
            <img src="~/assets/images/logo.png" alt="RyoTa" class="logo" />
        </span>
        <div class="nav">
            <nav>
                <ul class="list-container">
                    <client-only>
                        <template v-for="(page, idx) in pages">
                            <li
                            :key="idx"
                            class="font-zooja cursor-pointer"
                            @click="$router.push(`${page.path}`)">
                                <template v-if="computeIsSp">
                                    <svg-container :name="computeIconName(page.icon)" class="svg-container text-black dark:text-white"
                                    :class="computeActive(page.icon)"
                                    />
                                </template>
                                {{ page.name }}
                            </li>
                        </template>
                    </client-only>
                </ul>
            </nav>
            <div class="icon-container">
                <a
                class="icon twitter"
                href="https://twitter.com/RyoTa___0222"
                target="_blank"
                rel="noopener noreferrer">
                    <svg-container name="twitter" class="fill-current" />
                </a>
                <tooltip class="icon-wrapper" bottom text="設定" @clickEvent="openSettingModal">
                    <template v-slot:content>
                        <span class="icon cog">
                            <svg-container name="gear" class="fill-current" />
                        </span>
                    </template>
                </tooltip>
            </div>
        </div>
    </header>
</template>

<script lang="ts">
import Vue from 'vue'
import SvgContainer from '~/components/SvgContainer.vue'
import Tooltip from '~/components/Tooltip.vue'
import {PageType} from '~/types/type'

export default Vue.extend({
    data: () => {
        return {
            pages: [
                {
                    name: 'TOP',
                    path: '/',
                    icon: 'home'
                },
                {
                    name: 'PORTFOLIO',
                    path: '/portfolio/year/',
                    icon: 'user'
                },
                {
                    name: 'BLOG',
                    path: '/blog/',
                    icon: 'blog'
                },
                {
                    name: 'ROADMAP',
                    path: '/roadmap/',
                    icon: 'map'
                }
            ] as PageType[],
        }
    },
    components: {SvgContainer, Tooltip},
    computed: {
        computeIsSp() {
            return ['xs', 'sm'].includes((this as any).$breakpoint?.name)
        },
        /**
         * 画面がスクロールされていたらtrueを返す
         * @return {Boolean} 画面がスクロールされていたらtrue
         */
        computeIsTop(): boolean {
            return (this as any).$window?.pageYOffset > 0
        },
        /**
         * アイコンの名前を返す
         * @return {string} アイコン名
         */
        computeIconName(): any {
            return (icon: string): any => {
                switch(icon) {
                    case 'home':
                        return this.$route.name === 'index' ? 'home' : 'home-line'
                    case 'user':
                        return this.$route.name === 'portfolio' ? 'user' : 'user-line'
                    case 'blog':
                        return ['blog', 'blog-category', 'blog-category-id'].includes(this.$route.name as string) ? 'blog' : 'blog-line'
                    case 'map':
                        return this.$route.name === 'roadmap' ? 'map' : 'map-line'
                }
            }
        },
        /**
         * アイコンの名前を返す
         * @return {string} アイコン名
         */
        computeActive(): any {
            return (icon: string): any => {
                switch(icon) {
                    case 'home':
                        return this.$route.name === 'index' ? 'active' : ''
                    case 'user':
                        return this.$route.name === 'portfolio' ? 'active' : ''
                    case 'blog':
                        return ['blog', 'blog-category', 'blog-category-id'].includes(this.$route.name as string) ? 'active' : ''
                    case 'map':
                        return this.$route.name === 'roadmap' ? 'active' : ''
                }
            }
        }
    },
    methods: {
        /**
         * 設定のモーダルを開く
         */
        openSettingModal() {
            this.$emit('open')
        },
    }
})
</script>

<style lang="scss" scoped>
.header {
    @apply w-screen h-16 box-border flex justify-between items-center fixed -top-0 -left-0;
    padding: 0 5vw;
    @screen sm {
        @apply h-12;   
    }
    &.error-page-header {
        z-index: 999999;
    }
    .logo-container {
        @apply h-full cursor-pointer;
        .logo {
            @apply h-full;
        }
    }
    .nav {
        @apply flex;
        nav {
            @apply flex items-center;
            ul {
                @apply flex space-x-8 items-center mr-8 pr-10 border-r border-gray-500 dark:border-white;
                li {
                    @apply text-base dark:text-white;
                }
            }
        }
    }
    .icon-container {
        @apply flex items-center;
        .icon-wrapper {
            @apply ml-4 inline-block w-full;
            width: 36px;
            height: 36px;
        }
        .icon {
            @apply rounded-full p-2 cursor-pointer dark:bg-gray-600 bg-gray-50;
            width: 36px;
            height: 36px;
            &:focus {
                outline: none;
            }
            svg {
                @apply dark:text-white text-gray-600;
            }
            &.cog {
                @apply hover:animate-spin-slow transition duration-300 bg-opacity-50;
                &:active {
                    transform: scale(0.8);
                }
            }
            &.twitter {
                @apply transition duration-300 bg-opacity-50;
                svg {
                    @apply h-full w-full transition duration-300;
                }
                &:hover {
                    svg {
                        fill: #00acee;
                    }
                }
                &:active {
                    transform: scale(0.8);
                }
            }
        }
    }
    &.separate {
        animation: fadeInHeader 1s;
        animation-fill-mode: both;
    }
    @screen sm {
        .nav {
            z-index: 999999999999;
            nav {
                z-index: 999999999999;
                @apply fixed bottom-0 right-0 w-screen h-32 flex justify-center items-center;
                .list-container {
                    @apply p-0 m-0 h-14 w-10/12 rounded-full box-border px-4 flex justify-around items-center bg-white dark:bg-gray-700 dark:bg-opacity-80 bg-opacity-80;
                    box-shadow: 0 2px 10px #00000010;
                    backdrop-filter: blur(2px);
                    border: none;
                    z-index: 999999999999;
                    li {
                        @apply px-2 pt-2 text-sm flex justify-center items-center flex-col;
                        margin: 0 !important;
                        &:focus {
                            outline: none;
                        }
                        .svg-container {                            
                            @apply mb-2 stroke-current;
                            height: 18px;
                            width: 20px;
                            &.active {
                                @apply fill-current;
                            }
                        }
                    }
                }
            }
        } 
    }
}
</style>

<style>
@keyframes fadeInHeader {
    0% {
        background: #ffffff00;
        /* backdrop-filter: blur(0px); */
    }
    100% {
        background: #ffffff30;
        /* backdrop-filter: blur(10px); */
    }
}
</style>
