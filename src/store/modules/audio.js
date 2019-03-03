import uuidv4 from 'uuid/v4'

const state = {
  items: []
}

const mutations = {
  addAudio (state, audio) {
    state.items.push(audio)
  },

  updateAudio (state, audio) {
    const index = state.items.findIndex(a => a.id === audio.id)
    state.items[index] = audio
  },

  removeAudio (state, audio) {
    state.items = state.items.filter(a => a.id !== audio.id)
  }
}

const actions = {
  addAudio (context, data) {
    context.commit('addAudio', {
      id: uuidv4(),
      ...data
    })
  },

  updateAudio (context, audio) {
    context.commit('updateAudio', audio)
  },

  removeAudio (context, audio) {
    context.commit('removeAudio', audio)
  }
}

export default {
  state,
  mutations,
  actions
}
