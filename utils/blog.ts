import {CtfBlogCategoryItem, CtfBlog} from '../types/type'
import {ContentfulCollection, EntryCollection} from 'contentful'
import createClient from '../plugins/contentful'

const client = createClient()

// ブログカテゴリのデータの取得
export const getBlogCategory = async (): Promise<ContentfulCollection<CtfBlogCategoryItem>> => {
    return await client.getEntries({
        content_type: 'blogCategory',
        select: 'sys.id,fields',
        order: 'fields.priority'
    })
}

// 最新の記事
export const getLatestBlog = async (limit?: number): Promise<EntryCollection<CtfBlog>> => {
    type Obj = {
        content_type: string,
        limit?: number,
        order: string,
    }
    let obj: Obj = {
        content_type: 'blog',
        order: '-sys.updatedAt',
    }
    if (limit) {
        obj = {
            content_type: 'blog',
            limit,
            order: '-sys.updatedAt',
        }
    }
    return await client.getEntries(obj)
}

// カテゴリごとの記事
export const getBlogPerCategory = async (categoryId: string, limit?: number): Promise<EntryCollection<CtfBlog>> => {
    type Obj = {
        content_type: string,
        limit?: number,
        order: string,
        'fields.category.sys.contentType.sys.id': string,
        'fields.category.fields.categoryId': string
    }
    let obj: Obj = {
        content_type: 'blog',
        order: '-sys.updatedAt',
        'fields.category.sys.contentType.sys.id': 'blogCategory',
        'fields.category.fields.categoryId': categoryId
    }
    if (limit) {
        obj = {
            content_type: 'blog',
            limit,
            order: '-sys.updatedAt',
            'fields.category.sys.contentType.sys.id': 'blogCategory',
            'fields.category.fields.categoryId': categoryId
        }
    }
    return await client.getEntries(obj)
}

// 特定の記事
export const getBlog = async (blogId: string) => {
    return await client.getEntries({
        content_type: 'blog',
        'fields.id': blogId
    })
}

// 全ての記事
export const getAllBlog = async () => {
    return await client.getEntries({
        content_type: 'blog'
    })
}