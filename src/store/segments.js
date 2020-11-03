import segments from '../api/segments'
import {reFormatJSON} from '../helpers'

export default {
    state: {
        segments: [],
    },
    namespaced: true,
    mutations: {
        async saveSegments(state, segments) {
            state.segments = segments
        },
        reOrdering(state, obj) {
            let reOrderTmp = []
            let segmetsTmp = state.segments
            segmetsTmp.map(item => {
                // console.log(` name:${item.name}, position:${item.position}`)
                if (item.position === obj.oldPosition) {
                    // console.log(`oldItem: name:${item.name}, position:${item.position}`)
                    reOrderTmp.push({'id': item.id, 'newPosition': obj.newPosition})
                }
                if (item.position === obj.newPosition) {
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

            let sortedByPosition = reOrderSegments.sort((a, b) => (Number(a.position) - Number(b.position)))
            console.log(`sortedByPosition`)
            console.table(reFormatJSON(sortedByPosition))
            // state.segments = reOrderSegments
            state.segments = sortedByPosition

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
        async saveOrderingAction({commit}, data) {

            let forSendToSave = []
            data.$store.state.segments.segments.map(item => {
                forSendToSave.push({id: item.id, position: item.position})
            })
            let toSend = JSON.stringify(forSendToSave).replace(/['"]+/g, '')
            console.log('toSend:', toSend)
            let resReOrdering = await segments.reOrderSegmentsSave(toSend)
            console.log('resReOrdering:', resReOrdering)

            return resReOrdering
            // let s = this.getSegments()
            // console.log(`Segnmentds`)
            // console.table(reFormatJSON(s))
            // debugger
        },
    },
    getters: {
        getSegments: state => state.segments,
    },

};
