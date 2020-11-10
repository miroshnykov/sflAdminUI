import {api} from './request'

const prods = async () => {

    try {
        console.time(`prods`)
        const res = await api.post(
            '', {
                query: `
                {
                    prods{
                        id    
                        name
                    } 
                }
            `,
            }
        )

        let response = res.data.data.prods
        console.log('\nprods from DB response count:', response.length)
        console.timeEnd(`prods`)
        return response
    } catch (e) {
        console.log(e)
    }

}

export default {
    prods
}