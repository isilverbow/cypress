context('await', () => {
    it('cypress promise', () => {
        let waited = false
        function waitOneSecond() {
            // return a promise that resolves after 1 second
            return new Cypress.Promise((resolve, reject) => {
                cy.log('first')
                cy.wait(1000)
                // set waited to true
                waited = true
                // resolve with 'foo' string
                resolve('first')
            })
        }

        cy.wrap(null).then(() => {
            // return a promise to cy.then() that
            // is awaited until it resolves
            return waitOneSecond().then((str) => {
                expect(str).to.eq('first')
                expect(waited).to.be.true
            })
        })

        cy.log('second')
    })

    it('js promise', async () => {
        await myFunction()

        cy.log('second!')
    })

    async function myFunction() {
        let promise = new Promise((resolve, reject) => {
            setTimeout(() => resolve('first!'), 1000)
        })

        let result = await promise // wait until the promise resolves (*)

        cy.log(result) // "done!"
    }
})
