import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import './assets/fonts/fonts.css'
import VueApexCharts from 'vue-apexcharts'
import zoom from 'chartjs-plugin-zoom'

Vue.use(VueApexCharts)
Vue.use(zoom)

Vue.component('apexchart', VueApexCharts)

Vue.config.productionTip = false;
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')