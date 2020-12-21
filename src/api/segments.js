import {api} from './request'
import {reFormatJSON, catchHandler} from '../helpers'

const segments = async (type) => {

    try {
        const res = await api.post(
            '', {
                query: `
                {
                    segments(type:"${type}"){
                        id
                        name
                        status
                        dateAdded
                        dateAddedUnixTime
                        position
                        lp{
                            id
                            segmentId
                            lpId,
                            name  
                            weight                      
                        }

                    } 
                }
            `,
            }
        )

        let response = res.data.data.segments
        console.log('\nsegments from DB response count:', response.length)
        return response
    } catch (e) {
        console.log(e)
    }

}


const reOrderSegmentsSave = async (data) => {

    console.log('reOrderSegmentsSave:', data)
    try {
        const res = await api.post(
            '', {
                query: `
                    mutation{
                        ordering(
                            segmentType:"${data.segmentType}"
                            reordering: 
                                ${data.reOrdering}
                            
                        ) {
                            id
                            position
                        }
                    }
            `,
            }
        )

        let response = res.data.data
        console.log('\nsegments reordering from DB response count:', response.length)
        return response
    } catch (e) {
        console.log(e)
    }

}


const deleteSegment = async (data) => {

    const {id, segmentType} = data
    console.log('deleteSegment:', data)
    try {

        const res = await api.post(
            '', {
                query: `
                mutation{
                      deleteSegment(
                            id:${id}
                            segmentType:"${segmentType}"
                      ){
                            id
                      }
                }`,
            }
        )

        let response = res.data.data.deleteSegment
        console.log('\nsegments reordering from DB response count:', response.length)
        return response
    } catch (e) {
        console.log(e)
    }
}

const createSegment = async (data) => {

    let {name, segmentType} = data
    console.log(`createSegment:${name}, segmentType:${segmentType}`)
    try {
        const res = await api.post(
            '', {
                query: `
                    mutation{
                          createSegment(
                                name:"${name}"
                                type:"${segmentType}"
                          ){
                                id
                          }
                    }`,
            }
        )

        let response = res.data.data.createSegment
        console.log('\nsegments reordering from DB response count:', response.length)
        return response
    } catch (e) {
        console.log(e)
    }

}

const updateLandingPage = async (segment) => {

    console.log('updateLandingPage:', segment)
    let {id, landingPageId} = segment
    try {

        const res = await api.post(
            '', {
                query: `
                    mutation{
                          updateLandingPage(
                                segmentId:${id}
                                landingPageId:${landingPageId}
                          ){
                                id
                          }
                    }`,
            }
        )

        let response = res.data.data.updateLandingPage
        console.log('\nupdateLandingPage', response)
        return response
    } catch (e) {
        console.log(e)
    }

}

export default {
    segments,
    updateLandingPage,
    createSegment,
    deleteSegment,
    reOrderSegmentsSave
}