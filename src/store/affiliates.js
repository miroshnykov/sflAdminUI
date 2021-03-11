import affiliates from '../api/affiliates'

export default {
    state: {
        affiliates: [],
    },
    namespaced: true,
    mutations: {
        async saveAffiliatesStore(state, affiliates) {
            let aff_ = []
            affiliates.forEach(item => {
                let checkExists = state.affiliates.filter(i => (i.id === item.id))
                if (checkExists.length === 0) {
                    aff_.push(item)
                }
            })
            state.affiliates = state.affiliates.concat(aff_)
        }
    },
    actions: {
        async saveAffiliatesStore({commit}, data) {
            const {filter, segmentId} = data
            if (segmentId) {
                commit('saveAffiliatesStore', await affiliates.getAffiliatesBySegmentId(segmentId))
            } else {
                commit('saveAffiliatesStore', await affiliates.getAffiliatesByFilter(filter))
            }

        },
    },
    getters: {
        getAffiliates: state => state.affiliates,
    },

}
