import segments from '../api/segments'
import {reFormatJSON} from '../helpers'

export default {
    state: {
        segments: [],
        segmentsOrigin: [],
    },
    namespaced: true,
    mutations: {
        async saveSegments(state, segments) {
            state.segments = segments
            state.segmentsOrigin = segments
        },
        activeInactive(state, status) {
            state.segments = state.segmentsOrigin
            const statusStr = status && 'active' || 'inactive'
            state.segments = state.segments.filter(({status}) => (status === statusStr))
        },
        searchFilter(state, searchText) {
            state.segments = state.segmentsOrigin
            state.segments = searchText ? state.segments.filter(({name}) => (name.toLowerCase().includes(searchText.toLowerCase()))) : state.segmentsOrigin
        }
    },
    actions: {
        async saveSegmentsStore({commit}, segmentType) {
            let segmentsData = await segments.segments(segmentType)
            console.log(`saveSegmentsStore`)
            console.table(reFormatJSON(segmentsData))
            commit('saveSegments', segmentsData)
        },
        async createSegmentAction({commit}, obj) {
            return await segments.createSegment(obj)
        },
        async saveOrderingAction({commit}, forSendToSave) {

            // let segmentsData = data.$store.state.segments.segments
            // let forSendToSave = segmentsData.map(item => {
            //     return {id: item.id, position: item.position}
            // })

            return await segments.reOrderSegmentsSave(forSendToSave)
        },
        async deleteSegmentAction({commit}, data) {

            // let segmentsData = data.$store.state.segments.segments
            // let forSendToSave = segmentsData.map(item => {
            //     return {id: item.id, position: item.position}
            // })

            return await segments.deleteSegment(data)
        },
    },
    getters: {
        getSegments: state => state.segments,
    },

};
