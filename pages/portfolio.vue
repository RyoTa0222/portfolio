<template>
    <div class="portfolio-container" :style="`min-height: ${screenHeight}px !important;`">
        <scroll class="scroll-component"/>
        <div
        class="top-container"
        :style="`height: ${screenHeight}px !important;`"
        >
            <transition name="fast-fade" mode="out-in">
                <template v-if="selectGenre === 'year'">
                    <portfolio-title
                    key="year"
                    :selectGenre="selectGenre"
                    :dataList="{year, category}"
                    @setGenre="setGenre"
                    />
                </template>
                <template v-else>
                    <div key="category"> 
                        <portfolio-title
                        :selectGenre="selectGenre"
                        :dataList="{year, category}"
                        @setGenre="setGenre"
                        />
                        <client-only>
                            <div v-if="selectGenre !== 'year'" class="flex justify-center">
                                <template v-if="skills.length > 0">
                                    <span
                                    v-for="skill in skills"
                                    :key="skill.fields.id"
                                    class="icon-container"
                                    @click="setCategory(skill.fields)">
                                        <tooltip
                                        class="icon-wrapper"
                                        bottom
                                        :text="skill.fields.name"
                                        @clickEvent="setCategory(skill.fields)">
                                            <template v-slot:content>
                                                <img
                                                :src="require(`~/assets/images/skills/${skill.fields.id}.png`)"
                                                :alt="skill.fields.name"
                                                />
                                            </template>
                                        </tooltip>
                                    </span>
                                </template>
                            </div>
                        </client-only>
                    </div>
                </template>
            </transition>
        </div>
        <template v-if="filterContents.length > 0">
            <div
            v-for="content in filterContents"
            :key="content.sys.id"
            class="contents-container"
            :style="`height: ${screenHeight}px !important;`">
                <div
                v-if="['lg', 'xl', '2xl', '3xl'].includes($breakpoint.name)"
                class="screen">
                    <img src="~/assets/images/portfolio/sp.png" alt="sp" />
                    <div class="iframe-container">
                        <iframe :src="content.fields.url" width="520" />
                    </div>
                </div>
                <div class="text-container">
                    <h2>{{content.fields.title}}</h2>
                    <p>{{content.fields.description}}</p>
                    <span
                    v-for="skill in content.fields.skills"
                    class="icon-container"
                    :key="`${content.sys.id}-${skill.fields.id}`">
                        <tooltip
                        class="icon-wrapper"
                        bottom
                        :text="skill.fields.name"
                        @clickEvent="setCategory(skill.fields)">
                            <template v-slot:content>
                                <img
                                :src="require(`~/assets/images/skills/${skill.fields.id}.png`)"
                                :alt="skill.fields.name"
                                />
                            </template>
                        </tooltip>
                    </span>
                    <span v-if="content.fields.github" class="icon-container github">
                        <tooltip
                        class="icon-wrapper"
                        bottom
                        text="gitHub"
                        @clickEvent="github(content.fields.github)">
                            <template v-slot:content>
                                <client-only>
                                    <template>
                                        <img
                                        src="~/assets/images/portfolio/github-dark.png"
                                        alt="github"
                                        v-if="theme === 'dark'"/>
                                        <img
                                        src="~/assets/images/portfolio/github-light.png"
                                        alt="github"
                                        v-if="theme === 'light'"/>
                                    </template>
                                </client-only>
                            </template>
                        </tooltip>
                    </span>
                </div>
            </div>
        </template>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import {Theme} from '~/types/type'
import screenHeight from '~/mixins/screenHeight'
import {DateTime} from 'luxon'
import createClient from '~/plugins/contentful'
import {Genre, Skill, CtfPortfolio} from '~/types/type'
import {Entry} from 'contentful'
import PortfolioTitle from '~/components/PortfolioTitle.vue'
import Scroll from '~/components/Scroll.vue'
import Tooltip from '~/components/Tooltip.vue'
// import sal from 'sal.js'

const client = createClient()

type LinkedSkill = {
    sys: {
        type: string,
        linkType: string,
        id: string
    }
}

