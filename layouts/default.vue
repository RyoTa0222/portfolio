<template>
  <div class="bg-white container relative">
    <header-component />
    <Nuxt />
    <footer-component />
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import HeaderComponent from '~/components/Header.vue'
import FooterComponent from '~/components/Footer.vue'
import Typekit from '~/mixins/typekit'

export default Vue.extend({
  mixins: [Typekit],
  components: {
    HeaderComponent,
    FooterComponent
  },
  mounted() {
    // On page load or when changing themes, best to add inline in `head` to avoid FOUC
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      document.querySelector('html')?.classList.add('dark')
    } else {
      document.querySelector('html')?.classList.remove('dark')
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
