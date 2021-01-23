<template>
  <div
  class="bg-white relative w-screen min-h-screen box-border dark:bg-dark"
  id="container"
  :style="`min-height: ${screenHeight}px !important;`">
    <template>
      <Nuxt />
      <header-component @open="openSettingModal" />
      <footer-component />
      <template v-if="settingModal">
        <setting-modal @closeEvent="closeSettingModal" />
      </template>
    </template>
    <transition name="splash-fade">
      <splash v-if="splashFlg" />
    </transition>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import HeaderComponent from '~/components/Header.vue'
import FooterComponent from '~/components/Footer.vue'
import Splash from '~/components/Splash.vue'
import SettingModal from '~/components/modal/setting/Modal.vue'
import Typekit from '~/mixins/typekit'
import {Theme} from '~/types/type'
import screenHeight from '~/mixins/screenHeight'

export default Vue.extend({
  mixins: [Typekit, screenHeight],
  components: {
    HeaderComponent,
    FooterComponent,
    SettingModal,
    Splash
  },
  data: () => {
    return {
      settingModal: false as boolean,
      splashFlg: true as boolean
    }
  },
  created() {
    if (this.$route.name === 'blog-category-id') {
      this.splashFlg = false
    }
  }, 
  mounted() {
    if (process.client) {
      // TODO: ブラウザのテーマを使用する際コメントイン
      // // ブラウザで設定しているテーマを使う場合
      // // On page load or when changing themes, best to add inline in `head` to avoid FOUC
      // if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      //   document.querySelector('html')?.classList.add('dark')
      // } else {
      //   document.querySelector('html')?.classList.remove('dark')
      // }
      const response: Theme = (this as any).$theme.getTheme();
      (this as any).$theme.setHtmlTheme(response)
      // flgがtrueの場合３秒後にスプラッシュ終了
      if (this.splashFlg) {
        setTimeout(() => {
          this.splashFlg = false
        }, 3000)
      }
    }
  },
  methods: {
    openSettingModal() {
      this.settingModal = true
    },
    /**
     * 設定のモーダルを閉じる
     */
    closeSettingModal() {
        this.settingModal = false
    }
  }
})
</script>
<style>
html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
}
</style>
