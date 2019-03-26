import uuidv4 from 'uuid/v4'
import Vue from 'vue'

const state = {
  items: {}
}

const getters = {
  audioIds: state => Object.keys(state.items),
  audioList: state => Object.values(state.items)
}

const mutations = {
  setAudio (state, audio) {
    Vue.set(state.items, audio.id, audio)
  },

  removeAudio (state, audio) {
    Vue.delete(state.items, audio.id)
  }
}

const actions = {
  addAudio (context, data) {
    context.commit('setAudio', {
      id: uuidv4(),
      ...data
    })
  },

  updateAudio (context, audio) {
    context.commit('setAudio', audio)
  },

  removeAudio (context, audio) {
    context.commit('removeAudio', audio)
  },

  removeAudioByGroup (context, groupId) {
    context.getters.audioList.forEach(audio => {
      if (audio.groupId === groupId) {
        context.commit('removeAudio', audio)
      }
    })
  }
}

export default {
  state,
  getters,
  mutations,
  actions,
  persist: true
}
