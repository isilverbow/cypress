import { goToWikipedia } from './lib/lib.js'

context('assert', () => {
    it('example assertions', () => {
        goToWikipedia()

        // Equals
        cy.get('#js-link-box-en').find('strong').should('have.text', 'English')
        // Not Equals
        cy.get('#js-link-box-en').find('strong').not('have.text', 'French')
        // Includes
        cy.get('#js-link-box-en').find('strong').contains('Eng')
        // Not Include
        cy.get('#js-link-box-en').find('strong').contains('Fren').should('not.exist')
        // Be Empty
        cy.get('#js-link-box-en').find('strong').should('not.be.empty')
        // Not Be Empty
        cy.get('#EXAMPLE').should('not.be.empty')

        // Element Count
        cy.get('[data-el-section="primary links"]')
            .children()
            .then(($element) => {
                expect($element.length).to.be.greaterThan(1)
            })
    })
})
