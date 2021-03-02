
import advertisers from '../api/advertisers'

export default {
    state: {
        advertisers:[],
    },
    namespaced: true,
    mutations: {
        async saveAdvertisers(state, advertisers) {
            state.advertisers = advertisers
        }
    },
    actions: {
        async saveAdvertisersStore ({ commit }) {
            commit('saveAdvertisers', await advertisers.advertisers())
        },
    },
    getters: {
        getAdvertisers: state => state.advertisers,
    },

}
