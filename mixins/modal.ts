import Vue from 'vue'

export default Vue.extend({
    methods: {
        /**
         * 親要素にモーダルを閉じるイベントを伝播させる
         */
        closeModal() {
            const modal = document.querySelector('.bg')
            modal?.classList.add('delete')
            setTimeout(() => {
                this.$emit('closeEvent')
            }, 900)
        },
        /**
         * 子要素からのイベントを受け取る
         * @param {string} eventName 子要素からきたイベント名
         */
        emitEvent(eventName: string) {
            switch(eventName) {
                case 'close':
                    this.closeModal()
                default:
                    return
            }
        }
    }
})
