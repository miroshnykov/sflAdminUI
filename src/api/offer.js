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
                                defaultLp
                                customLPRules
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

const saveOffer = async (data) => {

    const {advertiser, conversionType, geoRules, customLPRules, id, name, payIn, payOut, status} = data
    let geoRulesArr = JSON.parse(geoRules)
    let geoRulesReFormat =  JSON.stringify(geoRulesArr).replace(/"/g, '\\"')

    let customLPRulesArr = JSON.parse(customLPRules)
    let customLPRulesReFormat =  JSON.stringify(customLPRulesArr).replace(/"/g, '\\"')


    try {
        const res = await api.post(
            '', {
                query: `
                    mutation{
                          saveOffer(
                                id:${id}
                                name:"${name}"
                                advertiser:"${advertiser}"
                                conversionType:"${conversionType}"
                                geoRules:"${geoRulesReFormat}"
                                customLPRules:"${customLPRulesReFormat}"
                                payIn:${payIn}
                                payOut:${payOut}
                                status:"${status}"
                          ){
                                id
                          }
                    },

            `,
            }
        )

        let response = res.data.data.saveOffer
        console.log(`\ncreate Offer count: { ${JSON.stringify(response)} } `)
        console.table(reFormatJSON(response))
        return response
    } catch (e) {
        console.log(e)
        debugger
        // catchHandler(e)
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
    saveOffer,
    delOffer
}