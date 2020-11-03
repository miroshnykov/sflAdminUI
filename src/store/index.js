import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
import googleAuth from './googleAuth'
import user from './user'
import segments from './segments'

export default new Vuex.Store({
    state: {
        firstName: '',
        lastName: '',
    },
    modules: {
        googleAuth,
        user,
        segments
    }
})