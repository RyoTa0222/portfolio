<template>
    <p>roadmap</p>
</template>

<script lang="ts">
import Vue from 'vue'
import {CtfContentType} from '~/types/type'

// const {createClient} = require('~/plugins/contentful.ts')
import createClient from '~/plugins/contentful'

const client = createClient()

export default Vue.extend({
    async asyncData({params}) {
        const entries = await client.getEntries({
            content_type: 'roadmap'
        })
        console.log(entries.items)
        return {
            data: entries.items
        }
    }
})
</script>
