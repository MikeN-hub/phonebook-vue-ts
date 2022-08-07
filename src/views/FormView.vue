<template>
  <v-form v-model="valid">
    <v-container>
      <v-row align="center" justify="space-around">
        <v-col cols="12" sm="6">
          <v-file-input
            accept="image/*"
            label="Загрузить фото"
            prepend-icon="mdi-camera"
            show-size
            :rules="rules.photoRules"
            @change="uploadImage"
          >
          </v-file-input>
        </v-col>
        <v-col cols="12" sm="6" align="center">
          <v-avatar size="128">
            <v-img :src="file" cover></v-img>
          </v-avatar>
        </v-col>
      </v-row>
      <v-row align="center" justify="space-around">
        <v-col cols="12" sm="6">
          <v-text-field
            v-model="state.name"
            :rules="rules.nameRules"
            :counter="10"
            label="Имя"
            required
          ></v-text-field>
        </v-col>

        <v-col cols="12" sm="6">
          <v-text-field
            v-model="state.surname"
            :rules="rules.nameRules"
            :counter="10"
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
            label="Мобильный Телефон"
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="4">
          <v-text-field
            v-model="state.phone.work"
            @keydown="checkPhone"
            :rules="rules.phoneRules"
            label="Рабочий Телефон"
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="4">
          <v-text-field
            v-model="state.phone.additional"
            @keydown="checkPhone"
            :rules="rules.phoneRules"
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
            label="Личная Почта"
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="4">
          <v-text-field
            v-model="state.email.work"
            @keydown="checkEmail"
            :rules="rules.emailRules"
            label="Рабочая Почта"
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="4">
          <v-text-field
            v-model="state.email.additional"
            @keydown="checkEmail"
            :rules="rules.emailRules"
            label="Дополнительная Почта"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="3">
          <v-text-field v-model="state.social.telegram" label="Социальные сети"></v-text-field>
        </v-col>
        <v-col cols="12" sm="3">
          <v-text-field v-model="state.social.whatsapp" label="whatsapp"></v-text-field>
        </v-col>
        <v-col cols="12" sm="3">
          <v-text-field v-model="state.social.vk" label="vk"></v-text-field>
        </v-col>
        <v-col cols="12" sm="3">
          <v-text-field v-model="state.social.instagram" label="instagram"></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-text-field label="Заметки"></v-text-field>
        </v-col>
      </v-row>
      <input type="url" />
    </v-container>
  </v-form>
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { mustBeLatin } from '@/helpers/helpers'
import { mustBeDigits } from '@/helpers/helpers'
import { isValidHttpUrl } from '@/helpers/helpers'

export default defineComponent({
  setup() {
    const rules = {
      photoRules: [
        (v: any) =>
          !v || !v.length || v[0].size < 1000000 || 'Размер фото не должен превышать 1 Mb',
      ],
      nameRules: [(v: any) => !!v || 'Имя обязательно'],
      phoneRules: [
        (v: any) =>
          /^[\d ()+-]{5,16}$/.test(v) ||
          'Телефон должен быть от 5 до 16 символов, включая цифры и знаки +-',
      ],
      emailRules: [
        (v: any) =>
          /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i.test(v) ||
          'Некорректный адрес электронной почты',
      ],
      // socialRules: [(v: any) => 'Social must be valid'],
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

    const valid = ref(false)

    const state = reactive({
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

    const file = ref()

    const uploadImage = (e: any) => {
      if (e.target.files[0].size > 1000000) return
      let reader = new FileReader()
      reader.onload = () => {
        file.value = reader.result
      }
      reader.readAsDataURL(e.target.files[0])
    }

    return { rules, valid, state, uploadImage, file, checkEmail, checkPhone }
  },
})
</script>

<style scoped></style>
