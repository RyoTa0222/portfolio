<template>
    <div class="blog-id-container">
        <transition name="fade" mode="out-in">
            <div v-if="status === 'pending'" key="pending">
                <loader />
            </div>
            <div v-if="status === 'success'" key="success">
                <div class="blog-container" v-if="entry !== null">
                    <h1>{{entry.fields.title}}</h1>
                    <picture v-if="entry.fields.thumbnail">
                        <!-- WebP用画像 -->
                        <source
                        :srcset="`${entry.fields.thumbnail.fields.file.url}?w=600&h=300&fm=webp&fit=thumb&q=50`"
                        type="image/webp">
                        <!-- 従来画像 -->
                        <img
                        :src="`${entry.fields.thumbnail.fields.file.url}?w=600&h=300&fm=png&fl=png8&fit=thumb&q=50`"
                        :alt="entry.fields.thumbnail.fields.file.fileName"
                        />
                    </picture>
                    <div class="category-sys-container">
                        <div v-if="entry.fields.category" class="category-wrapper">
                            <span
                            :style="`--color: ${entry.fields.category.fields.color};`"
                            class="category"
                            >{{entry.fields.category.fields.categoryName}}</span>
                        </div>
                        <div class="date-wrapper">
                            <span class="row text-right">作成日：{{entry.sys.createdAt | filterDate}}</span>
                            <span class="row text-right" v-show="isUpdate(entry)">更新日：{{entry.sys.updatedAt | filterDate}}</span>
                        </div>
                    </div>
                    <div v-if="entry.fields.body" class="body-container" v-html="toHtmlString(entry.fields.body)" />
                </div>
            </div>
            <div v-if="status === 'error'" key="error">
                <p class="text-center pt-20 dark:text-white">データが取得できませんでした。</p>
            </div>
        </transition>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { CtfBlog, Status } from '~/types/type'
import {Entry} from 'contentful'
import createClient from '~/plugins/contentful'
import { documentToHtmlString } from '@contentful/rich-text-html-renderer'
import { Document, MARKS, BLOCKS } from '@contentful/rich-text-types'
import blog from '~/mixins/blog'
import filter from '~/mixins/filter'
import Prism from '~/plugins/prism'
import Loader from '~/components/Looder.vue'

const client = createClient()

export default Vue.extend({
    mixins: [blog, filter],
    components: {
        Loader
    },
    data: () => {
        return {
            id: null as null | string,
            entry: null as null | Entry<CtfBlog>,
            status: 'error' as Status
        }
    },
    async created() {
        this.id = this.$route.params.id
        // ブログ詳細データの取得
        await (this as any).getBlogData()
    },
    mounted() {
        // codeにハイライトを当てる
        const intervalId = setInterval(() => {
            Prism.highlightAll()
            if (this.status === 'success') {
                setTimeout(() => {
                    Prism.highlightAll()
                }, 2000);
                clearInterval(intervalId)
            }
        }, 100)
    },
    computed: {
        blogCategory() {
            return this.$accessor.blogCategory
        },
    },
    methods: {
        /**
         * ブログ詳細データを取得する
         */
        async getBlogData(): Promise<void> {
            this.status = 'pending'
            if (this.id) {
                try {
                    const entry: Entry<CtfBlog> = await client.getEntry(this.id)
                    this.entry = entry
                    this.status = 'success'
                } catch (err) {
                    console.error(err)
                    this.status = 'error'
                }
            }
        },
        /**
         * htmlに変換してデータを返す
         * @param {Document} richTextDocument contentfulから渡ってきたデータ
         */
        toHtmlString(richTextDocument: Document): string {
            const options = {
                renderNode: {
                    [BLOCKS.PARAGRAPH]: (node: any, next: any) => {
                        if (node.content.length === 1 && node.content[0]?.marks[0]?.type === 'code') {
                            let lang = 'js'
                            const searchTerm = '\n'
                            const indexOfFirst = node.content[0].value.indexOf(searchTerm)
                            lang = node.content[0].value.slice(0, indexOfFirst)
                            const context = node.content[0].value.slice(indexOfFirst)
                            return `<div class="code prism"><div class="head-component"><div class="btn-wrapper"><span class="btn"></span><span class="btn"></span><span class="btn"></span></div></div><pre class="line-numbers language-${lang}"><code class="language-${lang}">${context}</pre></code></div>`;
                        }
                        // else return content as it is
                        return `<p>${next(node.content)}</p>`;
                    },
                }
            }
            return documentToHtmlString(richTextDocument, options)
        }
    },
    head() {
        return {
            title: ` | ${this.entry?.fields.title ?? 'blog'}`,
            meta: [
                { hid: 'description', name: 'description', content: this.entry?.fields.description ?? 'RyoTaのポートフォリオサイトです。UXを意識したサイトの制作を意識しております。Twitterで発信をしておりますのでご気軽にフォローしてください！' },
                { hid: 'og:title', property: 'og:title', content: ` | ${this.entry?.fields.title ?? 'blog'}` },
                {
                    hid: 'og:description',
                    property: 'og:description',
                    content: this.entry?.fields.description ?? 'RyoTaのポートフォリオサイトです。UXを意識したサイトの制作を意識しております。Twitterで発信をしておりますのでご気軽にフォローしてください！'
                },
                {
                    hid: 'og:image',
                    property: 'og:image',
                    content: (this.entry as any)?.fields?.thumbnail?.fields?.file?.url ?? `${process.env.SITE_URL}/img/ogp.png`
                },
            ]
        }
    }
})
</script>

