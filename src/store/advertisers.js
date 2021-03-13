
import advertisers from '../api/advertisers'

export default {
    state: {
        advertisers:[],
        sflAdvertisers:[],
    },
    namespaced: true,
    mutations: {
        async saveAdvertisers(state, advertisers) {
            state.advertisers = advertisers
        },
        async saveSflAdvertisers(state, sflAdvertisers) {
            state.sflAdvertisers = sflAdvertisers
        }
    },
    actions: {
        async saveAdvertisersStore ({ commit }) {
            commit('saveAdvertisers', await advertisers.advertisers())
        },
        async saveSflAdvertisersStore ({ commit }) {
            commit('saveSflAdvertisers', await advertisers.sflAdvertisers())
        },
    },
    getters: {
        getAdvertisers: state => state.advertisers,
        getSflAdvertisers: state => state.sflAdvertisers,
    },

}
