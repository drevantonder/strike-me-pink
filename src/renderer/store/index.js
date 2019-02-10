import Vue from 'vue'
import Vuex from 'vuex'

import uuidv4 from 'uuid/v4'

import { createPersistedState, createSharedMutations } from 'vuex-electron'

Vue.use(Vuex)

const state = {
  audio: [],
  edit: false
}

const mutations = {
  add (state, audio) {
    state.audio.push(audio)
  },

  update (state, audio) {
    const index = state.audio.findIndex(a => a.id === audio.id)
    state.audio[index] = audio
  },

  remove (state, audio) {
    state.audio = state.audio.filter(a => a.id !== audio.id)
  },

  setEdit (state, edit) {
    state.edit = edit
  }
}

const actions = {
  add (context, { name, file }) {
    context.commit('add', {
      id: uuidv4(),
      name,
      file: file
    })
  },

  update (context, audio) {
    context.commit('update', audio)
  },

  remove (context, audio) {
    context.commit('remove', audio)
  },

  toggleEdit (context) {
    context.commit('setEdit', !context.state.edit)
  }
}

export default new Vuex.Store({
  state,
  mutations,
  actions,
  plugins: [
    createPersistedState(),
    createSharedMutations()
  ],
  strict: process.env.NODE_ENV !== 'production'
})
