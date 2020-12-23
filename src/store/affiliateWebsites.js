import affiliateWebsites from '../api/affiliateWebsites'

export default {
    state: {
        affiliateWebsites:[]
    },
    namespaced: true,
    mutations: {
        async saveAffiliateWebsites(state, affiliateWebsites) {
            state.affiliateWebsites = affiliateWebsites
        }
    },
    actions: {
        async saveAffiliateWebsitesStore ({ commit }) {
            // commit('saveAffiliateWebsites', await affiliateWebsites.getAffiliateWebsites())
            commit('saveAffiliateWebsites', [])
        },
    },
    getters: {
        getAffiliateWebsites: state => state.affiliateWebsites,
    },
}
