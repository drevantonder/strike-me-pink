import Vue from 'vue'
import Vuex from 'vuex'

import modules from './modules'

import { createPersistedState } from 'vuex-electron'

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
  setEdit (context, edit) {
    context.commit('setEdit', edit)
  }
}

export default new Vuex.Store({
  state,
  mutations,
  actions,
  modules,
  plugins: [createPersistedState()],
  strict: process.env.NODE_ENV !== 'production'
})
