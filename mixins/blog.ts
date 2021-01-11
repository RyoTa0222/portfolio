import Vue from 'vue'
import {Entry, EntryCollection} from 'contentful'
import {CtfBlog} from '~/types/type'
import {DateTime} from 'luxon'

export default Vue.extend({
    methods: {
        /**
         * 画像のパスと名前を返す
         * @param {CtfBlog} item ブログデータ
         * @return {null | object} 画像データがあればパスと画像名を返す
         */
        getImagePath(item: Entry<CtfBlog>, blogList: null | EntryCollection<CtfBlog>): null | object {
            if (blogList) {
                const assets = blogList.includes?.Asset
                if (assets) {
                    for (const asset of assets) {
                        if (asset.sys.id === item.fields.thumbnail.sys.id) {
                            const url = asset?.fields?.file?.url
                            const name = asset?.fields?.title
                            return {url, name}
                        }
                    }
                }
            }
            return null
        },
        /**
         * 画像のパスと名前を返す
         * @param {CtfBlog} item ブログデータ
         * @return {null | object} 画像データがあればパスと画像名を返す
         */
        getCategory(item: null | Entry<CtfBlog>, blogList: null | EntryCollection<CtfBlog>): null | string {
            if (item && blogList) {
                const entries = blogList.includes?.Entry
                if (entries) {
                    for (const entry of entries) {
                        if (entry.sys.id === item.fields.category.sys.id) {
                            return entry.fields.categoryName
                        }
                    }
                }
            }
            return null
        },
        /**
         * カラーを返す
         * @return {null | string} 画像データがあればパスと画像名を返す
         */
        getColor(item: null | Entry<CtfBlog>, blogList: null | EntryCollection<CtfBlog>, latest?: unknown): null | string {
            if (item && blogList && latest === undefined) {
                const entries = blogList.includes?.Entry
                if (entries) {
                    for (const entry of entries) {
                        if (entry.sys.id === item.fields.category.sys.id) {
                            return `--color: ${entry.fields.color};`
                        }
                    }
                }
            }
            return '#00000000'
        },
        /**
         * 記事が更新されているかどうか
         * @param {CtfBlog} item ブログデータ
         * @return {boolean} trueなら更新がされたことがある
         */
        isUpdate(item: Entry<CtfBlog>): boolean {
            const {createdAt, updatedAt} = item.sys
            const filteredCreatedAt = DateTime.fromISO(createdAt)
            const filteredUpdatedAt = DateTime.fromISO(updatedAt)
            if (filteredUpdatedAt.diff(filteredCreatedAt, 'minutes').minutes > 1) {
                return true
            }
            return false
        },
    }
})
