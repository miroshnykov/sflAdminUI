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


export default {
    getSegmentCountFilters,
    getSegmentConditions,
}