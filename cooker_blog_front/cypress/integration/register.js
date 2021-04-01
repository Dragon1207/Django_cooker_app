describe('Register', () => {
    it('Fill form & ', () => {
        cy.visit('/register')
        cy.get('input[name="email"]').type('test.register@ynov.com')
        cy.get('input[name="username"]').type('register')
        cy.get('input[name="password"]').type('password123')
        cy.get('form').submit()
    });
});