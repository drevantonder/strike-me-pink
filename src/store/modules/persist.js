import Store from 'electron-store'
import fs from 'fs'

const { dialog, getCurrentWindow } = require('electron').remote

const electronStore = new Store()

const fileFilters = [{ name: 'Strike Me Pink File', extensions: ['smp'] }]

const showSaveDialog = () => dialog.showSaveDialog(getCurrentWindow(), {
  title: 'Save Project',
  filters: fileFilters
})

const showOpenDialog = () => dialog.showOpenDialog(getCurrentWindow(), {
  title: 'Open Project',
  filters: fileFilters
})

const getModules = store => {
  var modules = []

  for (var moduleName in store._modules.root._children) {
    var module = store._modules.root._children[moduleName]

    modules.push({ ...module, name: moduleName })
  }

  return modules
}

const getModulesToPersist = store => getModules(store).filter(module => module._rawModule.persist)

const readJsonFile = file => JSON.parse(fs.readFileSync(file))
const writeJsonFile = (file, data) => fs.writeFileSync(file, JSON.stringify(data))

const state = {
  currentFile: undefined,
  autoSave: false,
  hasUnsavedChanges: false
}

const mutations = {
  setCurrentFile (state, file) {
    state.currentFile = file
  },

  setAutoSave (state, autoSave) {
    state.autoSave = autoSave
  },

  setHasUnsavedChanges (state, autoSave) {
    state.hasUnsavedChanges = autoSave
  }
}

const actions = {
  init (context) {
    context.dispatch('loadCurrentFile')
    context.dispatch('loadAutoSave')

    this.subscribe((mutation, state) => {
      if (mutation.type === 'setHasUnsavedChanges') return

      var change = false
      getModulesToPersist(this).forEach(module => {
        if (module._rawModule.mutations[mutation.type] !== undefined) {
          change = true
        }
      })

      if (context.state.autoSave && change) {
        context.dispatch('saveToCurrentFile')
        context.commit('setHasUnsavedChanges', false)
      } else {
        context.commit('setHasUnsavedChanges', true)
      }
    })
  },

  // File Menu Actions

  newProject (context) {
    context.dispatch('unsetCurrentFile')

    var initialState = getModulesToPersist(this).map(module => module.state)

    this.replaceState({ ...this.state, ...initialState })
  },

  saveProject (context) {
    if (context.state.currentFile !== undefined) {
      context.dispatch('saveToCurrentFile')
    } else {
      context.dispatch('saveProjectAs')
    }
  },

  saveProjectAs (context) {
    var currentFile = showSaveDialog()

    if (!currentFile) return

    context.dispatch('setCurrentFile', currentFile)
    context.dispatch('saveToCurrentFile')
  },

  openProject (context) {
    var selectedFiles = showOpenDialog()

    if (!selectedFiles || selectedFiles.length === 0) return

    var currentFile = selectedFiles[0]

    context.dispatch('setCurrentFile', currentFile)
    context.dispatch('loadCurrentFile', currentFile)
  },

  // File Methods

  loadCurrentFile (context) {
    // load the file saved in user data
    var currentFile = electronStore.get('currentFile')

    if (!currentFile) return

    context.dispatch('setCurrentFile', currentFile)

    this.replaceState({ ...this.state, ...readJsonFile(currentFile) })

    context.dispatch('saveToCurrentFile')
  },

  saveToCurrentFile (context) {
    var persistModules = getModulesToPersist(this)
    var data = {}

    persistModules.forEach(module => {
      data[module.name] = this.state[module.name]
    })

    writeJsonFile(context.state.currentFile, data)

    context.commit('setHasUnsavedChanges', false)
  },

  unsetCurrentFile (context) {
    context.commit('setCurrentFile', undefined)

    electronStore.delete('currentFile')
  },

  setCurrentFile (context, file) {
    context.commit('setCurrentFile', file)

    // save the file in user data so that we know which file to open up startup
    electronStore.set('currentFile', file)
  },

  // Automatic saving

  setAutoSave (context, autoSave) {
    context.commit('setAutoSave', autoSave)

    electronStore.set('autoSave', autoSave)

    if (autoSave && context.state.currentFile) {
      context.dispatch('saveToCurrentFile')
    }
  },

  loadAutoSave (context) {
    var autoSave = electronStore.get('autoSave')

    if (autoSave === undefined) return

    context.dispatch('setAutoSave', autoSave)
  }
}

export default {
  state,
  mutations,
  actions
}
