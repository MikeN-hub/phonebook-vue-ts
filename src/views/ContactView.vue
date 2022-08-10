<template>
  <v-form @submit.prevent="onSubmit" ref="refForm" v-model="valid">
    <v-card :class="!xs ? 'ma-12' : ''">
      <v-card-title class="text-center">Карточка контакта</v-card-title>
      <v-card-text>
        <v-container>
          <v-row align="center" justify="center" class="mb-2">
            <v-col cols="6" class="d-flex justify-space-around align-center">
              <v-avatar :size="xs ? '128' : '256'" :image="currentContact.photo"> </v-avatar>
              <v-btn
                @click="isUpdating.photo = !isUpdating.photo"
                :color="isUpdating.photo ? 'success' : 'warning'"
                size="small"
                icon="mdi-movie-open-edit-outline"
                :class="xs ? 'text-lowercase' : ''"
                ></v-btn
              >
            </v-col>
            <v-col cols="6">
              <div class="d-flex flex-column align-center">
                <v-text-field
                  v-if="isUpdating.name"
                  v-model="updContact.name"
                  :rules="rules.nameRules"
                  reqired
                  class="mb-3 w-100"
                  single-line
                  density="compact"
                  label="Имя"
                >
                </v-text-field>
                <p
                  v-else
                  class="text-h6 text-sm-h5 text-md-h4 text-lg-h4 mb-3 d-flex align-center w-100 bg-grey-lighten-4 my-height rounded-pill"
                >
                  {{ updContact.name }}
                </p>
                <v-btn
                  @click="nameToggle"
                  :class="xs ? 'text-lowercase' : ''"
                  max-width="100"
                  size="small"
                  :color="isUpdating.name ? 'success' : 'warning'"
                  >{{ isUpdating.name ? 'сохранить' : 'изменить' }}</v-btn
                >
              </div>
            </v-col>
          </v-row>
          <v-row
            align="center"
            justify="center"
            :class="{}"
            class="mb-6 bg-grey-lighten-3 my-row-height text-body-2 text-sm-subtitle-2 text-md-h6 text-center rounded-pill"
          >
            <v-col>
              <p>Фамилия</p>
            </v-col>
            <v-col>
              <v-text-field
                v-if="isUpdating.surname"
                v-model="updContact.surname"
                hide-details
                single-line
                density="compact"
                label="Фамилия"
              >
              </v-text-field>
              <p v-else class="d-flex align-center">
                {{ updContact.surname }}
              </p>
            </v-col>
            <v-col>
              <v-btn
                @click="isUpdating.surname = !isUpdating.surname"
                :class="xs ? 'text-lowercase' : ''"
                max-width="100"
                size="small"
                :color="isUpdating.surname ? 'success' : 'warning'"
                >{{ isUpdating.surname ? 'сохранить' : 'изменить' }}</v-btn
              ></v-col
            >
          </v-row>

          <v-row
            align="center"
            justify="center"
            class="mb-6 bg-grey-lighten-3 my-row-height text-body-2 text-sm-subtitle-2 text-md-h6 text-center rounded-pill"
          >
            <v-col><p>Сотовый телефон</p></v-col>
            <v-col>
              <v-text-field
                v-if="isUpdating.phone.mobile"
                hide-details
                single-line
                density="compact"
                label="Сотовый телефон"
                @keydown="checkPhone"
                v-model="updContact.phone.mobile"
              >
              </v-text-field>
              <p v-else class="d-flex align-center">
                {{ updContact.phone.mobile }}
              </p>
            </v-col>
            <v-col
              ><v-btn
                @click="isUpdating.phone.mobile = !isUpdating.phone.mobile"
                :class="xs ? 'text-lowercase' : ''"
                max-width="100"
                size="small"
                :color="isUpdating.phone.mobile ? 'success' : 'warning'"
                >{{ isUpdating.phone.mobile ? 'сохранить' : 'изменить' }}</v-btn
              ></v-col
            >
          </v-row>

          <v-row
            align="center"
            justify="center"
            class="mb-6 bg-grey-lighten-3 my-row-height text-body-2 text-sm-subtitle-2 text-md-h6 text-center rounded-pill"
          >
            <v-col><p>Рабочий телефон</p></v-col>
            <v-col>
              <v-text-field
                v-if="isUpdating.phone.work"
                hide-details
                single-line
                density="compact"
                label="Рабочий телефон"
                @keydown="checkPhone"
                v-model="updContact.phone.work"
              >
              </v-text-field>
              <p v-else class="d-flex align-center">
                {{ updContact.phone.work }}
              </p>
            </v-col>
            <v-col
              ><v-btn
                @click="isUpdating.phone.work = !isUpdating.phone.work"
                :class="xs ? 'text-lowercase' : ''"
                max-width="100"
                size="small"
                :color="isUpdating.phone.work ? 'success' : 'warning'"
                >{{ isUpdating.phone.work ? 'сохранить' : 'изменить' }}</v-btn
              ></v-col
            >
          </v-row>

          <v-row
            align="center"
            justify="center"
            class="mb-6 bg-grey-lighten-3 my-row-height text-body-2 text-sm-subtitle-2 text-md-h6 text-center rounded-pill"
          >
            <v-col><p>Дополнительный телефон</p></v-col>
            <v-col>
              <v-text-field
                v-if="isUpdating.phone.additional"
                hide-details
                single-line
                density="compact"
                label="Дополнительный телефон"
                @keydown="checkPhone"
                v-model="updContact.phone.additional"
              >
              </v-text-field>
              <p v-else class="d-flex align-center">
                {{ updContact.phone.additional }}
              </p>
            </v-col>
            <v-col
              ><v-btn
                @click="isUpdating.phone.additional = !isUpdating.phone.additional"
                :class="xs ? 'text-lowercase' : ''"
                max-width="100"
                size="small"
                :color="isUpdating.phone.additional ? 'success' : 'warning'"
                >{{ isUpdating.phone.additional ? 'сохранить' : 'изменить' }}</v-btn
              ></v-col
            >
          </v-row>

          <v-row
            align="center"
            justify="center"
            class="mb-6 bg-grey-lighten-3 my-row-height text-body-2 text-sm-subtitle-2 text-md-h6 text-center rounded-pill"
          >
            <v-col><p>Личная почта</p></v-col>
            <v-col>
              <v-text-field
                v-if="isUpdating.email.personal"
                hide-details
                single-line
                density="compact"
                label="Личная почта"
                @keydown="checkEmail"
                v-model="updContact.email.personal"
              >
              </v-text-field>
              <p v-else class="d-flex align-center">
                {{ updContact.email.personal }}
              </p>
            </v-col>
            <v-col
              ><v-btn
                @click="isUpdating.email.personal = !isUpdating.email.personal"
                :class="xs ? 'text-lowercase' : ''"
                max-width="100"
                size="small"
                :color="isUpdating.email.personal ? 'success' : 'warning'"
                >{{ isUpdating.email.personal ? 'сохранить' : 'изменить' }}</v-btn
              ></v-col
            >
          </v-row>

          <v-row
            align="center"
            justify="center"
            class="mb-6 bg-grey-lighten-3 my-row-height text-body-2 text-sm-subtitle-2 text-md-h6 text-center rounded-pill"
          >
            <v-col><p>Рабочая почта</p></v-col>
            <v-col>
              <v-text-field
                v-if="isUpdating.email.work"
                hide-details
                single-line
                density="compact"
                label="Рабочая почта"
                @keydown="checkEmail"
                v-model="updContact.email.work"
              >
              </v-text-field>
              <p v-else class="d-flex align-center">
                {{ updContact.email.work }}
              </p>
            </v-col>
            <v-col
              ><v-btn
                @click="isUpdating.email.work = !isUpdating.email.work"
                :class="xs ? 'text-lowercase' : ''"
                max-width="100"
                size="small"
                :color="isUpdating.email.work ? 'success' : 'warning'"
                >{{ isUpdating.email.work ? 'сохранить' : 'изменить' }}</v-btn
              ></v-col
            >
          </v-row>

          <v-row
            align="center"
            justify="center"
            class="mb-6 bg-grey-lighten-3 my-row-height text-body-2 text-sm-subtitle-2 text-md-h6 text-center rounded-pill"
          >
            <v-col><p>Дополнительная почта</p></v-col>
            <v-col>
              <v-text-field
                v-if="isUpdating.email.additional"
                hide-details
                single-line
                density="compact"
                label="Дополнительная почта"
                @keydown="checkEmail"
                v-model="updContact.email.additional"
              >
              </v-text-field>
              <p v-else class="d-flex align-center">
                {{ updContact.email.additional }}
              </p>
            </v-col>
            <v-col
              ><v-btn
                @click="isUpdating.email.additional = !isUpdating.email.additional"
                :class="xs ? 'text-lowercase' : ''"
                max-width="100"
                size="small"
                :color="isUpdating.email.additional ? 'success' : 'warning'"
                >{{ isUpdating.email.additional ? 'сохранить' : 'изменить' }}</v-btn
              ></v-col
            >
          </v-row>

          <v-row
            align="center"
            justify="center"
            class="mb-6 bg-grey-lighten-3 my-row-height text-body-2 text-sm-subtitle-2 text-md-h6 text-center rounded-pill"
          >
            <v-col><p>Телеграм</p></v-col>
            <v-col>
              <v-text-field
                v-if="isUpdating.social.telegram"
                hide-details
                single-line
                density="compact"
                label="Телеграм"
                v-model="updContact.social.telegram"
              >
              </v-text-field>
              <p v-else class="d-flex align-center">
                <span v-if="isValidHttpUrl(updContact.social.telegram)"
                  ><a :href="updContact.social.telegram" target="_blank">{{
                    updContact.social.telegram
                  }}</a></span
                >
                <span v-else>{{ updContact.social.telegram }}</span>
              </p>
            </v-col>
            <v-col
              ><v-btn
                @click="isUpdating.social.telegram = !isUpdating.social.telegram"
                :class="xs ? 'text-lowercase' : ''"
                max-width="100"
                size="small"
                :color="isUpdating.social.telegram ? 'success' : 'warning'"
                >{{ isUpdating.social.telegram ? 'сохранить' : 'изменить' }}</v-btn
              ></v-col
            >
          </v-row>

          <v-row
            align="center"
            justify="center"
            align-content="center"
            class="mb-6 bg-grey-lighten-3 my-row-height text-body-2 text-sm-subtitle-2 text-md-h6 text-center rounded-pill"
          >
            <v-col><p>ВатсАпп</p></v-col>
            <v-col>
              <v-text-field
                v-if="isUpdating.social.whatsapp"
                hide-details
                single-line
                density="compact"
                label="ВатсАпп"
                v-model="updContact.social.whatsapp"
              >
              </v-text-field>
              <p v-else class="d-flex align-center">
                <span v-if="isValidHttpUrl(updContact.social.whatsapp)"
                  ><a :href="updContact.social.whatsapp" target="_blank">{{
                    updContact.social.whatsapp
                  }}</a></span
                >
                <span v-else>{{ updContact.social.whatsapp }}</span>
              </p>
            </v-col>
            <v-col
              ><v-btn
                @click="isUpdating.social.whatsapp = !isUpdating.social.whatsapp"
                :class="xs ? 'text-lowercase' : ''"
                max-width="100"
                size="small"
                :color="isUpdating.social.whatsapp ? 'success' : 'warning'"
                >{{ isUpdating.social.whatsapp ? 'сохранить' : 'изменить' }}</v-btn
              ></v-col
            >
          </v-row>

          <v-row
            align="center"
            justify="center"
            class="mb-6 bg-grey-lighten-3 my-row-height text-body-2 text-sm-subtitle-2 text-md-h6 text-center rounded-pill"
          >
            <v-col><p>Вконтакте</p></v-col>
            <v-col>
              <v-text-field
                v-if="isUpdating.social.vk"
                hide-details
                single-line
                density="compact"
                label="Вконтакте"
                v-model="updContact.social.vk"
              >
              </v-text-field>
              <p v-else class="d-flex align-center">
                <span v-if="isValidHttpUrl(updContact.social.vk)"
                  ><a :href="updContact.social.vk" target="_blank">{{
                    updContact.social.vk
                  }}</a></span
                >
                <span v-else>{{ updContact.social.vk }}</span>
              </p>
            </v-col>
            <v-col
              ><v-btn
                @click="isUpdating.social.vk = !isUpdating.social.vk"
                :class="xs ? 'text-lowercase' : ''"
                max-width="100"
                size="small"
                :color="isUpdating.social.vk ? 'success' : 'warning'"
                >{{ isUpdating.social.vk ? 'сохранить' : 'изменить' }}</v-btn
              ></v-col
            >
          </v-row>

          <v-row
            align="center"
            justify="center"
            class="mb-6 bg-grey-lighten-3 my-row-height text-body-2 text-sm-subtitle-2 text-md-h6 text-center rounded-pill"
          >
            <v-col><p>Инстаграм</p></v-col>
            <v-col>
              <v-text-field
                v-if="isUpdating.social.instagram"
                hide-details
                single-line
                density="compact"
                label="Инстаграм"
                v-model="updContact.social.instagram"
              >
              </v-text-field>
              <p v-else class="d-flex align-center">
                <span v-if="isValidHttpUrl(updContact.social.instagram)"
                  ><a :href="updContact.social.instagram" target="_blank">{{
                    updContact.social.instagram
                  }}</a></span
                >
                <span v-else>{{ updContact.social.instagram }}</span>
              </p>
            </v-col>
            <v-col
              ><v-btn
                @click="isUpdating.social.instagram = !isUpdating.social.instagram"
                :class="xs ? 'text-lowercase' : ''"
                max-width="100"
                size="small"
                :color="isUpdating.social.instagram ? 'success' : 'warning'"
                >{{ isUpdating.social.instagram ? 'сохранить' : 'изменить' }}</v-btn
              ></v-col
            >
          </v-row>

          <v-row
            align="center"
            justify="center"
            class="mb-6 bg-grey-lighten-3 my-row-height text-body-2 text-sm-subtitle-2 text-md-h6 text-center rounded-pill"
          >
            <v-col><p>День рождения</p></v-col>
            <v-col>
              <v-text-field
                v-if="isUpdating.birthday"
                type="date"
                hide-details
                single-line
                density="compact"
                label="День рождения"
                v-model="updContact.birthday"
              >
              </v-text-field>
              <p v-else class="d-flex align-center">
                {{ updContact.birthday }}
              </p>
            </v-col>
            <v-col
              ><v-btn
                @click="isUpdating.birthday = !isUpdating.birthday"
                :class="xs ? 'text-lowercase' : ''"
                max-width="100"
                size="small"
                :color="isUpdating.birthday ? 'success' : 'warning'"
                >{{ isUpdating.birthday ? 'сохранить' : 'изменить' }}</v-btn
              ></v-col
            >
          </v-row>

          <v-row
            align="center"
            justify="center"
            class="mb-6 bg-grey-lighten-3 my-row-height text-body-2 text-sm-subtitle-2 text-md-h6 text-center rounded-pill"
          >
            <v-col><p>Заметки</p></v-col>
            <v-col>
              <v-text-field
                v-if="isUpdating.note"
                hide-details
                single-line
                density="compact"
                label="Заметки"
                v-model="updContact.note"
              >
              </v-text-field>
              <p v-else class="d-flex align-center">
                {{ updContact.note }}
              </p>
            </v-col>
            <v-col
              ><v-btn
                @click="isUpdating.note = !isUpdating.note"
                :class="xs ? 'text-lowercase' : ''"
                max-width="100"
                size="small"
                :color="isUpdating.note ? 'success' : 'warning'"
                >{{ isUpdating.note ? 'сохранить' : 'изменить' }}</v-btn
              ></v-col
            >
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-container>
          <v-row align="center" justify="center">
            <v-col class="d-flex justify-center">
              <v-btn type="submit" color="success" border prepend-icon="mdi-content-save"
                >Сохранить изменения</v-btn
              >
            </v-col>
            <v-col class="d-flex justify-center">
              <v-btn @click="onCancel" color="warning" border prepend-icon="mdi-content-save"
                >Обнулить измененные поля</v-btn
              >
            </v-col>
            <v-col class="d-flex justify-center">
              <v-btn @click="onQuit" border prepend-icon="mdi-arrow-left" color="error"
                >Выйти из карточки</v-btn
              >
            </v-col>
          </v-row>
        </v-container>
      </v-card-actions>
    </v-card>
    <v-snackbar v-model="snackbar" transition="fade-transition">
      Вы не можете сохранить контакт без имени!
      <template v-slot:actions>
        <v-btn color="success" variant="text" @click="snackbar = false"> Понятно </v-btn>
      </template>
    </v-snackbar>
    <v-alert type="warning" closable density="compact" v-model="showAlert">
      <v-alert-title>
        Вы уверены что хотите выйти?
        <v-btn @click="$router.push('/')" color="red">Да</v-btn></v-alert-title
      >
    </v-alert>
  </v-form>
