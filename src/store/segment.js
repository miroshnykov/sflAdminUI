import {reFormatJSON} from '../helpers'

import segment from '../api/segmentConditions'
import segmentApi from '../api/segment'
import segments from '../api/segments'
import {mapState} from 'vuex'

const emptyFilter = {
    user: this.verifyTokenEmail,
    dimensionId: 0,
    dimensionName: '',
    filterTypeId: 0,
    matchTypeId: 0,
    orAndDisabled: true,
    value: '',
    position: 0,
    segmentRuleIndex: 0
}

const createFilter = (position, segmentRuleIndex) => {
    const filters = Object.assign(emptyFilter, {position}, {segmentRuleIndex})
    return reFormatJSON(filters)
}

const assignPositions = xs =>
    xs.map((x, position) => Object.assign({}, x, {position}))

const deleteFilter_ = (state, indexFilters) => {
    let newRule = state.segmentFilter.filter(
        ({segmentRuleIndex}) => (segmentRuleIndex !== indexFilters)
    )

    newRule.sort((a, b) => (Number(a.segmentRuleIndex) - Number(b.segmentRuleIndex)))

    // console.log(` >>>  ORDERING  before delete :`)
    // console.table(JSON.parse(JSON.stringify(newRule)))
    let segmentRuleIndexTmp
    let newRules = []
    let segmentRuleIndexRecalculate = 0
    newRule.forEach(item => {

        if (item.segmentRuleIndex !== segmentRuleIndexTmp) {
            segmentRuleIndexRecalculate++
            let tmp = newRule.filter(({segmentRuleIndex}) => (segmentRuleIndex === item.segmentRuleIndex))
            newRules.push(tmp.map(item => (Object.assign(item, {segmentRuleIndex: segmentRuleIndexRecalculate - 1}))))
            // console.log( `newRules push :` , JSON.stringify(newRules) )
        }
        segmentRuleIndexTmp = item.segmentRuleIndex
    })

    return newRules.flat()
}

