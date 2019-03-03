import uuidv4 from 'uuid/v4'

const state = {
  items: [{
    id: 'aaa',
    name: 'Test',
    grid: {
      'x': 0,
      'y': 0,
      'w': 1,
      'h': 1
    }
  },
  {
    id: 'aaB',
    name: 'Test',
    grid: {
      'x': 1,
      'y': 0,
      'w': 1,
      'h': 1
    }
  }]
}

const mutations = {
  addGroup (state, group) {
    state.items.push(group)
  },

  updateGroup (state, group) {
    const index = state.items.findIndex(a => a.id === group.id)
    state.items[index] = group
  },

  removeGroup (state, group) {
    state.items = state.items.filter(a => a.id !== group.id)
  }
}

const actions = {
  addGroup (context, { name }) {
    context.commit('addGroup', {
      id: uuidv4(),
      name
    })
  },

  updateGroup (context, group) {
    context.commit('updateGroup', group)
  },

  removeGroup (context, group) {
    context.commit('removeGroup', group)
  }
}

export default {
  state,
  mutations,
  actions
}
