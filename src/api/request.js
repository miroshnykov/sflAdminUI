import axios from 'axios'

import {getCookie} from '../helpers'
let token = getCookie('accessToken')

export const api = axios.create({
    baseURL: `${process.env.SFL_CORE_CONDITION}graphql`,
    headers: {
        'Content-Type': 'application/json',
        'Authorization':`Bearer ${token}`
    },
    timeout: 9000
})

