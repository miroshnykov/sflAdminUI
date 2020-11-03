let env

if (process.env.CI) {
    env = `CI`
}

let config

config = {
    env: process.env.NODE_ENV || env || `production`,
    port: 8080,
    sflCoreCondition: {
        host: '"https://sfl-api-advertiser.surge.systems/"'
    },
}

module.exports = config
