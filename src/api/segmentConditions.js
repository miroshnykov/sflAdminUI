import {api} from './request'
import {catchHandler, reFormatJSON} from '../helpers'

const getSegmentConditions = async (id) => {

    try {
        const res = await api.post(
            '', {
                query: `
                {
                    segment(id:${id}){
                        id
                        dimensionId
                        dimensionName
                        user
                        userName
                        filterTypeId
                        matchTypeId
                        value
                        position
                        segmentRuleIndex
                        dateAdded
                    }
                }`,
            }
        )

        let response = res.data.data.segment
        console.log(' >>>>> Segment  response:')
        console.table(reFormatJSON(response))
        return response
    } catch (e) {
        catchHandler(e)
    }
}

const getSegmentCountFilters = async (id) => {

    try {
        const res = await api.post(
            '', {
                query: `
                {
                    getSegmentCountFilters(id:${id}){
                        segmentRuleCount                        
                    }
                }`,
            }
        )

        let response = res.data.data.getSegmentCountFilters
        // console.log('>>> getSegmentCountFilters:')
        // console.table(reFormatJSON(response))
        return response
    } catch (e) {
        catchHandler(e)
    }
}

const createSegmentCondition = async (item) => {

    let {
        segmentId,
        dimensionId,
        value,
        position,
        segmentRuleIndex,
        matchTypeId,
        filterTypeId,
        user,
        dateAdded
    } = item

    try {
        const res = await api.post(
            '', {
                query: `
                    mutation{
                          createSegmentCondition(
                                segmentId: ${segmentId},
                                dimensionId: ${dimensionId},
                                value: "${value}",
                                user: "${user}",
                                matchTypeId:${matchTypeId},
                                filterTypeId:${filterTypeId},
                                position: ${position},
                                segmentRuleIndex: ${segmentRuleIndex}
                                dateAdded: ${dateAdded}
                          ){
                                value
                          }
                    }  
                `,
            }
        )
        console.log(' CreateSegmentCondition status:', res.status)
        return res

    } catch (e) {
        catchHandler(e)
    }
}

const deleteSegmentConditions = async (segmentId) => {
    try {
        const res = await api.post(
            '', {
                query: `
                mutation{
                      deleteSegmentConditions(
                            segmentId:${segmentId}
                      ){
                            segmentId
                      }
                }`,
            }
        )

        console.log('  >>> deleteSegmentConditions')
        console.table(reFormatJSON(res))
        return res
    } catch (e) {
        catchHandler(e)
    }
}
export default {
    getSegmentCountFilters,
    getSegmentConditions,
    deleteSegmentConditions,
    createSegmentCondition
}