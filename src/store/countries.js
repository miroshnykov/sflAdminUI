import countries from '../api/countries'

export default {
    state: {
        countries:[]
    },
    namespaced: true,
    mutations: {
        async saveCountriesStore(state, countries) {
            state.countries = countries
        }
    },
    actions: {
        async saveCountriesStore ({ commit }) {
            commit('saveCountriesStore', await countries.countries())
        },
    },
    getters: {
        getCountries: state => state.countries,
    },
}
