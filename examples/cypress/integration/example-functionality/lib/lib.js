export function goToTmdb() {
    cy.window().then((win) => {
        win.sessionStorage.clear()
        return cy.visit('https://www.themoviedb.org/')
    })

    cy.get('#main').find('.title').contains('Welcome').should('be.visible')
}

export function goToWikipedia() {
    cy.window().then((win) => {
        win.sessionStorage.clear()
        return cy.visit('https://wikipedia.org/')
    })

    cy.get('.central-textlogo__image').contains('Wikipedia').should('be.visible')
}
