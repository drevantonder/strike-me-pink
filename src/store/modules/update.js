import { ipcRenderer } from 'electron'

const state = {
  currentVersion: undefined
}

const mutations = {
  setCurrentVersion (state, currentVersion) {
    state.currentVersion = currentVersion
  }
}

const actions = {
  init (context) {
    ipcRenderer.on('currentVersion', (event, currentVersion) => {
      context.commit('setCurrentVersion', currentVersion.version)
    })
  }
}

export default {
  state,
  mutations,
  actions,
  persist: true
}
