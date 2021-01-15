import {reFormatJSON, capitalizeFirstLetter} from '../helpers'
import offer from '../api/offer'

const geoRulesFormat = (geo) => {
    let geoRules = {}
    geoRules.geo = geo
    return JSON.stringify(geoRules)
}

const customLPRulesFormat = (customLPRules) => {
    let customLp = {}
    customLp.customLPRules = customLPRules
    return JSON.stringify(customLp)
}

const newCap = () => {
    let cap = {}
    cap.clickDay = 0
    cap.clickMonth = 0
    cap.clickWeek = 0
    cap.clicksRedirectOfferId = 0
    cap.clicksRedirectStatus = 0
    cap.offerId = 0
    cap.salesDay = 0
    cap.salesMonth = 0
    cap.salesRedirectOfferId = 0
    cap.salesRedirectStatus = 0
    cap.salesWeek = 0
    return cap
}

export default {
    state: {
        offer: [],
        offerCap: [],
        geo: [],
        customLPRules: [],
    },
    namespaced: true,
    mutations: {
        async saveOffer(state, offer) {
            state.offer = offer
            if (offer[0].geoRules) {
                let geoRules = JSON.parse(offer[0].geoRules)
                state.geo = geoRules.geo
            }
            if (offer[0].customLPRules) {
                let customLPRules = JSON.parse(offer[0].customLPRules)
                state.customLPRules = customLPRules.customLPRules
            }
        },
        async saveOfferCap(state, offerCap) {
            state.offerCap = offerCap
        },
        addCustomLP(state) {
            let position = state.customLPRules.length !== 0 && state.customLPRules.length || 0
            state.customLPRules.push({id: 0, pos: position, country: ''})
            state.offer[0].customLPRules = customLPRulesFormat(state.customLPRules)
        },
        updateCustomLP(state, data) {
            state.customLPRules.forEach(item => {
                if (item.pos === data.position) {
                    item[data.field] = data.value
                }
            })
            state.offer[0].customLPRules = customLPRulesFormat(state.customLPRules)
        },
        delCustomLP(state, position) {
            state.customLPRules = state.customLPRules.filter(item => {
                return item.pos !== position
            })

            state.offer[0].customLPRules = customLPRulesFormat(state.customLPRules)
        },
        async updOffer(state, data) {
            state.offer[0][data.fieldName] = data.value
        },
        updOfferCap(state, data) {

            if (state.offerCap.length !== 0) {
                state.offerCap[0][data.fieldName] = data.value
            } else {
                let newEmptyCap = newCap()
                newEmptyCap[data.fieldName] = data.value
                state.offerCap.push(newEmptyCap)
            }
        },
        allowAll(state) {
            state.geo = []
            state.offer[0].geoRules = geoRulesFormat(state.geo)

        },
        banAll(state, countries) {
            countries.forEach(item => {
                let countryCheck = state.geo.filter(g => (g.country === item.code))
                if (countryCheck.length === 0) {
                    state.geo.push({country: item.code, include: true})
                }
            })
            state.offer[0].geoRules = geoRulesFormat(state.geo)

        },
        changeGeo(state, geo) {
            if (geo.checked) {
                state.geo.push({country: geo.countryCode, include: geo.checked})
            } else {
                state.geo = state.geo.filter(item => {
                    return item.country !== geo.countryCode
                })
            }

            let offerRules = {}
            offerRules.geo = state.geo
            let offerRulesStr = JSON.stringify(offerRules)
            state.offer[0].geoRules = offerRulesStr

        },
    },
    actions: {
        async saveOfferDb({commit}) {
            let data = this.getters['offer/getOffer'][0]
            data.caps = this.getters['offer/getOfferCap'][0] || ''
            let res = await offer.saveOffer(data)
            return res
        },
        async saveOfferStore({commit}, id) {
            commit('saveOffer', await offer.getOffer(id))
        },
        async saveOfferCapStore({commit}, offerId) {
            commit('saveOfferCap', await offer.getOfferCap(offerId))
        },
        async createOffer({commit}, data) {
            const {name} = data
            return await offer.createOffer(name)
        },
        async delOffer({commit}, data) {
            const {id} = data
            return await offer.delOffer(id)
        },
    },
    getters: {
        getOffer: state => state.offer,
        getOfferCap: state => state.offerCap,
    },

};
