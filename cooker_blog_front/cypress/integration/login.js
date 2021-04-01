describe('Login', () => {
    it('Fill form & ', () => {
        cy.visit('/login')
        cy.get('input[name="email"]').type('alexis.brohan@ynov.com')
        cy.get('input[name="password"]').type('password')
        cy.get('form').submit()
    })
})