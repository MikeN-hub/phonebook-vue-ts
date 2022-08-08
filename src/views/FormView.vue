<template>
  <v-form @submit.prevent="onSubmit" ref="form">
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
          >
          </v-text-field>
        </v-col>
        <!-- <v-col cols="12" sm="4">
          <input type="date" v-model="state.birthday" placeholder="День рождения" />
        </v-col> -->
        <v-col cols="12" sm="4">
          <v-text-field v-model="state.note" prepend-icon="mdi-text" label="Заметки"></v-text-field>
        </v-col>
      </v-row>
      <v-btn type="submit">Submit Form</v-btn>
    </v-container>
  </v-form>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, onMounted, computed, watch } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { useDisplay } from 'vuetify'
import { mustBeLatin } from '@/helpers/helpers'
import { mustBeDigits } from '@/helpers/helpers'
import { isValidHttpUrl } from '@/helpers/helpers'
import { v4 as uuidv4 } from 'uuid'

export default defineComponent({
  setup() {
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

    const state = reactive({
      id: uuidv4(),
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

    const form = ref()

    const onSubmit = async () => {
      let result = await form.value.validate()
      if (result.valid) {
        store.commit('ADD_CONTACT', state)
      }
    }

    return {
      rules,
      form,
      state,
      uploadImage,
      checkEmail,
      checkPhone,
      density,
      avatarSize,
      onSubmit,
    }
  },
})
</script>

<style scoped></style>
