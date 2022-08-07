<template>
  <v-app>
    <v-main>
      <TheHeader />
      <router-view/>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import TheHeader from '@/components/TheHeader.vue';


export default defineComponent({
  name: 'App',
  components: {TheHeader},

  setup() {
    return {}
  }
})
</script>
