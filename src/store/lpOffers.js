import lpOffers from '../api/lpOffers'

export default {
    state: {
        lpOffers: [],
    },
    namespaced: true,
    mutations: {
        async saveLpOffers(state, lpOffers) {
            state.lpOffers = lpOffers
        },
        async addLpOffers(state, offerId) {

            const getLastId = (sf) => {
                let loadMin = null
                for (const item of sf) {
                    if (!loadMin || item.id > loadMin.id) {
                        loadMin = item
                    }
                }
                return loadMin.id
            }

            let lastId = state.lpOffers.length !== 0 && getLastId(state.lpOffers) || 0

            let lp = {}
            lp.name = ''
            lp.url = ''
            lp.offerId = offerId
            lp.id = lastId + 1

            state.lpOffers.push(lp)
        },
        async updLpOffers(state, data) {
            let lps = state.lpOffers.map(item => {
                if (item.id === data.id) {
                    item[data.field] = data.value
                }
                return item
            })
            state.lpOffers = lps

        },
        async delLpOffers(state, id) {

            state.lpOffers = state.lpOffers
                .filter(item => (item.id !== id))


        }
    },
    actions: {
        async saveLpOffersStore({commit}, id) {
            commit('saveLpOffers', await lpOffers.lpOffers(id))
        },
        // async createLpOfferDb({commit}, obj) {
        //     let res = await lpOffers.createLpOffer(obj)
        //     obj.id = res.id
        //     commit('addLpOffers', obj)
        //     return res
        // },

    },
    getters: {
        getLpOffers: state => state.lpOffers,
    },

}
