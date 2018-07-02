// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import { router } from './router'
import commonComponents from "@/components"

import Vant from "vant"
import 'vant/packages/vant-css/src/index.css'
// import "@/assets/fonts/iconfont.css";
Vue.use(Vant)

Vue.config.productionTip = false
Object.keys(commonComponents).forEach(key => {
    Vue.component(key, commonComponents[key])
})

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>'
})
