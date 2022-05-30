const xlsx = require('node-xlsx').default
const fs = require('fs')

module.exports = (on, config) => {
    require('cypress-mochawesome-reporter/plugin')(on)
    require('cypress-grep/src/plugin')(config)

    // `on` is used to hook into various events Cypress emits
    on('task', {
        parseXlsx({ filePath }) {
            return new Promise((resolve, reject) => {
                try {
                    const jsonData = xlsx.parse(fs.readFileSync(filePath))
                    resolve(jsonData)
                } catch (e) {
                    reject(e)
                }
            })
        },
    })
}
