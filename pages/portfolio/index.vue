<template>
  <div />
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  fetch({ params, redirect }) {
    redirect(200, "/portfolio/year/");
  },
});
</script>
