import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
import segments from './segments'
import { getUserStore } from 'am-components-front'
const user = getUserStore(
    process.env.SSO_API,
    process.env.SFL_CORE_CONDITION,
    'sflAdmin'
)

export default new Vuex.Store({
    state: {
        firstName: '',
        lastName: '',
    },
    modules: {
        user,
        segments
    }
})