import { goToWikipedia } from './lib/lib.js'

context('Wikipedia - Search', () => {
    beforeEach(() => {
        goToWikipedia()
    })

    it('an exact match automatically redirects to an article', () => {
        cy.get('#search-input').type('The Hobbit')
        cy.get('.pure-button-primary-progressive').click()

        cy.get('#firstHeading').should('contain', 'The Hobbit')
        cy.get('#toc').should('exist')

        cy.get('#bodyContent').should('not.contain', 'Fast and Furious')
    })

    it('a partial match returns a list of associated results', () => {
        cy.get('#search-input').type('hob{enter}')

        cy.contains('h2', 'Businesses and organizations')
            .next()
            .find('a')
            .invoke('attr', 'href')
            .should('contain', '/wiki/')
    })

    it('a search with no matches returns an error', () => {
        cy.get('#search-input').type('zxbsfhsfh{enter}')

        cy.get('.mw-search-createlink').then((el) => {
            expect(el.text()).to.eq('\nThe page "Zxbsfhsfh" does not exist. You can ask for it to be created.')
        })
    })
})
