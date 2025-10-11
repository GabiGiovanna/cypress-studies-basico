describe("Central de Atendimento ao Cliente TAT", () => {
  beforeEach(() => {
    cy.visit("./src/index.html");
  });

  it("verifica o título da aplicação", () => {
    cy.title().should("be.equal", "Central de Atendimento ao Cliente TAT");
  });

  it("preenche os campos obrigatórios e envia o formulário", () => {
    //Ações
    const longText = Cypress._.repeat("asddfgterth", 10);

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

  it("exibe mensagem de erro ao submeter o formulário com um email com formatação inválida", () => {
    cy.get("#firstName").type("Gabriela");
    cy.get("#lastName").type("Giovanna Silva");
    cy.get("#email").type("gabicom");
    cy.get("#open-text-area").type("Teste");
    cy.get('button[type="submit"]').click();
    cy.get(".error").should("be.visible");
  });

  it.only("campo telefone continua vazio quando preenchido com valor não numérico", () => {
    cy.get("#phone").type("abcdefghij").should("have.value", "");
  });
});
