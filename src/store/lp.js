import lp from '../api/lp'

export default {
    state: {
        lp: [],
    },
    namespaced: true,
    mutations: {
        async saveLPStore(state, lp) {
            state.lp = lp
        }
    },
    actions: {
        async saveLPStore({commit}) {
            commit('saveLPStore', await lp.lp())
        },
        async createSegmentLp({commit}, obj) {
            const {segmentId, lpId, weight} = obj
            return await lp.createSegmentLp(segmentId, lpId, weight)

        },
        async updateSegmentLp({commit}, obj) {
            const {id, segmentId, lpId, weight} = obj
            return await lp.updateSegmentLp(id, segmentId, lpId, weight)

        },
        async deleteSegmentLp({commit}, obj) {
            const {id} = obj
            return await lp.deleteSegmentLp(id)

        },
    },
    getters: {
        getLandingPages: state => state.lp,
    },

}
