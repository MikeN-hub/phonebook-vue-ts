<template>
  <div>
    <div v-for="contact in contacts" :key="contact.id">
      <ContactItem :contact="contact"/>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import ContactItem from './ContactItem.vue'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'ContactList',
  components: { ContactItem },
  setup() {
    const store = useStore()
    const contacts = computed(() => store.getters.getContacts)

    return { contacts }
  },
})
</script>

<style lang="scss" scoped>

</style>
