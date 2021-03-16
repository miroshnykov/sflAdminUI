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
        console.log(` *** Advertisers from DB response count:${response.length}` )
        console.timeEnd(`advertisers`)
        return response
    } catch (e) {
        console.log(e)
    }

}

const sflAdvertisers = async () => {

    try {
        console.time(`sflAdvertisers`)
        const res = await api.post(
            '', {
                query: `
                {
                    getSflAdvertisers{
                        id    
                        name
                    } 
                }
            `,
            }
        )

        let response = res.data.data.getSflAdvertisers
        console.log(` *** getSflAdvertisers from DB response count:${response.length}` )
        console.timeEnd(`sflAdvertisers`)
        return response
    } catch (e) {
        console.log(e)
    }

}

const sflAdvertisersManagers = async () => {

    try {
        console.time(`getSflAdvertisersManagers`)
        const res = await api.post(
            '', {
                query: `
                {
                    getSflAdvertisersManagers{
                        id    
                        firstName
                        lastName
                        role
                    } 
                }
            `,
            }
        )

        let response = res.data.data.getSflAdvertisersManagers
        console.log(` *** getSflAdvertisersManagers from DB response count:${response.length}` )
        console.timeEnd(`getSflAdvertisersManagers`)
        return response
    } catch (e) {
        console.log(e)
    }

}

export default {
    advertisers,
    sflAdvertisers,
    sflAdvertisersManagers
}