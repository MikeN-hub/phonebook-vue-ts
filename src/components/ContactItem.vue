<template>
  <v-row>
    <div class="contactItem">
      <div class="name">
        {{ contact.name }}
      </div>
      <div class="name">
        {{ contact.surname }}
      </div>
      <div class="name">
        {{ contact.phone.mobile }}
      </div>
      <button class="remove-btn" @click="onRemove">remove</button>
      <button class="remove-btn" @click="onUpdate">update</button>
      <img :src="contact.photo" width="100" alt="" />
    </div>
  </v-row>
</template>

<script lang="ts">
import { defineComponent, PropType, toRefs } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import IContact from '@/Models/Icontact'

export default defineComponent({
  name: 'ContactItem',
  props: {
    contact: {
      required: true,
      type: Object as PropType<IContact>,
    },
  },
  setup(props) {
    const store = useStore()
    const router = useRouter()
    const { contact } = toRefs(props)

    const onRemove = () => {
      store.commit('REMOVE_CONTACT', contact.value.id)
    }

    const onUpdate = () => {
      router.push(`/contact/${contact.value.id}`)
    }
    return { onRemove, onUpdate }
  },
})
</script>

<style lang="scss" scoped>
button {
  border: 1px solid teal;
  border-radius: 10px;
  padding: 0.2rem 0.5rem;
  color: teal;
}
.contactItem {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
}
</style>
