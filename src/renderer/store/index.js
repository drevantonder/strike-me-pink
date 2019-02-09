import Vue from 'vue'
import Vuex from 'vuex'

import uuidv4 from 'uuid/v4'
import path from 'path'
import fs from 'fs'

import { createPersistedState, createSharedMutations } from 'vuex-electron'

const SAVE_PATH = __static

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

  setEdit (state, edit) {
    state.edit = edit
  }
}

const actions = {
  add (context, { name, file }) {
    var newFile = name.replace(/[^a-zA-Z0-9]+/g, '-').toLowerCase() + path.extname(file)

    fs.copyFile(file, path.join(SAVE_PATH, newFile), (err) => {
      if (err) throw err
      context.commit('add', {
        id: uuidv4(),
        name,
        file: newFile
      })
    })
  },

  update (context, audio) {
    this.commit('update', audio)
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
