import offerHistory from '../api/offerHistory'

export default {
    state: {
        offerHistory: []
    },
    namespaced: true,
    mutations: {
        async saveOfferHistory(state, offerHistory) {
            state.offerHistory = offerHistory
        }
    },
    actions: {
        async saveOfferHistoryStore({commit}, id) {
            commit('saveOfferHistory', await offerHistory.offerHistory(id))
        },
    },
    getters: {
        getOfferHistory: state => state.offerHistory,
    },
}
