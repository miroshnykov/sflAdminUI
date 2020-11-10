
import prods from '../api/prods'

export default {
    state: {
        prods:[],
    },
    namespaced: true,
    mutations: {
        async saveProds(state, prods) {
            state.prods = prods
        }
    },
    actions: {
        async saveProdsStore ({ commit }) {
            commit('saveProds', await prods.prods())
        },
    },
    getters: {
        getProds: state => state.prods,
    },

}
