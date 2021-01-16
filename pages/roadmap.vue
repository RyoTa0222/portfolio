<template>
    <div class="roadmap-container" :style="`height: ${screenHeight}px !important;`">
        <roadmap-section
        title="開発予定"
        :ctfData="getRoadmapStateData('schedule')"
        :screenHeight="screenHeight"
        class="schedule"
        id="schedule" />
        <roadmap-section
        title="開発中"
        :ctfData="getRoadmapStateData('develop')"
        :screenHeight="screenHeight"
        class="develop"
        id="develop" />
        <roadmap-section
        title="反映済み"
        :ctfData="getRoadmapStateData('merge')"
        :screenHeight="screenHeight"
        class="merge"
        id="merge" />
        <transition name="fade">
            <div class="illust-container schedule" v-if="currentSection === 'schedule'">
                <img src="@/assets/images/roadmap/schedule/bg.png" alt="背景" class="bg">
                <img src="@/assets/images/roadmap/tree.png" alt="木" class="tree">
                <img src="@/assets/images/roadmap/schedule/person.png" alt="人" class="person">
            </div>
        </transition>
        <transition name="fade">
            <div class="illust-container develop" v-if="currentSection === 'develop'">
                <img src="@/assets/images/roadmap/develop/bg.png" alt="背景" class="bg">
                <img src="@/assets/images/roadmap/tree.png" alt="木" class="tree">
                <img src="@/assets/images/roadmap/develop/person.png" alt="人" class="person">
            </div>
        </transition>
        <transition name="fade">
            <div class="illust-container merge" v-if="currentSection === 'merge'">
                <img src="@/assets/images/roadmap/merge/bg.png" alt="背景" class="bg">
                <img src="@/assets/images/roadmap/tree.png" alt="木" class="tree">
                <img src="@/assets/images/roadmap/merge/person.png" alt="人" class="person">
            </div>
        </transition>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import {CtfContentType, CtfContentItem, RoadmapState} from '~/types/type'
import RoadmapSection from '~/components/RoadmapSection.vue'
import { DateTime } from 'luxon'
import createClient from '~/plugins/contentful'
import screenHeight from '~/mixins/screenHeight'

const client = createClient()

type Field = {
    content: string,
    completed: boolean,
    state: RoadmapState[]
}

export default Vue.extend({
    // screenWidth, screenHeight
    mixins: [screenHeight],
    components: {
        RoadmapSection
    },
    data: () => {
        return {
            ctfData: null as CtfContentItem[] | null,
            currentSection: 'schedule' as RoadmapState
        }
    },
    async asyncData({params}) {
        const entries = await client.getEntries({
            content_type: 'roadmap'
        })
        return {
            ctfData: entries.items
        }
    },
    mounted() {
        if (process.client) {
            const ele = document.getElementsByClassName('roadmap-container')
            // window.addEventListener('load', this.watchDisplayElement)
            if (ele) {
                ele[0].addEventListener('scroll', this.watchDisplayElement)
            }
        }
    },
    beforeDestroy() {
        if (process.client) {
            // window.removeEventListener('load', this.watchDisplayElement)
            const ele = document.getElementsByClassName('roadmap-container')
            if (ele) {
                ele[0].removeEventListener('scroll', this.watchDisplayElement)
            }
        }
    },
    methods: {
        /**
         * 表示するデータをフィルタリングする
         * @param {RoadmapState} state ロードマップのステート
         * @return {CtfContentItem[]} 引数のステートに一致するデータを返す 
         */
        getRoadmapStateData(state: RoadmapState): CtfContentItem[]  {
            if (this.ctfData && this.ctfData.length > 0) {
                let filter
                // データをフィルタリングする
                filter = this.ctfData.filter((item: CtfContentItem) => {
                    return (item.fields as Field).state.includes(state)
                })
                // 完了かつ、１ヶ月経っていた場合、表示しない
                filter = this.filterDisplayData(filter)
                return filter
            }
            return []
        },
        /**
         * 完了かつ、１ヶ月経っているデータをフィルタリング
         * @param {CtfContentItem[]} filter ステートでフィルタリングしたデータ
         * @return {CtfContentItem[]} 完了かつ、１ヶ月経っているデータをフィルタリングしたデータ
         */
        filterDisplayData(data: CtfContentItem[]): CtfContentItem[] {
            const filter: CtfContentItem[] = []
            if (data.length > 0) {
                data.map(item => {
                    // 完了かどうか
                    const completed = (item.fields as {completed: boolean}).completed
                    // 完了でなければ追加
                    if (!completed) {
                        filter.push(item)
                    } else {
                        // 完了で直近１ヶ月以内なら表示
                        const updateDate = DateTime.fromISO(item.sys.updatedAt)
                        const now = DateTime.local()
                        if (now < updateDate.plus({months: 1})) {
                            filter.push(item)
                        }
                    }
                })
            }
            return filter
        },
        /**
         * どのセクションを画面に表示するか監視
         */
        watchDisplayElement() {
            // スクロールいちを取得
            const scrollTop = window.pageYOffset
            const scrollBottom = scrollTop + window.innerHeight
            // 要素が表示領域にいるかどうか
            const _isDisplay = (element: HTMLElement | null): boolean => {
                if (element) {
                    const rect = element.getBoundingClientRect()
                    const targetScrollTop = window.pageYOffset || document.documentElement.scrollTop
                    let targetTop = rect.top + scrollTop
                    let targetBottom = targetTop + element.clientHeight
                    if (targetBottom > scrollTop && targetBottom <= scrollBottom) {
                        return true
                    }
                }
                return false
            }
            // 「開発予定」にいるかどうか
            const schedule = document.getElementById('schedule')
            const develop = document.getElementById('develop')
            const merge = document.getElementById('merge')
            if (_isDisplay(schedule)) {
                this.currentSection = 'schedule'
            }
            if (_isDisplay(develop)) {
                this.currentSection = 'develop'
            }
            if (_isDisplay(merge)) {
                this.currentSection = 'merge'
            }
        }
    },
    head() {
        return {
            title: 'ロードマップ | RyoTa.',
            meta: [
                { hid: 'og:title', property: 'og:title', content: 'ロードマップ | RyoTa.' },
            ]
        }
    }
})
</script>

<style lang="scss" scoped>
.roadmap-container {
    scroll-snap-type: y mandatory;
    @apply overflow-scroll p-0;
    -ms-overflow-style: none;    /* IE, Edge 対応 */
    scrollbar-width: none;       /* Firefox 対応 */
    &::-webkit-scrollbar {  /* Chrome, Safari 対応 */
        display:none;
    }
    .illust-container {
        @apply fixed;
        right: 50px;
        bottom: 50px;
        width: 450px;
        height: 450px;
        @screen sm {
            transform: scale(0.5);
            transform-origin: right;
            bottom: 0;
            right: 0;
        }
        .tree {
            position: absolute;
            left: 0;
            bottom: 95px;
            height: 55%;
        }
        .bg {
            width: 100%;
            height: 100%;
            position: absolute;
            top: 30px;
            left: 0;
        }
        .person {
            width: 100%;
            height: 50%;
            position: absolute;
            object-fit: contain;
            bottom: 90px;
            left: 0;
        }
    }
}
</style>
