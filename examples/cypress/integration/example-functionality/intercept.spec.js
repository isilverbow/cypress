import { goToTmdb } from './lib/lib.js'

let searchSubject

context('Intercept examples', () => {
    it('intercept - redirect', () => {
        cy.intercept('search?query=test', (req) => {
            // statusCode defaults to `302`
            req.redirect('search?query=boop', 301)
        })

        cy.intercept('search?query=test', (req) => {
            // statusCode defaults to `302`
            req.redirect('search?query=lalala', 301)
        })

        goToTmdb()

        searchSubject = 'test'

        cy.get('#inner_search_v4').type(searchSubject)
        cy.get('#inner_search_form').contains('Search').click()
        cy.url().should('include', 'search?query=')
    })
})