</template>

<script lang="ts">
import { defineComponent, computed, ref, reactive, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { useDisplay } from 'vuetify'
import { isValidHttpUrl } from '@/helpers/helpers'
import { mustBeLatin } from '@/helpers/helpers'
import { mustBeDigits } from '@/helpers/helpers'

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

    const rules = {
      photoRules: [
        (v: any) =>
          !v || !v.length || v[0].size < 1000000 || 'Размер фото не должен превышать 1 Mb',
      ],
      nameRules: [(v: any) => !!v || 'Имя обязательно'],
      phoneRules: [
        (v: any) =>
          !v ||
          !v.length ||
          /^[\d ()+-]{5,16}$/.test(v) ||
          'Телефон должен быть от 5 до 16 символов, включая цифры и знаки +-',
      ],
      emailRules: [
        (v: any) =>
          !v ||
          !v.length ||
          /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i.test(v) ||
          'Некорректный адрес электронной почты',
      ],
    }

    const checkEmail = (e: any) => {
      if (!mustBeLatin(e.key)) {
        e.preventDefault()
      }
    }
    const checkPhone = (e: any) => {
      if (e.key.length > 1) return
      if (!mustBeDigits(e.key)) {
        e.preventDefault()
      }
    }

    const nameToggle = () => {
      if (updContact.name) {
        isUpdating.name = !isUpdating.name
      }
      return
    }

    const refForm: any = ref()
    const valid = ref(true)
    const snackbar = ref(false)
    watch(
      () => updContact.name,
      (curr, prev) => {
        if (curr === '') {
          snackbar.value = true
        }
      }
    )

    const showAlert = ref(false)
    const onQuit = () => {
      showAlert.value = true
    }
    const onCancel = () => {
      refForm.value.reset()
    }

    const onSubmit = async () => {
      let result = await refForm.value.validate()
      console.log(result)
      if (result.valid) {
        console.log('submited')
        store.commit('UPDATE_CONTACT', updContact)
      }
    }

    return {
      id,
      currentContact,
      isUpdating,
      xs,
      sm,
      updContact,
      isValidHttpUrl,
      onSubmit,
      refForm,
      rules,
      valid,
      snackbar,
      nameToggle,
      checkPhone,
      checkEmail,
      onCancel,
      onQuit,
      showAlert,
    }
  },
})
</script>

<style lang="scss" scoped>
.my-height {
  height: 40px;
}
.my-row-height {
  height: 60px;
}
.v-alert {
  position: fixed;
  top: 90%;
  left: 50%;
  transform: translate(-50%, -90%);
  opacity: 0.5;
}
</style>
