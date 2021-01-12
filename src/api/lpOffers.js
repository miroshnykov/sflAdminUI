import {api} from './request'
import {catchHandler, reFormatJSON} from "../helpers";

const lpOffers = async () => {

    try {
        console.time(`lp`)
        const res = await api.post(
            '', {
                query: `
                {
                    getLpOffers {
                        id
                        name
                        url
                        status
                        offerId
                      }
                }
            `,
            }
        )

        let response = res.data.data.getLpOffers
        console.log('\nlpOffers from DB response count:', response.length)
        console.timeEnd(`lp`)
        return response
    } catch (e) {
        console.log(e)
    }

}


export default {
    lpOffers,

}