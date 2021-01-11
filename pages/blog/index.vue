<template>
    <div class="blog-container">
        <transition name="fade" mode="out-in">
            <div v-if="status === 'pending'" key="pending">
                <loader />
            </div>
            <div v-else-if="status === 'success'" key="success">
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
                <template v-if="latestBlog">
                    <blog-list-per-theme
                    @detail="detail"
                    :blogList="latestBlog"
                    latest
                    >
                        <template v-slot:title>最新の記事</template>
                    </blog-list-per-theme>
                </template>
                <!-- カテゴリごとの記事 -->
                <template v-if="Object.keys(blogByCategory).length > 0 && blogCategory">
                    <template v-for="category in blogCategory">
                        <blog-list-per-theme
                        @detail="detail"
                        :key="category.sys.id"
                        :blogList="blogByCategory[category.fields.categoryId]"
                        v-if="blogByCategory[category.fields.categoryId].items.length > 0"
                        >
                            <template v-slot:title>{{category.fields.categoryName}}</template>
                        </blog-list-per-theme>
                    </template>
                </template>
            </div>
            <div v-if="status === 'error'" key="error">
                <p class="text-center pt-20 dark:text-white">データが取得できませんでした。</p>
            </div>
        </transition>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import {ContentfulCollection, EntryCollection} from 'contentful'
import createClient from '~/plugins/contentful'
import {CtfBlogCategoryItem, CtfBlog, CtfArchive} from '~/types/type'
import SvgContainer from '~/components/SvgContainer.vue'
import BlogListPerTheme from '~/components/BlogLitPerTheme.vue'
import Loader from '~/components/Looder.vue'

const client = createClient()

export default Vue.extend({
  components: { SvgContainer, BlogListPerTheme, Loader},
    data: () => {
        return {
            search: '' as string,
            status: 'pending'
        }
    },
    async created() {
        this.status = 'pending'
        try {
            // ブログのカテゴリをcontentfulから取得
            await (this as any).fetchBlogCategory()
            // アーカイブデータの取得
            // await this.$accessor.fetchArchive()
            // 記事データの取得
            await (this as any).fetchBlogList()
            this.status = 'success'
        } catch (err) {
            console.error(err)
            this.status = 'error'
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
    computed: {
        blogCategory() {
            return this.$accessor.blogCategory
        },
        latestBlog() {
            return this.$accessor.latestBlog
        },
        blogByCategory() {
            return this.$accessor.blogByCategory
        },
    },
    methods: {
        /**
         * ブログカテゴリのデータの取得
         */
        async fetchBlogCategory(): Promise<void> {
            try {
                const entries: ContentfulCollection<CtfBlogCategoryItem> = await client.getEntries({
                    content_type: 'blogCategory',
                    select: 'sys.id,fields',
                    order: 'fields.priority'
                })
                if (entries.items.length > 0) {
                    this.$accessor.setBlogCategory(entries.items)
                }
            } catch (err) {
                console.error(err)
            }
        },
        /**
         * ブログ一覧記事のデータの取得
         */
        async fetchBlogList(): Promise<void> {
            try {
                const promiseArr = []
                // 最新の記事
                const latestEntries: Promise<EntryCollection<CtfBlog>> = client.getEntries({
                    content_type: 'blog',
                    limit: 4,
                    order: '-sys.updatedAt',
                })
                promiseArr.push(latestEntries)
                // カテゴリごとの記事
                if (this.$accessor.blogCategory && this.$accessor.blogCategory.length > 0) {
                    for (const category of this.$accessor.blogCategory) {
                        const categoryEntries: Promise<EntryCollection<CtfBlog>> = client.getEntries({
                            content_type: 'blog',
                            limit: 4,
                            order: '-sys.updatedAt',
                            'fields.category.sys.contentType.sys.id': 'blogCategory',
                            'fields.category.fields.categoryId': category.fields.categoryId
                        })
                        promiseArr.push(categoryEntries)
                    }
                }
                if (promiseArr.length > 0) {
                    Promise.all(promiseArr).then((entries) => {
                        // 最新の記事の保存
                        this.$accessor.setLatestBlog(entries[0])
                        // カテゴリごとの記事の保存
                        this.$accessor.setBlogByCategory(entries.slice(1))
                    })
                }
            } catch (err) {
                console.error(err)
            }
        },
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
         */
        detail(id: string): void {
            this.$router.push(`/blog/${id}`)
        }
    },
    head() {
        return {
            title: ' | ブログ',
            meta: [
                { hid: 'og:title', property: 'og:title', content: 'RyoTa. | blog' },
            ]
        }
    }
})
</script>

<style lang="scss" scoped>
.blog-container {
    width: 60vw;
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
