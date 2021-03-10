import {api} from './request'

const affiliates = async () => {

    try {
        console.time(`affiliates`)
        const res = await api.post(
            '', {
                query: `
                {
                    affiliates{
                        id    
                        name
                        countryCode
                    } 
                }
            `,
            }
        )

        let response = res.data.data.affiliates
        console.log(` *** Affiliates from DB response count:${response.length}`)
        console.timeEnd(`affiliates`)
        return response
    } catch (e) {
        console.log(e)
    }

}

export default {
    affiliates
}