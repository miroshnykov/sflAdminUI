import {api} from './request'

const advertisers = async () => {

    try {
        console.time(`advertisers`)
        const res = await api.post(
            '', {
                query: `
                {
                    getAdvertisers{
                        id    
                        name
                    } 
                }
            `,
            }
        )

        let response = res.data.data.getAdvertisers
        console.log('\nadvertisers from DB response count:', response.length)
        console.timeEnd(`advertisers`)
        return response
    } catch (e) {
        console.log(e)
    }

}

export default {
    advertisers
}