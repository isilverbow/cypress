import { goToTmdb } from './lib/lib.js'

context('TMDB - Community Ratings', () => {
    it('View top rated movies', () => {
        goToTmdb()

        // Open top rated movies page
        cy.get('.sub_media').find('a').contains('Movies').click()

        cy.get('li').contains('Top Rated').click()

        // I expect the first 20 highest rated to be listed
        cy.get('.poster').then((listing) => {
            expect(listing.length).to.equal(20)
        })
    })

    it('Open an actors profile', () => {
        //Go to a specific film page
        let filmName = 'Hot Fuzz'

        cy.readFile(`cypress/fixtures/data/tmdb/film_urls.json`).then((jsonContent) => {
            return cy.visit(`https://www.themoviedb.org/movie/${jsonContent['films'][filmName]}`)
        })

        // go to the reviews page
        cy.get('.k-menu-item').contains('Fandom').click()
        cy.get('.k-menu-link').contains('Reviews').click()

        cy.get('.no_pad').contains('Login to write a review.').should('be.visible')

        //I expect to see a total of 2 reviews', () => {
        cy.get('.review_container')
            .find('.card')
            .then((cards) => {
                expect(cards.length).to.equal(2)
            })
    })
})
