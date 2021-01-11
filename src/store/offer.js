import {reFormatJSON, capitalizeFirstLetter} from '../helpers'
import offer from '../api/offer'


export default {
    state: {
        offer: [],
        geo: [],
    },
    namespaced: true,
    mutations: {
        async saveOffer(state, offer) {
            state.offer = offer
            if (offer[0].geoRules) {
                let geoRules = JSON.parse(offer[0].geoRules)
                state.geo = geoRules.geo
            }
        },
        async updOffer(state, data) {
            state.offer[0][data.fieldName] = data.value
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

        }
    },
    actions: {
        async saveOfferDb({commit}) {
            let data = this.getters['offer/getOffer'][0]
            let res = await offer.saveOffer(data)
            return res
        },
        async saveOfferStore({commit}, id) {
            commit('saveOffer', await offer.getOffer(id))
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
    },

};
