<template>
    <nav class="bread-crumb-container">
        <ol itemscope itemtype="http://schema.org/BreadcrumbList">
            <li
            itemscope
            itemprop="itemListElement"
            itemtype="http://schema.org/ListItem">
                <nuxt-link itemprop="item" to="/blog/">
                    <span itemprop="name">トップ</span>
                </nuxt-link>
                <meta itemprop="position" content="1" />
            </li>
            <template v-if="lists.length > 0">
                <li
                itemscope
                itemprop="itemListElement"
                itemtype="http://schema.org/ListItem"
                v-for="(list, idx) in lists"
                :key="list.path">
                    <nuxt-link itemprop="item" :to="`/blog/${list.path}/`">
                        <span itemprop="name">{{list.name}}</span>
                    </nuxt-link>
                    <meta itemprop="position" :content="idx + 2" />
                </li>
            </template>
        </ol>
    </nav>
</template>

<script lang="ts">
import Vue from 'vue'
/**
 * type list = {
 *      name: string,
 *      path: string
 * }
**/
export default Vue.extend({
    props: {
        lists: {
            type: Array,
            default: []
        }
    }
})
</script>

<style lang="scss" scoped>
nav.bread-crumb-container {
    ol {
        list-style: none;
        li {
            display: inline;
            list-style: none;
            &::after {
                content: '/';
                padding: 0 0.2em;
                color: #555;
                @apply dark:text-white;
            }
            &:last-child::after {
                content: '';
            }
            a {
                text-decoration: none;
                color: gray;
                @apply dark:text-white;
            }
        }
    }
    @screen sm {
        ol {
            li {
                &::after {
                    font-size: 13px;
                }
                a {
                    font-size: 13px;
                }
            }
        }
    }
}
</style>