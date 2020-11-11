import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
import user from "./modules/user"
import router from './modules/router';
import app from './modules/app'


const store = new Vuex.Store({
  modules:{
    user,
    app,
    router
  }
})

export default store