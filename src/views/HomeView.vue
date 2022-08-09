<template>
  <v-container>
    <v-row align="center" justify="space-around" class="mt-1" no-gutters>
      <v-col cols="12" md="4" class="d-flex justify-center">
        <v-badge :content="TotalContactsCount" color="success" floating>
          <h2 class="text-center">Список контактов:</h2>
        </v-badge>
      </v-col>
      <v-col cols="12" sm="6" md="4">
        <v-text-field
          v-model="searchQuery"
          variant="solo"
          density="compact"
          prepend-inner-icon="mdi-magnify"
          counter
          label="Search"
          clearable
          placeholder="Поиск контакта..."
        >
        </v-text-field>
      </v-col>
      <v-col cols="12" sm="6" md="4" class="d-flex justify-center mb-3">
        <v-btn color="success" to="./addContact">Создать контакт</v-btn>
      </v-col>
    </v-row>
    <ContactList :searchQuery="searchQuery"/>
  </v-container>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from 'vue'
import { useStore } from 'vuex'
import ContactList from '@/components/ContactList.vue'

export default defineComponent({
  name: 'HomeView',
  components: { ContactList },

  setup() {
    const store = useStore()
    const TotalContactsCount = computed(() => store.getters.getTotalContactsCount)
    const searchQuery = ref()

    return { TotalContactsCount, searchQuery }
  },
})
</script>

<style lang="scss" scoped>
</style>
