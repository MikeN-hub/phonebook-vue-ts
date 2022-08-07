<template>
  <div>
    <h1>Contact List</h1>
    <ContactItem />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ContactItem from './ContactItem.vue'

export default defineComponent({
  name: 'ContactList',
  components: {ContactItem},
  setup () {
    

    return {}
  }
})
</script>

<style scoped>

</style>