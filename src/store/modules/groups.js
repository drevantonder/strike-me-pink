import uuidv4 from 'uuid/v4'
import Vue from 'vue'

const state = {
  items: {},
  groupsPerRow: 6
}

const getters = {
  groupIds: state => Object.keys(state.items),
  groupList: state => Object.values(state.items)
}

const mutations = {
  setGroup (state, group) {
    Vue.set(state.items, group.id, group)
  },

  removeGroup (state, group) {
    Vue.delete(state.items, group.id)
  }
}

const actions = {
  addGroup (context, { name }) {
    if (context.getters.groupIds.length) {
      let lastGroupGrid
      context.getters.groupList.forEach(group => {
        if (!lastGroupGrid || (group.grid.y >= lastGroupGrid.y && group.grid.x > lastGroupGrid.x)) {
          lastGroupGrid = group.grid
        }
      })

      var x
      var y
      if (lastGroupGrid.x === context.state.groupsPerRow - 1) {
        x = 0
        y = lastGroupGrid.y + lastGroupGrid.h
      } else {
        x = lastGroupGrid.x + lastGroupGrid.w
        y = lastGroupGrid.y
      }
    } else {
      x = 0
      y = 0
    }

    var grid = {
      x,
      y,
      w: 1,
      h: 1
    }

    context.commit('setGroup', {
      id: uuidv4(),
      name,
      grid
    })
  },

  updateGroup (context, group) {
    context.commit('setGroup', group)
  },

  removeGroup (context, group) {
    context.commit('removeGroup', group)
  }
}

export default {
  state,
  getters,
  mutations,
  actions,
  persist: true
}
