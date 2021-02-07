<template>
    <div class="blog-id-container line-numbers">
        <template v-if="breadCrumbList.length > 0">
            <bread-crumb :lists="breadCrumbList" class="bread-crumb" />
        </template>
        <main class="blog-container" v-if="entry && entry.fields">
            <h1 v-if="entry.fields.title">{{entry.fields.title}}</h1>
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
                <span
                v-if="entry.fields.category"
                :style="`--color: ${entry.fields.category.fields.color};`"
                class="category"
                >{{entry.fields.category.fields.categoryName}}</span>
                <div class="date-wrapper">
                    <span class="row text-right">作成日：{{entry.sys.createdAt | filterDate}}</span>
                    <span class="row text-right" v-show="isUpdate(entry)">更新日：{{entry.sys.updatedAt | filterDate}}</span>
                </div>
            </div>
            <article v-if="entry.fields.body" class="body-container" v-html="toHtmlString(entry.fields.body)" />
            <div class="tweet-share-btn-container">
                <button class="tweet-share-btn" @click="share">
                    <svg-container name="twitter" />
                    <span>シェア</span>
                </button>
            </div>
        </main>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { CtfBlog, CtfBlogCategoryItem, CtfFile } from '~/types/type'
import {Entry} from 'contentful'
import {getBlog} from '~/utils/blog'
import { documentToHtmlString } from '@contentful/rich-text-html-renderer'
import { Document, BLOCKS, INLINES } from '@contentful/rich-text-types'
import blog from '~/mixins/blog'
import filter from '~/mixins/filter'
import Prism from '~/plugins/prism'
import Loader from '~/components/Looder.vue'
import SvgContainer from '~/components/SvgContainer.vue'
import BreadCrumb from '~/components/BreadCrumb.vue'

