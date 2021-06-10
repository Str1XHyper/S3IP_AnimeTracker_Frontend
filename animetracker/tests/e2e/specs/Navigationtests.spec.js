describe('Tests navigation features as user', () =>{
    let user = {
        name: 'Test_Username',
        password: 'Test_Password'
    }
    beforeEach(() =>{
        cy.visit('/')
        cy.contains('Profile').click()
        cy.contains('Login').click()
        cy.get(':nth-child(1) > .col > span > .v-input').type(Cypress.env(user.name))
        cy.get(':nth-child(2) > .col > span > .v-input').type(Cypress.env(user.password))
        cy.get('.mb-auto > .spacer').click()
        cy.get('.mb-auto > .v-btn').click()
        cy.get('.v-main__wrap').click()
    })
    it('Navigates to my `Planned to watch`', () =>{
        cy.contains(Cypress.env(user.name)).click()
        cy.contains('Plan to watch').click()
        cy.url().should('include', "/MyList")
        cy.get('.v-tab--active').should('have.text', " Planned to watch ")
    })
    it('Navigates to my `Currently watching`', () =>{
        cy.contains(Cypress.env(user.name)).click()
        cy.contains('Watching').click()
        cy.url().should('include', "/MyList")
        cy.get('.v-tab--active').should('have.text', " Currently watching ")
    })
    it('Navigates to my `Completed`', () =>{
        cy.contains(Cypress.env(user.name)).click()
        cy.contains('Completed').click()
        cy.url().should('include', "/MyList")
        cy.get('.v-tab--active').should('have.text', " Finished ")
    })
})
describe('Tests navigation features as admin', () =>{
    let user = {
        name: 'Test_Admin_Username',
        password: 'Test_Password'
    }
    beforeEach(() =>{
        cy.visit('/')
        cy.contains('Profile').click()
        cy.contains('Login').click()
        cy.get(':nth-child(1) > .col > span > .v-input').type(Cypress.env(user.name))
        cy.get(':nth-child(2) > .col > span > .v-input').type(Cypress.env(user.password))
        cy.get('.mb-auto > .spacer').click()
        cy.get('.mb-auto > .v-btn').click()
        cy.get('.v-main__wrap').click()
    })
    it('Navigates to my `Planned to watch`', () =>{
        cy.contains(Cypress.env(user.name)).click()
        cy.contains('Plan to watch').click()
        cy.url().should('include', "/MyList")
        cy.get('.v-tab--active').should('have.text', " Planned to watch ")
    })
    it('Navigates to my `Currently watching`', () =>{
        cy.contains(Cypress.env(user.name)).click()
        cy.contains('Watching').click()
        cy.url().should('include', "/MyList")
        cy.get('.v-tab--active').should('have.text', " Currently watching ")
    })
    it('Navigates to my `Completed`', () =>{
        cy.contains(Cypress.env(user.name)).click()
        cy.contains('Completed').click()
        cy.url().should('include', "/MyList")
        cy.get('.v-tab--active').should('have.text', " Finished ")
    })
    it('Navigates to my `Edit Animes`', () =>{
        cy.contains(Cypress.env(user.name)).click()
        cy.contains('Edit animes').click()
        cy.url().should('include', "/EditAnime")
    })
    it('Navigates to my `Edit Users`', () =>{
        cy.contains(Cypress.env(user.name)).click()
        cy.contains('Edit users').click()
        cy.url().should('include', "/EditUser")
    })
})