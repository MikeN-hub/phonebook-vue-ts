import { v4 as uuidv4 } from 'uuid'

export type TypePhone = {
  mobile: string
  work: string
  additional: string
}

export type TypeEmail = {
  personal: string
  work: string
  additional: string
}

export type TypeSocial = {
  telegram: string
  whatsapp: string
  vk: string
  instagram: string
}

export default interface IContact {
  id: string
  photo: string
  name: string
  surname: string
  phone: TypePhone
  email: TypeEmail
  social: TypeSocial
  birthday: string
  note: string
}

export const initialState: IContact[] = [
  {
    id: uuidv4(),
    photo: '',
    name: 'Mike',
    surname: 'Tyson',
    phone: {
      mobile: '+79501234567',
      work: '223344',
      additional: '334455',
    },
    email: {
      personal: 'm.tyson@gmail.com',
      work: 'm.tyson@yandex.ru',
      additional: 'm.tyson@mail.ru',
    },
    social: {
      telegram: '@mike_tyson',
      whatsapp: 'https://miketyson.com/',
      vk: 'tyson-vk',
      instagram: 'tyson-insta',
    },
    birthday: '30-06-1966',
    note: 'uniq boxer',
  },

  {
    id: uuidv4(),
    photo: '',
    name: 'Mikle',
    surname: 'Jordan',
    phone: {
      mobile: '+79116789532',
      work: '657849',
      additional: '321567',
    },
    email: {
      personal: 'm.jordan@gmail.com',
      work: 'm.jordan@yandex.ru',
      additional: 'm.jordan@mail.ru',
    },
    social: {
      telegram: '@mikle_jordan',
      whatsapp: 'https://www.michaeljordansworld.com/',
      vk: 'jordan-vk',
      instagram: 'jordan-insta',
    },
    birthday: '17-02-1963',
    note: '',
  },
  {
    id: '3',
    photo: '',
    name: 'Michael',
    surname: 'Phelps',
    phone: {
      mobile: '+79525559897',
      work: '',
      additional: '',
    },
    email: {
      personal: 'm.phelps@gmail.com',
      work: 'm.phelps@yandex.ru',
      additional: 'm.phelps@mail.com',
    },
    social: {
      telegram: '@mphelps',
      whatsapp: 'https://michaelphelpsfoundation.org/',
      vk: 'Phelps-vk',
      instagram: 'Phelps-vk',
    },
    birthday: '30-06-1985',
    note: 'great professional swimmer',
  },
]

export const emptyContact: IContact = {
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
}
