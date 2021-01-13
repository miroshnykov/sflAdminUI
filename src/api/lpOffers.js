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

const createLpOffer = async (data) => {

    const {name, url, offerId} = data

    try {
        const res = await api.post(
            '', {
                query: `
                    mutation {
                          createLpOffer(
                                name:"${name}",
                                url:"${url}",
                                offerId:${offerId}) {
                                id
                          }
                    }

            `,
            }
        )

        let response = res.data.data.createLpOffer
        console.log('\ncreateLpOffer response:', response)
        console.timeEnd(`lp`)
        return response
    } catch (e) {
        console.log(e)
    }

}


export default {
    lpOffers,
    createLpOffer
}