import campaigns from '../api/campaigns'
import {reFormatJSON} from '../helpers'

export default {
    state: {
        campaigns: [],
    },
    namespaced: true,
    mutations: {
        async saveCampaigns(state, campaigns) {
            state.campaigns = campaigns
        }
    },
    actions: {
        async saveCampaignsStore({commit}) {
            commit('saveCampaigns', await campaigns.getCampaigns())
        },
    },
    getters: {
        getAffiliateCampaigns: (state) => (data) => {
            let affiliateId = data.value
            if (data.dimensionName !== 'affiliate_campaign') return
            if (!affiliateId || affiliateId === '/') return
            if (!state.campaigns) return

            // console.log(' >>> getAffiliateCampaigns:')
            // console.table(reFormatJSON(data))

            let aff = affiliateId.substr(0, affiliateId.indexOf('/'))
            let affiliateCampaigns = state.campaigns.filter(campaign => campaign.affiliateId === Number(aff))
            console.log('affiliateCampaigns')
            console.table(reFormatJSON(affiliateCampaigns))

            return affiliateCampaigns
        }
    },

};
