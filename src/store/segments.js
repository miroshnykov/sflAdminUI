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
        searchFilter(state, searchText) {
            state.segments = searchText ? state.segments.filter(item => (item.name.toLowerCase().includes(searchText.toLowerCase()))) : state.segmentsOrigin
        },
        reOrdering(state, obj) {
            let reOrderTmp = []
            let segmetsTmp = state.segments
            segmetsTmp.map(item => {
                // console.log(` name:${item.name}, position:${item.position}`)
                if (item.position === obj.oldPosition) {
                    // debugger
                    // console.log(`oldItem: name:${item.name}, position:${item.position}`)
                    reOrderTmp.push({'id': item.id, 'newPosition': obj.newPosition})
                }
                if (item.position === obj.newPosition) {
                    // debugger
                    // console.log(`newItem: name:${item.name}, position:${item.position}`)
                    reOrderTmp.push({'id': item.id, 'newPosition': obj.oldPosition})
                }
            })

            let reOrderSegments = []

            segmetsTmp.map(item => {
                let findId = reOrderTmp.filter(i => (i.id === item.id))
                if (findId.length !== 0) {
                    item.position = findId[0].newPosition
                }
                reOrderSegments.push(item)
            })

            console.log(`reOrderTmp`)
            console.table(reFormatJSON(reOrderTmp))

            console.log(`reOrderSegments`)
            console.table(reFormatJSON(reOrderSegments))

            // let sortedByPosition = reOrderSegments.sort((a, b) => (Number(a.position) - Number(b.position)))
            // console.log(`sortedByPosition`)
            // console.table(reFormatJSON(sortedByPosition))
            // state.segments = reOrderSegments
            state.segments = reOrderSegments

            // state.segments = segments
        },
    },
    actions: {
        async saveSegmentsStore({commit}) {
            let segmentsData = await segments.segments()
            console.log(`Segnmentds`)
            console.table(reFormatJSON(segmentsData))
            commit('saveSegments', segmentsData)
        },
        reOrderingAction({commit}, obj) {
            commit('reOrdering', obj)
        },
        async createSegmentAction({commit}, obj) {
            let {name} = obj
            return await segments.createSegment(name)
        },
        async saveOrderingAction({commit}, forSendToSave) {

            // let segmentsData = data.$store.state.segments.segments
            // let forSendToSave = segmentsData.map(item => {
            //     return {id: item.id, position: item.position}
            // })

            return await segments.reOrderSegmentsSave(forSendToSave)
        },
        async deleteSegmentAction({commit}, id) {

            // let segmentsData = data.$store.state.segments.segments
            // let forSendToSave = segmentsData.map(item => {
            //     return {id: item.id, position: item.position}
            // })

            return await segments.deleteSegment(id)
        },
    },
    getters: {
        getSegments: state => state.segments,
    },

};
