<template>
  <v-card class="ma-12">
    <v-card-title class="text-center">Карточка контакта</v-card-title>
    <v-card-text>
      <v-container>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="6" md="3" class="d-flex justify-center">
            <v-avatar size="256" :image="currentContact.photo"> </v-avatar>
          </v-col>
          <v-col cols="12" sm="6" md="3" class="d-flex justify-center">
            <h1>{{ currentContact.name }}</h1>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-input :messages="['Messages']" append-icon="mdi-close" prepend-icon="mdi-phone">
              {{currentContact.surname}}
            </v-input>
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>
    <v-card-actions> </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'

export default defineComponent({
  setup() {
    const store = useStore()
    const route = useRoute()
    const id = computed(() => {
      return route.params.id
    })
    store.commit('SET_CURRENT_ID', id.value)
    const currentContact = computed(() => {
      return store.getters.getCurrentContact
    })

    return { id, currentContact }
  },
})
</script>

<style scoped></style>
