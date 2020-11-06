import dimensions from '../api/dimensions'

export default {
    state: {
        dimensions: []
    },
    namespaced: true,
    mutations: {
        async saveDimensionsStore(state, dimensions) {
            state.dimensions = dimensions
        }
    },
    actions: {
        async saveDimensionsStore({commit}) {
            commit('saveDimensionsStore', await dimensions.dimensions())
        },
    },
    getters: {
        getDimensions: state => state.dimensions,
    },
}
