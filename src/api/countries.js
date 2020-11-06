import {api} from './request'

const countries = async () => {

    try {
        const res = await api.post(
            '', {
                query: `
                {
                    countries{
                        code    
                        name
                    } 
                }
            `,
            }
        )

        let response = res.data.data.countries
        // console.log(' countries from DB   response count:', response.length)
        return response
    } catch (e) {
        console.log(e)
    }

}

export default {
    countries
}