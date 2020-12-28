<template>
    <footer class="absolute bottom-1.5 right-0 footer-container sm:left-0 xs:left-0">
        <p class="text-sm sm:text-xs xs:text-xs xs:text-center sm:text-center dark:text-white">&copy; RyoTa {{computeYear}}</p> 
    </footer>
</template>

<script lang="ts">
import Vue from 'vue'
import { DateTime } from 'luxon'

export default Vue.extend({
    computed: {
        computeYear() {
            // サイト公開時の年数
            const START_YEAR = '2020'
            // 表示するテキスト
            let dispText = START_YEAR
            // 現在の年数を取得
            const currentYear = DateTime.local().toFormat('yyyy')
            if (Number(START_YEAR) < Number(currentYear)) {
                dispText += ` - ${currentYear}`
            }
            return dispText
        }
    }
})
</script>

<style lang="scss" scoped>
.footer-container {
    margin: 0 5vw;
}
</style>
