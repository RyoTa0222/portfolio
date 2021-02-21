<template>
    <nuxt-link
    v-if="item && blogList"
    :to="`/blog/${getCategory(item, blogList, item.fields.id)}/${item.fields.id}/`"
    class="blog-item-container">
        <picture v-if="getImagePath(item, blogList) !== null">
            <!-- WebP用画像 -->
            <source
            :srcset="`${getImagePath(item, blogList).url}?w=240&h=120&fm=webp&fit=thumb&q=50`"
            type="image/webp">
            <!-- 従来画像 -->
            <img
            :src="`${getImagePath(item, blogList).url}?w=240&h=120&fm=png&fl=png8&fit=thumb&q=50`"
            :alt="getImagePath(item, blogList).name"
            />
        </picture>
        <span class="row clamp">{{item.fields.title}}</span>
        <span class="row text-right">作成日：{{item.sys.createdAt | filterDate}}</span>
        <span class="row text-right" v-show="isUpdate(item)">更新日：{{item.sys.updatedAt | filterDate}}</span>
        <div v-if="getCategory(item, blogList) && latest !== undefined" class="category-wrapper">
            <span
            :style="getColor(item, blogList)"
            class="category"
            >{{getCategory(item, blogList)}}</span>
        </div>
    </nuxt-link>
</template>

<script lang="ts">
import Vue from 'vue'
import blog from '~/mixins/blog'
import filter from '~/mixins/filter'

// type ClickEvnetType = 'detail'

export default Vue.extend({
    props: {
        item: {
            type: Object,
            default: null
        },
        blogList: {
            type: Object,
            default: null
        },
        latest: {
            default: undefined
        }
    },
    mixins: [filter, blog],
})
</script>

<style lang="scss" scoped>
.blog-item-container {
    @apply cursor-pointer;
    display: inline-block;
    width: 220px;
    margin-right: 10px;
    picture {
        width: 220px;
        height: 110px;
        display: inline-block;
        margin: 0;
        overflow: hidden;
        source, img {
            margin: 0;
            transition: all 0.2s;
        }
    }
    &:hover {
        picture {
            source, img {
                transform: scale(1.08);
                transform-origin: center;
            }
        }
    }
    .row {
        @apply dark:text-white;
        display: block;
        font-size: 12px;
        margin-bottom: 5px;
        &.text-right {
            text-align: right;
        }
        &.clamp {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
    }
    .category-wrapper {
        text-align: right;
        .category {
            font-size: 10px;
            display: inline-block;
            color: white;
            background: var(--color);
            padding: 2px 5px;
            max-width: 100%;
            word-break: keep-all;
        }
    }
    @screen lg {
        width: 200px;
        picture {
            width: 200px;
            height: 100px;
        }
    }
    @screen sm {
        width: 150px;
        margin-bottom: 40px;
        picture {
            width: 150px;
            height: 75px;
        }
    }
    @screen xs {
        width: 130px;
        margin-bottom: 40px;
        picture {
            width: 130px;
            height: 65px;
        }
    }
}
</style>