import {api} from './request'
import {catchHandler, reFormatJSON} from '../helpers'

const getOffer = async (id) => {

    try {
        const res = await api.post(
            '', {
                query: `
                    {
                          getOffer(id:${id}) {
                                id
                                name
                                advertiser
                                conversionType
                                status
                                payIn
                                payOut
                                dateAdded
                                geoRules
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

const createOffer = async (name) => {

    try {
        const res = await api.post(
            '', {
                query: `
                    mutation{
                          createOffer(
                                name:"${name}"
                          ){
                                id
                          }
                    },

            `,
            }
        )

        let response = res.data.data.createOffer
        console.log(`\ncreate Offer count: { ${JSON.stringify(response)} } `)
        console.table(reFormatJSON(response))
        return response
    } catch (e) {
        catchHandler(e)
    }

}

const delOffer = async (id) => {

    try {
        const res = await api.post(
            '', {
                query: `
                    mutation {
                          delOffer(
                                id: ${id}
                          ) {
                                id
                          }
                    }

            `,
            }
        )

        let response = res.data.data.delOffer
        console.log(`del offer response:`, response)
        return response
    } catch (e) {
        console.log(e)
        catchHandler(e)
    }

}

export default {
    getOffer,
    createOffer,
    delOffer
}