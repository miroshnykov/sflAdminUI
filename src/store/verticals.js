
import verticals from '../api/verticals'

export default {
    state: {
        verticals:[]
    },
    namespaced: true,
    mutations: {
        async saveVerticals(state, verticals) {
            state.verticals = verticals
        }
    },
    actions: {
        async saveVerticalsStore ({ commit }) {
            commit('saveVerticals', await verticals.verticals())
        },

    },
    getters: {
        getVerticals: state => state.verticals,
    },

}
