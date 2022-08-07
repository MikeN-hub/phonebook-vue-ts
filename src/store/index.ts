import { createStore } from 'vuex'
import { initialState } from '@/Models/Icontact'
import IContact from '@/Models/Icontact'

export default createStore({
  state: {
    contacts: initialState,
    currentId: '',
    currentContact: {},
    searchQuery: '',
  },
  getters: {
    getContacts(state) {
      return state.contacts
    },
    getCurrentId(state) {
      return state.currentId
    },
    getCurrentContact(state) {
      return state.currentContact
    },
    getTotalContactsCount(state) {
      return state.contacts.length
    },
    getSearchQuery(state) {
      return state.searchQuery
    },
    getSortedContacts(state) {
      return state.contacts.sort((a,b) => {
        const nameA = a.name.toLowerCase()
        const nameB = b.name.toLowerCase()
        if(nameA < nameB) return -1
        if(nameA > nameB) return 1
        return 0
      })
    }
  },
  mutations: {
    SET_CONTACTS(state, payload) {
      state.contacts = payload
    },
    SET_CURRENT_ID(state, payload: string) {
      state.currentId = payload
    },
    SET_CURRENT_CONTACT(state, payload: IContact) {
      if (payload) {
        state.currentContact = payload
      } else {
        const index = state.contacts.findIndex((contact) => contact.id === state.currentId)
        state.currentContact = state.contacts[index]
      }
    },
    SET_SEARCH_QUERY(state, payload) {
      state.searchQuery = payload
    },
    ADD_CONTACT(state, payload: IContact) {
      state.contacts.push(payload)
      localStorage.setItem('contacts', JSON.stringify(state.contacts))
    },
    REMOVE_CONTACT(state, payload: string) {
      state.contacts = state.contacts.filter((contact) => contact.id !== payload)
      localStorage.setItem('contacts', JSON.stringify(state.contacts))
    },
    UPDATE_CONTACT(state, payload: IContact) {
      const contact = state.contacts.find((item) => item.id === payload.id)
      const index = state.contacts.indexOf(contact as IContact)
      state.contacts[index] = payload
      localStorage.setItem('contacts', JSON.stringify(state.contacts))
    },
  },
  actions: {
    fetchContacts({ commit }) {
      const storageData = localStorage.getItem('contacts')
      if (storageData) {
        const data = JSON.parse(storageData)
        commit('SET_CONTACTS', data)
      }
    },
  },
})