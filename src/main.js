import Vue from 'vue'
import path from 'path'
import './sass/main.sass'
import '@fortawesome/fontawesome-pro/css/all.css'

import App from './App'
import store from './store'

import './components/bulma'

import VueDragDrop from 'vue-drag-drop'
import GlobalEvents from 'vue-global-events'
import PortalVue from 'portal-vue'

Vue.use(PortalVue)
Vue.use(VueDragDrop)
Vue.component('GlobalEvents', GlobalEvents)

Vue.config.productionTip = false

Vue.filter('getFileAttribute', (file, attribute) => {
  try {
    return path.parse(file)[attribute]
  } catch (error) {
    // see https://nodejs.org/docs/latest/api/path.html#path_path_parse_path
    // TypeError is throw if path.parse's parameter is not a string
    if (!(error instanceof TypeError)) {
      throw error
    }
  }
})

// https://nklayman.github.io/vue-cli-plugin-electron-builder/guide/commonIssues.html#exceptions-in-async-functions-not-getting-logged-to-console
process.on('unhandledRejection', error => {
  console.error(error)
})

/* eslint-disable no-new */
new Vue({
  components: { App },
  store,
  render: h => h(App)
}).$mount('#app')
