<template>
  <v-form @submit.prevent="onSubmit" ref="refForm" v-model="valid">
    <v-container>
      <v-row align="center" justify="space-around">
        <v-col cols="12" sm="6">
          <v-file-input
            accept="image/*"
            prepend-icon="mdi-camera"
            show-size
            :rules="rules.photoRules"
            @change="uploadImage"
            :density="density"
            label="Загрузить фото"
          >
          </v-file-input>
        </v-col>
        <v-col cols="12" sm="6" align="center">
          <v-avatar :size="avatarSize">
            <v-img :src="state.photo" cover></v-img>
          </v-avatar>
        </v-col>
      </v-row>
      <v-row align="center" justify="space-around">
        <v-col cols="12" sm="6">
          <v-text-field
            v-model="state.name"
            :rules="rules.nameRules"
            :counter="10"
            autofocus
            :density="density"
            required
            prepend-icon="mdi-account-box-outline"
            label="Имя"
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6">
          <v-text-field
            v-model="state.surname"
            :counter="10"
            :density="density"
            prepend-icon="mdi-account-box-outline"
            label="Фамилия"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="4">
          <v-text-field
            v-model="state.phone.mobile"
            @keydown="checkPhone"
            :rules="rules.phoneRules"
            :counter="12"
            :density="density"
            prepend-icon="mdi-phone"
            label="Мобильный Телефон"
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="4">
          <v-text-field
            v-model="state.phone.work"
            @keydown="checkPhone"
            :rules="rules.phoneRules"
            :counter="12"
            :density="density"
            prepend-icon="mdi-phone"
            label="Рабочий Телефон"
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="4">
          <v-text-field
            v-model="state.phone.additional"
            @keydown="checkPhone"
            :rules="rules.phoneRules"
            :counter="12"
            :density="density"
            prepend-icon="mdi-phone"
            label="Дополнительный телефон"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="4">
          <v-text-field
            v-model="state.email.personal"
            @keydown="checkEmail"
            :rules="rules.emailRules"
            :density="density"
            prepend-icon="mdi-email"
            label="Личная Почта"
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="4">
          <v-text-field
            v-model="state.email.work"
            @keydown="checkEmail"
            :rules="rules.emailRules"
            :density="density"
            prepend-icon="mdi-email"
            label="Рабочая Почта"
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="4">
          <v-text-field
            v-model="state.email.additional"
            @keydown="checkEmail"
            :rules="rules.emailRules"
            :density="density"
            prepend-icon="mdi-email"
            label="Дополнительная Почта"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="3">
          <v-text-field
            v-model="state.social.telegram"
            :density="density"
            label="telegram"
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="3">
          <v-text-field
            v-model="state.social.whatsapp"
            prepend-icon="mdi-whatsapp"
            :density="density"
            label="whatsapp"
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="3">
          <v-text-field v-model="state.social.vk" :density="density" label="vk"></v-text-field>
        </v-col>
        <v-col cols="12" sm="3">
          <v-text-field
            v-model="state.social.instagram"
            prepend-icon="mdi-instagram"
            :density="density"
            label="instagram"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="4">
          <v-text-field
            v-model="state.birthday"
            prepend-icon="mdi-cake-layered"
            label="День рождения"
            type="date"
          >
          </v-text-field>
        </v-col>
        <v-col cols="12" sm="4">
          <v-text-field v-model="state.note" prepend-icon="mdi-text" label="Заметки"></v-text-field>
        </v-col>
      </v-row>
      <v-row align="center" justify="space-around">
        <v-col cols="6" sm="3">
          <v-btn type="submit">Сохранить контакт</v-btn>
        </v-col>
        <v-col cols="6" sm="3">
          <v-btn @click="onCancel">Отмена</v-btn>
        </v-col>
      </v-row>
      <v-alert type="warning" closable density="compact" v-model="showAlert" class="mt-2">
        <v-alert-title>
          Вы уверены что хотите выйти?
          <v-btn @click="$router.push('/')" color="red">Да</v-btn></v-alert-title
        >
      </v-alert>
    </v-container>
  </v-form>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { useDisplay } from 'vuetify'
import { mustBeLatin } from '@/helpers/helpers'
import { mustBeDigits } from '@/helpers/helpers'
import { v4 as uuidv4 } from 'uuid'

export default defineComponent({
  setup() {
    const router = useRouter()
    const store = useStore()
    const { name } = useDisplay()
    const density = computed(() => {
      if (name.value === 'xs') return 'compact'
      if (name.value === 'sm') return 'comfortable'
      else return 'default'
    })
    const avatarSize = computed(() => {
      if (name.value === 'xs') return '32'
      if (name.value === 'sm') return '64'
      else return '128'
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

    let state = reactive({
      id: '',
      photo: '',
      name: '',
      surname: '',
      phone: {
        mobile: '',
        work: '',
        additional: '',
      },
      email: {
        personal: '',
        work: '',
        additional: '',
      },
      social: {
        telegram: '',
        whatsapp: '',
        vk: '',
        instagram: '',
      },
      birthday: '',
      note: '',
    })

    const uploadImage = (e: any) => {
      if (e.target.files[0].size > 1000000) return
      let reader = new FileReader()
      reader.onload = () => {
        state.photo = reader.result as string
      }
      reader.readAsDataURL(e.target.files[0])
    }

    const refForm: any = ref()
    const valid = ref(false)

    const onSubmit = async () => {
      let result = await refForm.value.validate()
      console.log(result)
      if (result.valid) {
        state.id = uuidv4()
        store.commit('ADD_CONTACT', state)
        router.push('/')
      } else {
        alert('Error!')
      }
    }

    const showAlert = ref(false)
    const onCancel = () => {
      showAlert.value = true
    }

    return {
      rules,
      refForm,
      state,
      uploadImage,
      checkEmail,
      checkPhone,
      density,
      avatarSize,
      onSubmit,
      valid,
      onCancel,
      showAlert,
    }
  },
})
</script>

<style scoped></style>
