import {api} from './request'
import {catchHandler, reFormatJSON} from '../helpers'

const getOffer = async (id) => {

    try {
        const res = await api.post(
            '', {
                query: `
                    {
                          getOffer: ${id}) {
                                id
                                name
                                status
                                payIn
                                payOut
                                dateAdded
                          }
                    }

            `,
            }
        )

        let response = res.data.data.getOffer
        console.log(`\ngetOffer count: { ${response.length} }  by id: { ${id} } `)
        console.table(reFormatJSON(response))
        return response
    } catch (e) {
        catchHandler(e)
    }

}

const getOffers = async () => {

    try {
        console.time(`getOffers`)
        const res = await api.post(
            '', {
                query: `
                    {
                          getOffers {
                                id
                                name
                                status
                                payIn
                                payOut
                                dateAdded
                          }
                    }
            `,
            }
        )

        let response = res.data.data.getOffers
        console.log(`getOffers response count :`, response.length)
        console.timeEnd(`getOffers`)
        return response
    } catch (e) {
        console.log(e)
    }

}

export default {
    getOffer,
    getOffers
}