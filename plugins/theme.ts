import { Plugin } from '@nuxt/types'
import {Theme} from '~/types/type'

const plugin: Plugin = (context, inject) => {
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
            return true
        } catch (err) {
            return false
        }
    }
    inject('theme', {getTheme, setTheme, setHtmlTheme})
}

export default plugin
