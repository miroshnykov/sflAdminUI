
import lp from '../api/lp'

export default {
    state: {
        lp:[],
    },
    namespaced: true,
    mutations: {
        async saveLPStore(state, lp) {
            state.lp = lp
        }
    },
    actions: {
        async saveLPStore ({ commit }) {
            commit('saveLPStore', await lp.lp())
        },
    },
    getters: {
        getLandingPages: state => state.lp,
    },

}
