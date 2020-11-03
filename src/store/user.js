
import user from '../api/user'

export default {
    state: {
        user:[],
    },
    namespaced: true,
    mutations: {
        async saveUserStore(state, user) {
            state.user = user
        }
    },
    actions: {
        async saveUserStore ({ commit }, email) {
            commit('saveUserStore', await user.user(email))
        },
    },
    getters: {
        getUser: state => state.user,
    },

}
