import uuidv4 from 'uuid/v4'

const state = {
  items: []
}

const mutations = {
  add (state, audio) {
    state.items.push(audio)
  },

  update (state, audio) {
    const index = state.items.findIndex(a => a.id === audio.id)
    state.items[index] = audio
  },

  remove (state, audio) {
    state.items = state.items.filter(a => a.id !== audio.id)
  }
}

const actions = {
  addAudio (context, data) {
    context.commit('add', {
      id: uuidv4(),
      ...data
    })
  },

  updateAudio (context, audio) {
    context.commit('update', audio)
  },

  removeAudio (context, audio) {
    context.commit('remove', audio)
  }
}

export default {
  state,
  mutations,
  actions
}
