<template>
    <section class="content" v-if="ctfData.length > 0">
        <h2 v-if="title">{{title}}</h2>
        <ul class="mt-8 leading-8">
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
    padding: 10vh 0;
    h2 {
        @apply font-bold text-3xl mt-8;
    }
    ul {
        li {
            &.completed {
                @apply line-through;
            }
        }
    }
}
</style>
