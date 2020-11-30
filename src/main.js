// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Cookies from 'js-cookie'
import App from './App'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/reset.css'
import './assets/index.css'

import Bus from "./bus/bus"
window.Bus = Bus;

// import Cesium from 'cesium/Source/Cesium'
import Cesium from 'cesium/Source/Cesium'
import 'cesium/Source/Widgets/widgets.css'
// import CesiumNavigation from "cesium-navigation-es6";

Vue.prototype.Cesium=Cesium;
import echarts from 'echarts'
import axios from 'axios'
Vue.prototype.$axios = axios;


Vue.use(ElementUI,echarts)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
