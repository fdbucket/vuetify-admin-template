import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import pageTitle from 'vue-wechat-title'
import './router/permission'
import api from './api'
import './mock'

Vue.use(pageTitle)
Vue.prototype.$api = api
Vue.config.productionTip = false

new Vue({
    router,
    store,
    vuetify,
    render: h => h(App)
}).$mount('#app')
