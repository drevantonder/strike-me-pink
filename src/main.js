import Vue from 'vue'
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

/* eslint-disable no-new */
new Vue({
  components: { App },
  store,
  render: h => h(App)
}).$mount('#app')
