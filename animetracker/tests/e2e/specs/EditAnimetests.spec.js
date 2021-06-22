describe('Tests EditAnime functions', () => {
    let user = {
        name: 'Test_Admin_Username',
        password: 'Test_Password'
    }
    let anime = {
        name: "!Test Anime",
        desc: "Test anime decription",
        imgSrc: "Test image link",
        japaneseName: "Test Japanese name"
    }
    beforeEach(() =>{
        cy.visit('/')
        cy.contains('Profile').click()
        cy.contains('Login').click()
        cy.get('#textfield-login-username').type(Cypress.env(user.name))
        cy.get('#textfield-login-password').type(Cypress.env(user.password))
        cy.get('.mb-auto > .spacer').click()
        cy.get('.mb-auto > .v-btn').click()
        cy.get('.v-main__wrap').click()
        cy.contains(Cypress.env(user.name)).click()
        cy.get('#profile-dropdown-editanimes').click()
    })
    it('Tests Add anime feature', () =>{
        cy.get('#anime-add-button').click()
        cy.get('#editDialog-japaneseName-input').type(anime.japaneseName)
    })
})