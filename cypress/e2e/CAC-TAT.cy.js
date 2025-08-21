describe("Central de Atendimento ao Cliente TAT", () => {
  beforeEach(() => {
    cy.visit("./src/index.html");
  });

  it("verifica o título da aplicação", () => {
    cy.title().should("be.equal", "Central de Atendimento ao Cliente TAT");
  });

  it("preenche os campos obrigatórios e envia o formulário", () => {
    cy.get("#firstName").type("Gabriela");
    cy.get("#lastName").type("Giovanna Silva");
    cy.get("#email").type("gabi@gmail.com");
    cy.get("#open-text-area").type("Duvida sobre o tema de um curso");
    cy.get(".button").click();
    cy.get(".success").should("be.visible");
  });
});
