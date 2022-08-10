<template>
  <v-container>
    <v-row v-for="contact in contacts" :key="contact.id" align="center" class="mb-1 bg-grey-lighten-4 rounded-pill mb-6">
      <v-col cols="2" v-if="!xs">
        <v-avatar @click="$router.push(`contact/${contact.id}`)">
          <v-img :src="contact.photo" cover></v-img>
        </v-avatar>
      </v-col>
      <v-col cols="4" sm="3">
        <v-chip>
          <v-icon start icon="mdi-account-outline"></v-icon>
          {{ contact.name }} {{ contact.surname }}
        </v-chip>
      </v-col>
      <v-col cols="4" sm="3">
        {{ contact.phone.mobile }}
      </v-col>
      <v-col cols="2" sm="2">
        <v-btn
          color="warning"
          @click="onRemove(contact.id)"
          :size="xs ? 'x-small' : sm ? 'small' : 'default'"
          :class="xs ? 'text-lowercase' : ''"
          >delete</v-btn
        >
      </v-col>
      <v-col cols="2" sm="2">
        <v-btn
          color="success"
          @click="onUpdate(contact.id)"
          :size="xs ? 'x-small' : sm ? 'small' : 'default'"
          :class="xs ? 'text-lowercase' : ''"
          >update</v-btn
        >
      </v-col>
    </v-row>
  </v-container>
  <v-snackbar v-model="snackbar" transition="fade-transition">
    Контакт удален
    <template v-slot:actions>
      <v-btn color="success" variant="text" @click="snackbar = false"> Close </v-btn>
    </template>
  </v-snackbar>
</template>

<script lang="ts">
import { computed, defineComponent, ref, PropType, toRefs } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { useDisplay } from 'vuetify'
import IContact from '@/Models/Icontact'

export default defineComponent({
  name: 'ContactList',
  props: {
    searchQuery: {
      type: String as PropType<string>,
    },
  },
  setup(props) {
    const store = useStore()
    const router = useRouter()
    const { xs, sm } = useDisplay()
    const { searchQuery } = toRefs(props)

    const contacts = computed(() => {
      if (searchQuery.value) {
        return store.getters.getContacts.filter((contact: IContact) =>
          contact.name.toLowerCase().includes(searchQuery.value?.toLowerCase() as string)
        )
      } else {
        return store.getters.getContacts
      }
    })

    const onRemove = (id: string) => {
      snackbar.value = true
      store.commit('REMOVE_CONTACT', id)
    }
    const onUpdate = (id: string) => {
      router.push(`/contact/${id}`)
    }

    const snackbar = ref(false)

    return { contacts, onRemove, onUpdate, snackbar, xs, sm }
  },
})
</script>

<style lang="scss" scoped></style>
