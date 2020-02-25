import Vue from 'vue'
import App from './App.vue'

import messages from './assets/language/index'
import VueI18n from 'vue-i18n'

import { Radio, RadioGroup, Checkbox, Select, Option, CheckboxGroup, Dialog, Switch, Upload, Button, Table, TableColumn } from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(VueI18n)
Vue.use(Radio)
Vue.use(RadioGroup)
Vue.use(Checkbox)
Vue.use(Select)
Vue.use(Option)
Vue.use(CheckboxGroup)
Vue.use(Dialog)
Vue.use(Switch)
Vue.use(Upload)
Vue.use(Button)
Vue.use(Table)
Vue.use(TableColumn)

Vue.config.productionTip = false

const i18n = new VueI18n({
  locale: 'cn', // 语言标识
  messages
})

new Vue({
  el: '#app',
  render: h => h(App),
  i18n
}).$mount('#app')
