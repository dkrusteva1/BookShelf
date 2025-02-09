describe('landing spec', () => {

  beforeEach(() => {
    cy.visit('localhost:4200');
  });

  afterEach(() => {
    cy.visit('localhost:4200');
    localStorage.removeItem('currentUser');
  });

  it('should contain the correct title on the landing page', () => {
    cy.get('h1').contains('Welocome to BookShelf!');
    cy.get('h2').contains('Manage your favourite books!');
    cy.get("[data-test='button-login']").should('be.visible').contains('Log In');
    cy.get("[data-test='button-signup']").should('be.visible').contains('Sign Up');
  });

  it('should open the signup from on button click and have the correct input fields', () => {
    cy.get("[data-test='button-signup']").should('be.visible').contains('Sign Up').click();
    cy.get("[data-test='signup-form']").should('be.visible');
    cy.get("[data-test='username-input']").should('be.visible').click().type('some@email.com');
    cy.get("[data-test='password-input']").should('be.visible').click().type('password');
    cy.get("[data-test='error-message']").should('be.visible').contains('Enter valid email and at least 5 digit password.');
    cy.get("[data-test='confirm-password-input']").click().type('123');
    cy.get("[data-test='error-message']").should('be.visible').contains('Enter valid email and at least 5 digit password.');
    cy.get("[data-test='button-submit']").should('be.disabled');
    cy.get("[data-test='confirm-password-input']").click().clear().type('password');
    cy.get("[data-test='button-submit']").should('be.enabled').click();
  });

  it('should open the login from on button click and have the correct input fields', () => {
    localStorage.setItem('some@email', 'password');
    cy.get("[data-test='button-login']").should('be.visible').contains('Log In').click();
    cy.get("[data-test='login-form']").should('be.visible');
    cy.get("[data-test='username-input']").should('be.visible').click().type('some@email.com');
    cy.get("[data-test='password-input']").should('be.visible').click().type('password');
    cy.get("[data-test='button-submit']").should('be.enabled').click();
  });
})