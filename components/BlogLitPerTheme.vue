<template>
    <div class="bloglist-per-theme-container">
        <div class="flex justify-between align-center head-container">
            <h2
            v-if="blogList !== null"
            :style="getColor(blogList.items[0], blogList, latest)"
            >
                <slot name="title" />
            </h2>
            <transition name="fade">
                <scroll mode="side" v-if="scrollable" class="scroll" />
            </transition>
        </div>
        <div class="blog-wrapper" ref="blogWrapper">
            <blog-item
            v-for="item in blogList.items"
            :key="item.sys.id"
            :item="item"
            :blogList="blogList"
            :latest="latest"
            class="item-wrapper"
            />
        </div>
        <div class="more-btn-container">
            <button
            class="more-btn"
            :style="getColor(blogList, latest)"
            v-if="isMoreBlogs(latest !== undefined)"
            @click="more(blogList.items[0])"
            >もっと見る</button>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import {ContentfulCollection, EntryCollection, Entry} from 'contentful'
import {CtfBlog} from '~/types/type'
import filter from '~/mixins/filter'
import blog from '~/mixins/blog'
import Scroll from '~/components/Scroll.vue'

export default Vue.extend({
    mixins: [filter, blog],
    components: {Scroll},
    props: {
        blogList: {
            default: null as null | EntryCollection<CtfBlog>
        },
        latest: {
            default: undefined
        }
    },
    data: () => {
        return {
            scrollable: false as boolean
        }
    },
    mounted() {
        if (process.client) {
            if (this.$refs.blogWrapper) {
                window.addEventListener( 'resize', this.setScrollableFlg, false );
            }
        }
        this.setScrollableFlg()
    },
    beforeDestroy() {
        if (process.client) {
            if (this.$refs.blogWrapper) {
                window.removeEventListener( 'resize', this.setScrollableFlg, false );
            }
        }
    },
    methods: {
        /**
         * ４つ以上コンテンツがあるか
         * @param {boolean} latest trueなら最新記事
         * @return {boolean} trueなら５つ以上コンテンツがある
         */
        isMoreBlogs(latest: boolean): boolean {
            const {total, limit} = this.blogList
            return (total > limit) && !latest
        },
        /**
         * スクロールできるかを設定する
         */
        setScrollableFlg() {
            if (this.$refs.blogWrapper && this.blogList) {
                const width = (this.$refs.blogWrapper as Element).clientWidth
                const itemWrapper = document.getElementsByClassName('item-wrapper')[0]
                if (itemWrapper) {
                    const itemWidth = itemWrapper.clientWidth
                    this.scrollable = ((itemWidth + 10) * this.blogList.items.length > width)
                    return
                }
            }
            this.scrollable = false
        },
        /**
         * カテゴリごとの記事一覧に遷移
         * @param {Entry<CtfBlog>} item 記事データ
         */
        more(item: Entry<CtfBlog>) {
            const id = item.fields.id
            const category = (this as any).getCategory(item, this.blogList, id)
            this.$emit('more', category)
        }
    }
})
</script>

<style lang="scss" scoped>
.bloglist-per-theme-container {
    width: 100%;
    padding: 25px 0;
    border-bottom: solid 1px #4b5563;
    @apply border-gray-200 dark:border-gray-600;
    &:last-child {
        border-bottom: none;
    }
    .head-container {
        margin-bottom: 20px;
    }
    h2 {
        @apply dark:text-white;
        font-weight: bold;
        padding-left: 25px;
        position: relative;
        z-index: -1;
        &::before, &::after {
            content: '';
            position: absolute;
            display: inline-block;
            width: 15px;
            height: 15px;
            border-radius: 50%;
            background: var(--color);
        }
        &::before {
            left: 0;
            top: 0;
        }
        &::after {
            @apply bg-opacity-20 dark:bg-opacity-50;
            left: 5px;
            bottom: 0;
            opacity: var(--tw-bg-opacity);
        }
    }
    .blog-wrapper {
        display: flex;
        margin-bottom: 20px;
        overflow-x: scroll;
        white-space: nowrap;
        -ms-overflow-style: none;    /* IE, Edge 対応 */
        scrollbar-width: none;       /* Firefox 対応 */
        &::-webkit-scrollbar {  /* Chrome, Safari 対応 */
            display:none;
        }
    }
    .more-btn-container {
        display: flex;
        justify-content: flex-start;
    }
    .more-btn {
        width: 240px;
        height: 40px;
        border: solid 1px black;
        @apply dark:border-white;
        position: relative;
        color: #00000000;
        margin-bottom: 20px;
        &::before {
            content: '';
            position: absolute;
            top: 8px;
            left: 8px;
            width: 100%;
            height: 100%;
            background: var(--color);
            z-index: 0;
            opacity: .5;
            transition: all 0.2s;
        }
         &::after {
            content: 'もっと見る';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 15px;
            @apply text-dark dark:text-white;
        }
        &:focus {
            outline: 0;
        }
        &:hover {
            &::before {
                top: 5px;
                left: 5px;
            }
        }
    }
    @screen lg {
        .more-btn {
            width: 200px;
        }
    }
    @screen sm {
        .head-container {
            .scroll {
                display: none;
            }
        }
        .blog-wrapper {
            display: flex;
            flex-wrap: wrap;
            overflow-x: inherit;
            white-space: inherit;
            justify-content: space-between;
        }
        .more-btn {
            width: 100%;
        }
    }
}
</style>
