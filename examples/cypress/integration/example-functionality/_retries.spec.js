const TIMEOUT = 5

Cypress.Commands.overwrite('get', (originalFn, ...params) => {
    let tries = 0
    return new Promise((resolve, reject) => {
        setTimeout(() => select(resolve, reject), TIMEOUT)
    })

    async function select(resolve, reject) {
        try {
            let value = await originalFn(...params)
            setTimeout(() => {
                if (value && value.length && !Cypress.dom.isAttached(value)) {
                    if (tries++ < 5) {
                        return select(resolve, reject)
                    }
                }
                resolve(value)
            }, TIMEOUT)
        } catch (e) {
            reject(e)
        }
    }
})
