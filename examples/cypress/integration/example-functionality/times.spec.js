context('times', () => {
    const iterations = (x) => (f) => {
        if (x > 0) {
            cy.log(`iteration number #${x}`)
            f()
            iterations(x - 1)(f)
        }
    }

    it('example', () => {
        iterations(5)(() => cy.log())
    })
})
