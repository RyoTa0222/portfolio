import {Sys} from 'contentful'

export type PageName = 'TOP' | 'PORTFOLIO' | 'ROADMAP' | 'BLOG'

export type PagePath = '/' | '/portfolio' | '/roadmap' | '/blog'

export type PageType = {
    name: PageName,
    path: PagePath,
    icon: string
}

export type CtfContentType = 'roadmap'

export type Theme = 'light' | 'dark'

export type Status = 'pending' | 'success' | 'error'

export type RoadmapState = 'schedule' | 'develop' | 'merge'

export type CtfContentItem = {
    sys: CtfItemSys,
    fields: object
}

export type CtfItemSys = {
    space: CtfSys,
    id: string,
    type: string,
    createdAt: string,
    updatedAt: string,
    environment: CtfSys,
    revision: number,
    contentType: CtfSys,
    locale: string
}

export type CtfSys = {
    sys: {
        type: string,
        linkType: string,
        id: string
    }
}

export type CtfBlogCategoryItem = {
    fields: {
        categoryName: string,
        categoryId: string,
        color: string
    },
    sys: {
        id: string
    }
}

export interface CtfBlog {
    title: string,
    id: string,
    thumbnail: {
        sys: {
            type: string,
            linkType: string,
            id: string
        }
    },
    description: string,
    body: object,
    category: {
        sys: {
            type: string,
            linkType: string,
            id: string
        }
    }
}

export interface CtfArchive {
    sys: {
        id: string
    }
}

export interface CtfFile {
    title: string,
    file: {
        url: string,
        details: {
            size: number,
            image: {
                width: number,
                height: number
            }
        },
        fileName: string,
        contentType: string
    }
}
