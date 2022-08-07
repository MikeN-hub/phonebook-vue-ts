<template>
  <div>
    <h1>Это контакт с id: {{id}}</h1>
    <h2>{{currentContact.name}}</h2>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'

export default defineComponent({
  setup () {
    const store = useStore()
    const route = useRoute()
    const id = computed(() => {
      return route.params.id
    })
    store.commit('SET_CURRENT_ID', id.value)
    const currentContact = computed(() => {
      return store.getters.getCurrentContact
    })

    return {id, currentContact}
  }
})
</script>

<style scoped>

</style>
