import countries from '../api/countries'

export default {
    state: {
        countries:[],
        countriesOrigin:[]
    },
    namespaced: true,
    mutations: {
        async saveCountriesStore(state, countries) {
            state.countries = countries
            state.countriesOrigin = countries
        },
        filterCountry(state,searchText){
            state.countries = state.countriesOrigin
            state.countries = searchText ? state.countries.filter(({name}) => (name.toLowerCase().includes(searchText.toLowerCase()))) : state.countriesOrigin
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
