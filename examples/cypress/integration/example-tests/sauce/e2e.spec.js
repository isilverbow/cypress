context.skip('Sauce - e2e test', () => {
    it('Buy multiple items', () => {
        login()
        addItemsToCart()
        goToCart()
        enterBillingDetails()
        assertOrderSummary()

        // COMPLETE ORDER
        cy.get('#finish').click()

        // assert your order is successful
        cy.get('.complete-header').contains('THANK YOU FOR YOUR ORDER').should('exist')
    })
})

function login() {
    // go to https://www.saucedemo.com/
    cy.visit('https://www.saucedemo.com/')
    // type 'standard_user' into the username field

    cy.get('#user-name').type('standard_user')
    // type 'secret_sauce' into the password field

    cy.get('#password').type('secret_sauce')
    // click login

    cy.get('#login-button').click()
    // assert login is successful

    cy.get('.title').contains('Products').should('be.visible')
}

function addItemsToCart() {
    // add a fleece to the cart
    cy.get('#add-to-cart-sauce-labs-fleece-jacket').click()

    // assert the fleece now shows 'remove' rather than 'add to cart'
    cy.get('#remove-sauce-labs-fleece-jacket').contains('Remove').should('be.visible')

    // add a backpack to the cart
    cy.get('#add-to-cart-sauce-labs-backpack').click()

    // assert the backpack now shows 'remove' rather than 'add to cart'
    cy.get('#remove-sauce-labs-backpack').contains('Remove').should('be.visible')
}

function goToCart() {
    // go to cart (link at top right of screen)
    cy.get('#shopping_cart_container').click()

    // assert backpack is in the cart
    cy.get('.inventory_item_name').contains('Sauce Labs Fleece Jacket').should('exist')

    // assert fleece is in the cart
    cy.get('.inventory_item_name').contains('Sauce Labs Backpack').should('exist')

    // assert the quantity of backpacks is set to '1'
    cy.get('.inventory_item_name')
        .contains('Sauce Labs Fleece Jacket')
        .parent()
        .parent()
        .prev()
        .contains('1')
        .should('exist')

    // assert the quantity of fleeces is set to '1'
    cy.get('.inventory_item_name')
        .contains('Sauce Labs Backpack')
        .parent()
        .parent()
        .prev()
        .contains('1')
        .should('exist')
}

function enterBillingDetails() {
    // Click 'checkout'
    cy.get('#checkout').contains('Checkout').click()

    // enter firstname as 'Georgina'
    cy.get('#first-name').type('Georgina')

    // enter lastname as 'Smithy'
    cy.get('#last-name').type('Smithy')

    // enter postcode as CF99 1AA
    cy.get('#postal-code').type('CF99 1AA')

    // click continue
    cy.get('#continue').click()
}

function assertOrderSummary() {
    // assert confirmation screen includes the backpack
    cy.get('.inventory_item_name').contains('Sauce Labs Fleece Jacket').should('exist')

    // assert confirmation screen includes the fleece
    cy.get('.inventory_item_name').contains('Sauce Labs Backpack').should('exist')

    // assert the item total is '79.98'
    cy.get('.summary_subtotal_label').contains('79.98').should('exist')

    // assert the vat is '6.40'
    cy.get('.summary_tax_label').contains('6.40').should('exist')

    // assert the the total with vat is '86.38'
    cy.get('.summary_total_label').contains('86.38').should('exist')
}
