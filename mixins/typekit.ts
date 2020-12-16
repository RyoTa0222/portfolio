import Vue from 'vue'
declare var Typekit: any

export default Vue.extend({
    mounted() {
        this.$nextTick(() => {
            Typekit.load({
                async: true
            })
        })
    }
})
