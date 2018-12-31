import Vue from 'vue'
import 'bulma/bulma.sass'
import '@fortawesome/fontawesome-pro/css/all.css'

import App from './App'
import router from './router'
import store from './store'

import './components/bulma'

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')
