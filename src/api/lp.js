import {api} from './request'

const lp = async () => {

    try {
        console.time(`lp`)
        const res = await api.post(
            '', {
                query: `
                {
                    lp{
                        id    
                        name
                    } 
                }
            `,
            }
        )

        let response = res.data.data.lp
        console.log('\nlp from DB response count:', response.length)
        console.timeEnd(`lp`)
        return response
    } catch (e) {
        console.log(e)
    }

}

export default {
    lp
}