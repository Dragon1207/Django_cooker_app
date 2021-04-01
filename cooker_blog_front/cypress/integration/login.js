describe('Login', () => {
    it('Fill form & submit', () => {
        cy.visit('/login')
        cy.get('input[name="email"]').type('alexis.brohan@ynov.com');
        cy.get('input[name="password"]').type('password');
        cy.get('.login-submit').click();
        cy.get('h2').contains('Liste des recettes postés récemment');
    })
})