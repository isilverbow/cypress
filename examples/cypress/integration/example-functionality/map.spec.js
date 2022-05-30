context.skip('regex', () => {
    it('example 1', () => {
        let tbl = {}

        cy.get('th').each((headers, i) => {
            let ary = []
            cy.get('tbody tr td')
                .eq(i)
                .then((cell) => {
                    ary.push(cell.text())
                })
            tbl[headers.text()] = ary
        })

        cy.log(tbl)
    })

    it('example 2', () => {
        let tbl = {}

        cy.get('th').each((headers, i) => {
            cy.get('tbody tr td')
                .eq(i)
                .then((cell) => {
                    tbl[headers.text()] = cell.text()
                })
        })
    })
})

// To do
// Needs to be async
