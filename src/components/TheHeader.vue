<template>
  <header>
    <div class="title">
      <h1>Телефонная книга</h1>
    </div>
    <div class="logo">
      <v-icon color="teal">mdi-book-open-outline</v-icon>
    </div>
  </header>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  setup () {
    

    return {}
  }
})
</script>

<style lang="scss" scoped>
header {
  display: flex;
  align-items: center;
  justify-content: space-evenly;
}
</style>