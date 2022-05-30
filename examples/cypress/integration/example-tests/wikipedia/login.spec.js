import { goToWikipedia, goToEnglishwiki } from './lib/lib.js'

context('Wikipedia - Login', () => {
    it('Enter incorrect login details', () => {
        goToWikipedia()

        goToEnglishwiki()

        cy.get('#pt-login').click()

        cy.get('[title="Special:PasswordReset"]').click()

        cy.get('#ooui-php-1').type('username')
        cy.get('#ooui-php-2').type('test123123@test123123.com')

        cy.get('span').contains('Reset password').click()

        let errorMsg = 'The username Username is not registered on this wiki, but you can reset its password on'

        cy.get('span').contains(errorMsg).should('be.visible')
    })
})
