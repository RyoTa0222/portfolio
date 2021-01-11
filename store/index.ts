import {getAccessorType, getterTree, mutationTree, actionTree} from 'typed-vuex'
import createClient from '~/plugins/contentful'
import {ContentfulCollection, EntryCollection} from 'contentful'
import {CtfBlogCategoryItem, CtfBlog, CtfArchive} from '~/types/type'
import {config} from '~/consts/config'
import {DateTime} from 'luxon'

const client = createClient()

interface StringKeyObject {
    // 今回はstring
    [categoryId: string]: unknown;
}

export const state = () => ({
    blogCategory: null as null | CtfBlogCategoryItem[],
    latestBlog: null as null | EntryCollection<CtfBlog>,
    monthlyArchive: null as null | ContentfulCollection<CtfArchive>[],
    blogByCategory: {} as StringKeyObject,
})

export type RootState = ReturnType<typeof state>

export const getters = getterTree(state, {
    blogCategory: state => state.blogCategory,
    monthlyArchive: state => state.monthlyArchive,
    latestBlog: state => state.latestBlog,
})

export const mutations = mutationTree(state, {
    setBlogCategory(state, data: CtfBlogCategoryItem[]) {
        state.blogCategory = data
    },
    setLatestBlog(state, data: EntryCollection<CtfBlog>) {
        state.latestBlog = data
    },
    setMonthlyArchive(state, data: ContentfulCollection<CtfArchive>[]) {
        state.monthlyArchive = data
    },
    setBlogByCategory(state, data: EntryCollection<CtfBlog>[]) {
        let obj: StringKeyObject = {}
        if (state.blogCategory && state.blogCategory.length > 0) {
            for (let i = 0; i < state.blogCategory.length; i++) {
                const categoryId = state.blogCategory[i].fields.categoryId
                const item = data[i]
                obj[categoryId] = item
            }
        }
        state.blogByCategory = obj
    },
})

export const actions = actionTree({state, getters, mutations}, {
    /**
     * ブログのカテゴリの取得
     */
    // async fetchBlogCategory({getters, commit}): Promise<void> {
    //     try {
    //         const entries: ContentfulCollection<CtfBlogCategoryItem> = await client.getEntries({
    //             content_type: 'blogCategory',
    //             select: 'sys.id,fields',
    //             order: 'fields.priority'
    //         })
    //         if (entries.items.length > 0) {
    //             commit('setBlogCategory', entries.items)
    //         }
    //     } catch (err) {
    //         console.error(err)
    //     }
    // },
    /**
     * ブログのアーカイブの取得
     */
    async fetchArchive({getters, commit}): Promise<void> {
        try {
            const from = DateTime.fromISO(config.blogStartAt)
            const range = getBlogPostRange(from, DateTime.local())
            let {year, month} = from
            const promiseArr = []
            for (let i = 0; i < range; i++) {
                year += Math.floor(i / from.month)
                month = month === 12 ? 1 : month++
                const entries: ContentfulCollection<CtfArchive> = await client.getEntries({
                    content_type: 'blog',
                    select: 'sys.id,fields',
                    'sys.updatedAt[gte]': `${year}-${setZeroPadding(month)}-01`,
                    'sys.updatedAt[lte]': `${year}-${setZeroPadding(month)}-${getLastDay(year, month)}`
                })
                promiseArr.push(entries)
            }
            if (promiseArr.length > 0) {
                Promise.all(promiseArr).then((entries) => {
                    commit('setMonthlyArchive', entries)
                })
            }
        } catch (err) {
            console.error(err)
        }
    },
    /**
     * ブログの記事一覧の取得
     */
    // fetchBlogList({getters, commit}): void {
    //     try {
    //         const promiseArr = []
    //         // 最新の記事
    //         const latestEntries: Promise<EntryCollection<CtfBlog>> = client.getEntries({
    //             content_type: 'blog',
    //             limit: 4,
    //             order: '-sys.updatedAt',
    //         })
    //         promiseArr.push(latestEntries)
    //         // カテゴリごとの記事
    //         if (getters.blogCategory && getters.blogCategory.length > 0) {
    //             for (const category of getters.blogCategory) {
    //                 const categoryEntries: Promise<EntryCollection<CtfBlog>> = client.getEntries({
    //                     content_type: 'blog',
    //                     limit: 4,
    //                     order: '-sys.updatedAt',
    //                     'fields.category.sys.contentType.sys.id': 'blogCategory',
    //                     'fields.category.fields.categoryId': category.fields.categoryId
    //                 })
    //                 promiseArr.push(categoryEntries)
    //             }
    //         }
    //         if (promiseArr.length > 0) {
    //             Promise.all(promiseArr).then((entries) => {
    //                 // 最新の記事の保存
    //                 commit('setLatestBlog', entries[0])
    //                 // カテゴリごとの記事の保存
    //                 commit('setBlogByCategory', entries.slice(1))
    //             })
    //         }

    //     } catch (err) {
    //         console.error(err)
    //     }
    // }
})

export const accessorType = getAccessorType({
    state,
    getters,
    mutations,
    actions,
    modules: {
        //
    }
})

/**
 * ブログを投稿し始めて今までの月数を返す
 * @param {DateTime} from ブログを始めた日付
 * @param {DateTime} to 現在の日付
 * @return {number} 月数を返す
 */
const getBlogPostRange = (from: DateTime, to: DateTime): number => {
    const {year: fromYear, month: fromMonth} = from
    const {year: toYear, month: toMonth} = to
    const diffYear = toYear - fromYear
    const diffMonth = toMonth - fromMonth
    return diffYear * 12 + diffMonth + 1
}
/**
 * 指定した月の日数を返す
 * @param {number} year 年
 * @param {number} month 月
 * @return {number} その月の日にち
 */
const getLastDay = (year: number, month: number): number => {
    const lastDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
    const isLeap = year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0)
    if (isLeap && month === 2) {
        return 29
    } else {
        return lastDays[month - 1]
    }
}
/**
 * ゼロパディング
 * @param {number} num 数値
 * @return {number} ゼロパディング後の数値
 */
const setZeroPadding = (num: number) => {
    return ('0' + String(num)).slice(-2)
}
