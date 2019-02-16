import Vue from 'vue'
import Vuex from 'vuex'

import { createPersistedState, createSharedMutations } from 'vuex-electron'

import modules from './modules'

Vue.use(Vuex)

const state = {
  edit: false
}

const mutations = {
  setEdit (state, edit) {
    state.edit = edit
  }
}

const actions = {
  toggleEdit (context) {
    context.commit('setEdit', !context.state.edit)
  }
}

export default new Vuex.Store({
  state,
  mutations,
  actions,
  modules,
  plugins: [
    createPersistedState(),
    createSharedMutations()
  ],
  strict: process.env.NODE_ENV !== 'production'
})
