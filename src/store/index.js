import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
import segments from './segments'
import segment from './segment'
import dimensions from './dimensions'
import affiliates from './affiliates'
import countries from './countries'
import lp from './lp'
import prods from './prods'

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
        affiliates,
        countries,
        user,
        history,
        lp,
        prods
    }
})