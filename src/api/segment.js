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

const updateSegmentStatus = async (data) => {

    const {id, status, name} = data
    try {

        const res = await api.post(
            '', {
                query: `
                mutation{
                      updateSegmentStatus(
                            id:${id}
                            status:${status}
                            name:${name}
                      ){
                            id
                      }
                }`,
            }
        )

        let response = res.data.data.updateSegmentStatus
        console.log('\nsegments reordering from DB response count:', response.length)
        return response
    } catch (e) {
        console.log(e)
    }
}



export default {
    segmentStatus,
    updateSegmentStatus
}