export default {
    state: {
        segmentFilter: [],
        segmentId: 0,
        segmentName: '',
        segmentDateUpdated: '',
        segmentDateAdded: '',
        segmentIsOverrideProduct: 0,
        segmentStatus: '',
        segmentRuleCount: 0
    },
    ...mapState('googleAuth', ['verifyTokenEmail']),
    namespaced: true,
    mutations: {
        setSegmentStore(state, data) {
            state.segmentFilter = data.segments
            state.segmentId = data.segmentId
            state.segmentDateUpdated = data.segmentDateUpdated
            state.segmentDateAdded = data.segmentDateAdded
            state.segmentName = data.segmentName
            state.segmentStatus = data.segmentStatus
            state.segmentIsOverrideProduct = data.segmentIsOverrideProduct
            state.segmentRuleCount = data.segmentRuleCount
        },
        updateField(state, data) {
            if (data.field === 'status') {
                state.segmentStatus = Number(data.value) && 'inactive' || 'active'
                return
            }
            if (data.field === 'segmentName') {
                state.segmentName = data.value
                return
            }
            state.segmentFilter[0][data.field] = data.value
        },
        addFilter(state, item) {
            const {segmentFilter} = state
            const {length} = segmentFilter
            const position = length === 0 ? length : segmentFilter[length - 1].position
            let sf = assignPositions([...segmentFilter, createFilter(position + 1, state.segmentRuleCount)])
            let setConditions
            if (item.segmentRuleIndex !== undefined) {
                // document.querySelector(`div._and`).style.display = 'block'
                // click AND , reconfiguration conditions depends on segmentRuleIndex

                // console.log(' **** AND  segmentRuleIndex:', item.segmentRuleIndex)
                // console.table(reFormatJSON(sf))
                let newFilterElement = sf.filter(item => (item.position === length))
                let splitConditionsFirstPart = sf.filter(item2 => (item.segmentRuleIndex >= item2.segmentRuleIndex))
                let splitConditionsSecondPart = sf.filter(item2 => (item.segmentRuleIndex < item2.segmentRuleIndex))
                let splitConditionsSecondPartMinusNewFilterElement = splitConditionsSecondPart.filter(item => (!newFilterElement.includes(item)))
                // console.log('>>> splitConditionsFirstPart')
                // console.table(reFormatJSON(splitConditionsFirstPart))
                // console.log('>>> splitConditionsSecondPart')
                // console.table(reFormatJSON(splitConditionsSecondPart))
                // console.log('>>> newFilterElement')
                // console.table(reFormatJSON(newFilterElement))
                // console.log('>>> splitConditionsSecondPartMinusNewFilterElement')
                // console.table(reFormatJSON(splitConditionsSecondPartMinusNewFilterElement))
                newFilterElement[0].segmentRuleIndex = item.segmentRuleIndex + 1
                let updSegmentRuleIndex = splitConditionsSecondPartMinusNewFilterElement.map(item => {
                    item.segmentRuleIndex = item.segmentRuleIndex + 1
                    return item
                })

                let mergeConditionsFirstPart = splitConditionsFirstPart.concat(newFilterElement)
                // console.log('>>> firstPartArr merge new element ')
                // console.table(reFormatJSON(mergeConditionsFirstPart))

                setConditions = mergeConditionsFirstPart.concat(updSegmentRuleIndex)
                // console.log('>>> finalArr ')
                // console.table(reFormatJSON(finalMerge))
            }
            state.segmentFilter = setConditions && setConditions || sf
            state.segmentRuleCount = state.segmentRuleCount + 1
        },
        addCondition(state, segmentRuleIndex) {
            const {segmentFilter} = state
            const {length} = segmentFilter
            const position = length === 0 ? length : segmentFilter[length - 1].position
            let sf = assignPositions([...segmentFilter, createFilter(position + 1, segmentRuleIndex)])

            let currentFilter = sf.filter(item => (item.segmentRuleIndex === segmentRuleIndex))
            let nextToLast = Object.values(currentFilter)[Object.keys(currentFilter).length - 2]
            // if (nextToLast){
            //     console.log(' *** currentFilter')
            //     console.table(reFormatJSON(currentFilter))
            //     console.log(' *** nextToLast position ')
            //     console.table(reFormatJSON(nextToLast.position))
            //     // let sortedByPostition = sf.sort((a, b) => (Number(a.position) - Number(b.position)))
            // }
            // document.querySelector(`._or`).style.display = 'block'
            const getMinPosition = (sf) => {
                let loadMin = null
                for (const item of sf) {
                    if (!loadMin || item.position < loadMin.position) {
                        loadMin = item
                    }
                }
                return loadMin.position
            }
            const getMaxPosition = (sf) => {
                let loadMin = null
                for (const item of sf) {
                    if (!loadMin || item.position > loadMin.position) {
                        loadMin = item
                    }
                }
                return loadMin.position
            }

            sf.map(item => {
                if (nextToLast && (item.position === nextToLast.position)) {
                    item.orAndDisabled = false
                }
                item.minPosition = getMinPosition(sf)
                item.maxPosition = getMaxPosition(sf)
                item.count = sf.length
            })

            sf.map(item => {
                item.disabled = !(item.count <= 1 || item.position !== item.minPosition)
                if (currentFilter && (item.position === currentFilter[0].position)) {
                    item.disabled = true
                }
            })

            console.log(' >>>  addCondition item: segmentRuleIndex:', segmentRuleIndex)
            console.log(' >>> position:', position)
            console.table(reFormatJSON(sf))

            state.segmentFilter = sf

        },
        removeCondition(state, rmPosition, indexFilters) {
            let condition = state.segmentFilter
            let getSegmentRuleIndex = condition.filter(({position}) => (position === rmPosition))
            // console.log(' >>> getSegmentRuleIndex:')
            // console.table(reFormatJSON(getSegmentRuleIndex))
            let currentFilter = condition.filter(({segmentRuleIndex}) => (segmentRuleIndex === getSegmentRuleIndex[0].segmentRuleIndex))

            let nextToLast = Object.values(currentFilter)[Object.keys(currentFilter).length - 2]
            // console.log(' *** currentFilter')
            // console.table(reFormatJSON(currentFilter))
            // if (nextToLast){
            //     console.log(' *** nextToLast position ')
            //     console.table(reFormatJSON(nextToLast))
            // }

            let sf = condition.filter(({position}) => position !== rmPosition)
            sf.map(item => {
                if (nextToLast && (item.position === nextToLast.position)) {
                    item.orAndDisabled = true
                }
            })

            // rm filter if there is no conditions inside
            if (currentFilter.length === 1) {
                state.segmentFilter = sf
                state.segmentFilter = deleteFilter_(state, indexFilters)
                state.segmentRuleCount = state.segmentRuleCount - 1
            } else {
                state.segmentFilter = sf
            }
        },
        deleteFilter(state, indexFilters) {
            state.segmentFilter = deleteFilter_(state, indexFilters)
            state.segmentRuleCount = state.segmentRuleCount - 1
        },
        overrideProduct(state, isOverrideProduct) {
            state.segmentIsOverrideProduct = isOverrideProduct
        },
        async saveConditionsCommit(state, data) {

            const {segmentName, segmentStatus, segmentId, segmentFilter, segmentIsOverrideProduct} = state

            let dataSend = {}
            dataSend.id = segmentId
            dataSend.name = segmentName
            dataSend.status = segmentStatus
            dataSend.isOverrideProduct = segmentIsOverrideProduct

            let toSendFilter = []
            for (const filter of segmentFilter) {
                toSendFilter.push({
                    segmentId: segmentId,
                    dimensionId: filter.dimensionId,
                    value: `&${filter.value}&`,
                    position: filter.position,
                    segmentRuleIndex: filter.segmentRuleIndex,
                    filterTypeId: filter.filterTypeId,
                    matchTypeId: filter.matchTypeId,
                })
            }

            let toSendFormat = JSON.stringify(toSendFilter).replace(/['"]+/g, '')
            dataSend.filters = toSendFormat.replace(/[&]+/g, '"')

            let resSaveCond = await segmentApi.saveConditionsApi(dataSend)
            if (resSaveCond.segmentId) {
                data.$swal.fire({
                    type: 'success',
                    position: 'top-end',
                    title: 'Segment conditions has been saved',
                    showConfirmButton: false,
                    timer: 1000
                })
            } else {
                data.$swal.fire({
                    type: 'error',
                    title: 'error in saveConditionsApi() ',
                    text: 'Something went wrong!',
                    footer: 'Errors '
                })
            }
        },
    },
    actions: {
        async saveSegmentConditionsStore({commit}, id) {
            let res = await segment.getSegmentConditions(id)
            let segmentCountFilters = await segment.getSegmentCountFilters(id)

            for (let i = 0; i < segmentCountFilters[0].segmentRuleCount; i++) {

                let rulesByIndex = res.filter(item => (item.segmentRuleIndex === i))

                const getMinPosition = (index) => {
                    let rulesByIndex = res.filter(item => (item.segmentRuleIndex === index))
                    let loadMin = null
                    for (const item of rulesByIndex) {
                        if (!loadMin || item.position < loadMin.position) {
                            loadMin = item
                        }
                    }
                    return loadMin.position
                }

                const getMaxPosition = (index) => {
                    let rulesByIndex = res.filter(item => (item.segmentRuleIndex === index))
                    let loadMin = null
                    for (const item of rulesByIndex) {
                        if (!loadMin || item.position > loadMin.position) {
                            loadMin = item
                        }
                    }
                    return loadMin.position
                }

                res.map(item => {
                    if (item.segmentRuleIndex === i) {
                        item.count = rulesByIndex.length
                        item.minPosition = getMinPosition(i)
                        item.maxPosition = getMaxPosition(i)
                    }
                })
            }
            let sortedByPostition = res.sort((a, b) => (Number(a.position) - Number(b.position)))
            sortedByPostition.map(item => {
                item.disabled = !(item.count <= 1 || item.position === item.minPosition)
                item.orAndDisabled = (item.count <= 1 || item.position === item.maxPosition)
            })

            //console.log('>>> saveSegmentConditionsStore:')
            //console.table(reFormatJSON(sortedByPostition))

            let segmentsData = await segmentApi.segmentStatus(id)
            //console.log(`segmentStatus`)
            //console.table(reFormatJSON(segmentsData))

            commit('setSegmentStore', {
                segments: sortedByPostition,
                segmentName: segmentsData && segmentsData[0].name || '',
                segmentStatus: segmentsData && segmentsData[0].status || '',
                segmentIsOverrideProduct: segmentsData && segmentsData[0].isOverrideProduct || '',
                segmentDateUpdated: segmentsData && segmentsData[0].dateUpdated || '',
                segmentDateAdded: segmentsData && segmentsData[0].dateAdded || '',
                segmentId: id,
                segmentRuleCount: segmentCountFilters[0].segmentRuleCount
            })
        },
        async createSegment({commit}, segmentData) {
            return await segments.createSegment(segmentData.name, segmentData.weight, segmentData.multiplier)
        },
        async updateLandingPage({commit}, segmentInfo) {
            return await segments.updateLandingPage(segmentInfo)
        },
        async updateSegmentStatus({commit}, segmentInfo) {
            return await segmentApi.updateSegmentStatus(segmentInfo)
        },
        async deleteSegment({commit}, segmentId) {
            return await segments.deleteSegment(segmentId)
        },
        async saveConditions({commit}, data) {
            commit('saveConditionsCommit', data)
        },
    },
    getters: {
        getSegmentFilter: state => state.segmentFilter,
        getSegmentName: state => state.segmentName,
        getSegmentDateUpdated: state => state.segmentDateUpdated,
        getSegmentDateAdded: state => state.segmentDateAdded,
        getSegmentStatus: state => state.segmentStatus,
        getSegmentIsOverrideProduct: state => state.segmentIsOverrideProduct,
    },


}
