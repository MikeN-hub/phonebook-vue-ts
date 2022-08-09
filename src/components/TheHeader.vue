<template>
  <v-container>
    <v-btn
      icon="mdi-book-open-outline"
      color="teal"
      size="x-large"
      @click="$router.push('/')"
    ></v-btn>
    <v-app-bar-title>
      <h1 class="text-h4 text-teal">Телефонная книга</h1>
    </v-app-bar-title>
    <v-btn
      href="https://github.com/MikeN-hub"
      target="_blank"
      icon="mdi-github"
      size="x-large"
    ></v-btn>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    return {}
  },
})
</script>

<style lang="scss" scoped></style>
