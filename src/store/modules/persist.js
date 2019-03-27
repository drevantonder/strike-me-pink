import low from 'lowdb'
import FileSync from 'lowdb/adapters/FileSync'
import Store from 'electron-store'

const electronStore = new Store()

var adapter
var db

const state = {
  currentFile: undefined
}

const mutations = {
  setCurrentFile (state, file) {
    state.currentFile = file
  }
}

const actions = {
  loadCurrentFile (context) {
    // load the file saved in user data
    var currentFile = electronStore.get('currentFile')

    if (!currentFile) return

    context.dispatch('setCurrentFile', currentFile)

    this.replaceState({ ...this.state, ...db.getState() })

    context.dispatch('saveToCurrentFile')
  },

  saveToCurrentFile (context) {
    var defaults = {}
    var persistModules = []

    for (var moduleName in this._modules.root._children) {
      var module = this._modules.root._children[moduleName]
      var rawModule = module._rawModule

      if (rawModule.persist) {
        persistModules.push(moduleName)
        defaults[moduleName] = module.state
      }
    }

    db.defaults(defaults).write()

    this.subscribe((mutation, state) => {
      persistModules.forEach(moduleName => {
        var moduleState = state[moduleName]
        db.set(moduleName, moduleState)
          .write()
      })
    })
  },

  setCurrentFile (context, file) {
    // save the file in user data so that we know which file to open up startup
    electronStore.set('currentFile', file)

    context.commit('setCurrentFile', file)

    adapter = new FileSync(file)
    db = low(adapter)

    context.dispatch('saveToCurrentFile')
  }
}

export default {
  state,
  mutations,
  actions
}
