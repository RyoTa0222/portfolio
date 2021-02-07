<template>
    <div class="blog-container">
        <transition name="fade" mode="out-in">
            <div v-if="latestBlog && blogCategory && blogByCategory" key="success">
                <div class="search-container">
                    <input
                    type="search"
                    name="search"
                    id="search"
                    v-model="search"
                    placeholder="記事の検索（/の入力でも可）"
                    @keydown.enter="enter"
                    />
                    <span class="icon-container">
                        <svg-container name="search" class="icon fill-current" />
                    </span>
                </div>
                <!-- 最新記事 -->
                <template v-if="latestBlog && Object.keys(latestBlog).length > 0">
                    <blog-list-per-theme
                    @detail="detail"
                    :blogList="latestBlog"
                    latest
                    >
                        <template v-slot:title>最新の記事</template>
                    </blog-list-per-theme>
                </template>
                <!-- カテゴリごとの記事 -->
                <template v-if="blogByCategory && Object.keys(blogByCategory).length > 0 && blogCategory">
                    <template v-for="category in blogCategory">
                        <blog-list-per-theme
                        @detail="detail"
                        @more="more"
                        :key="category.sys.id"
                        :blogList="blogByCategory[category.fields.categoryId]"
                        v-if="blogByCategory[category.fields.categoryId].items.length > 0"
                        >
                            <template v-slot:title>{{category.fields.categoryName}}</template>
                        </blog-list-per-theme>
                    </template>
                </template>
            </div>
        </transition>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import {EntryCollection} from 'contentful'
import {getBlogCategory, getLatestBlog, getBlogPerCategory} from '~/utils/blog'
import {CtfBlogCategoryItem, CtfBlog, StringKeyObject} from '~/types/type'
import SvgContainer from '~/components/SvgContainer.vue'
import BlogListPerTheme from '~/components/BlogLitPerTheme.vue'
import Loader from '~/components/Looder.vue'

export default Vue.extend({
    components: { SvgContainer, BlogListPerTheme, Loader},
    transition: 'page-fade',
    data: () => {
        return {
            search: '' as string,
            status: 'success',

        }
    },
    async asyncData({error, payload}) {
        try {
            if (payload) {
                return payload
            }
            let blogCategory = null as null | CtfBlogCategoryItem[]
            let latestBlog = null as null | EntryCollection<CtfBlog>
            let blogByCategory = {} as StringKeyObject
            // ブログカテゴリのデータの取得
            const entries = await getBlogCategory()
            if (entries.items.length > 0) {
                blogCategory = entries.items
            }
            // ブログ一覧記事のデータの取得
            const arr: EntryCollection<CtfBlog>[] = []
            // 最新の記事
            latestBlog = await getLatestBlog(4)
            // カテゴリごとの記事
            if (blogCategory && blogCategory.length > 0) {
                for (const category of blogCategory) {
                    const categoryEntries = await getBlogPerCategory(category.fields.categoryId, 4)
                    arr.push(categoryEntries)
                }
            }
            if (blogCategory && blogCategory.length > 0) {
                for (let i = 0; i < blogCategory.length; i++) {
                    const categoryId = blogCategory[i].fields.categoryId
                    const item = arr[i]
                    blogByCategory[categoryId] = item
                }
            }
            return {blogCategory, latestBlog, blogByCategory}
        } catch(err) {
            error({statusCode: 503, message: 'Blog not found'})
        }
    },
    mounted() {
        if (process.client) {
            // keyPressイベント
            document.addEventListener('keypress', (this as any).toggleSearchInputState)
        }
    },
    beforeDestroy() {
        if (process.client) {
            document.removeEventListener('keypress', (this as any).toggleSearchInputState)
        }
    },
    methods: {
        /**
         * キー入力でフォームを活性化させる
         * @param {KeyboardEvent} event キーイベント
         */
        toggleSearchInputState(event: KeyboardEvent): void {
            const {key} = event
            if (key === '/') {
                const input = document.getElementById('search')
                if (input) {
                    setTimeout(() => {
                        input.focus()
                    }, 0)
                }
            }
        },
        /**
         * enterで処理実行
         * @param {KeyboardEvent} event キーイベント
         */
        enter(event: KeyboardEvent): void {
            if (event.key === 'Enter') {
                (this as any).searchBlog()
                const input = document.getElementById('search')
                if (input) {
                    input.blur()
                }
            }
        },
        /**
         * 記事検索
         */
        searchBlog(): void {
            console.log('search')
        },
        /**
         * 詳細ページに遷移
         * @param {string} id 記事ID
         * @param {string} category 記事カテゴリ
         */
        detail(id: string, category: string): void {
            this.$router.push(`/blog/${category}/${id}/`)
        },
        /**
         *　カテゴリごとの記事ページに遷移
         * @param {string} category 記事カテゴリ
         */
        more(category: string) {
            this.$router.push(`/blog/${category}/`)
        }
    },
    head() {
        return {
            title: 'ブログ | RyoTa.',
            meta: [
                { hid: 'og:title', property: 'og:title', content: 'ブログ | RyoTa.' },
            ]
        }
    }
})
</script>

<style lang="scss" scoped>
.blog-container {
    width: 60vw;
    max-width: 950px;
    box-sizing: border-box;
    margin: 0 auto;
    padding-top: 64px;
    .search-container {
        // TODO
        display: none;
        text-align: right;
        position: relative;
        margin-bottom: 20px;
        #search {
            @apply dark:bg-gray-600 dark:text-white;
            width: 250px;
            height: 50px;
            border-radius: 25px;
            box-sizing: border-box;
            padding: 0 20px;
            padding-right: 50px;
            font-size: 13px;
            background: #F4F7F8;
            // border: solid 1px #bbbbbb00;
            transition: width .3s; 
            &:focus {
                outline: none;
                // border: solid 1px #bbbbbb;
                width: 100%;
            }
        }
        .icon-container {
            width: 40px;
            height: 40px;
            position: absolute;
            right: 5px;
            top: 5px;
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
            .icon {
                @apply dark:text-white;
                width: 15px;
                height: 15px;
            }
            &:hover {
                cursor: pointer;
            }
        }
    }
    @screen lg {
        width: 80vw;
    }
    @screen sm {
        width: 90vw;
        padding-bottom: 80px;
        .search-container {
            #search {
                height: 40px;
                width: 100%;
            }
            .icon-container {
                height: 30px;
                width: 30px;
            }
        }
    }
}
</style>
