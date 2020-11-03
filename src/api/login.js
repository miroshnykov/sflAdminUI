import axios from 'axios'

console.log(`Login regular:${process.env.SFL_CORE_AUTH_URL}`)

const loginReq = axios.create({
    baseURL: `${process.env.SFL_CORE_AUTH_URL}graphql`,
    headers: {
        'Content-Type': 'application/json'
    },
    timeout: 5000
})
const login = async (email, password) => {

    try {
        const res = await loginReq.post(
            '', {
                query: `
                {
                      login(email: "${email}", password: "${password}") {
                            accessToken
                      }
                }`,
            }
        )

        console.log(' Login res:', res)
        return res.data.data.login || ''

    } catch (e) {
        console.log('err', e)
    }

}

export default {
    login
}