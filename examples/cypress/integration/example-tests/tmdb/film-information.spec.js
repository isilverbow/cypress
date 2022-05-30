import { goToTmdb } from './lib/lib.js'

context('TMDB - Community Ratings', () => {
    beforeEach(() => {
        goToTmdb()

        // Go to a specific film page
        let filmName = 'Shaun of the Dead'

        cy.readFile(`cypress/fixtures/data/tmdb/film_urls.json`).then((jsonContent) => {
            return cy.visit(`https://www.themoviedb.org/movie/${jsonContent['films'][filmName]}`)
        })
    })

    describe('Top billed cast', () => {
        it('Top billed case are accreditted', () => {
            let topBilledCast = []

            //make note of all the top billed cast
            cy.get('#cast_scroller')
                .find('.card')
                .each((card) => {
                    topBilledCast.push(card.find('p').first().text())
                })

            //check that the cast list is accreditted
            cy.readFile(`cypress/fixtures/data/tmdb/sotd-data.json`).then((data) => {
                data['cast'].forEach((i) => {
                    cy.get('.top_billed').contains(i).should('exist')
                })
            })
        })
    })

    describe('Keywords', () => {
        it('Keywords are listed', () => {
            cy.readFile(`cypress/fixtures/data/tmdb/sotd-data.json`).then((data) => {
                data['keywords'].forEach((i) => {
                    cy.get('.keywords').contains(i).should('exist')
                })
            })
        })
    })

    describe('Movie facts are displayed', () => {
        it('Status is displayed', () => {
            factListContent('Status')
        })

        it('Original Language is displayed', () => {
            factListContent('Original Language')
        })

        it('Budget is displayed', () => {
            factListContent('budget')
        })
    })

    describe('Release info is displayed', () => {
        it('Run-time is displayed', () => {
            releaseInfoContent('Run Time')
        })

        it('Release date is displayed', () => {
            releaseInfoContent('Release Date')
        })

        it('Screenplay is displayed', () => {
            releaseInfoContent('Screenplay')
        })

        it('Director is displayed', () => {
            releaseInfoContent('Director')
        })
    })
})

function factListContent(item) {
    cy.readFile(`cypress/fixtures/data/tmdb/sotd-data.json`).then((data) => {
        cy.get('.facts').contains(data['fact-list'][item]).should('exist')
    })
}

function releaseInfoContent(item) {
    cy.readFile(`cypress/fixtures/data/tmdb/sotd-data.json`).then((data) => {
        if (item == 'Run Time') {
            data['release-info'][item] = data['release-info'][item].replace(':', 'h ')
        }

        if (item == 'Screenplay') {
            data['release-info'][item] = data['release-info'][item].charAt(0).toUpperCase()
        }

        if (item == 'Director') {
            let x = data['release-info'][item].split(',')
            data['release-info'][item] = x[0]
        }

        cy.get('.poster').contains(data['release-info'][item]).should('exist')
    })
}
