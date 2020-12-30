import { Plugin } from '@nuxt/types'
import {Theme} from '~/types/type'

const plugin: Plugin = (context, inject) => {
    // カスタムイベントを登録と発行
    const registAndDispatchEvent = () => {
        // 登録
        const event = new CustomEvent('changeTheme')
        // 発行
        const container = document.getElementById('container')
        container?.dispatchEvent(event)
    }
    // HTMLにクラス設定
    const setHtmlTheme = (theme: Theme) => {
        if (theme === 'dark') {
            document.querySelector('html')?.classList.add('dark')
        } else {
            document.querySelector('html')?.classList.remove('dark')
        }
    }
    // localStorageからテーマの取得
    const getTheme = (): Theme => {
        // localStorageから取得
        const theme = localStorage.getItem('theme')
        if (theme) {
            return theme as Theme
        }
        // なければデフォルト「light」設定
        else {
            localStorage.setItem('theme', 'light')
            return 'light'
        }
    }
    // localStorageにテーマの保存
    const setTheme = (theme: Theme = 'light'): boolean => {
        try {
            localStorage.setItem('theme', theme)
            setHtmlTheme(theme)
            registAndDispatchEvent()
            return true
        } catch (err) {
            return false
        }
    }
    inject('theme', {getTheme, setTheme, setHtmlTheme})
}

export default plugin
