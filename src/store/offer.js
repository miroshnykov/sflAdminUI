import {reFormatJSON} from '../helpers'
import offer from '../api/offer'

export default {
    state: {
        offer: [],
    },
    namespaced: true,
    mutations: {
        async saveOffer(state, offer) {
            state.offer = offer
        }
    },
    actions: {
        async saveOfferStore({commit},id) {
            commit('saveOffer', await offer.getOffer(id))
        },
        async createOffer({commit}, data) {
            const {name} = data
            return await offer.createOffer(name)
        },
        async delOffer({commit}, data) {
            const {id} = data
            return await offer.delOffer(id)
        },
    },
    getters: {
        getOffer: state => state.offer,
    },

};
