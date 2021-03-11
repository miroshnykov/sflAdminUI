import {api} from './request'

const affiliates = async () => {

    try {
        console.time(`affiliates`)
        const res = await api.post(
            '', {
                query: `
                {
                    affiliates{
                        id    
                        name
                        countryCode
                    } 
                }
            `,
            }
        )

        let response = res.data.data.affiliates
        console.log(` *** Affiliates from DB response count:${response.length}`)
        console.timeEnd(`affiliates`)
        return response
    } catch (e) {
        console.log(e)
    }

}

const getAffiliatesByFilter = async (filter) => {

    try {
        console.time(`getAffiliatesByFilter`)
        const res = await api.post(
            '', {
                query: `
                {
                    getAffiliatesByFilter(filter:"${filter}"){
                        id    
                        name
                        countryCode
                    } 
                }
            `,
            }
        )

        let response = res.data.data.getAffiliatesByFilter
        console.log(` *** getAffiliatesByFilter from DB response count:${response.length}`)
        console.timeEnd(`getAffiliatesByFilter`)
        return response
    } catch (e) {
        console.log(e)
    }

}

const getAffiliatesBySegmentId = async (segmentId) => {

    try {
        console.time(`getAffiliatesBySegmentId`)
        const res = await api.post(
            '', {
                query: `
                {
                    getAffiliatesBySegmentId(segmentId:${segmentId}){
                        id    
                        name
                        countryCode
                    } 
                }
            `,
            }
        )

        let response = res.data.data.getAffiliatesBySegmentId
        console.log(` *** getAffiliatesBySegmentId from DB response count:${response.length}`)
        console.timeEnd(`getAffiliatesBySegmentId`)
        return response
    } catch (e) {
        console.log(e)
    }

}


export default {
    affiliates,
    getAffiliatesByFilter,
    getAffiliatesBySegmentId
}