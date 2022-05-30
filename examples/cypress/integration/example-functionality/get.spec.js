import { goToWikipedia } from './lib/lib.js'

context('get', () => {
    it('get examples', () => {
        goToWikipedia()

        // a non standard element
        cy.get('[data-el-section="primary links"]').should('exist')

        // a partial match
        cy.get('[id*=box-en]').find('strong').should('have.text', 'English')

        // a visible element
        cy.get('#js-link-box-en').find('strong').filter(':visible')

        // with a variable
        let lang = 'en'
        cy.get(`#js-link-box-${lang}`).find('strong').filter(':visible')

        // text of element
        cy.get('#js-link-box-en')
            .find('strong')
            .then((el) => {
                cy.log(el.text())
                expect(el.text()).to.eq('English')
            })

        // a value
        cy.get('#searchInput').type('hello').blur()
        cy.get('#searchInput').then((el) => {
            cy.log(el[0].value)
            expect(el[0].value).to.eq('hello')
        })

        // element number x
        cy.get('[id*=js-link-]')
            .eq(9)
            .find('strong')
            .then((el) => {
                cy.log(el)
                expect(el.text()).to.eq('Polski')
            })

        // the count
        cy.get('[data-el-section="primary links"]')
            .children()
            .then((el) => {
                cy.log(el.length)
                expect(el.length).to.eq(10)
            })

        // the associated attribute
        cy.get('#js-link-box-en').invoke('attr', 'href').should('eq', '//en.wikipedia.org/')
    })
})
