import Vue from 'vue'
import {DateTime} from 'luxon'

export default Vue.extend({
    filters: {
        filterDate(date: null | undefined |string) {
            if (date) {
                return DateTime.fromISO(date).toFormat('yyyy/MM/dd')
            } else {
                return '--/--/--'
            }
        }
    }
})
