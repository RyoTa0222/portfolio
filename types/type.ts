export type PageName = 'TOP' | 'PORTFOLIO' | 'ROADMAP' | 'BLOG'

export type PagePath = '/' | '/portfolio' | '/roadmap' | '/blog'

export type PageType = {
    name: PageName,
    path: PagePath,
    icon: String
}

export type CtfContentType = 'roadmap'

export type Mode = 'light' | 'dark'

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
