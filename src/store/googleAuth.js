import googleLogin from '../api/googleLogin'

export default {
    state: {
        googleAuth: [],
        googleAuthUrl: '',
        verifyTokenEmail: ''
    },
    namespaced: true,
    mutations: {
        async SaveGoogleAuthUrl(state, url) {
            state.googleAuthUrl = url
        },
        VerifyTokenEmailSave(state, email) {
            state.verifyTokenEmail = email
        }
    },
    actions: {
        async SaveGoogleAuthUrl({commit}) {
            let data = await googleLogin.getLoginUrl()
            commit('SaveGoogleAuthUrl', data)
        },
        async VerifyTokenEmailSave({commit}) {
            let data = await googleLogin.verifyToken()
            commit('VerifyTokenEmailSave', data)
        },
    },
    getters: {
        getGoogleAuthUrlStore: state => state.googleAuthUrl,
        getVerifyTokenEmail: state => state.verifyTokenEmail
    },
};
