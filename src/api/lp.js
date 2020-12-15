import {api} from './request'
import {catchHandler, reFormatJSON} from "../helpers";

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

const createSegmentLp = async (segmentId, lpId, weight) => {
    try {
        const res = await api.post(
            '', {
                query: `
                    mutation{
                          createLp(
                                segmentId:${segmentId}
                                lpId:${lpId}
                                weight:${weight || 0}
                          ){
                                segmentId
                          }
                    }`,
            }
        )

        let response = res.data.data.createLp
        console.table(reFormatJSON(response))
        return response
    } catch (e) {
        catchHandler(e)
    }
}

const updateSegmentLp = async (id, segmentId, lpId, weight) => {
    try {
        const res = await api.post(
            '', {
                query: `
                    mutation{
                          updateLp(
                                id:${id}
                                segmentId:${segmentId}
                                lpId:${lpId}
                                weight:${weight || 0}
                          ){
                                segmentId
                          }
                    }`,
            }
        )

        let response = res.data.data.updateLp
        console.table(reFormatJSON(response))
        return response
    } catch (e) {
        catchHandler(e)
    }
}

const deleteSegmentLp = async (id) => {
    try {
        const res = await api.post(
            '', {
                query: `
                    mutation{
                          deleteSegmentLp(
                                id:${id}
                          ){
                                id
                          }
                    }`,
            }
        )
        let response = res.data.data.deleteSegmentLp
        console.log('  >>> deleteSegmentLp')
        console.table(reFormatJSON(response))
        return response
    } catch (e) {
        catchHandler(e)
    }
}

export default {
    lp,
    createSegmentLp,
    updateSegmentLp,
    deleteSegmentLp
}