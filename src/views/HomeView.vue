<template>
  <div>
    <ContactList />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ContactList from '@/components/ContactList.vue'

export default defineComponent({
  name: 'HomeView',
  components: {ContactList},

  setup() {
    return {}
  },
})
</script>

<style scoped></style>
