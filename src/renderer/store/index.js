import Vue from 'vue'
import Vuex from 'vuex'

import fs from 'fs'
import path from 'path'

import { createPersistedState, createSharedMutations } from 'vuex-electron'

Vue.use(Vuex)

const state = {
  audio: []
}

const mutations = {
  add (state, audio) {
    state.audio.push(audio)
  }
}

const actions = {
  add (context, { name, file }) {
    const fileName = name.replace(/\s+/g, '-').toLowerCase() + file.ext
    const newPath = path.join(__static, fileName)

    fs.copyFile(path.join(file.dir, file.base), newPath, (err) => {
      if (err) throw err
      context.commit('add', {
        name,
        file: fileName
      })
    })
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
