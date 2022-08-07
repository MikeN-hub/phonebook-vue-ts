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
  instagramm: string
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
    id: '1',
    photo: '',
    name: 'Mike',
    surname: 'Tyson',
    phone: {
      mobile: '+79501234567',
      work: '',
      additional: '',
    },
    email: {
      personal: 'm.tyson@gmail.com',
      work: '',
      additional: '',
    },
    social: {
      telegram: 'telegram',
      whatsapp: '',
      vk: '',
      instagramm: '',
    },
    birthday: '21-09-1979',
    note: '',
  },
  {
    id: '2',
    photo: '',
    name: 'Bred',
    surname: 'Traversy',
    phone: {
      mobile: '+79525556667',
      work: '',
      additional: '',
    },
    email: {
      personal: 'brad.traversy@gmail.com',
      work: '',
      additional: '',
    },
    social: {
      telegram: 'telegram',
      whatsapp: '',
      vk: '',
      instagramm: '',
    },
    birthday: '15-07-1980',
    note: '',
  },
  {
    id: '3',
    photo: '',
    name: 'Aaron',
    surname: 'Gordon',
    phone: {
      mobile: '+79525559897',
      work: '',
      additional: '',
    },
    email: {
      personal: 'aarongordon@gmail.com',
      work: '',
      additional: '',
    },
    social: {
      telegram: 'telegram',
      whatsapp: '',
      vk: '',
      instagramm: '',
    },
    birthday: '12-02-1992',
    note: '',
  },
]
