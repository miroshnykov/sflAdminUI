import {api} from './request'
import {catchHandler, reFormatJSON} from '../helpers'

const getAffiliateWebsites = async () => {

    try {
        console.time(`getAffiliateWebsites`)
        const res = await api.post(
            '', {
                query: `
                    {
                          getAffiliateWebsites {
                                id
                                link
                                status
                                affiliateId
                          }
                    }
            `,
            }
        )

        let response = res.data.data.getAffiliateWebsites
        console.log(`getAffiliateWebsites response count :`, response.length)
        console.timeEnd(`getAffiliateWebsites`)
        return response
    } catch (e) {
        console.log(e)
    }

}

export default {
    getAffiliateWebsites,
}