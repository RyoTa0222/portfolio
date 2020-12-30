import Vue from 'vue'

export default Vue.extend({
    data: () => {
        return {
            screenWidth: 0 as number,
            screenHeight: 0 as number
        }
    },
    mounted() {
        if (process.client) {
            // スクリーンの幅と高さを取得
            this.getScreenSize()
            window.addEventListener('resize', this.getScreenSize)
        }
    },
    beforeDestroy() {
        if (process.client) {
            // 画面サイズ取得のイベントを停止
            window.removeEventListener('resize', this.getScreenSize)
        }
    },
    methods: {
        /**
         * 画面の幅、高さを取得
         */
        getScreenSize() {
            this.screenWidth = window.innerWidth
            this.screenHeight = window.innerHeight
            console.log(this.screenHeight)
        },
    }
})
