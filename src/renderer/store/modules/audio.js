const state = {
  audio: []
}

const mutations = {
  add (state, audio) {
    state.audio.push(audio)
  }
}

const actions = {
  add (context, audio) {
    context.commit('add', audio)
  }
}

export default {
  state,
  mutations,
  actions,
  namespaced: true
}
