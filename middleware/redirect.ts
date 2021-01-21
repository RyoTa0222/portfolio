import { Middleware } from '@nuxt/types'

const redirect: Middleware = (context) => {
    const {route, redirect} = context
    const path = route.path
    const hash = route.hash
    // const type = route.query.type
    // リダイレクト処理
    if (path.slice(-1) !== '/' && path !== '/404') {
        if (hash) {
            redirect(301, `${path}/#${hash}`)
        } else {
            redirect(301, `${path}/`)
        }
    }
}