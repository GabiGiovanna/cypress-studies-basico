describe("Central de Atendimento ao Cliente TAT", () => {
  beforeEach(() => {
    cy.visit("./src/index.html");
  });

  it("verifica o título da aplicação", () => {
    cy.title().should("be.equal", "Central de Atendimento ao Cliente TAT");
  });

  it.only("preenche os campos obrigatórios e envia o formulário", () => {
    //Ações
    const longText = Cypress._.repeat("asddfg", 10);

    cy.get("#firstName").type("Gabriela");
    cy.get("#lastName").type("Giovanna Silva");
    cy.get("#email").type("gabi@gmail.com");
    cy.get("#open-text-area").type(longText, {
      delay: 0,
    });
    cy.get('button[type="submit"]').click();
    //Verificações
    cy.get(".success").should("be.visible");
  });
});
