<template>
    <div class="roadmap-container">
        <roadmap-section
        title="開発予定"
        :ctfData="getRoadmapStateData('schedule')"
        class="schedule" />
        <roadmap-section
        title="開発中"
        :ctfData="getRoadmapStateData('develop')"
        class="develop" />
        <roadmap-section
        title="反映済み"
        :ctfData="getRoadmapStateData('merge')"
        class="merge" />
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import {CtfContentType, CtfContentItem, RoadmapState} from '~/types/type'
import RoadmapSection from '~/components/RoadmapSection.vue'
import { DateTime } from 'luxon'
import createClient from '~/plugins/contentful'

const client = createClient()

type Field = {
    content: string,
    completed: boolean,
    state: RoadmapState[]
}

export default Vue.extend({
    components: {
        RoadmapSection
    },
    data: () => {
        return {
            ctfData: null as CtfContentItem[] | null
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
        }
    }
})
</script>

<style lang="scss" scoped>
.roadmap-container {
    scroll-snap-type: y mandatory;
    @apply overflow-scroll h-screen p-0;
    -ms-overflow-style: none;    /* IE, Edge 対応 */
    scrollbar-width: none;       /* Firefox 対応 */
    &::-webkit-scrollbar {  /* Chrome, Safari 対応 */
        display:none;
    }
}
</style>
