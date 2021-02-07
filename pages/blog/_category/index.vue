<template>
    <div class="blog-category-container">
        <template v-if="items && items.length > 0">
            <h2 :style="getColor(entries.items[0], entries)">{{getCategory(items[0], entries)}}</h2>
            <div class="blog-container">
                <blog-item
                v-for="item in items"
                :key="item.sys.id"
                :item="item"
                :blogList="entries"
                class="item-wrapper"
                @detail="detail"
                />
            </div>
        </template>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import {EntryCollection} from 'contentful'
import createClient from '~/plugins/contentful'
import {getBlogPerCategory} from '~/utils/blog'
import {CtfBlog} from '~/types/type'
import BlogItem from '~/components/BlogItem.vue'
import BlogListPerTheme from '~/components/BlogLitPerTheme.vue'
import blog from '~/mixins/blog'
const client = createClient()

export default Vue.extend({
    transition: 'page-fade',
    components: {
        BlogListPerTheme,
        BlogItem
    },
    mixins: [blog],
    async asyncData({error, params, payload}) {
        if (payload) {
            return {entries: payload}
        }
        const entries: EntryCollection<CtfBlog> = await getBlogPerCategory(params.category)
        if (entries.total === 0) {
            error({statusCode: 503, message: 'Blog not found'})
        }
        return {entries}
    },
    computed: {
        items() {
            if ((this as any).entries) {
                return  (this as any).entries.items
            }
            return []
        }
    },
    methods: {
        /**
         * 記事詳細に遷移
         * @param {string | null} id 記事ID
         * @param {string | null} category カテゴリ
         */
        detail(id: string | null, category: string | null) {
            if (id && category) {
                this.$router.push(`/blog/${category}/${id}/`)
            }
        }
    },
    head() {
        const items: any[] = (this as any).entries?.items ?? []
        const item: any | null = items.length > 0 ? items[0] : null
        const category = (this as any).getCategory(item, (this as any).entries) ?? ''
        const title = !!category ? `${category}に関する記事一覧` : '記事一覧'
        return {
            title: `${title} | RyoTa.`,
            meta: [
                { hid: 'og:title', property: 'og:title', content: `${title} | RyoTa.` },
                { hid: 'og:url', property: 'og:url', content: `${process.env.SITE_URL}/blog/${category}/`},
            ]
        }
    }
})
</script>

<style lang="scss" scoped>
.blog-category-container {
    width: 60vw;
    max-width: 950px;
    box-sizing: border-box;
    margin: 0 auto;
    padding-top: 64px;
    @screen lg {
        width: 80vw;
    }
    @screen sm {
        width: 90vw;
        padding-bottom: 80px;
    }
    h2 {
        @apply dark:text-white my-4;
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
    .blog-container {
        @apply w-full flex flex-wrap;
        // justify-content: space-between;
        .item-wrapper {
            @apply mb-6;
            margin-right: 10px;
        }
    }
}
</style>