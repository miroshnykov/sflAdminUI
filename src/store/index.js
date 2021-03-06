import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
import segments from './segments'
import segment from './segment'
import dimensions from './dimensions'
import affiliates from './affiliates'
import countries from './countries'
import campaigns from './campaigns'
import lp from './lp'
import lpOffers from './lpOffers'
import prods from './prods'
import offers from './offers'
import offer from './offer'
import offerHistory from './offerHistory'
import affiliateWebsites from './affiliateWebsites'
import advertisers from './advertisers'
import upload from './upload'
import verticals from './verticals'

import { getUserStore } from 'am-components-front'
const user = getUserStore(
    process.env.SSO_API,
    process.env.SFL_CORE_CONDITION,
    'sflAdmin'
)

console.log('process.env.SSO_API:', process.env.SSO_API)
console.log('process.env.SFL_CORE_CONDITION:', process.env.SFL_CORE_CONDITION)
export default new Vuex.Store({
    state: {
        firstName: '',
        lastName: '',
    },
    modules: {
        segments,
        segment,
        dimensions,
        campaigns,
        affiliates,
        countries,
        user,
        history,
        lp,
        lpOffers,
        prods,
        offer,
        offerHistory,
        offers,
        affiliateWebsites,
        advertisers,
        upload,
        verticals
    }
})