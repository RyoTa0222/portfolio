<template>
    <section class="content" v-if="ctfData.length > 0">
        <h2 v-show="title">{{title}}</h2>
        <ul>
            <li
            v-for="item in ctfData"
            class="block"
            :class="{completed: item.fields.completed}"
            :key="item.sys.id">
                {{item.fields.content}}
            </li>
        </ul>
    </section>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
    props: ['ctfData', 'title']
})
</script>

<style lang="scss" scoped>
.content {
    @apply h-screen w-screen m-auto box-border;
    scroll-snap-align: start;
    max-width: 1280px;
    padding: 10vh 30px;
    h2 {
        @apply font-bold text-3xl mt-8 sm:mt-2 dark:text-white;
    }
    ul {
        @apply mt-8 leading-8 sm:mt-2;
        li {
            @apply relative pl-3 dark:text-white;
            z-index: 0;
            &.completed {
                @apply line-through;
            }
            &::after {
                content: '';
                @apply absolute inline-block;
                top: 14px;
                left: -3px;
                width: 5px;
                height: 5px;
                background: linear-gradient(135deg, #38e459, #4d9cff);
            }
        }
    }
}
</style>
