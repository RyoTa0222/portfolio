<template>
    <section class="content" v-if="ctfData.length > 0" :style="`height: 100vh;`">
        <transition v-show="current === name" name="fade">
            <div class="wrapper">
                <span class="label">{{name}}</span>
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
            </div>
        </transition>
    </section>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
    props: ['ctfData', 'title', 'name', 'current']
})
</script>

<style lang="scss" scoped>
.content {
    @apply w-screen m-auto box-border relative;
    scroll-snap-align: start;
    max-width: 1280px;
    padding: 10vh 30px;
    padding-left: 100px;
    .wrapper {
        width: 100%;
        height: 100%;
    }
    h2 {
        @apply font-bold text-4xl mt-8 sm:mt-2 dark:text-white;
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
    .label {
        @apply absolute text-black dark:text-white font-futura;
        font-size: 200px;
        opacity: 0.2;
        bottom: 0;
        left: -100px;
    }
    @screen sm {
        padding-left: 50px;
        h2 {
            margin-bottom: 20px;
        }
        .label {
            font-size: 100px;
            left: -12px;
            bottom: 250px;
        }
    }
}
</style>
