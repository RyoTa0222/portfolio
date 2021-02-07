import Vue from 'vue'
import {breakpoint} from '~/consts/config'

Vue.use({
    install(Vue) {
        const $window = Vue.observable({
            width: 0 as number,
            pageYOffset: 0 as number,
        })
        const $breakpoint = Vue.observable({
                name: 'xs' as string
        })
        const onScroll = () => {
            if (global) {
                $window.pageYOffset = global.pageYOffset
            }
        }
        const onResize = () => {
            const width = document.documentElement.clientWidth
            $window.width = width
            // breakpoint名を設定
            if (Number(width) <= Number(breakpoint['xs'])) {
                $breakpoint.name = 'xs'
            } else if (Number(width) > Number(breakpoint['xs']) && Number(width) <= Number(breakpoint['sm'])) {
                $breakpoint.name = 'sm'
            } else if (Number(width) > Number(breakpoint['sm']) && Number(width) <= Number(breakpoint['md'])) {
                $breakpoint.name = 'md'
            } else if (Number(width) > Number(breakpoint['md']) && Number(width) <= Number(breakpoint['lg'])) {
                $breakpoint.name = 'lg'
            } else if (Number(width) > Number(breakpoint['lg']) && Number(width) <= Number(breakpoint['xl'])) {
                $breakpoint.name = 'xl'
            } else if (Number(width) > Number(breakpoint['xl']) && Number(width) <= Number(breakpoint['2xl'])) {
                $breakpoint.name = '2xl'
            } else if (Number(width) > Number(breakpoint['2xl'])) {
                $breakpoint.name = '3xl'
            }
        }
        global.addEventListener('scroll', onScroll)
        global.addEventListener('resize', onResize)
        // 初期値セット
        onScroll()
        onResize()
        Vue.prototype.$window = $window
        Vue.prototype.$breakpoint = $breakpoint
    }
})
