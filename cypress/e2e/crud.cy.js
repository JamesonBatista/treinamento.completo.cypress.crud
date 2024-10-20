import { faker, clone, crudStorage } from "../support/e2e";
import user from "../fixtures/exemplos/getuser.json";

describe("Treinamento CYPRESS-CRUD", () => {
  it("Get simples com url no teste", () => {
    cy.crud({ get: "https://reqres.in/api/users/2" });
  });

  it("Get simples com json", () => {
    cy.crud("exemplos/getuser");
  });

  it("Get simples com json e endpoint no .env", () => {
    cy.crud("exemplos/getuser");
  });
  it("Get simples com json e endpoint no .env no ambiente de PROD", () => {
    cy.crud("exemplos/getUserPROD");
  });
  it("crud usando json em forma de array de objetos", () => {
    cy.crud("crud/crud");
  });
  it("usar forma aprimorada de validação salvar por posição", () => {
    cy.crud({ get: "localhost/users", expect: "last_name:::>4" });
  });
  it("usar forma aprimorada de validação salvar mudando variavel por posição", () => {
    cy.crud({ get: "localhost/users", expect: "last_name:::user_last_name>4" });
  });

  it("usar forma aprimorada de validação salvar pelo nome mudando variavel", () => {
    cy.crud({ get: "localhost/users", expect: "last_name===Davis:::user" });
  });

  it("validar tipo de campo string number etc", () => {
    cy.crud({
      condition: { path: "user", eq: "Davis" },
      get: "localhost/users/2",
      expect: { path: "last_name", type: "string" },
    });
  });

  it("validar multiplos valores", () => {
    cy.crud({
      text: "Equal validando possibilidade de vários valores",
      get: "https://reqres.in/api/users/2",
      expect: {
        path: "first_name",
        eq: "Jam || Batista || test || Janet",
      },
    });
  });

  it("validar condição do teste anterior", () => {
    cy.crud({
      condition: { path: "first_name", eq: "Janet" },
      get: "https://reqres.in/api/users/2",
    });
  });

  it("validar condição do teste anterior com error", () => {
    cy.crud({
      condition: { path: "first_name", eq: "Jane" },
      get: "https://reqres.in/api/users/2",
    });
  });

  it("request modificando valores do json", () => {
    let json = user;
    json.body = { name: "faker.name" };

    cy.crud(json);
  });

  it("validar schema ou teste de contrato", () => {
    cy.crud({
      get: "https://reqres.in/api/users/2",
      schemas: "schemas/jsonSchema",
    });
  });

  it("efetuando request com mock", () => {
    cy.crud({
      get: "https://demo0065046.mockable.io/",
      mock: "mocks/mock",
      status: 201,
      expect: "authorization",
    });
  });
});
