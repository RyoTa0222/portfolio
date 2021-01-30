<template>
    <div class="flex portfolio-container" :style="`min-height: ${screenHeight}px !important;`">
        <scroll class="scroll-component"/>
        <div class="top-container" :style="`height: ${screenHeight}px !important;`">
            <portfolio-title
            :selectGenre="selectGenre"
            :dataList="{year, category}"
            @setGenre="setGenre"
            />
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import {Theme} from '~/types/type'
import screenHeight from '~/mixins/screenHeight'
import {DateTime} from 'luxon'
import {Genre} from '~/types/type'
import PortfolioTitle from '~/components/PortfolioTitle.vue'
import Scroll from '~/components/Scroll.vue'

export default Vue.extend({
    // screenWidth, screenHeight
    mixins: [screenHeight],
    components: {
        PortfolioTitle,
        Scroll
    },
    data: () => {
        return {
            year: DateTime.local().toFormat('yyyy') as string,
            category: 'JavaScript' as string
        }
    },
    methods: {
        /**
         * description
         * @param {Genre} genre ジャンル
         */
        setGenre(genre: Genre) {
            this.$router.push(`/portfolio?genre=${genre}`)
        }
    },
    computed: {
        selectGenre(): Genre {
            const genre: Genre | undefined = (this.$route.query as {genre: Genre}).genre
            if (genre) {
                return genre
            }
            return 'year'
        }
    },
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
.portfolio-container {
    @apply flex justify-center items-center;
    .scroll-component {
        @apply fixed;
        bottom: 10px;
        left: 10px;
        @screen sm {
            transform: scale(0.8);
            transform-origin: left bottom;
        }
    }
    .top-container {
        width: 100%;
        height: 100%;
        @apply flex justify-center items-center flex-col;
        
    }
}
</style>
