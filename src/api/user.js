import {api} from './request'

const user = async (email) => {

    try {
        const res = await api.post(
            '', {
                query: `
                    {
                          user(email:"${email}"){    
                                name 
                                email
                                familyName
                                googleId
                                givenName
                                picture,
                                link
                                hd    
                          }
                    }
            `,
            }
        )

        let response = res.data.data.user
        // console.log(' user from DB   response count:', response.length)
        return response
    } catch (e) {
        console.log(e)
    }

}

export default {
    user
}