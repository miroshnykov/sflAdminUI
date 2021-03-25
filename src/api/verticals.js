import {api} from './request'

const verticals = async () => {

    try {
        console.time(`verticals`)
        const res = await api.post(
            '', {
                query: `
                {
                    verticals{
                        id    
                        name
                    } 
                }
            `,
            }
        )

        let response = res.data.data.verticals
        console.log(` *** verticals from DB response count:${response.length}` )
        console.timeEnd(`verticals`)
        return response
    } catch (e) {
        console.log(e)
    }

}

export default {
    verticals
}