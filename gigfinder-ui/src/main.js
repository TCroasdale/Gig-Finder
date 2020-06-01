import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import './plugins/bootstrap-vue'
import App from './App.vue'

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { BootstrapVue, BModal, VBModal } from 'bootstrap-vue'

Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.config.productionTip = false

Vue.use(BootstrapVue)
Vue.component('b-modal', BModal)
Vue.directive('b-modal', VBModal)

new Vue({
  render: h => h(App),
}).$mount('#app')
