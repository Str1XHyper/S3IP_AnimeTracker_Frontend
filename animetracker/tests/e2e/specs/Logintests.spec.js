describe('Tests login functions', () => {
    beforeEach(() => {
        cy.visit('/')
        // cy.get('.v-toolbar__content > button.v-btn').click()
        cy.contains('Profile').click()
        cy.contains('Login').click()
      })
    it('Tests successfull login', () => {
        cy.get(':nth-child(1) > .col > span > .v-input').type(Cypress.env('Test_Username'))
        cy.get(':nth-child(2) > .col > span > .v-input').type(Cypress.env('Test_Password'))
        cy.get('.mb-auto > .spacer').click()
        cy.get('.mb-auto > .v-btn').click()
        cy.contains('Profile').should('have.text', "Profile")
    })
    it('Tests login wrong details', () => {
        cy.get(':nth-child(1) > .col > span > .v-input').type("wrong username")
        cy.get(':nth-child(2) > .col > span > .v-input').type("wrong password")
        cy.get('.mb-auto > .spacer').click()
        cy.get('.mb-auto > .v-btn').click()
        cy.get('form > .v-alert > .v-alert__wrapper > .v-alert__content').should('have.text', "Wrong username and password combination")
    })
})