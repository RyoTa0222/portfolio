<template>
    <header
    class="header"
    :class="{separate: computeIsTop, 'bg-white': $route.name === 'roadmap'}">
        <span class="logo-container" @click="$router.push('/')">
            <img src="~/assets/images/logo.png" alt="RyoTa" class="logo" />
        </span>
        <div class="nav">
            <nav>
                <ul>
                    <no-ssr>
                        <template v-for="(page, idx) in pages">
                            <li
                            :key="idx"
                            class="font-zooja cursor-pointer"
                            @click="$router.push(page.path)">
                                <template v-if="['xs', 'sm'].includes($breakpoint.name)">
                                    <svg-container :name="page.icon" class="svg-container" />
                                </template>
                                {{ page.name }}
                            </li>
                        </template>
                    </no-ssr>
                </ul>
            </nav>
            <div class="icon-container">
                <a
                class="icon twitter"
                href="https://twitter.com/RyoTa___0222"
                target="_blank"
                rel="noopener noreferrer">
                    <svg-container name="twitter" />
                </a>
                <span class="icon cog">
                    <svg-container name="gear" />
                </span>
            </div>
        </div>
    </header>
</template>

<script lang="ts">
import Vue from 'vue'
import SvgContainer from '~/components/SvgContainer.vue'
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
                    path: '/portfolio',
                    icon: 'user'
                },
                {
                    name: 'ROADMAP',
                    path: '/roadmap',
                    icon: 'map'
                }
            ] as PageType[],
        }
    },
    components: {SvgContainer},
    computed: {
        /**
         * 画面がスクロールされていたらtrueを返す
         * @return {Boolean} 画面がスクロールされていたらtrue
         */
        computeIsTop(): boolean {
            return (this as any).$window.pageYOffset > 0
        }
    },
})
</script>

<style lang="scss" scoped>
.header {
    @apply w-screen h-16 box-border flex justify-between items-center fixed -top-0 -left-0;
    padding: 0 5vw;
    @screen sm {
        @apply h-12;   
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
                @apply flex space-x-8 items-center mr-8 pr-10 border-r border-gray-500;
                li {
                    @apply text-base;
                }
            }
        }
    }
    @screen sm {
        .nav {
            nav {
                @apply fixed bottom-0 right-0 w-screen h-32 flex justify-center items-center;
                ul {
                    @apply p-0 m-0 h-14 w-10/12 rounded-full box-border px-4 flex justify-around items-center;
                    box-shadow: 0 2px 10px #00000010;
                    background: #ffffff80;
                    backdrop-filter: blur(2px);
                    border: none;
                    li {
                        @apply m-0 px-2 pt-2 text-sm flex justify-center items-center flex-col;
                        .svg-container {
                            @apply mb-1 h-5;
                        }
                    }
                }
            }
        } 
    }
    .icon-container {
        @apply flex;
        .icon {
            @apply rounded-full p-2 cursor-pointer;
            width: 36px;
            height: 36px;
            &.cog {
                @apply hover:bg-gray-50 hover:animate-spin-slow transition duration-300 ml-4 bg-opacity-50;
            }
            &.twitter {
                @apply hover:bg-gray-50 transition duration-300 bg-opacity-50;
                svg {
                    @apply h-full w-full transition duration-300;
                }
                &:hover {
                    svg {
                        fill: #00acee;
                    }
                }
            }
        }
    }
    &.separate {
        animation: fadeInHeader 1s;
        animation-fill-mode: both;
    }
}
</style>

<style>
@keyframes fadeInHeader {
    0% {
        background: #ffffff00;
        backdrop-filter: blur(0px);
    }
    100% {
        background: #ffffff30;
        backdrop-filter: blur(10px);
    }
}
</style>
