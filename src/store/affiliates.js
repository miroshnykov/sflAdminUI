
import affiliates from '../api/affiliates'

export default {
    state: {
        affiliates:[],
    },
    namespaced: true,
    mutations: {
        async saveAffiliatesStore(state, affiliates) {
            state.affiliates = affiliates
        }
    },
    actions: {
        async saveAffiliatesStore ({ commit }) {
            commit('saveAffiliatesStore', await affiliates.affiliates())
        },
    },
    getters: {
        getAffiliates: state => state.affiliates,
    },

}
