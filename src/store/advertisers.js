
import advertisers from '../api/advertisers'

export default {
    state: {
        advertisers:[],
        sflAdvertisers:[],
        sflAdvertisersManagers:[],
    },
    namespaced: true,
    mutations: {
        async saveAdvertisers(state, advertisers) {
            state.advertisers = advertisers
        },
        async saveSflAdvertisers(state, sflAdvertisers) {
            state.sflAdvertisers = sflAdvertisers
        },
        async saveSflAdvertisersManagers(state, sflAdvertisersManagers) {
            state.sflAdvertisersManagers = sflAdvertisersManagers
        }
    },
    actions: {
        async saveAdvertisersStore ({ commit }) {
            commit('saveAdvertisers', await advertisers.advertisers())
        },
        async saveSflAdvertisersStore ({ commit }) {
            commit('saveSflAdvertisers', await advertisers.sflAdvertisers())
        },
        async saveSflAdvertisersManagersStore ({ commit }) {
            commit('saveSflAdvertisersManagers', await advertisers.sflAdvertisersManagers())
        },
    },
    getters: {
        getAdvertisers: state => state.advertisers,
        getSflAdvertisers: state => state.sflAdvertisers,
        getSflAdvertisersManagers: state => state.sflAdvertisersManagers,
    },

}
