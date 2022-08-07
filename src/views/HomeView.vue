<template>
  <div>
    <div class="panel">
      <h2>Список контактов: ({{ TotalContactsCount }})</h2>
      <SearchBar />
      <button @click="$router.push('./addContact')">Создать новый контакт</button>
    </div>
    <ContactList />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from 'vuex'
import ContactList from '@/components/ContactList.vue'
import SearchBar from '@/components/SearchBar.vue'

export default defineComponent({
  name: 'HomeView',
  components: { ContactList, SearchBar },

  setup() {
    const store = useStore()
    const TotalContactsCount = computed(() => store.getters.getTotalContactsCount)

    return { TotalContactsCount }
  },
})
</script>

<style lang="scss" scoped>
.panel {
  display: flex;
  align-items: center;
  gap: 5rem;
  margin-bottom: 1rem;
}
button {
  border: 1px solid teal;
  border-radius: 10px;
  padding: 0.2rem 0.5rem;
  color: teal;
}
</style>
