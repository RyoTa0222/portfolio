import {accessorType} from '~/store'

declare module 'vue/types/vue' {
    interface Vue {
        $accessor: typeof accessorType
    }
}

declare module '`/nuxt/types' {
    interface NuxtAppOptions {
        $accesor: typeof accessorType
    }
}
