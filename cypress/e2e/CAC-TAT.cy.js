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
    cy.contains('button','Enviar').click();
    //Verificações
    cy.get(".success").should("be.visible");
  });

  it("exibe mensagem de erro ao submeter o formulário com um email com formatação inválida", () => {
    cy.get("#firstName").type("Gabriela");
    cy.get("#lastName").type("Giovanna Silva");
    cy.get("#email").type("gabicom");
    cy.get("#open-text-area").type("Teste");
    cy.contains('button',"Enviar").click();

    cy.get(".error").should("be.visible");
  });

  it("campo telefone continua vazio quando preenchido com valor não numérico", () => {
    cy.get("#phone").type("abcdefghij").should("have.value", "");
  });

  it("exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário", () => {
    cy.get("#firstName").type("Gabriela");
    cy.get("#lastName").type("Giovanna Silva");
    cy.get("#email").type("gabi@gmail.com");
    cy.get("#phone-checkbox").click();
    cy.get("#open-text-area").type("Teste");
    cy.contains('button',"Enviar").click();

    cy.get(".error").should("be.visible");
  });

  it("preenche e limpa os campos nome, sobrenome, email e telefone", () => {
    cy.get("#firstName")
      .type("Gabriela")
      .should("have.value", "Gabriela")
      .clear()
      .should("have.value", "")

    cy.get("#lastName")
      .type("Giovanna Silva")
      .should("have.value", "Giovanna Silva")
      .clear()
      .should("have.value", "")

    cy.get("#email")
      .type("gabi@gmail.com")
      .should("have.value", "gabi@gmail.com")
      .clear()
      .should("have.value", "")

    cy.get("#phone")
      .type("31986584522")
      .should("have.value", "31986584522")
      .clear()
      .should("have.value", "")
  });


  it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios',() => {

  cy.contains('button',"Enviar").click();
  cy.get('.error').should('be.visible')


  })

it('envia o formuário com sucesso usando um comando customizado', () => {

  const data = {firstName:"Gabriela",
    lastName:"Giovanna Silva",
    email:"gabi123@gmail.com",
    text:"teste123"
  }

cy.fillMandatoryFieldsAndSubmit(data)
cy.get('.success').should('be.visible');

});

it.only('seleciona um produto (YouTube) por seu texto',() => {


  cy.get('#product').select('YouTube').should('have.value',"youtube") 

});

});