<style lang="scss" scoped>
.blog-id-container {
    width: 60vw;
    margin: auto;
    max-width: 600px;
    padding-top: 64px;
    .blog-container {
        margin-top: 50px;
        h1 {
            @apply dark:text-white;
            font-size: 1.3rem;
            font-weight: bold;
        }
        picture {
            width: 100%;
            display: inline-block;
            margin-top: 20px;
            overflow: hidden;
            source, img {
                margin: 0;
            }
        }
        .category-sys-container {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            margin: 10px 0;
            .category-wrapper {
                text-align: right;
                .category {
                    font-size: 10px;
                    display: inline-block;
                    color: white;
                    background: var(--color);
                    padding: 2px 5px;
                }
            }
            .date-wrapper {
                @apply dark:text-white;
                display: flex;
                flex-flow: column;
                font-size: 12px;
                .row {
                    margin-bottom: 5px;
                }
            }
        }
    }
    @screen sm {
        width: 90vw;
        padding-top: 30px;
    }
}
</style>

<style lang="scss">
.body-container {
    margin-top: 50px;
    padding-bottom: 50px;
    @screen sm {
        padding-bottom: 100px;
    }
    h1, h2, h3, h4, h5, h6, p, li {
        @apply dark:text-white;
        overflow-wrap: break-word;
        word-wrap: break-word;
        margin-bottom: 10px;
    }
    h1 {
        font-size: 1.875rem;
        font-weight: bold;
        margin-bottom: 25px;
        @screen sm {
            font-size: 1.5rem;
        }
    }
    h2 {
        font-size: 1.5625rem;
        font-weight: bold;
        margin-top: 60px;
        @screen sm {
            font-size: 1.4rem;
            margin-top: 30px;
        }
    }
    h3 {
        font-size: 1.375rem;
        font-weight: bold;
        @screen sm {
            font-size: 1.3rem;
        }
    }
    h4 {
        font-size: 1.25rem;
        font-weight: bold;
        @screen sm {
            font-size: 1.2rem;
        }
    }
    h5 {
        font-size: 1.125rem;
        font-weight: bold;
        @screen sm {
            font-size: 1.1rem;
        }
    }
    h6 {
        font-size: 1rem;
        font-weight: bold;
        @screen sm {
            font-size: 1rem;
        }
    }
    p {
        font-size: 1rem;
        margin-bottom: 25px;
        @screen sm {
            font-size: 0.8rem;
        }
    }
    .code {
        border-radius: 10px;
        overflow: hidden;
        margin: 50px 0;
        z-index: -999999;
        pre {
            overflow-x: scroll;
            scrollbar-track-color: #272822;
            margin: 0;
            border: none;
            z-index: -999999;
            &::-webkit-scrollbar-track {
                background: #272822;
            }
            .token.operator {
                background: transparent;
            }
            padding-top: 20px;
            code {
                z-index: -999999;
                @screen sm {
                    font-size: 12px;
                }
            }
        }
        .code-toolbar {
            z-index: -99999;
            .toolbar {
                opacity: 1 !important;
                .toolbar-item {
                    button {
                        box-shadow: none;
                        padding: 5px 10px;
                        transition: color 0.3s;
                        &:hover {
                            color: white;
                        }
                    }
                }
            }
        }
        .head-component {
            width: 100%;
            height: 40px;
            border-bottom: solid 1px #666;
            background: #272822;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            .btn-wrapper {
                padding-left: 20px;
                .btn {
                    width: 10px;
                    height: 10px;
                    border-radius: 50%;
                    display: inline-block;
                    background: #ef4444;
                    margin-right: 5px;
                    &:nth-child(1) {
                        background: #ef4444;
                    }
                    &:nth-child(2) {
                        background: #fbbf24;
                    }
                    &:nth-child(3) {
                        background: #4ade80;
                    }
                }
            }
        }
    }
    hr {
        margin: 20px 0;
    }
    a {
        @apply text-blue-400 dark:text-blue-300;
        text-decoration: underline;
    }
    ul {
        $UL_PADDING_LEFT: 20px;
        list-style-type: disc;
        padding-left: $UL_PADDING_LEFT;
        margin-bottom: 25px;
        box-sizing: border-box;
        li {
            p {
                margin-bottom: 10px;
            }
        }
    }
    ol {
        $OL_PADDING_LEFT: 20px;
        list-style-type: decimal;
        padding-left: $OL_PADDING_LEFT;
        margin-bottom: 25px;
        display: none;
        box-sizing: border-box;
        li {
            p {
                margin-bottom: 10px;
            }
        }
    }
}
</style>
