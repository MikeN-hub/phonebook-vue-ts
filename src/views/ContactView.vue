<template>
  <v-card :class="!xs ? 'ma-12' : ''">
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
        <v-row align="center" justify="center" class="bg-grey-lighten-1 mb-8">
          <v-col v-show="isUpdating.surname" cols="8" md="2">
            <input v-model="updContact.surname" />
          </v-col>
          <v-col v-show="!isUpdating.surname" cols="8" md="2">
            <h4>{{ updContact.surname }}</h4>
          </v-col>
          <v-col cols="4" md="2" class="d-flex justify-center">
            <v-btn
              color="success"
              size="x-small"
              @click="() => (isUpdating.surname = !isUpdating.surname)"
              :class="xs ? 'text-lowercase' : ''"
              >{{ isUpdating.surname ? 'сохранить' : 'редактировать' }}</v-btn
            >
          </v-col>
        </v-row>
        <v-row align="center" justify="center" class="bg-grey-lighten-1 mb-8">
          <v-col v-show="isUpdating.phone.mobile" cols="8" md="2">
            <input type="text" v-show="isUpdating.phone.mobile" v-model="updContact.phone.mobile" />
          </v-col>
          <v-col cols="8" md="2" v-show="!isUpdating.phone.mobile">
            <h4>{{ updContact.phone.mobile }}</h4>
          </v-col>
          <v-col cols="4" md="2" class="d-flex justify-center">
            <v-btn
              color="success"
              size="x-small"
              @click="() => (isUpdating.phone.mobile = !isUpdating.phone.mobile)"
              :class="xs ? 'text-lowercase' : ''"
              >{{ isUpdating.phone.mobile ? 'сохранить' : 'редактировать' }}</v-btn
            >
          </v-col>
        </v-row>
        <v-row align="center" justify="center" class="bg-grey-lighten-1 mb-8">
          <v-col cols="6">Телефон рабочий</v-col>
          <v-col cols="6">{{ updContact.phone.work }}</v-col>
        </v-row>
        <v-row align="center" justify="center" class="bg-grey-lighten-1 mb-8">
          <v-col cols="6">Телефон Дополнительный</v-col>
          <v-col cols="6">{{ updContact.phone.additional }}</v-col>
        </v-row>
        <v-row align="center" justify="center" class="bg-grey-lighten-1 mb-8">
          <v-col cols="6">Почта личная</v-col>
          <v-col cols="6">{{ updContact.email.personal }}</v-col>
        </v-row>
        <v-row align="center" justify="center" class="bg-grey-lighten-1 mb-8">
          <v-col cols="6">Почта рабочая</v-col>
          <v-col cols="6">{{ updContact.email.work }}</v-col>
        </v-row>
        <v-row align="center" justify="center" class="bg-grey-lighten-1 mb-8">
          <v-col cols="6">Почта дополнительная</v-col>
          <v-col cols="6">{{ updContact.email.additional }}</v-col>
        </v-row>
        <v-row align="center" justify="center" class="bg-grey-lighten-1 mb-8">
          <v-col cols="6">Телеграм</v-col>
          <v-col cols="6">
            <a
              v-if="isValidHttpUrl(updContact.social.telegram)"
              :href="updContact.social.telegram"
              target="_blank"
              >{{ updContact.social.telegram }}</a
            >
            <p v-else>{{ updContact.social.telegram }}</p>
          </v-col>
        </v-row>
        <v-row align="center" justify="center" class="bg-grey-lighten-1 mb-8">
          <v-col cols="6">Вотсапп</v-col>
          <v-col cols="6">
            <a
              v-if="isValidHttpUrl(updContact.social.whatsapp)"
              :href="updContact.social.whatsapp"
              target="_blank"
              >{{ updContact.social.whatsapp }}</a
            >
            <p v-else>{{ updContact.social.whatsapp }}</p>
          </v-col>
        </v-row>
        <v-row align="center" justify="center" class="bg-grey-lighten-1 mb-8">
          <a
            v-if="isValidHttpUrl(updContact.social.vk)"
            :href="updContact.social.vk"
            target="_blank"
            >{{ updContact.social.vk }}</a
          >
          <p v-else>{{ updContact.social.vk }}</p>
        </v-row>
        <v-row align="center" justify="center" class="bg-grey-lighten-1 mb-8">
          <a
            v-if="isValidHttpUrl(updContact.social.instagram)"
            :href="updContact.social.instagram"
            target="_blank"
            >{{ updContact.social.instagram }}</a
          >
          <p v-else>{{ updContact.social.instagram }}</p>
        </v-row>
        <v-row align="center" justify="center" class="bg-grey-lighten-1 mb-8">
          <v-col cols="6">День рождения</v-col>
          <v-col cols="6">{{ updContact.birthday }}</v-col>
        </v-row>
        <v-row align="center" justify="center" class="bg-grey-lighten-1 mb-8">
          <v-col cols="6">Заметки</v-col>
          <v-col cols="6">{{ updContact.note }}</v-col>
        </v-row>
      </v-container>
    </v-card-text>
    <v-card-actions> </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import { defineComponent, computed, ref, reactive, toRef } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { useDisplay } from 'vuetify'
import { isValidHttpUrl } from '@/helpers/helpers'

export default defineComponent({
  setup() {
    const { xs, sm } = useDisplay()
    const store = useStore()
    const route = useRoute()
    const id = computed(() => {
      return route.params.id
    })
    store.commit('SET_CURRENT_ID', id.value)
    const currentContact = computed(() => {
      return store.getters.getCurrentContact
    })

    const isUpdating = reactive({
      photo: false,
      name: false,
      surname: false,
      phone: {
        mobile: false,
        work: false,
        additional: false,
      },
      email: {
        personal: false,
        work: false,
        additional: false,
      },
      social: {
        telegram: false,
        whatsapp: false,
        vk: false,
        instagram: false,
      },
      birthday: false,
      note: false,
    })

    const updContact = reactive({
      id: currentContact.value.id,
      photo: currentContact.value.photo,
      name: currentContact.value.name,
      surname: currentContact.value.surname,
      phone: {
        mobile: currentContact.value.phone.mobile,
        work: currentContact.value.phone.work,
        additional: currentContact.value.phone.additional,
      },
      email: {
        personal: currentContact.value.email.personal,
        work: currentContact.value.email.work,
        additional: currentContact.value.email.additional,
      },
      social: {
        telegram: currentContact.value.social.telegram,
        whatsapp: currentContact.value.social.whatsapp,
        vk: currentContact.value.social.vk,
        instagram: currentContact.value.social.instagram,
      },
      birthday: currentContact.value.birthday,
      note: currentContact.value.note,
    })
    console.log(updContact.social.whatsapp)
    console.log(isValidHttpUrl(updContact.social.whatsapp))

    return { id, currentContact, isUpdating, xs, sm, updContact, isValidHttpUrl }
  },
})
</script>

<style lang="scss" scoped>
input {
  border: 1px solid black;
  border-radius: 0.5rem;
  padding: 0.3rem;
}
h4 {
  padding: 0.3rem;
}
p {
  cursor: pointer;
}
</style>
