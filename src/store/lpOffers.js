import lpOffers from '../api/lpOffers'

export default {
    state: {
        lpOffers: [],
    },
    namespaced: true,
    mutations: {
        async saveLpOffers(state, lpOffers) {
            state.lpOffers = lpOffers
        }
    },
    actions: {
        async saveLpOffersStore({commit}) {
            commit('saveLpOffers', await lpOffers.lpOffers())
        },
        async createLpOffer({commit}, obj) {


        },
        async updateLpOffer({commit}, obj) {


        },
        async deleteLpOffer({commit}, obj) {


        },
    },
    getters: {
        getLpOffers: state => state.lpOffers,
    },

}
