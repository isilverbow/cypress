export function goToWikipedia() {
    cy.window().then((win) => {
        win.sessionStorage.clear()
        return cy.visit('https://wikipedia.org/')
    })

    cy.get('.central-textlogo__image').contains('Wikipedia').should('be.visible')
}

export function goToEnglishwiki() {
    cy.get('#js-link-box-en').click()

    cy.get('[href="/wiki/Main_Page"]').should('be.visible')
}
