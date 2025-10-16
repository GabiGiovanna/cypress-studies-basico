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
    cy.contains("button", "Enviar").click();
    //Verificações
    cy.get(".success").should("be.visible");
  });

  it("exibe mensagem de erro ao submeter o formulário com um email com formatação inválida", () => {
    cy.get("#firstName").type("Gabriela");
    cy.get("#lastName").type("Giovanna Silva");
    cy.get("#email").type("gabicom");
    cy.get("#open-text-area").type("Teste");
    cy.contains("button", "Enviar").click();

    cy.get(".error").should("be.visible");
  });

  it("campo telefone continua vazio quando preenchido com valor não numérico", () => {
    cy.get("#phone").type("abcdefghij").should("have.value", "");
  });

  it("exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário", () => {
    cy.get("#firstName").type("Gabriela");
    cy.get("#lastName").type("Giovanna Silva");
    cy.get("#email").type("gabi@gmail.com");
    cy.get("#phone-checkbox").check();
    cy.get("#open-text-area").type("Teste");
    cy.contains("button", "Enviar").click();

    cy.get(".error").should("be.visible");
  });

  it("preenche e limpa os campos nome, sobrenome, email e telefone", () => {
    cy.get("#firstName")
      .type("Gabriela")
      .should("have.value", "Gabriela")
      .clear()
      .should("have.value", "");

    cy.get("#lastName")
      .type("Giovanna Silva")
      .should("have.value", "Giovanna Silva")
      .clear()
      .should("have.value", "");

    cy.get("#email")
      .type("gabi@gmail.com")
      .should("have.value", "gabi@gmail.com")
      .clear()
      .should("have.value", "");

    cy.get("#phone")
      .type("31986584522")
      .should("have.value", "31986584522")
      .clear()
      .should("have.value", "");
  });

  it("exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios", () => {
    cy.contains("button", "Enviar").click();
    cy.get(".error").should("be.visible");
  });

  it("envia o formuário com sucesso usando um comando customizado", () => {
    const data = {
      firstName: "Gabriela",
      lastName: "Giovanna Silva",
      email: "gabi123@gmail.com",
      text: "teste123",
    };

    cy.fillMandatoryFieldsAndSubmit(data);
    cy.get(".success").should("be.visible");
  });

  it("seleciona um produto (YouTube) por seu texto", () => {
    cy.get("#product").select("YouTube").should("have.value", "youtube");
  });

  it("seleciona um produto (Mentoria) por seu valor (value)", () => {
    cy.get("#product").select("mentoria").should("have.value", "mentoria");
  });

  it("seleciona um produto (Blog) por seu índice", () => {
    cy.get("#product").select(1).should("have.value", "blog");
  });

  it('marca o tipo de atendimento "Feedback"', () => {
    cy.get('input[type="radio"][value="feedback"]')
      .check()
      .should("be.checked");
  });

  it("marca cada tipo de atendimento", () => {
    cy.get('input[type="radio"]').each((Tipo) => {
      cy.wrap(Tipo).check().should("be.checked");
    });
  });

  it("marca ambos checkboxes, depois desmarca o último", () => {
    cy.get('#check input[type="checkbox"]')
      .check()
      .should("be.checked")
      .last()
      .uncheck()
      .should("not.be.checked");
  });

  it.only("seleciona um arquivo da pasta fixtures", () => {
    cy.get("#file-upload") //Identificando elemento do tipo file id
      .selectFile("cypress/fixtures/example.json") //fazendo upload do arquivo
      .should((input) => {
        //Usando no should uma função de callback(arrow function) e essa função recebe o input

        expect(input[0].files[0].name).to.equal("example.json"); //E aq ele fala que espera que o name do input no indice 0, o file do indice 0 se igual(.to.equal) ao nome do nosso arquivo
      });
  });
});
