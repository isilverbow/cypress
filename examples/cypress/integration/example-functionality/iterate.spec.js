context('iterate', () => {
    it('over an object', () => {
        let myObj = { Forename: 'Bob', Surname: 'Smith', Age: '25' }

        let values = []

        for (const [__key, value] of Object.entries(myObj)) {
            values.push(value)
        }

        cy.log(values)
    })

    it('over an array', () => {
        let myArr = ['Bob', 'Smith', '25']

        myArr.forEach((i) => {
            cy.log(i)
        })
    })
})
