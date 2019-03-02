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
  add (state, group) {
    state.items.push(group)
  },

  update (state, group) {
    const index = state.items.findIndex(a => a.id === group.id)
    state.items[index] = group
  },

  remove (state, group) {
    state.items = state.items.filter(a => a.id !== group.id)
  }
}

const actions = {
  addGroup (context, { name }) {
    context.commit('add', {
      id: uuidv4(),
      name
    })
  },

  updateGroup (context, group) {
    context.commit('update', group)
  },

  removeGroup (context, group) {
    context.commit('remove', group)
  }
}

export default {
  state,
  mutations,
  actions
}
