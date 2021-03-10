import campaigns from '../api/campaigns'
import {reFormatJSON} from '../helpers'

export default {
    state: {
        campaigns: [],
        affCampaigns: [],
    },
    namespaced: true,
    mutations: {
        async saveCampaigns(state, campaigns) {
            state.affCampaigns = campaigns
        },
        async saveAffCampaigns(state, campaigns) {
            campaigns = campaigns.filter(i => (i.affiliateId !== 0))
            let affCampaigns_ = []
            campaigns.forEach(item => {
                let checkExists = state.affCampaigns.filter(i => (i.id === item.id))
                if (checkExists.length === 0) {
                    affCampaigns_.push(item)
                }
            })
            state.affCampaigns = state.affCampaigns.concat(affCampaigns_)
        }
    },
    actions: {
        async saveCampaignsStore({commit}, segmentId) {
            commit('saveCampaigns', await campaigns.getCampaigns(segmentId))
        },
        async getCampaignsByAffIdStore({commit}, affId) {
            commit('saveAffCampaigns', await campaigns.getCampaign(Number(affId)))
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
            let affiliateCampaigns = state.affCampaigns.filter(campaign => campaign.affiliateId === Number(aff))
            // console.log('affiliateCampaigns')
            // console.table(reFormatJSON(affiliateCampaigns))

            return affiliateCampaigns
        }
    },

};
