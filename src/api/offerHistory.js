import {api} from './request'

const offerHistory = async (id) => {

    try {
        const res = await api.post(
            '', {
                query: `
                {
                  getOfferHistory(id:${id}){
                    id
                    sflOfferId
                    user
                    action
                    dateAdded
                    logs
                    
                  } 
                }
            `,
            }
        )

        let response = res.data.data.getOfferHistory
        // console.log(' dimensions from DB   response count:', response.length)
        return response
    } catch (e) {
        console.log(e)
    }

}

export default {
    offerHistory
}