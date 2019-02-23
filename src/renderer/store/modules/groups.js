import uuidv4 from 'uuid/v4'

const state = {
  groups: [{
    id: 'aaa',
    name: 'Test'
  }]
}

const mutations = {
  add (state, group) {
    state.groups.push(group)
  },

  update (state, group) {
    const index = state.group.findIndex(a => a.id === group.id)
    state.groups[index] = group
  },

  remove (state, group) {
    state.groups = state.groups.filter(a => a.id !== group.id)
  }
}

const actions = {
  add (context, { name }) {
    context.commit('add', {
      id: uuidv4(),
      name
    })
  },

  update (context, group) {
    context.commit('update', group)
  },

  remove (context, group) {
    context.commit('remove', group)
  }
}

export default {
  state,
  mutations,
  actions,
  namespaced: true
}
