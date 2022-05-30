// Test cases in this spec:
// i. Search wikipedia for a book

import { goToWikipedia, goToEnglishwiki } from './lib/lib.js'

context('Wikipedia - Random Articles', () => {
    it('Open a random article', () => {
        goToWikipedia()
        goToEnglishwiki()

        // Go to random page link
        cy.get('#n-randompage').click()

        cy.get('#firstHeading').should('exist').should('be.visible')
        cy.get('#mw-normal-catlinks').scrollIntoView()

        let footerLinks = ['Privacy policy', 'About Wikipedia', 'Statistics']

        // Check that each item in the array is listed
        footerLinks.forEach((item) => {
            cy.get('a').contains(item).should('exist')
        })
    })
})
