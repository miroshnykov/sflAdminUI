import {api} from './request'
import {catchHandler, reFormatJSON} from '../helpers'

const getCampaign = async (affiliateId) => {

    try {
        const res = await api.post(
            '', {
                query: `
                    {
                          getCampaign(affiliateId:${affiliateId}) {
                                id
                                name
                                affiliateId
                          }
                    }

            `,
            }
        )

        let response = res.data.data.getCampaign
        console.log(`\ngetCampaign count: { ${response.length} }  by affiliateid: { ${affiliateId} } `)
        console.table(reFormatJSON(response))
        return response
    } catch (e) {
        catchHandler(e)
    }

}

const getCampaigns = async (segmentId) => {

    try {
        console.time(`allCampaigns`)
        const res = await api.post(
            '', {
                query: `
                    {
                          getCampaigns(segmentId:${segmentId}) {
                                id
                                name
                                affiliateId
                          }
                    }
            `,
            }
        )

        let response = res.data.data.getCampaigns
        console.log(` *** Campaigns response count:${response.length}`)
        console.timeEnd(`allCampaigns`)
        return response
    } catch (e) {
        console.log(e)
    }

}

export default {
    getCampaign,
    getCampaigns
}