import { goToTmdb } from './lib/lib.js'

let searchSubject

context('TMDB - Search', () => {
    it('Search for an Actor', () => {
        goToTmdb()

        searchSubject = 'Keanu Reeves'

        cy.get('#inner_search_v4').type(searchSubject)
        cy.get('#inner_search_form').contains('Search').click()
        cy.url().should('include', 'search?query=')

        cy.get('.name').contains(searchSubject).scrollIntoView().should('be.visible')

        cy.get('.name').contains(searchSubject).first().scrollIntoView().click()

        cy.url().should('include', '/person/')

        cy.get('.title').contains(searchSubject).should('be.visible')
        cy.get('.biography').then((bio) => {
            expect(bio.text()).to.have.string('The Matrix trilogy as Neo')
        })
        cy.get('bdi').contains('Known For').parent().parent().contains('Acting').should('exist')
    })
})
