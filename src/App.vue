<template>
  <v-app>
    <v-main>
      <TheHeader />
      <router-view />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import TheHeader from '@/components/TheHeader.vue'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'App',
  components: { TheHeader },

  setup() {
    const store = useStore()
    const dataFromLocalStorage = JSON.parse(localStorage.getItem('contacts') as string)
    store.commit('SET_CONTACTS', dataFromLocalStorage)
    return {}
  },
})
</script>