export default Vue.extend({
    // screenWidth, screenHeight
    mixins: [screenHeight],
    components: {
        PortfolioTitle,
        Scroll,
        Tooltip
    },
    data: () => {
        return {
            year: DateTime.local().toFormat('yyyy') as string,
            category: '' as string,
            theme: 'light' as Theme
        }
    },
    async asyncData({params}) {
        const s_entries = await client.getEntries({
            content_type: 'skillSet'
        })
        const p_entries = await client.getEntries({
            content_type: 'portfolio'
        })
        return {
            skills: s_entries.items,
            contents: p_entries.items
        }
    },
    created() {
        const skill = this.getSelectedSkill()
        if (skill) {
            this.category = skill.fields.name
        }
    },
    mounted() {
        if (process.client) {       
            const container = document.getElementById('container')
            container?.addEventListener('changeTheme', this.setTheme)
        }
    },
    beforeDestroy() {
        if (process.client) {
            const container = document.getElementById('container')
            container?.addEventListener('changeTheme', this.setTheme)
        }
    },
    methods: {
        /**
         * ジャンルの設定
         * @param {Genre} genre ジャンル
         */
        setGenre(genre: Genre) {
            this.$router.push(`/portfolio/?genre=${genre}`)
        },
        /**
         * カテゴリの設定
         * @param {Genre} genre ジャンル
         */
        setCategory(skill: Skill) {
            this.category = skill.name
            this.$router.push(`/portfolio/?genre=category&id=${skill.id}`)
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            })
        },
        getSelectedSkill(): Entry<Skill> | null {
            const skills = (this as unknown as {skills: Entry<Skill>[]}).skills
            if (skills) {
                if (this.$route.query.id) {
                    const filter = skills.filter(item => item.fields.id === this.$route.query.id)
                    if (filter.length > 0) {
                        return filter[0]
                    }
                }
                return skills[0]
            }
            return null
        },
        github(url: string) {
            if (process.client) {
                window.open(url, '_blank', url)
            }
        },
        setTheme() {
            this.theme = (this as any).$theme.getTheme()
        }
    },
    computed: {
        selectGenre(): Genre {
            const genre: Genre | undefined = (this.$route.query as {genre: Genre}).genre
            if (genre) {
                return genre
            }
            return 'year'
        },
        filterContents(): Entry<CtfPortfolio<LinkedSkill>>[] {
            const contents = (this as unknown as {contents: Entry<CtfPortfolio<LinkedSkill>>[]}).contents
            if (contents.length > 0) {
                const genre: Genre | undefined = (this.$route.query as {genre: Genre}).genre
                // 言語の場合
                if (genre) {
                    const selectedSkill = this.getSelectedSkill()
                    // 選択されたスキルがあればそれに一致するコンテンツを返す
                    if (selectedSkill) {
                        const id = selectedSkill.sys.id
                        const filter = contents.filter(item => {
                            const skills = item.fields.skills
                            return skills.some(_item => _item.sys.id === id)
                        })
                        return filter
                    }
                } else {
                    // 年ごとの場合
                    const filter = contents.filter(item => item.fields.created_year === this.year)
                    return filter
                }
            }
            return []
        }
    },
    head() {
        return {
            title: 'ポートフォリオ | RyoTa.',
            meta: [
                { hid: 'og:title', property: 'og:title', content: 'ポートフォリオ | RyoTa.' },
            ]
        }
    }
})
</script>

<style lang="scss" scoped>
.portfolio-container {
    .scroll-component {
        @apply fixed;
        bottom: 10px;
        left: 10px;
        @screen sm {
            transform: scale(0.8);
            transform-origin: left bottom;
        }
    }
    .top-container {
        width: 100%;
        height: 100%;
        @apply flex justify-center items-center flex-col;
        .top-icon-container {

        }
    }
    .contents-container {
        @apply flex;
        .screen {
            @apply flex justify-center items-center relative;
            width: 40%;
            img {
                height: 700px;
            }
            .iframe-container {
                @apply absolute;
                height: 525px;
                width: 265px;
                top: 50%;
                left: 50%;
                transform: translate(-66%, -63%) scale(0.6);
            }
            iframe {
                width: 160%;
                height: 160%;
                border-radius: 20px;
                html {
                    overflow-y: scroll;
                    -ms-overflow-style: none;    /* IE, Edge 対応 */
                    scrollbar-width: none;       /* Firefox 対応 */
                    &::-webkit-scrollbar {  /* Chrome, Safari 対応 */
                        display:none;
                    }
                }
            }
        }
        .text-container {
            width: 60%;
            box-sizing: border-box;
            padding: 64px;
            padding-top: 150px;
            @apply text-black dark:text-white md:w-full;
            @screen sm {
                padding: 70px 20px 100px;
            }
            h2 {
                font-size: 30px;
                font-weight: bold;
                @apply mb-8 sm:text-2xl sm:mt-4 sm:mb-4;
            }
            p {
                line-height: 2.5rem;
                @apply sm:text-sm sm:leading-8;
            }
        }
    }
}
.icon-container {
    width: 50px;
    height: 50px;
    display: inline-block;
    box-sizing: border-box;
    @apply m-2 ml-0 mr-3 mt-8 cursor-pointer md:w-10 md:h-10;
    .icon-wrapper {
        @apply w-full h-full;
        display: inline-block;
    }
    img {
        @apply inline-block w-full h-full;
    }
    &.github {
        margin-left: 30px;
        position: relative;
        width: 90px;
        padding-left: 40px;
        @apply border-black border-l dark:border-white;
        @screen md {
            width: 71px;
            padding-left: 30px;
            margin-left: 20px;
        }
    }
}
</style>

<style lang="scss">
/* @import "../node_modules/sal.js/dist/sal.css"; */
</style>
