import {api} from './request'

const dimensions = async () => {

    try {
        const res = await api.post(
            '', {
                query: `
                {
                    dimensions{
                        id    
                        name
                        displayedName
                    } 
                }
            `,
            }
        )

        let response = res.data.data.dimensions
        // console.log(' dimensions from DB   response count:', response.length)
        return response
    } catch (e) {
        console.log(e)
    }

}

export default {
    dimensions
}