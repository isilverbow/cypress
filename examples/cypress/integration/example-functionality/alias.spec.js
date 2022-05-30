import { goToTmdb } from './lib/lib.js'

let searchSubject

context('alias', () => {
    it('alias a get', () => {
        goToTmdb()

        searchSubject = 'test'

        cy.get('#inner_search_form').contains('Search').as('clickSearch')

        cy.get('#inner_search_v4').type(searchSubject)

        cy.get('@clickSearch').click()

        cy.url().should('include', 'search?query=')
    })
})
