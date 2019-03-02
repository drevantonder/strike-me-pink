import uuidv4 from 'uuid/v4'

const state = {
  audio: []
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
  }
}

const actions = {
  add (context, data) {
    context.commit('add', {
      id: uuidv4(),
      ...data
    })
  },

  update (context, audio) {
    context.commit('update', audio)
  },

  remove (context, audio) {
    context.commit('remove', audio)
  }
}

export default {
  state,
  mutations,
  actions,
  namespaced: true
}
