<template>
    <header class="header" :class="{separate: computeIsTop}">
        <ul>
            <template v-for="(page, idx) in pages">
                <li :key="idx" class="font-zooja text-base cursor-pointer">{{ page.name }}</li>
            </template>
        </ul>
        <div class="icon-container">
            <span class="icon twitter">
                <svg class="fill-current text-gray-600" id="グループ_5" data-name="グループ 5" xmlns="http://www.w3.org/2000/svg" width="48" height="40" viewBox="0 0 48 40">
                    <g id="グループ_3" data-name="グループ 3" transform="translate(-300 -164)">
                        <path id="パス_4" data-name="パス 4" d="M348,168.735a19.235,19.235,0,0,1-5.655,1.589,10.076,10.076,0,0,0,4.33-5.585,19.4,19.4,0,0,1-6.257,2.447A9.712,9.712,0,0,0,333.231,164a9.975,9.975,0,0,0-9.844,10.1,10.3,10.3,0,0,0,.254,2.3,27.725,27.725,0,0,1-20.3-10.554,10.282,10.282,0,0,0-1.333,5.082,10.164,10.164,0,0,0,4.381,8.4,9.669,9.669,0,0,1-4.463-1.26v.124a10.039,10.039,0,0,0,7.9,9.9,9.39,9.39,0,0,1-2.595.355,9.566,9.566,0,0,1-1.854-.179,9.885,9.885,0,0,0,9.2,7.009,19.445,19.445,0,0,1-12.23,4.325,19.708,19.708,0,0,1-2.35-.139A27.418,27.418,0,0,0,315.1,204c18.116,0,28.019-15.385,28.019-28.73,0-.439-.008-.878-.025-1.309A20.211,20.211,0,0,0,348,168.735" fill-rule="evenodd"/>
                    </g>
                </svg>
            </span>
            <span class="icon cog">
                <svg class="fill-current text-gray-600" viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                    <g id="Page-1" stroke="none" stroke-width="1" fill-rule="evenodd">
                        <g id="icon-shape">
                            <path d="M3.93830521,6.49683865 C3.63405147,7.02216933 3.39612833,7.5907092 3.23599205,8.19100199 L5.9747955e-16,9 L9.6487359e-16,11 L3.23599205,11.808998 C3.39612833,12.4092908 3.63405147,12.9778307 3.93830521,13.5031614 L2.22182541,16.363961 L3.63603897,17.7781746 L6.49683865,16.0616948 C7.02216933,16.3659485 7.5907092,16.6038717 8.19100199,16.7640079 L9,20 L11,20 L11.808998,16.7640079 C12.4092908,16.6038717 12.9778307,16.3659485 13.5031614,16.0616948 L16.363961,17.7781746 L17.7781746,16.363961 L16.0616948,13.5031614 C16.3659485,12.9778307 16.6038717,12.4092908 16.7640079,11.808998 L20,11 L20,9 L16.7640079,8.19100199 C16.6038717,7.5907092 16.3659485,7.02216933 16.0616948,6.49683865 L17.7781746,3.63603897 L16.363961,2.22182541 L13.5031614,3.93830521 C12.9778307,3.63405147 12.4092908,3.39612833 11.808998,3.23599205 L11,0 L9,0 L8.19100199,3.23599205 C7.5907092,3.39612833 7.02216933,3.63405147 6.49683865,3.93830521 L3.63603897,2.22182541 L2.22182541,3.63603897 L3.93830521,6.49683865 L3.93830521,6.49683865 Z M10,13 C11.6568542,13 13,11.6568542 13,10 C13,8.34314575 11.6568542,7 10,7 C8.34314575,7 7,8.34314575 7,10 C7,11.6568542 8.34314575,13 10,13 L10,13 Z" id="Combined-Shape"></path>
                        </g>
                    </g>
                </svg>
            </span>
        </div>
    </header>
</template>

<script lang="ts">
import Vue from 'vue'
import {pageType} from '~/types/type'

export default Vue.extend({
    data: () => {
        return {
            pages: [
                {
                    name: 'TOP',
                    path: '/'
                },
                {
                    name: 'PORTFOLIO',
                    path: '/portfolio'
                },
                {
                    name: 'ROAMAP',
                    path: '/roadmap'
                }
            ] as pageType[],
            scrollTop: 0 as number
        }
    },
    mounted() {
        if (process.client) {
            window.addEventListener('scroll', () => {
                this.scrollTop = window.pageYOffset
            }, false)
        }
    },
    computed: {
        /**
         * 画面がスクロールされていたらtrueを返す
         * @return {Boolean} 画面がスクロールされていたらtrue
         */
        computeIsTop(): boolean {
            return this.scrollTop > 0
        }
    },
})
</script>

<style lang="scss" scoped>
.header {
    @apply w-screen h-16 box-border flex justify-between items-center fixed -top-0 -left-0;
    padding: 0 5vw;
    ul {
        @apply flex space-x-8 items-center;
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
                @apply hover:bg-blue-50 transition duration-300 bg-opacity-50;
                svg {
                    @apply h-full w-full transition duration-300;
                }
                &:hover {
                    svg {
                        fill: #60A5FA;
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