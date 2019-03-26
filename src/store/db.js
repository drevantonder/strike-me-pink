const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

export default file => store => {
  var adapter = new FileSync(file)
  var db = low(adapter)

  var defaults = {}
  var persistModules = []

  for (var moduleName in store['_modules']['root']['_children']) {
    var module = store['_modules']['root']['_children'][moduleName]
    var rawModule = module['_rawModule']

    if (rawModule.persist) {
      persistModules.push(moduleName)
      defaults[moduleName] = module.state
    }
  }

  db.defaults(defaults).write()

  store.subscribe((mutation, state) => {
    persistModules.forEach(moduleName => {
      var moduleState = state[moduleName]
      db.set(moduleName, moduleState)
        .write()
    })
  })
}
