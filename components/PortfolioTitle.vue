<template>
    <div class="flex justify-center items-center flex-col">
        <div class="title-container">
            <h1 class="title font-futura-bold text-black dark:text-white mt-4">portfolio</h1>
                <span
                class="year font-futura-bold text-black dark:text-white"
                v-if="selectGenre === 'year'"
                key="year"
                >{{dataList.year}}</span>
                <span
                class="category font-futura-bold text-black dark:text-white"
                v-if="selectGenre === 'category'"
                key="category"
                >{{dataList.category}}</span>
        </div>
        <span class="genre">
            <span
            @click="setGenre('year')"
            class="genre-name font-fot"
            :class="{'selected': selectGenre === 'year'}">
                年数ごと
            </span>
            <span class="border-r border-gray-500 dark:border-white border-solid h-6 mx-4" />
            <span
            @click="setGenre('category')"
            class="genre-name font-fot"
            :class="{'selected': selectGenre === 'category'}">
                カテゴリ
            </span>
        </span>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import {Genre} from '~/types/type'

export default Vue.extend({
    props: {
        selectGenre: {
            type: String,
            default: 'year' as Genre
        },
        dataList: {
            type: Object
        }
    },
    methods: {
        /**
         * description
         * @param {Genre} genre ジャンル
         */
        setGenre(genre: Genre) {
            this.$emit('setGenre', genre)
        }
    }
})
</script>

<style lang="scss" scoped>
.title-container {
    @apply flex justify-center items-center flex-col-reverse;
    .year, .category {
        font-size: 100px;
        font-weight: bold;
        line-height: 90px;
        @apply sm:text-5xl;
    }
    .title {
        font-size: 40px;
        font-weight: bold;
        letter-spacing: 2px;
        @apply sm:text-2xl;
    }
    @screen xs {
        .title {
            font-size: 30px;
        }
        .year, .category {
            font-size: 60px;
            line-height: 50px;
            word-break:break-all;
        }
    }
}
.genre {
    display: inline-block;
    margin-top: 50px;
    @apply flex items-center;
    .genre-name {
        @apply cursor-pointer px-4 py-2 dark:text-gray-400 text-gray-300;
        font-size: 12px;
        &.selected {
            @apply text-black dark:text-white;
        }
    }
    @screen xs {
        margin-top: 20px;
    }
}
</style>
