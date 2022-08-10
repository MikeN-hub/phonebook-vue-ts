<template>
  <v-app>
    <v-app-bar app>
      <v-btn
        icon="mdi-book-open-outline"
        color="teal"
        size="x-large"
        @click="$router.push('/')"
      ></v-btn>
      <v-app-bar-title>
        <h1 class="text-teal text-center text-h6 text-sm-h5 text-md-h4 text-lg-h3">Телефонная книга</h1>
      </v-app-bar-title>
      <v-btn
        href="https://github.com/MikeN-hub/phonebook-vue-ts"
        target="_blank"
        icon="mdi-github"
        size="x-large"
      ></v-btn>
    </v-app-bar>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'App',

  setup() {
    const store = useStore()
    const dataFromLocalStorage = JSON.parse(localStorage.getItem('contacts') as string)
    if (dataFromLocalStorage) {
      store.commit('SET_CONTACTS', dataFromLocalStorage)
    }
    return {}
  },
})
</script>
