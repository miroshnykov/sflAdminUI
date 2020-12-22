import offers from '../api/offers'
import {reFormatJSON} from '../helpers'

export default {
    state: {
        offers: [],
    },
    namespaced: true,
    mutations: {
        async saveOffers(state, offers) {
            state.offers = offers
        }
    },
    actions: {
        async saveOffersStore({commit}) {
            debugger
            commit('saveOffers', await offers.getOffers())
        },
    },
    getters: {
        getOffers: state => state.offers,
    },

};
