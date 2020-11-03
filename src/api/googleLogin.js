import axios from 'axios'
import {getCookie} from '../helpers'

const {catchHandler} = require('../helpers/catchErr')

console.log(`\nSSO_API:${process.env.SSO_API}`)

const login = axios.create({
    baseURL: `${process.env.SSO_API}`,
})

const getLoginUrl = async () => {
    try {
        let projectName = 'sflAdmin'
        const {data} = await login.get(`/loginUrl?projectName=${projectName}`)
        return data
    } catch (e) {
        catchHandler(e, 'getLoginUrl')
    }

}

const verifyToken = async () => {
    try {
        let token = getCookie('accessToken')
        const {data} = await login.get(`/verifyToken?token=${token}`)
        return data
    } catch (e) {
        catchHandler(e, 'verifyToken')
    }

}

export default {
    getLoginUrl,
    verifyToken
}