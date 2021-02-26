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
                                verticals
                                conversionType
                                status
                                payIn
                                payOut
                                isCpmOptionEnabled
                                descriptions
                                payoutPercent
                                dateAdded
                                geoRules
                                defaultLp
                                offerIdRedirect
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

const getOfferCap = async (offerId) => {

    try {
        const res = await api.post(
            '', {
                query: `
                    {
                          getOfferCap(offerId:${offerId}) {
                                offerId
                                clickDay
                                clickWeek
                                clickMonth
                                clicksRedirectStatus
                                clicksRedirectOfferId
                                salesDay
                                salesWeek
                                salesMonth
                                salesRedirectStatus
                                salesRedirectOfferId
                          }
                    }

            `,
            }
        )

        let response = res.data.data.getOfferCap
        console.log(`\ngetOfferCap count: { ${response.length} }  by id: { ${offerId} } `)
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

    const {
        advertiser,
        verticals,
        conversionType,
        geoRules,
        payoutPercent,
        isCpmOptionEnabled,
        descriptions,
        customLPRules,
        id,
        name,
        payIn,
        payOut,
        status,
        defaultLp,
        caps,
        lp,
        offerIdRedirect
    } = data

    let geoRulesArr
    if (geoRules) {
        geoRulesArr = JSON.parse(geoRules)
    } else {
        let geoDefault = {}
        geoDefault.geo = []
        geoRulesArr = geoDefault
    }

    let geoRulesReFormat = JSON.stringify(geoRulesArr).replace(/"/g, '\\"')


    let customLPRulesArr
    if (customLPRules) {
        customLPRulesArr = JSON.parse(customLPRules)
    } else {
        let customLpDefault = {}
        customLpDefault.customLPRules = []
        customLPRulesArr = customLpDefault
    }

    let customLPRulesReFormat = JSON.stringify(customLPRulesArr).replace(/"/g, '\\"')


    let capsFormat = caps && JSON.stringify(caps).replace(/"/g, '\\"') || ''
    let lpFormat = lp && JSON.stringify(lp).replace(/"/g, '\\"') || ''

    debugger
    try {
        const res = await api.post(
            '', {
                query: `
                    mutation{
                          saveOffer(
                                id:${id}
                                name:"${name}"
                                advertiser:"${advertiser}"
                                verticals:"${verticals}"
                                payoutPercent:${payoutPercent}
                                isCpmOptionEnabled:${isCpmOptionEnabled}
                                descriptions:"${descriptions}"
                                conversionType:"${conversionType}"
                                geoRules:"${geoRulesReFormat}"
                                customLPRules:"${customLPRulesReFormat}"
                                payIn:${payIn}
                                defaultLp:${defaultLp}
                                offerIdRedirect:${offerIdRedirect}
                                caps:"${capsFormat}"
                                lp:"${lpFormat}"
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
    getOfferCap,
    delOffer
}