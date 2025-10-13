Cypress.Commands.add('fillMandatoryFieldsAndSubmit', (data = {

    firstName:"Luisa",
    lastName:"De Oliveira Santos",
    email:"luisa123@gmail.com",
    text:"lulu3456"

}) => {
  cy.get("#firstName").type(data.firstName);
    cy.get("#lastName").type(data.lastName);
    cy.get("#email").type(data.email);
    cy.get("#open-text-area").type("Teste");
    cy.get('button[type="submit"]').click();
});