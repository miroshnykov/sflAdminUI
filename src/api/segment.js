import {api} from './request'
import {reFormatJSON, catchHandler} from '../helpers'

const segmentStatus = async (id) => {

    try {
        const res = await api.post(
            '', {
                query: `
                    {
                      segmentStatus(id:${id}){
                        name
                        status
                        dateUpdated
                        dateAdded                        
                      } 
                    }
            `,
            }
        )

        let response = res.data.data.segmentStatus
        console.log('\nsegments from DB response:', response)
        return response
    } catch (e) {
        console.log(e)
    }

}

const saveConditionsApi = async (data) => {
    const {id, name, status, filters} = data

    try {

        const res = await api.post(
            '', {
                query: `
                
                    mutation{
                          saveConditions(
                            id:${id}
                            name:"${name}"
                            status:"${status}"
                            filters: ${filters}
                            ){
                              segmentId                        
                          } 
                    }
            `,
            }
        )

        let response = res.data.data.saveConditions
        console.log('\nsegments from DB response:', response)
        return response
    } catch (e) {
        console.log(e)
    }

}


const updateSegmentStatus = async (data) => {

    const {segmentId, status, name} = data
    try {

        const res = await api.post(
            '', {
                query: `
                    mutation{
                          updateSegmentStatus(
                                segmentId:${segmentId}
                                status:"${status}"
                                name:"${name}"
                          ){
                                segmentId
                          }
                    }`,
            }
        )

        let response = res.data.data.updateSegmentStatus
        console.log('\nupdateSegmentStatus response', response)
        return response
    } catch (e) {
        console.log(e)
    }
}


export default {
    segmentStatus,
    saveConditionsApi,
    updateSegmentStatus
}