import axios from 'axios'
import {api} from './request'
import {getCookie} from '../helpers'
// import parser from 'csv-parse'

const uploadReg = axios.create({
    baseURL: `${process.env.SFL_CORE_CONDITION}`,
})

let token = getCookie('accessToken')

const uploadFile = async (dataFile) => {
    try {
        let obj = {}
        obj.dataFile = dataFile.dataFile

        let params = {
            method: 'POST',
            url: `upload`,
            data: obj,
            headers: {
                'authorization': token,
            }
        }

        console.log('params:', params)

        const {data} = await uploadReg(params)
        return data

    } catch (e) {
        console.log(e)
    }
}

export default {
    uploadFile,
}