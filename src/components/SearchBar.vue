<template>
  <div class="search">
    <input type="text" placeholder="поиск...">
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'SearchBar',
  setup () {
    

    return {}
  }
})
</script>

<style scoped>
input {
  border: 1px solid teal;
}
</style>