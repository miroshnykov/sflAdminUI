import upload from '../api/upload'

export default {
    state: {
        file: [],
    },
    namespaced: true,
    mutations: {
        // async saveFileStore(state, user) {
        //     state.user = user
        // }
    },
    actions: {
        async saveFileData({commit}, dataFile) {
            // let res = await upload.uploadManagers(dataFile)
            let res = await upload.uploadFile(dataFile)
            // let res = await upload.uploadFile(dataFile)
            console.log('res ', res)
            return res
        },
    },
    getters: {
        getFile: state => state.file,
    },

}