export default Vue.extend({
    mixins: [blog, filter],
    transition: 'page-fade',
    components: {
        Loader,
        SvgContainer,
        BreadCrumb
    },
    data: () => {
        return {
            id: null as null | string,
        }
    },
    async asyncData ({ params, error, payload }) {
        try {
            if (payload) {
                return payload
            }
            else {
                const entry = await getBlog(params.id)
                if (entry) {
                    return { entry: entry.items[0], includes: entry.includes }
                }
            }
        } catch (err) {
            error({statusCode: 503, message: 'Blog not found'})
        }
    },
    mounted() {
        Prism.highlightAll()
    },
    computed: {
        blogCategory() {
            return this.$accessor.blogCategory
        },
        breadCrumbList() {
            if ((this as any).entry) {
                const category = (this as any).entry.fields.category as CtfBlogCategoryItem
                const name = category.fields.categoryName
                const path = category.fields.categoryId
                return [{name, path}]
            }
            return []
        }
    },
    methods: {
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
                            let context = node.content[0].value.slice(indexOfFirst)
                            context = context
                                .replace(/</g, '&lt;')
                                .replace(/>/g, '&gt;')
                            return `<div class="code prism"><div class="head-component"><div class="btn-wrapper"><span class="btn"></span><span class="btn"></span><span class="btn"></span></div></div><pre class="line-numbers language-${lang}"><code class="language-${lang}">${context}</pre></code></div>`
                        }
                        if (node.content) {
                            node.content.forEach((element: any) => {
                                if (element.value) {
                                    const arr = element.value.split('\n')
                                    const text = arr.map((_text: string) => {
                                        return `${_text}<br/>`
                                    })
                                    return `<p>${text}</p>`
                                }
                            })
                        }
                        // else return content as it is
                        return `<p>${next(node.content)}</p>`;
                    },
                    [BLOCKS.EMBEDDED_ASSET]: (node: any, next: any) => {
                        if (node.data &&
                        node.data.target &&
                        node.data.target.sys &&
                        node.data.target.sys.id) {
                            const id: string = node.data.target.sys.id
                            const assets = (this as any).includes.Asset
                            const asset: Entry<CtfFile> | undefined = assets.find((_asset: Entry<CtfFile>) => {
                                return (_asset?.sys?.id === id)
                            })
                            if (asset) {
                                return `<img src="${asset.fields.file.url}" alt="${asset.fields.file.url}" class="embedded-image" />`
                            }
                        }
                        return `<p></p>`
                    },
                    [BLOCKS.QUOTE]: (node: any, next: any) => {
                        return `<blockquote class="quote-container">${next(node.content)}</blockquote>`
                    },
                    [BLOCKS.EMBEDDED_ENTRY]: (node: any, next: any) => {
                        const blog: Entry<any> = node.data.target
                        if (blog) {
                            const title: string = blog.fields.title
                            const id: string = blog.fields.id
                            const category: string = this.$route.params.category
                            const description: string = blog.fields.description
                            const thumbnail: string = blog.fields.thumbnail.fields.file.url
                            return `
                            <a class="block-embedded-entry" href="${process.env.SITE_URL}/blog/${category}/${id}/">
                                <img src="https://${thumbnail}" alt="${title}" />
                                <div class="text-container">
                                    <span class="title">${title}</span>
                                    <span class="description">${description}</span>
                                </div>
                            </a>`
                        }
                        return `<div class="block-embedded-entry"></div>`
                    },
                    [INLINES.ENTRY_HYPERLINK]: (node: any, next: any) => {
                        const value: string = node.content[0].value
                        const id: string = node.data.target.sys.id
                        const category: string = this.$route.params.category
                        const entries: Entry<CtfBlog>[] = (this as any).includes.Entry
                        const entry = entries.find((_entry: Entry<CtfBlog>) => {
                            return (_entry?.sys?.id === id)
                        })
                        if (entry) {
                            return `<a href="${process.env.SITE_URL}/blog/${category}/${entry.fields.id}/">${value}</a>`
                        }
                        return `<a>${value}</a>`
                    },
                    [INLINES.ASSET_HYPERLINK]: (node: any, next: any) => {
                        const value: string = node.content[0].value
                        const id: string = node.data.target.sys.id
                        const assets: Entry<CtfFile>[] = (this as any).includes.Asset
                        const asset = assets.find((_asset: Entry<CtfFile>) => {
                            return (_asset?.sys?.id === id)
                        })
                        if (asset) {
                            return `<a href="${asset.fields.file.url}">${value}</a>`
                        }
                        return `<a>${value}</a>`
                    },
                    [INLINES.EMBEDDED_ENTRY]: (node: any, next: any) => {
                        const blog: Entry<CtfBlog> = node.data.target
                        const category: string = this.$route.params.category
                        if (blog) {
                            return `<a class="inline-embedded-entry" href="${process.env.SITE_URL}/blog/${category}/${blog.fields.id}/">${blog.fields.title}</a>`
                        }
                        return `<a></a>`
                    }
                }
            }
            return documentToHtmlString(richTextDocument, options)
        },
        /**
         * twitterに共有
         */
        share() {
            const url = `https://twitter.com/intent/tweet?text=${(this as any).entry.fields.title}&url=${process.env.SITE_URL}blog/${this.$route.params.id}/`
            console.log(url)
            location.href = url
        }
    },
    head() {
        const category: string = this.$route.params.category ?? ''
        return {
            titleTemplate: '',
            title: `${(this as any).entry?.fields?.title} | RyoTa.`,
            meta: [
                { hid: 'description', name: 'description', content: (this as any).entry?.fields?.description },
                { hid: 'og:title', property: 'og:title', content: `${(this as any).entry?.fields?.title} | RyoTa.` },
                {
                    hid: 'og:description',
                    property: 'og:description',
                    content: (this as any).entry?.fields?.description
                },
                { hid: 'og:url', property: 'og:url', content: `${process.env.SITE_URL}/blog/${category}/${this.$route.params.id}/`},
                {
                    hid: 'og:image',
                    property: 'og:image',
                    content: `${'https:' + ((this as any).entry as any)?.fields?.thumbnail?.fields?.file?.url}`
                },
                { hid: 'twitter:image',
                name: 'twitter:image',
                content: `${'https:' + ((this as any).entry as any)?.fields?.thumbnail?.fields?.file?.url}`},
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
    padding-bottom: 100px;
    .bread-crumb {
        margin-top: 20px;
    }
    .blog-container {
        margin-top: 30px;
        h1 {
            @apply dark:text-white;
            font-size: 1.5rem;
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
            .category {
                font-size: 10px;
                display: inline-block;
                color: white;
                background: var(--color);
                padding: 2px 5px;
                word-break: keep-all;
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
        .tweet-share-btn-container {
            display: flex;
            justify-content: flex-end;
            .tweet-share-btn {
                color: #00acee;
                display: flex;
                justify-content: space-around;
                align-items: center;
                width: 110px;
                border: solid 1px #00acee;
                border-radius: 30px;
                padding: 2px 10px;
                transition: transform 0.3s;
                svg {
                    width: 25px;
                    fill: #00acee;
                }
                span {
                    width: 50px;
                }
                &:focus {
                    outline: none;
                }
                &:active {
                    transform: scale(0.9);
                }
            }
        }
    }
    @screen sm {
        width: 90vw;
        padding-top: 30px;
        padding-bottom: 150px;
    }
}
</style>

<style lang="scss">
.body-container {
    margin-top: 50px;
    padding-bottom: 30px;
    z-index: -99;
    @screen sm {
        padding-bottom: 30px;
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
        margin-top: 70px;
        margin-bottom: 20px;
        @screen sm {
            font-size: 1.4rem;
            margin-top: 30px;
        }
    }
    h3 {
        font-size: 1.375rem;
        font-weight: bold;
        margin-top: 70px;
        margin-bottom: 20px;
        @screen sm {
            font-size: 1.3rem;
        }
    }
    h4 {
        font-size: 1.25rem;
        font-weight: bold;
        margin-top: 50px;
        margin-bottom: 20px;
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
    img.embedded-image {
        margin: 50px 0;
    }
    p {
        font-size: 1rem;
        margin-bottom: 25px;
        line-height: 2rem;
        @screen sm {
            font-size: 0.8rem;
            line-height: 1.6rem;
        }
    }
    .inline-embedded-entry {
        display: inline-block;
        padding: 0 8px;
        margin-right: 4px;
        border: solid 1px #ddd;
        border-radius: 5px;
        font-size: 15px;
        max-width: 80%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        text-decoration: none;
        @apply text-black dark:text-white dark:border-gray-400;
        &:hover {
            cursor: pointer;
        }
        @screen sm {
            font-size: 12px;
        }
    }
    .block-embedded-entry {
        margin: 20px 0;
        display: flex;
        box-sizing: border-box;
        padding: 20px;
        border: solid 1px #ddd;
        border-radius: 10px;
        text-decoration: none;
        @apply text-black dark:text-white dark:border-gray-400;
        .text-container {
            span {
                display: block;
                width: 100%;
                &.title {
                    font-weight: bold;
                    margin-bottom: 5px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }
                &.description {
                    font-size: 14px;
                    display: -webkit-box;
                    -webkit-box-orient: vertical;
                    -webkit-line-clamp: 3;
                    overflow: hidden;
                }
            }
        }
        img {
            width: 100px;
            object-fit: contain;
            object-position: top;
            margin-right: 10px;
        }
        &:hover {
            cursor: pointer;
        }
        @screen sm {
            flex-flow: column;
            img {
                width: 100%;
                margin-right: 0px;
                margin-bottom: 10px;
            }
        }
    }
    .quote-container {
        box-sizing: border-box;
        padding-left: 20px;
        border-left: 5px solid #ddd;
        margin: 1.5rem 0;
        color: #777;
    }
    code {
        display: inline-block;
        padding: 1px 8px;
        border-radius: 4px;
        margin: 1px 0;
        height: 28px;
        @apply bg-gray-100 dark:bg-gray-600;
        @screen sm {
            height: 25px;
        }
    }
    .code {
        border-radius: 10px;
        overflow: hidden;
        margin: 50px 0;
        pre {
            scrollbar-track-color: #272822;
            margin: 0;
            border: none;
            border-radius: 0;
            position: inherit;
            overflow-x: scroll;
            border-radius: 0px 0px 10px 10px / 0px 0px 10px 10px;
            -webkit-border-radius: 0px 0px 10px 10px / 0px 0px 10px 10px;
            &::-webkit-scrollbar-track {
                background: #272822;
            }
            .token.operator {
                background: transparent;
            }
            padding-top: 20px;
            code {
                background: transparent;
                height: inherit;
                @screen sm {
                    font-size: 12px;
                    .line-numbers-rows {
                        margin-top: 2px;
                        span {
                            // line-height: 19px;
                        }
                    }
                }
            }
        }
        .code-toolbar {
            position: relative;
            .toolbar {
                opacity: 1 !important;
                z-index: 100;
                .toolbar-item {
                    button {
                        box-shadow: none;
                        padding: 5px 10px;
                        transition: color 0.3s;
                        &:hover {
                            color: white;
                        }
                        &:active {
                            outline: none;
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
