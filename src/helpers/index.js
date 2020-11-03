import dateFormat from 'dateformat'

const isString = x => typeof x === 'string'

const isValidDate = string => /\d{4}-\d{2}-\d{2}/.test(string)

const length = x => x.length
const zeroLength = x => length(x) === 0
const duplicate = (y) => y.filter((v, i) => y.indexOf(v) === i)

const isEmptyString = x => isString(x) && zeroLength(x)

const reFormatJSON = x => JSON.parse(JSON.stringify(x))
const cloneObject = x => Object.assign({}, x)
const cloneObjectArray = x => x.map(cloneObject)

const isNull = x => x === null
const isTruthyOrNull = x => x || isNull(x)

const assignPositions = xs =>
    xs.map((x, position) => Object.assign({}, x, {position}))

const getCookie = (name) => {
    let value = '; ' + document.cookie
    let parts = value.split('; ' + name + '=')
    if (parts.length === 2) return parts.pop().split(';').shift()
}

const deleteCookie = (name) => {
    document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;'
}

const formatData = (date) => {
    return dateFormat(date, 'yyyy-mm-dd H:MM:ss')
}

const catchHandler = (e) => {
    deleteCookie('accessToken')
    location.reload()
    console.log('err', e)
}

const timeSince = (date) => {

    let seconds = Math.floor((new Date() - date) / 1000)
    let interval = Math.floor(seconds / 31536000)
    if (interval > 1) {
        return interval + ' years'
    }
    interval = Math.floor(seconds / 2592000)
    if (interval > 1) {
        return interval + ' months'
    }
    interval = Math.floor(seconds / 86400)
    if (interval > 1) {
        return interval + ' days'
    }
    interval = Math.floor(seconds / 3600)
    if (interval > 1) {
        return interval + ' hours'
    }
    interval = Math.floor(seconds / 60)
    if (interval > 1) {
        return interval + ' minutes'
    }
    return Math.floor(seconds) + ' seconds'
}

export {
    isValidDate,
    isEmptyString,
    duplicate,
    reFormatJSON,
    cloneObject,
    formatData,
    timeSince,
    catchHandler,
    cloneObjectArray,
    getCookie,
    deleteCookie,
    isTruthyOrNull,
    assignPositions
}

