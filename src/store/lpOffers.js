import lpOffers from '../api/lpOffers'

export default {
    state: {
        lpOffers: [],
    },
    namespaced: true,
    mutations: {
        async saveLpOffers(state, lpOffers) {
            state.lpOffers = lpOffers
        },
        async addLpOffers(state, lp) {
            state.lpOffers.push(lp)
        }
    },
    actions: {
        async saveLpOffersStore({commit}) {
            commit('saveLpOffers', await lpOffers.lpOffers())
        },
        async createLpOfferDb({commit}, obj) {
            let res = await lpOffers.createLpOffer(obj)
            obj.id = res.id
            commit('addLpOffers', obj)
            return res
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
